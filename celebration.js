'use strict';

window.celebrateQuizCompletion = (position, total) => {
  if (!Number.isInteger(position) || !Number.isInteger(total) || total < 1 || position < 1 || position > total) {
    throw new RangeError('The quiz position must be within the collection.');
  }

  document.querySelector('.confetti-layer')?.remove();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const progress = total === 1 ? 1 : (position - 1) / (total - 1);
  const count = Math.round(12 + progress * 60);
  const spread = 12 + progress * 36;
  const colours = ['#005eb8', '#ae2573', '#ffb81c', '#007f7b', '#69b7ff', '#ed7db6'];
  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  layer.setAttribute('aria-hidden', 'true');

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${46 + Math.random() * 8}%`;
    piece.style.top = `${12 + Math.random() * 14}%`;
    piece.style.backgroundColor = colours[i % colours.length];
    piece.style.setProperty('--confetti-x', `${(Math.random() * 2 - 1) * spread}vw`);
    piece.style.setProperty('--confetti-y', `${20 + Math.random() * (20 + progress * 25)}vh`);
    piece.style.setProperty('--confetti-rotation', `${Math.round((Math.random() * 2 - 1) * 540)}deg`);
    piece.style.setProperty('--confetti-delay', `${Math.random() * 0.2}s`);
    layer.append(piece);
  }

  document.body.append(layer);
  window.setTimeout(() => layer.remove(), 3000);
};
