'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');

test('homepage introduction uses a local video with controls and no autoplay', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const video = html.match(/<video\b([^>]*)>([\s\S]*?)<\/video>/);
  assert.ok(video, 'homepage video is missing');
  assert.match(video[1], /\bcontrols\b/);
  assert.doesNotMatch(video[1], /\bautoplay\b/);
  assert.match(video[1], /poster="quiz-hub-intro-poster\.svg"/);
  assert.match(video[2], /<source src="quiz-hub-intro\.mp4" type="video\/mp4">/);
  assert.ok(fs.statSync(path.join(root, 'quiz-hub-intro.mp4')).size > 0);
  assert.ok(fs.existsSync(path.join(root, 'quiz-hub-intro-poster.svg')));
});
