'use strict';

(() => {
  const id = new URLSearchParams(location.search).get('quiz');
  const quiz = Object.hasOwn(staffQuizzes, id) ? staffQuizzes[id] : null;
  const byId = name => document.getElementById(name);

  if (!quiz) {
    byId('quiz-error').hidden = false;
    return;
  }

  let index = 0;
  let score = 0;
  let answered = false;
  const quizIds = Object.keys(staffQuizzes);
  const position = quizIds.indexOf(id) + 1;
  const panel = byId('quiz-panel');
  const options = byId('quiz-options');
  const next = byId('quiz-next');
  const feedback = byId('quiz-feedback');
  const reflectionPrompt = byId('reflection-prompt');
  const reflectionNotes = byId('reflection-notes');

  document.title = `${quiz.title} | ${document.title}`;
  byId('quiz-title').textContent = quiz.title;
  byId('quiz-intro').textContent = quiz.introduction;
  if (reflectionPrompt && reflectionNotes) {
    reflectionPrompt.textContent = `What is one thing from ${quiz.title} you would like to discuss with your supervisor or educator?`;
  } else {
    console.warn('Reflection notes are unavailable; reload the page to update it.');
  }
  byId('quiz-progress').max = quiz.questions.length;
  for (const [label, url] of quiz.sources) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = url;
    link.textContent = label;
    item.append(link);
    byId('quiz-sources').append(item);
  }
  panel.hidden = false;

  function renderQuestion() {
    const current = quiz.questions[index];
    answered = false;
    byId('question-count').textContent = `Question ${index + 1} of ${quiz.questions.length}`;
    byId('score').textContent = `${score} correct`;
    byId('quiz-progress').value = index;
    byId('quiz-question').textContent = current.question;
    feedback.hidden = true;
    feedback.classList.remove('incorrect');
    next.disabled = true;
    next.textContent = index === quiz.questions.length - 1 ? 'See your result →' : 'Next question →';
    options.replaceChildren();
    current.answers.forEach((answer, choice) => {
      const button = document.createElement('button');
      const letter = document.createElement('span');
      const text = document.createElement('span');
      button.type = 'button';
      button.className = 'staff-option';
      letter.className = 'staff-option-letter';
      letter.setAttribute('aria-hidden', 'true');
      letter.textContent = String.fromCharCode(65 + choice);
      text.textContent = answer;
      button.append(letter, text);
      button.addEventListener('click', () => selectAnswer(choice));
      options.append(button);
    });
  }

  function selectAnswer(choice) {
    if (answered) return;
    answered = true;
    const current = quiz.questions[index];
    const correct = choice === current.correct;
    if (correct) score++;
    [...options.children].forEach((button, position) => {
      button.disabled = true;
      if (position === current.correct) button.classList.add('correct');
      else if (position === choice) button.classList.add('incorrect');
    });
    byId('score').textContent = `${score} correct`;
    byId('quiz-progress').value = index + 1;
    byId('feedback-title').textContent = correct ? 'Good reasoning' : 'A point to consider';
    byId('feedback-text').textContent = `${correct ? '' : `Suggested answer: ${current.answers[current.correct]} `}${current.explanation}`;
    feedback.classList.toggle('incorrect', !correct);
    feedback.hidden = false;
    next.disabled = false;
    next.focus();
  }

  next.addEventListener('click', () => {
    if (!answered) return;
    if (index < quiz.questions.length - 1) {
      index++;
      renderQuestion();
      byId('quiz-question').focus();
    } else {
      byId('quiz-screen').hidden = true;
      byId('quiz-result').hidden = false;
      const completion = position === quizIds.length
        ? `Congratulations! You’ve completed quiz ${position} of ${quizIds.length}.`
        : `Quiz ${position} of ${quizIds.length} complete.`;
      byId('result-score').textContent = `${completion} You chose ${score} of ${quiz.questions.length} suggested answers.`;
      byId('result-title').focus();
      if (typeof window.celebrateQuizCompletion === 'function') {
        window.celebrateQuizCompletion(position, quizIds.length);
      } else {
        console.warn('The quiz celebration could not be loaded.');
      }
    }
  });

  byId('quiz-retry').addEventListener('click', () => {
    index = 0;
    score = 0;
    if (reflectionNotes) reflectionNotes.value = '';
    byId('quiz-result').hidden = true;
    byId('quiz-screen').hidden = false;
    renderQuestion();
    byId('quiz-question').focus();
  });

  renderQuestion();
})();
