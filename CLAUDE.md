# Petroleum Fundamentals — Learning Workspace

## What this is

This is a long-term learning workspace for **petroleum engineering fundamentals**, driven by the "teach" skill located in `.claude/skills/teach/`. Lessons are created as HTML files in `lessons/`, reference documents in `reference/`, following the workspace layout described in the skill.

## Standing rules

### 1. Always commit and push at the end of every session

At the end of EVERY session, commit all changes and push to GitHub **without being asked**. Never leave work unpushed. The user accesses this material from other devices (including their phone), so unpushed work is effectively lost to them.

### 2. Keep index.html up to date

`index.html` at the repo root is the homepage. Whenever a new lesson or reference document is created, add a link to it in `index.html`, **newest first**, using its published GitHub Pages URL:

- Lessons: `https://evgenymostovoy.github.io/petroleum-fundamentals/lessons/<filename>.html`
- Reference docs: `https://evgenymostovoy.github.io/petroleum-fundamentals/reference/<filename>.html`

Relative links (e.g. `lessons/<filename>.html`) are preferred so the pages also work when opened locally — they resolve to the same Pages URLs when published.

### 3. The user is a learner, not a developer

Explain all technical matters (git, GitHub, files, errors) in plain language. Never assume programming knowledge. Check with the user before doing anything irreversible.
