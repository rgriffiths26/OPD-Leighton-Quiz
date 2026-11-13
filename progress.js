'use strict';

(() => {
  const key = 'opd-leighton-quiz-progress-v1';
  const collections = {
    nursing: ['1', '2', '3', '4', '5', '6'],
    staff: ['clinic', 'deterioration', 'infection', 'consent', 'communication', 'medicines'],
    placement: ['specimens', 'aseptic', 'handover', 'wounds', 'safeguarding', 'specialties']
  };
  const quizCount = Object.values(collections).reduce((sum, ids) => sum + ids.length, 0);
  const empty = () => Object.fromEntries(Object.keys(collections).map(name => [name, {}]));
  let results = empty();
  let remembered = true;
  let hasSavedRecord = false;
  let error = '';
  let announcement = '';
  const controls = [];

  function report(message) {
    error = message;
    console.warn(message);
  }

  function hasKeys(value, keys) {
    return value && typeof value === 'object' && !Array.isArray(value)
      && Object.keys(value).sort().join(',') === [...keys].sort().join(',');
  }

  function validScore(score, total) {
    return Number.isSafeInteger(score) && Number.isSafeInteger(total) && total > 0 && score >= 0 && score <= total;
  }

  function decode(raw) {
    const saved = JSON.parse(raw);
    if (!saved || saved.version !== 1 || typeof saved.enabled !== 'boolean'
      || !hasKeys(saved, saved.enabled ? ['version', 'enabled', 'results'] : ['version', 'enabled'])) {
      throw new Error('Unrecognised quiz progress format.');
    }
    const decoded = empty();
    if (!saved.enabled) return { enabled: false, results: decoded };
    if (!hasKeys(saved.results, Object.keys(collections))) throw new Error('Unrecognised quiz collections.');
    for (const [name, ids] of Object.entries(collections)) {
      const entries = saved.results[name];
      if (!entries || typeof entries !== 'object' || Array.isArray(entries)) throw new Error('Unrecognised quiz results.');
      for (const [id, result] of Object.entries(entries)) {
        if (!ids.includes(id) || !hasKeys(result, ['score', 'total']) || !validScore(result.score, result.total)) {
          throw new Error('Unrecognised quiz result.');
        }
        decoded[name][id] = { score: result.score, total: result.total };
      }
    }
    return { enabled: true, results: decoded };
  }

  function readSaved(clearIfMissing = false) {
    let raw;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      remembered = false;
      report('Saved results cannot be read in this browser. The quizzes still work without saving.');
      return;
    }
    if (raw === null) {
      if (hasSavedRecord || clearIfMissing) results = empty();
      remembered = true;
      hasSavedRecord = false;
      error = '';
      return;
    }
    hasSavedRecord = true;
    try {
      const saved = decode(raw);
      results = saved.results;
      remembered = saved.enabled;
      error = '';
    } catch {
      results = empty();
      remembered = false;
      report('Saved results are unreadable. Use Reset progress to clear them, or switch saving on to start again.');
    }
  }

  function writeSaved(next, enabled, failureMessage) {
    const value = enabled ? { version: 1, enabled: true, results: next } : { version: 1, enabled: false };
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      hasSavedRecord = true;
      error = '';
      return true;
    } catch {
      report(failureMessage || (enabled
        ? 'Results could not be saved in this browser. Recent scores may be lost when you leave this page.'
        : 'Saving could not be switched off. Clear this site\'s data in your browser settings before sharing the device.'));
      return false;
    }
  }

  function getCompleted(name) {
    if (!Object.hasOwn(collections, name)) throw new RangeError('Unknown quiz collection.');
    return Object.keys(results[name]);
  }

  function getResult(name, id) {
    if (!Object.hasOwn(collections, name) || !collections[name].includes(id)) throw new RangeError('Unknown quiz.');
    return Object.hasOwn(results[name], id) ? { ...results[name][id] } : null;
  }

  function render() {
    const total = Object.values(results).reduce((sum, entries) => sum + Object.keys(entries).length, 0);
    for (const { panel, launcher, dialog, warning, checkbox, reset, status } of controls) {
      const name = panel.dataset.progressCollection;
      const count = name ? getCompleted(name).length : total;
      const max = name ? collections[name].length : quizCount;
      launcher.textContent = `Progress & scores (${count}/${max})`;
      launcher.title = error || (remembered ? 'Saving is on for this browser.' : 'Saving is off for this browser.');
      warning.textContent = error;
      warning.hidden = !error || dialog.open;
      checkbox.checked = remembered;
      reset.disabled = total === 0 && !error;
      const note = error || announcement || (remembered
        ? 'Saving is on. Latest scores stay in this browser only.'
        : 'Saving is off. Results are not kept after you leave this page.');
      status.textContent = `${count} of ${max} quizzes completed. ${note}`;
    }
    for (const badge of document.querySelectorAll('[data-progress-quiz]')) {
      const [name, id] = badge.dataset.progressQuiz.split(':');
      const result = getResult(name, id);
      badge.hidden = !result;
      if (result) badge.textContent = `Completed - ${result.score}/${result.total}`;
    }
    for (const summary of document.querySelectorAll('[data-progress-summary]')) {
      const name = summary.dataset.progressSummary;
      summary.textContent = `${getCompleted(name).length} of ${collections[name].length} completed`;
      summary.hidden = false;
    }
  }

  function notify(message = '') {
    announcement = message;
    render();
    window.dispatchEvent(new Event('quizprogresschange'));
  }

  function setRemembered(value) {
    if (typeof value !== 'boolean') throw new TypeError('Save results must be true or false.');
    if (value) {
      if (!writeSaved(results, true)) {
        notify();
        return false;
      }
      remembered = true;
      notify('Saving is on. Your latest scores will replace earlier scores when you finish a retry.');
    } else {
      if (!writeSaved(empty(), false)) {
        notify();
        return false;
      }
      remembered = false;
      results = empty();
      notify('Saved scores and completion marks removed. Saving is off for future visits too.');
    }
    return true;
  }

  function reset() {
    readSaved();
    const next = empty();
    if (!writeSaved(next, remembered, 'Saved results could not be reset. Earlier results may still be in this browser.')) {
      notify();
      return false;
    }
    results = next;
    notify('Scores and completion marks cleared across all three collections.');
    return true;
  }

  function complete(name, id, score, total) {
    if (!Object.hasOwn(collections, name) || !collections[name].includes(id)) {
      throw new RangeError('Unknown quiz completion.');
    }
    if (!validScore(score, total)) throw new RangeError('Invalid quiz score.');
    // Recheck the saving preference and latest results, including changes in another tab.
    if (remembered) readSaved();
    results[name][id] = { score, total };
    if (remembered) writeSaved(results, true);
    notify();
  }

  function mount() {
    document.querySelectorAll('[data-progress-panel]').forEach((panel, index) => {
      const launcher = document.createElement('button');
      launcher.className = 'progress-trigger';
      launcher.type = 'button';
      launcher.setAttribute('aria-haspopup', 'dialog');
      const dialog = document.createElement('dialog');
      dialog.className = 'progress-dialog';
      dialog.id = `progress-dialog-${index}`;
      launcher.setAttribute('aria-controls', dialog.id);
      const heading = document.createElement('h2');
      heading.id = `progress-title-${index}`;
      heading.tabIndex = -1;
      heading.textContent = 'Progress & scores';
      dialog.setAttribute('aria-labelledby', heading.id);
      const closeButton = document.createElement('button');
      closeButton.className = 'progress-close';
      closeButton.type = 'button';
      closeButton.textContent = 'Close';
      const header = document.createElement('div');
      header.className = 'progress-dialog-heading';
      header.append(heading, closeButton);
      const label = document.createElement('label');
      label.className = 'progress-toggle';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      const text = document.createElement('span');
      text.textContent = 'Save progress and scores on this device';
      label.append(checkbox, text);
      const help = document.createElement('p');
      help.className = 'progress-help';
      help.id = `progress-help-${index}`;
      help.textContent = 'Saves completed quizzes and your latest scores in this browser only, never names, answers or reflection notes. Shared device? Switch this off before leaving.';
      checkbox.setAttribute('aria-describedby', help.id);
      const copy = document.createElement('div');
      copy.className = 'progress-copy';
      copy.append(label, help);
      const resetButton = document.createElement('button');
      resetButton.className = 'progress-reset';
      resetButton.type = 'button';
      resetButton.textContent = 'Reset progress';
      resetButton.setAttribute('aria-label', 'Reset progress and scores across all quiz collections');
      const status = document.createElement('p');
      status.className = 'progress-status';
      status.setAttribute('role', 'status');
      const warning = document.createElement('p');
      warning.className = 'progress-warning';
      warning.setAttribute('role', 'status');
      warning.hidden = true;
      dialog.append(header, copy, resetButton, status);
      panel.append(launcher, warning, dialog);
      panel.hidden = false;
      launcher.addEventListener('click', () => {
        dialog.showModal();
        heading.focus();
        render();
      });
      closeButton.addEventListener('click', () => dialog.close());
      dialog.addEventListener('close', () => {
        launcher.focus();
        render();
      });
      dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right
          || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      });
      checkbox.addEventListener('change', () => setRemembered(checkbox.checked));
      resetButton.addEventListener('click', reset);
      controls.push({ panel, launcher, dialog, warning, checkbox, reset: resetButton, status });
    });
    render();
  }

  readSaved();
  window.quizProgress = Object.freeze({ complete, getCompleted, getResult, setRemembered, reset, isRemembered: () => remembered });
  document.addEventListener('DOMContentLoaded', mount);
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    readSaved(true);
    notify();
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    readSaved();
    notify();
  });
})();
