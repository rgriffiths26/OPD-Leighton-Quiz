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
- `celebration.js`: short, accessible confetti celebrations based on a quiz's position in its collection.
- `progress.js`: browser-only completion marks and latest scores, saving controls and reset across all three collections.
- `theme.css`: shared NHS blue, dark blue and pink styling inspired by the [Mid Cheshire Hospitals website](https://www.mcht.nhs.uk/).
- `theme.js`: light/dark theme selection shared across pages.

The header displays the Trust's existing combined NHS / Mid Cheshire Hospitals logo directly from its website. Decorative heart artwork also uses the Trust website's existing banner assets. These images require an internet connection; all text and quiz controls remain usable without them. Branding does not replace local work-experience approval.

## Publishing

Publish the repository root using GitHub Pages. No build step or dependencies are required. All internal links are relative, so the site works under a GitHub Pages repository subpath.

Station links use `nursing.html?station=1` through `nursing.html?station=6`. Existing homepage QR links such as `index.html?station=1` (or `?station=1` at the site root) redirect to the same station on the nursing page.

## Adding a quiz

For another quiz, add an entry with a unique ID, title, introduction, three `[heading, description]` briefing pairs in `insights`, sources and questions to the relevant collection's data file. Add a card with a matching description and challenge count in the same order to `staff-quizzes.html` linking to `staff-quiz.html?quiz=ID`, or to `placement-quizzes.html` linking to `placement-quiz.html?quiz=ID`. Include the ID in the appropriate collection in `progress.js` and add a `data-progress-quiz="COLLECTION:ID"` score badge to its card. Each question has four answers, a zero-based `correct` index and an explanation. The shared quiz interaction sets the question count from the data; update the relevant collection totals when adding questions.

The outpatient quizzes are intended for student nurses and cover placement skills as well as future nursing practice. They use England-specific NHS guidance alongside the UK-wide NMC Code. Sources are linked from each quiz; check current national guidance and Trust policies when maintaining the scenarios.

To check quiz links and question data, run `node --test` with Node.js installed.

Completed quiz IDs and the latest score for each quiz are saved by default in `localStorage` under the site-specific key `opd-leighton-quiz-progress-v1`. Retrying remains available; finishing a retry replaces the earlier score, even if the new score is lower. Starting a retry does not remove a previous result. Progress does not sync across devices and is not sent to the site owner.

A compact **Progress & scores** button on the homepage and every quiz page opens the saving controls in a pop-out. Close it with the Close button, Escape or a click outside it. Switching saving off clears all saved quiz results and retains only an off preference so subsequent pages and visits also stay opted out. Reset progress clears scores and completion marks across all three collections without changing that preference. Clearing browser site data removes both results and the preference, returning saving to its default on state. On shared devices, switch saving off before leaving. Blocked storage is reported without preventing quizzes from working.

Names, individual answers and reflection notes are never saved or submitted. All three quiz experiences include a reflection notes box; reloading, leaving or replaying a quiz clears its notes. The light/dark theme defaults to the device setting and, when changed, is saved locally in the browser.

Confetti grows with the quiz's numbered position, not completion history, and is omitted when the device requests reduced motion.