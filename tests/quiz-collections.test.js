'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const collections = [
  { data: 'staff-quiz-data.js', list: 'staff-quizzes.html', page: 'staff-quiz.html' },
  { data: 'placement-quiz-data.js', list: 'placement-quizzes.html', page: 'placement-quiz.html' }
];

function readQuizzes(file) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  return vm.runInNewContext(`${source}\nstaffQuizzes`);
}

test('each collection links to its own quizzes', () => {
  for (const collection of collections) {
    const quizzes = readQuizzes(collection.data);
    const html = fs.readFileSync(path.join(root, collection.list), 'utf8');
    const links = [...html.matchAll(/href="([^"]+\.html)\?quiz=([^"]+)"/g)];
    assert.ok(links.length, `${collection.list} has no quiz links`);
    assert.ok(links.every(link => link[1] === collection.page), `${collection.list} links to another collection`);
    assert.deepEqual(links.map(link => link[2]), Object.keys(quizzes));
    const cards = [...html.matchAll(/<article class="staff-card">([\s\S]*?)<\/article>/g)];
    assert.equal(cards.length, links.length);
    cards.forEach((card, index) => {
      const quiz = quizzes[links[index][2]];
      assert.ok(card[1].includes(`<h3>${quiz.title}</h3>`), `${collection.list}: title mismatch`);
      const description = card[1].match(/<p class="staff-description">([^<]+)<\/p>/);
      assert.ok(description, `${quiz.title}: missing description`);
      assert.equal(description[1], quiz.introduction, `${quiz.title}: card and introduction differ`);
      assert.ok(card[1].includes(`Briefing + ${quiz.questions.length} challenges`), `${quiz.title}: incorrect challenge count`);
    });
  }
});

test('each quiz has usable single-choice questions and sources', () => {
  for (const collection of collections) {
    for (const [id, quiz] of Object.entries(readQuizzes(collection.data))) {
      assert.ok(quiz.title && quiz.introduction && quiz.questions.length && quiz.sources.length, id);
      assert.ok(Array.isArray(quiz.insights) && quiz.insights.length === 3, `${id}: expected three briefing points`);
      for (const insight of quiz.insights) {
        assert.ok(Array.isArray(insight) && insight.length === 2 && insight.every(part => typeof part === 'string' && part.trim()), `${id}: incomplete briefing point`);
      }
      for (const [label, url] of quiz.sources) {
        assert.ok(label && new URL(url).protocol === 'https:', `${id}: invalid source`);
      }
      for (const question of quiz.questions) {
        assert.ok(question.question && question.explanation, `${id}: incomplete question`);
        assert.equal(question.answers.length, 4, `${id}: expected four answers`);
        assert.ok(question.answers.every(Boolean), `${id}: empty answer`);
        assert.equal(new Set(question.answers).size, 4, `${id}: duplicate answer`);
        assert.ok(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < 4, `${id}: invalid correct answer`);
      }
    }
  }
});
