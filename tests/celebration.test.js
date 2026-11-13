'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'celebration.js'), 'utf8');

function createPage() {
  const timers = [];
  let reducedMotion = false;

  function element() {
    return {
      children: [],
      attributes: {},
      style: { setProperty(name, value) { this[name] = value; } },
      setAttribute(name, value) { this.attributes[name] = value; },
      append(child) { this.children.push(child); child.parent = this; },
      remove() {
        if (this.parent) {
          this.parent.children = this.parent.children.filter(child => child !== this);
          this.parent = null;
        }
      }
    };
  }

  const document = {
    body: element(),
    createElement: element,
    querySelector(selector) {
      return this.body.children.find(child => `.${child.className}` === selector) || null;
    }
  };
  const window = {
    matchMedia: query => ({ matches: query === '(prefers-reduced-motion: reduce)' && reducedMotion }),
    setTimeout: (callback, delay) => timers.push({ callback, delay })
  };
  const math = Object.create(Math);
  math.random = () => 0.99;
  vm.runInNewContext(source, { document, window, Math: math });

  return {
    document,
    window,
    timers,
    setReducedMotion(value) { reducedMotion = value; }
  };
}

test('all six quiz positions produce increasingly large decorative bursts', () => {
  const { document, window } = createPage();
  let previousCount = 0;
  let previousSpread = 0;

  for (let position = 1; position <= 6; position++) {
    window.celebrateQuizCompletion(position, 6);
    assert.equal(document.body.children.length, 1);
    const layer = document.body.children[0];
    assert.equal(layer.attributes['aria-hidden'], 'true');
    assert.ok(layer.children.length > previousCount);
    assert.ok(layer.children.length <= 100);
    const spread = parseFloat(layer.children[0].style['--confetti-x']);
    assert.ok(spread > previousSpread);
    previousCount = layer.children.length;
    previousSpread = spread;
  }
});

test('bursts are removed automatically and replay replaces the old burst', () => {
  const { document, window, timers } = createPage();
  window.celebrateQuizCompletion(1, 6);
  const firstLayer = document.body.children[0];
  window.celebrateQuizCompletion(6, 6);
  const secondLayer = document.body.children[0];
  assert.notEqual(firstLayer, secondLayer);
  assert.equal(document.body.children.length, 1);
  assert.ok(timers.every(timer => timer.delay <= 3000));
  timers[0].callback();
  assert.equal(document.body.children[0], secondLayer);
  timers[1].callback();
  assert.equal(document.body.children.length, 0);
});

test('reduced motion suppresses celebrations and removes an existing burst', () => {
  const page = createPage();
  page.window.celebrateQuizCompletion(1, 6);
  page.setReducedMotion(true);
  page.window.celebrateQuizCompletion(6, 6);
  assert.equal(page.document.body.children.length, 0);
  assert.equal(page.timers.length, 1);
});

test('invalid quiz positions are rejected', () => {
  const { window } = createPage();
  for (const [position, total] of [[0, 6], [7, 6], [1, 0], [1.5, 6]]) {
    assert.throws(() => window.celebrateQuizCompletion(position, total), /quiz position/i);
  }
});

function createQuizPage(dataFile, id, { hasReflection = true, hasInsights = true, hasKicker = true, hasInsightData = true, hasProgress = true } = {}) {
  const elements = new Map();
  const calls = [];
  const warnings = [];
  const savedResults = [];
  const document = {
    title: 'Quiz',
    body: { dataset: { quizCollection: dataFile === 'placement-quiz-data.js' ? 'placement' : 'staff' } },
    createElement,
    getElementById(name) {
      if (!hasReflection && (name === 'reflection-prompt' || name === 'reflection-notes')) return null;
      if (!hasInsights && name === 'quiz-insights') return null;
      if (!hasKicker && name === 'quiz-kicker') return null;
      if (!elements.has(name)) elements.set(name, createElement());
      return elements.get(name);
    }
  };

  function createElement() {
    const listeners = {};
    return {
      children: [],
      classList: { add() {}, remove() {}, toggle() {} },
      dataset: {},
      value: '',
      setAttribute() {},
      append(...children) { this.children.push(...children); },
      replaceChildren() { this.children = []; },
      addEventListener(name, callback) { listeners[name] = callback; },
      click() { if (!this.disabled) listeners.click?.(); },
      focus() { document.activeElement = this; }
    };
  }

  const context = vm.createContext({
    document,
    location: { search: `?quiz=${id}` },
    URLSearchParams,
    window: {
      celebrateQuizCompletion: (...args) => calls.push(args),
      ...(hasProgress ? { quizProgress: { complete: (...args) => savedResults.push(args) } } : {})
    },
    console: { warn: message => warnings.push(message) }
  });
  const data = fs.readFileSync(path.join(__dirname, '..', dataFile), 'utf8');
  const quizScript = fs.readFileSync(path.join(__dirname, '..', 'staff-quiz.js'), 'utf8');
  vm.runInContext(data, context);
  const quiz = vm.runInContext(`staffQuizzes[${JSON.stringify(id)}]`, context);
  if (!hasInsightData) delete quiz.insights;
  vm.runInContext(quizScript, context);
  return { document, calls, quiz, warnings, savedResults };
}

