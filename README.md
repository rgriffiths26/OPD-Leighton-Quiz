# OPD-Leighton-Quiz

A static, GitHub Pages-compatible careers quiz collection.

- `index.html`: quiz-selection homepage.
- `nursing.html`: the original Nursing Shift Challenge, with all six stations and 30 questions.
- `theme.css`: shared NHS blue, dark blue and pink styling inspired by the [Mid Cheshire Hospitals website](https://www.mcht.nhs.uk/).

The header displays the Trust's existing combined NHS / Mid Cheshire Hospitals logo directly from its website. Decorative heart artwork also uses the Trust website's existing banner assets. These images require an internet connection; all text and quiz controls remain usable without them. Branding does not replace local work-experience approval.

## Publishing

Publish the repository root using GitHub Pages. No build step or dependencies are required. All internal links are relative, so the site works under a GitHub Pages repository subpath.

Station links use `nursing.html?station=1` through `nursing.html?station=6`. Existing homepage QR links such as `index.html?station=1` (or `?station=1` at the site root) redirect to the same station on the nursing page.

## Adding a quiz

Create another HTML page alongside `nursing.html`, link `theme.css`, and add a quiz card with a relative link to it in the homepage's `.quiz-list`. Use the same header and a link back to `index.html`. Replace the "Room for more discoveries" note when further quizzes are available; it is not an inactive quiz button.

Quiz answers, badges and reflection notes remain in memory only. Reloading or leaving the quiz resets them; no responses are stored or submitted.