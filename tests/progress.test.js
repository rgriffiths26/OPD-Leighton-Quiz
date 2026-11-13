'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'progress.js'), 'utf8');
const key = 'opd-leighton-quiz-progress-v1';

function createPage(store = new Map(), failures = {}, collection = null) {
  const warnings = [];
  const writes = [];
  const listeners = new Map();
  const window = {
    localStorage: {
      getItem(name) {
        if (failures.read) throw new Error('Storage blocked');
        return store.get(name) ?? null;
      },
      setItem(name, value) {
        if (failures.write) throw new Error('Storage full');
        store.set(name, value);
        writes.push(name);
      }
    },
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, []);
      listeners.get(name).push(callback);
    },
    dispatchEvent(event) {
      for (const listener of listeners.get(event.type) || []) listener(event);
    }
  };
  let mount;
  const createElement = tag => {
    const handlers = new Map();
    return {
      tagName: tag.toUpperCase(), children: [], dataset: {}, attributes: {}, open: false,
      append(...children) { this.children.push(...children); },
      setAttribute(name, value) { this.attributes[name] = value; },
      addEventListener(name, callback) { handlers.set(name, callback); },
      dispatchEvent(event) { handlers.get(event.type)?.(event); },
      click() { this.dispatchEvent({ type: 'click', target: this }); },
      focus() { document.activeElement = this; },
      showModal() { this.open = true; },
      close() { this.open = false; this.dispatchEvent({ type: 'close' }); },
      getBoundingClientRect: () => ({ left: 10, top: 10, right: 110, bottom: 110 })
    };
  };
  const panel = collection === null ? null : createElement('section');
  if (panel) panel.dataset.progressCollection = collection;
  const document = {
    createElement,
    addEventListener(name, callback) { if (name === 'DOMContentLoaded') mount = callback; },
    querySelectorAll: selector => selector === '[data-progress-panel]' && panel ? [panel] : []
  };
  vm.runInNewContext(source, {
    window, document,
    Event: class { constructor(type) { this.type = type; } },
    console: { warn: message => warnings.push(message) }
  });
  return { progress: window.quizProgress, store, warnings, writes, window, document, panel, mount: () => mount() };
}

test('saving controls stay in a closed pop-out until opened and retain their behaviour', () => {
  const page = createPage(undefined, {}, 'staff');
  page.mount();
  const [launcher, warning, dialog] = page.panel.children;
  const [header, copy, reset, status] = dialog.children;
  const [heading, close] = header.children;
  const checkbox = copy.children[0].children[0];
  assert.equal(launcher.textContent, 'Progress & scores (0/6)');
  assert.equal(dialog.tagName, 'DIALOG');
  assert.equal(dialog.open, false);
  assert.equal(launcher.attributes['aria-controls'], dialog.id);
  assert.equal(dialog.attributes['aria-labelledby'], heading.id);
  assert.equal(warning.hidden, true);
  launcher.click();
  assert.equal(dialog.open, true);
  assert.equal(page.document.activeElement, heading);
  assert.equal(checkbox.checked, true);
  page.progress.complete('staff', 'clinic', 3, 5);
  assert.equal(launcher.textContent, 'Progress & scores (1/6)');
  checkbox.checked = false;
  checkbox.dispatchEvent({ type: 'change' });
  assert.deepEqual(JSON.parse(page.store.get(key)), { version: 1, enabled: false });
  close.click();
  assert.equal(dialog.open, false);
  assert.equal(page.document.activeElement, launcher);
  launcher.click();
  assert.equal(checkbox.checked, false);
  checkbox.checked = true;
  checkbox.dispatchEvent({ type: 'change' });
  page.progress.complete('staff', 'clinic', 4, 5);
  reset.click();
  assert.equal(dialog.open, true);
  assert.equal(page.progress.getCompleted('staff').length, 0);
  assert.equal(checkbox.checked, true);
  assert.match(status.textContent, /cleared across all three collections/);
  dialog.dispatchEvent({ type: 'click', target: dialog, clientX: 50, clientY: 50 });
  assert.equal(dialog.open, true, 'Clicks inside the pop-out should not dismiss it');
  dialog.dispatchEvent({ type: 'click', target: dialog, clientX: 0, clientY: 0 });
  assert.equal(dialog.open, false);
  assert.equal(page.document.activeElement, launcher);
});

test('storage problems remain visible when the saving pop-out is closed', () => {
  const page = createPage(undefined, { read: true }, 'staff');
  page.mount();
  const [launcher, warning, dialog] = page.panel.children;
  assert.equal(dialog.open, false);
  assert.equal(warning.hidden, false);
  assert.match(warning.textContent, /cannot be read/);
  launcher.click();
  assert.equal(warning.hidden, true);
  assert.match(dialog.children[3].textContent, /cannot be read/);
  dialog.close();
  assert.equal(warning.hidden, false);
});

