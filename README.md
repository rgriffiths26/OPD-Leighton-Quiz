# OPD-Leighton-Quiz

A static, GitHub Pages-compatible nursing quiz hub for careers exploration and outpatient learning.

## Scan to open the quiz hub

![QR code for the careers quiz homepage](homepage-qr.svg)

[Open the quiz hub](https://rgriffiths26.github.io/OPD-Leighton-Quiz/)

- `index.html`: quiz-selection homepage.
- `nursing.html`: the original Nursing Shift Challenge, with all six stations and 30 questions.
- `staff-quizzes.html`: Outpatient Nursing Essentials collection page.
- `staff-quiz.html`: six outpatient nursing essentials quizzes, each with a separate shareable link.
- `placement-quizzes.html` and `placement-quiz.html`: a separate collection of six student placement quizzes and their shareable links.
- `staff-quiz-data.js` and `placement-quiz-data.js`: scenarios and source links for the respective collections.
- `staff-quiz.js`: shared interaction for both collections.
- `theme.css`: shared NHS blue, dark blue and pink styling inspired by the [Mid Cheshire Hospitals website](https://www.mcht.nhs.uk/).
- `theme.js`: light/dark theme selection shared across pages.

The header displays the Trust's existing combined NHS / Mid Cheshire Hospitals logo directly from its website. Decorative heart artwork also uses the Trust website's existing banner assets. These images require an internet connection; all text and quiz controls remain usable without them. Branding does not replace local work-experience approval.

## Publishing

Publish the repository root using GitHub Pages. No build step or dependencies are required. All internal links are relative, so the site works under a GitHub Pages repository subpath.

Station links use `nursing.html?station=1` through `nursing.html?station=6`. Existing homepage QR links such as `index.html?station=1` (or `?station=1` at the site root) redirect to the same station on the nursing page.

## Adding a quiz

For another quiz, add an entry with a unique ID, title, introduction, sources and questions to the relevant collection's data file. Add a card to `staff-quizzes.html` linking to `staff-quiz.html?quiz=ID`, or to `placement-quizzes.html` linking to `placement-quiz.html?quiz=ID`. Each question has four answers, a zero-based `correct` index and an explanation. The shared quiz interaction sets the question count from the data; update the relevant collection totals when adding questions.

The outpatient quizzes are intended for student nurses and cover placement skills as well as future nursing practice. They use England-specific NHS guidance alongside the UK-wide NMC Code. Sources are linked from each quiz; check current national guidance and Trust policies when maintaining the scenarios.

To check quiz links and question data, run `node --test` with Node.js installed.

Quiz answers, badges and reflection notes remain in memory only. Reloading or leaving the quiz resets them; no responses are stored or submitted. The light/dark theme defaults to the device setting and, when changed, is saved locally in the browser.