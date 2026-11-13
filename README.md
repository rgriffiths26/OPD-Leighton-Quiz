# OPD-Leighton-Quiz

A static, GitHub Pages-compatible careers quiz collection.

## Scan to open the quiz hub

![QR code for the careers quiz homepage](homepage-qr.svg)

[Open the quiz hub](https://rgriffiths26.github.io/OPD-Leighton-Quiz/)

- `index.html`: quiz-selection homepage.
- `nursing.html`: the original Nursing Shift Challenge, with all six stations and 30 questions.
- `staff-quizzes.html`: Outpatient Nursing Essentials collection page.
- `staff-quiz.html`: six outpatient nursing quizzes, each with a separate shareable link.
- `staff-quiz-data.js` and `staff-quiz.js`: quiz scenarios, source links and shared interaction.
- `theme.css`: shared NHS blue, dark blue and pink styling inspired by the [Mid Cheshire Hospitals website](https://www.mcht.nhs.uk/).
- `theme.js`: light/dark theme selection shared across pages.

The header displays the Trust's existing combined NHS / Mid Cheshire Hospitals logo directly from its website. Decorative heart artwork also uses the Trust website's existing banner assets. These images require an internet connection; all text and quiz controls remain usable without them. Branding does not replace local work-experience approval.

## Publishing

Publish the repository root using GitHub Pages. No build step or dependencies are required. All internal links are relative, so the site works under a GitHub Pages repository subpath.

Station links use `nursing.html?station=1` through `nursing.html?station=6`. Existing homepage QR links such as `index.html?station=1` (or `?station=1` at the site root) redirect to the same station on the nursing page.

## Adding a quiz

For another outpatient nursing quiz, add an entry to `staff-quiz-data.js` with a unique ID, title, introduction, sources and questions. Add a card to `staff-quizzes.html` linking to `staff-quiz.html?quiz=ID`. Each question has four answers, a zero-based `correct` index and an explanation. The shared quiz page sets its question count from the data; update the collection totals when adding questions.

The outpatient quizzes are intended for student nurses and use England-specific NHS guidance alongside the UK-wide NMC Code. Sources are linked from each quiz; check current national guidance and Trust policies when maintaining the scenarios.

Quiz answers, badges and reflection notes remain in memory only. Reloading or leaving the quiz resets them; no responses are stored or submitted. The light/dark theme defaults to the device setting and, when changed, is saved locally in the browser.