test('saving defaults on and stores only quiz IDs and the latest scores', () => {
  const page = createPage();
  assert.equal(page.progress.isRemembered(), true);
  assert.equal(page.writes.length, 0);
  page.progress.complete('staff', 'clinic', 5, 5);
  page.progress.complete('placement', 'specimens', 3, 5);
  page.progress.complete('staff', 'clinic', 2, 5);
  assert.deepEqual(JSON.parse(page.store.get(key)), {
    version: 1,
    enabled: true,
    results: { nursing: {}, staff: { clinic: { score: 2, total: 5 } }, placement: { specimens: { score: 3, total: 5 } } }
  });
  const next = createPage(page.store).progress;
  assert.equal(next.isRemembered(), true);
  assert.deepEqual([...next.getCompleted('staff')], ['clinic']);
  assert.equal(next.getResult('staff', 'clinic').score, 2);
  assert.equal(next.getResult('placement', 'specimens').score, 3);
  const copy = next.getResult('staff', 'clinic');
  copy.score = 99;
  assert.equal(next.getResult('staff', 'clinic').score, 2);
});

test('opting out erases saved results and stays off across navigation and return visits', () => {
  const page = createPage(new Map([['quiz-theme', 'dark'], ['another-site-progress', 'untouched']]));
  page.progress.complete('nursing', '6', 4, 5);
  assert.equal(page.progress.setRemembered(false), true);
  assert.deepEqual(JSON.parse(page.store.get(key)), { version: 1, enabled: false });
  assert.equal(page.progress.getCompleted('nursing').length, 0);
  const next = createPage(page.store);
  assert.equal(next.progress.isRemembered(), false);
  next.progress.complete('staff', 'clinic', 1, 5);
  assert.equal(next.writes.length, 0);
  assert.deepEqual(JSON.parse(page.store.get(key)), { version: 1, enabled: false });
  assert.equal(createPage(page.store).progress.getCompleted('staff').length, 0);
  assert.equal(next.progress.setRemembered(true), true);
  assert.equal(createPage(page.store).progress.getResult('staff', 'clinic').score, 1);
  assert.equal(page.store.get('quiz-theme'), 'dark');
  assert.equal(page.store.get('another-site-progress'), 'untouched');
});

test('reset clears every score and completion without changing the saving preference', () => {
  const page = createPage();
  page.progress.complete('nursing', '6', 4, 5);
  page.progress.complete('staff', 'medicines', 0, 5);
  page.progress.complete('placement', 'specialties', 5, 5);
  assert.equal(page.progress.reset(), true);
  assert.equal(page.progress.isRemembered(), true);
  assert.ok(Object.values(JSON.parse(page.store.get(key)).results).every(results => Object.keys(results).length === 0));
  page.progress.setRemembered(false);
  page.progress.complete('staff', 'clinic', 1, 5);
  page.progress.reset();
  assert.equal(createPage(page.store).progress.isRemembered(), false);
  assert.equal(page.progress.getCompleted('staff').length, 0);
});

test('malformed or unsupported saved results are reported and can be reset', () => {
  for (const raw of ['{broken', 'null', '{"version":2}', JSON.stringify({
    version: 1, enabled: true, results: { nursing: {}, staff: { clinic: { score: 6, total: 5 } }, placement: {} }
  }), JSON.stringify({
    version: 1, enabled: true, results: { nursing: {}, staff: { unknown: { score: 1, total: 5 } }, placement: {} }
  })]) {
    const page = createPage(new Map([[key, raw]]));
    assert.equal(page.progress.isRemembered(), false);
    assert.match(page.warnings[0], /Saved results are unreadable/);
    assert.equal(page.progress.reset(), true);
    assert.deepEqual(JSON.parse(page.store.get(key)), { version: 1, enabled: false });
    assert.equal(page.progress.setRemembered(true), true);
  }
});

test('storage failures do not block quizzes or falsely confirm saving, reset or opt-out', () => {
  const blocked = createPage(new Map(), { read: true, write: true });
  assert.match(blocked.warnings[0], /cannot be read/);
  assert.doesNotThrow(() => blocked.progress.complete('staff', 'clinic', 3, 5));
  assert.equal(blocked.progress.setRemembered(true), false);
  assert.equal(blocked.progress.isRemembered(), false);
  assert.match(blocked.warnings.at(-1), /could not be saved/);

  const failures = {};
  const page = createPage(new Map(), failures);
  page.progress.complete('staff', 'clinic', 4, 5);
  failures.write = true;
  assert.equal(page.progress.reset(), false);
  assert.match(page.warnings.at(-1), /could not be reset/);
  assert.equal(page.progress.getResult('staff', 'clinic').score, 4);
  assert.equal(page.progress.setRemembered(false), false);
  assert.equal(page.progress.isRemembered(), true);
  assert.equal(JSON.parse(page.store.get(key)).results.staff.clinic.score, 4);
  assert.match(page.warnings.at(-1), /could not be switched off/);
});

