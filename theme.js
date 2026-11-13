'use strict';

(() => {
  const key = 'quiz-theme';
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(key);
  } catch (error) {
    console.warn('Theme preference could not be read from this browser.', error);
  }
  if (savedTheme !== 'dark' && savedTheme !== 'light') savedTheme = null;

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#101c2a' : '#005eb8';
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  applyTheme(savedTheme || (preference.matches ? 'dark' : 'light'));
  preference.addEventListener('change', event => {
    if (!savedTheme) applyTheme(event.matches ? 'dark' : 'light');
  });
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.theme-toggle');
    toggle.hidden = false;
    toggle.setAttribute('aria-pressed', String(document.documentElement.dataset.theme === 'dark'));
    toggle.addEventListener('click', () => {
      savedTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(savedTheme);
      try {
        localStorage.setItem(key, savedTheme);
      } catch (error) {
        console.warn('Theme preference could not be saved in this browser.', error);
      }
    });
  });
})();