function finishQuiz(page, correct) {
  for (const question of page.quiz.questions) {
    const choice = correct ? question.correct : (question.correct + 1) % question.answers.length;
    page.document.getElementById('quiz-options').children[choice].click();
    page.document.getElementById('quiz-next').click();
  }
}

test('quiz results use their fixed position, including on replay and with different scores', () => {
  const collections = [
    { data: 'staff-quiz-data.js', first: 'clinic', last: 'medicines' },
    { data: 'placement-quiz-data.js', first: 'specimens', last: 'specialties' }
  ];

  for (const collection of collections) {
    for (const [id, position] of [[collection.last, 6], [collection.first, 1]]) {
      const page = createQuizPage(collection.data, id);
      assert.ok(page.document.getElementById('reflection-prompt').textContent.includes(page.quiz.title));
      assert.equal(page.document.getElementById('quiz-intro').textContent, page.quiz.introduction);
      assert.equal(page.document.getElementById('quiz-panel').dataset.quizPosition, String(position));
      assert.match(page.document.getElementById('quiz-kicker').textContent, new RegExp(`Quiz 0${position}`));
      const briefing = page.document.getElementById('quiz-insights').children;
      assert.deepEqual(briefing.map(item => item.children.map(child => child.textContent)), Array.from(page.quiz.insights, item => Array.from(item)));
      finishQuiz(page, true);
      assert.deepEqual(page.calls, [[position, 6]]);
      const collectionId = collection.data === 'placement-quiz-data.js' ? 'placement' : 'staff';
      assert.deepEqual(page.savedResults, [[collectionId, id, 5, 5]]);
      assert.equal(page.document.getElementById('quiz-result').hidden, false);
      assert.equal(page.document.activeElement, page.document.getElementById('result-title'));
      const message = page.document.getElementById('result-score').textContent;
      assert.match(message, new RegExp(`quiz ${position} of 6`, 'i'));
      assert.match(message, /5 of 5 suggested answers/);
      if (position === 6) assert.match(message, /Congratulations!/);

      page.document.getElementById('reflection-notes').value = 'Discuss this with my supervisor.';
      page.document.getElementById('quiz-retry').click();
      assert.equal(page.document.getElementById('reflection-notes').value, '');
      assert.equal(page.savedResults.length, 1, 'Starting a retry should not change the saved result');
      finishQuiz(page, false);
      assert.deepEqual(page.calls, [[position, 6], [position, 6]]);
      assert.match(page.document.getElementById('result-score').textContent, /0 of 5 suggested answers/);
      assert.deepEqual(page.savedResults, [[collectionId, id, 5, 5], [collectionId, id, 0, 5]]);
    }
  }
});

test('cached older quiz pages can still finish and replay without newer elements', () => {
  const page = createQuizPage('staff-quiz-data.js', 'clinic', { hasReflection: false, hasInsights: false, hasKicker: false, hasProgress: false });
  assert.match(page.warnings[0], /Reflection notes are unavailable/);
  finishQuiz(page, true);
  assert.equal(page.document.getElementById('quiz-result').hidden, false);
  page.document.getElementById('quiz-retry').click();
  finishQuiz(page, false);
  assert.deepEqual(page.calls, [[1, 6], [1, 6]]);
});

test('quiz pages remain usable with cached data that has no briefing points', () => {
  const page = createQuizPage('placement-quiz-data.js', 'specimens', { hasInsightData: false });
  assert.match(page.warnings[0], /Quiz background reading is unavailable/);
  finishQuiz(page, true);
  assert.equal(page.document.getElementById('quiz-result').hidden, false);
  assert.deepEqual(page.calls, [[1, 6]]);
});

test('both quiz pages provide an associated private reflection notes field', () => {
  for (const page of ['staff-quiz.html', 'placement-quiz.html']) {
    const html = fs.readFileSync(path.join(__dirname, '..', page), 'utf8');
    assert.match(html, /<label for="reflection-notes" id="reflection-prompt"><\/label>/, page);
    assert.match(html, /<textarea id="reflection-notes"[^>]*placeholder="Your thoughts — just for you\. Nothing is sent or saved\."/, page);
    assert.match(html, /These notes are not saved, submitted or shared\./, page);
  }
});