test('new results respect updates, reset and opt-out from other tabs', () => {
  const first = createPage();
  first.progress.complete('staff', 'clinic', 3, 5);
  const second = createPage(first.store);
  second.progress.complete('staff', 'deterioration', 4, 5);
  first.progress.complete('placement', 'specimens', 2, 5);
  assert.equal(Object.keys(JSON.parse(first.store.get(key)).results.staff).length, 2);
  second.progress.reset();
  first.progress.complete('placement', 'aseptic', 5, 5);
  const saved = JSON.parse(first.store.get(key)).results;
  assert.deepEqual(saved.staff, {});
  assert.deepEqual(Object.keys(saved.placement), ['aseptic']);
  second.progress.setRemembered(false);
  first.progress.reset();
  assert.deepEqual(JSON.parse(first.store.get(key)), { version: 1, enabled: false });
  first.progress.complete('nursing', '1', 1, 5);
  assert.equal(first.progress.isRemembered(), false);
  assert.deepEqual(JSON.parse(first.store.get(key)), { version: 1, enabled: false });
});

test('storage events and back-forward restoration refresh scores and completion marks', () => {
  const first = createPage();
  const second = createPage(first.store);
  first.progress.complete('nursing', '2', 4, 5);
  second.window.dispatchEvent({ type: 'storage', key });
  assert.equal(second.progress.getResult('nursing', '2').score, 4);
  first.progress.complete('staff', 'infection', 3, 5);
  second.window.dispatchEvent({ type: 'pageshow', persisted: true });
  assert.deepEqual([...second.progress.getCompleted('staff')], ['infection']);
  first.progress.setRemembered(false);
  second.window.dispatchEvent({ type: 'storage', key });
  assert.equal(second.progress.isRemembered(), false);
  assert.equal(second.progress.getCompleted('nursing').length, 0);
});

test('completion IDs cover the actual quizzes and reject invalid IDs or scores', () => {
  const page = createPage();
  page.progress.setRemembered(false);
  for (const [collection, file] of [['staff', 'staff-quiz-data.js'], ['placement', 'placement-quiz-data.js']]) {
    const quizzes = vm.runInNewContext(`${fs.readFileSync(path.join(root, file), 'utf8')}\nstaffQuizzes`);
    for (const [id, quiz] of Object.entries(quizzes)) page.progress.complete(collection, id, 0, quiz.questions.length);
    assert.equal(page.progress.getCompleted(collection).length, Object.keys(quizzes).length);
  }
  for (let station = 1; station <= 6; station++) page.progress.complete('nursing', String(station), 5, 5);
  assert.equal(page.progress.getCompleted('nursing').length, 6);
  for (const [collection, id] of [['unknown', '1'], ['staff', '__proto__'], ['nursing', '7']]) {
    assert.throws(() => page.progress.complete(collection, id, 1, 5), /Unknown quiz completion/);
  }
  for (const [score, total] of [[-1, 5], [6, 5], [1.5, 5], [0, 0]]) {
    assert.throws(() => page.progress.complete('staff', 'clinic', score, total), /Invalid quiz score/);
  }
  assert.deepEqual(JSON.parse(page.store.get(key)), { version: 1, enabled: false });
});

test('all pages expose saving controls and collection badges identify the linked quiz', () => {
  for (const page of ['index.html', 'nursing.html', 'staff-quizzes.html', 'placement-quizzes.html', 'staff-quiz.html', 'placement-quiz.html']) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    assert.match(html, /<script src="progress\.js\?v=[^"]+"><\/script>/, page);
    assert.match(html, /data-progress-panel[^>]*hidden/, page);
    assert.doesNotMatch(html, /No names, scores or responses are collected|Answers and scores are not saved|no marks recorded/, page);
  }
  for (const [collection, page] of [['staff', 'staff-quizzes.html'], ['placement', 'placement-quizzes.html']]) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    const cards = [...html.matchAll(/<article class="staff-card">([\s\S]*?)<\/article>/g)];
    for (const [card] of cards) {
      const id = card.match(/href="[^"]+\?quiz=([^"]+)"/)[1];
      assert.ok(card.includes(`data-progress-quiz="${collection}:${id}"`), `${page}: badge does not match ${id}`);
    }
  }
});
