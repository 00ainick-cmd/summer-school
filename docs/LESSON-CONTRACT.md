# Lesson Contract

The single source of truth for what a Summer Learning Program lesson is and is not. Every authoring agent reads this BEFORE opening the template. Every lesson ships ONLY after `tools/validate_lesson.cjs` reports no FAILs.

If this document and any other file disagree, this document wins.

---

## Section 1: The product position

Three statements, all true at once, all non-negotiable.

1. **Kid-independent.** A kid sits down at the lesson and finishes it without an adult in the room. Every prompt, every check, every score is auto-graded. There is no "ask a grown-up." There is no "read this out loud to a parent and have them rate you."
2. **Auto-graded.** Every signal the system records comes from a button tap or a typed exact-match answer. No free-text rubric scoring, no self-rating, no parent rubric. If the system cannot grade it without a human, it does not belong in the lesson.
3. **Missouri State Standards-aligned.** Every lesson maps to exactly one verbatim Missouri Learning Standard. The standard text appears in the lesson exactly as the state publishes it. Wording, capitalization, punctuation. Verbatim.
4. **Mastery before progression.** The dashboard does not advance the kid past a standard until Form A passes (7 of 8), 24 hours elapse, and Form B passes (7 of 8). Then and only then does the lesson's status flip to `'passed'`.

---

## Section 2: Lesson structure (the canonical flow)

Every lesson, regardless of subject or aesthetic, follows this shape:

```
hero / lab bar           <- kid name, grade, standard chip
2-4 teaching stations    <- the static page that teaches
mid-lesson practice      <- optional but encouraged interactive widget
Form A mastery check     <- 8 items, pass at 7/8
24-hour gate             <- countdown, Form B unlocks after 24h
Form B retention check   <- 8 DIFFERENT items, pass at 7/8
mastery completion       <- #masteryDone screen, kid name, scores, back-to-dashboard
```

### Hero / lab bar
A dark-ink bar at the top with: a colored dot, the lab name in italic ("Story lab," "Number lab," "Training console"), the kid's grade, and a chip on the right showing the standard code (e.g., `Standard 2.RF.3.A.a`).

### Teaching stations
Each station is a `.station` card. Two to four stations per lesson is the sweet spot. Each station teaches one chunk of the skill. The static page must teach on its own; if the kid never tapped a button, they would still have learned the skill from reading.

Stations carry numbered chips (`<span class="sno">01</span>`) and a station heading. The body of each station is grade-appropriate prose plus visual scaffolding (tables, cards, diagrams, worked examples in SVG).

### Mid-lesson interactive practice (optional but encouraged)
After the static teaching, a station that lets the kid try the skill before the mastery check. Examples that have worked:
- Tap-to-split (decoding multisyllabic words)
- Predict-then-reveal cards (number names)
- Drag-to-sort bins (rational vs irrational)
- Match word to meaning
- Place-value translator (standard / word / expanded)

The widget must be auto-graded or self-correcting. No free text. No "ask a grown-up."

### Form A mastery check
8 items pulled from the lesson's item bank. Multiple choice with 3-4 options. Pass at 7 of 8 (`PASS = 7`). On pass:
- `rec.formA = correct`
- `rec.formAPassedAt = Date.now()`
- `rec.status = 'formA-passed'`
- Call `syncCloud()`
- Show the 24-hour gate

### 24-hour gate
A countdown showing time until Form B unlocks. Computed as:
```js
var elapsed = Date.now() - rec.formAPassedAt;
var remain = (24 * 60 * 60 * 1000) - elapsed;
```
On reload, resume logic checks this state and jumps straight to the gate (skipping the lesson teaching). When `remain <= 0`, the "Start Form B" button appears.

### Form B retention check
8 different items from the same item bank, exercising the same skill. Pass at 7 of 8. On pass:
- `rec.formB = correct`
- `rec.status = 'passed'`  (NOT `'mastered'`)
- `rec.passedAt = Date.now()`
- Call `syncCloud()`
- Show the mastery completion screen

### Mastery completion (`#masteryDone`)
A green-bordered card. SVG diamond-with-checkmark badge. "You did it!" headline. Personalized message with the kid's name. Two stat cards showing Form A and Form B scores out of 8. A "Back to dashboard" button that links to `dashboard.html?kid=<kidId>`.

---

## Section 3: Hard rules (the never-break list)

Copied from `reference/BUILD-PLAN.md` and expanded.

1. **No em-dash or en-dash anywhere.** A grep for U+2014 (em-dash) and U+2013 (en-dash) must return zero. Use a period, a semicolon, or restructure the sentence. The validator catches this.
2. **One self-contained HTML file per lesson.** The only allowed external dependency is Google Fonts (`fonts.googleapis.com` and `fonts.gstatic.com`). No CDN-hosted images. No remote scripts. No stylesheet imports from anywhere else.
3. **The static page must teach.** Interaction is layered on top of teaching, never in place of it. A kid with no mouse or no touch input could still learn from the page.
4. **Objectives are the verbatim standard.** The standard text appearing under "What this lesson teaches" is copy-pasted from the Missouri Learning Standards source. Choices about title, aesthetic, recipe, and examples are labeled as choices, not as the objective.
5. **Accessibility.** AAA contrast. 44px minimum tap target. Keyboard operable (every interactive element reachable by Tab; every CTA activatable by Enter or Space). Honors `prefers-reduced-motion` by disabling all animations.
6. **No fixed viewport heights other than `100vh`.** Use flexbox with `min-height`. Geometric SVG only; no cartoons, no stock illustrations, no clip art.
7. **Mastery is auto-graded.** Form A (>=7/8) plus Form B (>=7/8) gated 24 hours after Form A. No learner self-rating UI. No `id="explainRate"`, no `id="critRate"`, no `>Met<` buttons, no `data-v="proficient"` rating. No open-ended free text. No parent-graded performance task.
8. **Status string is `'passed'`.** Not `'mastered'`. The Week 1 build proved this drift: some lessons wrote `'mastered'`, the dashboard read `'passed'`, and lessons looked incomplete. One word, one place.
9. **No version numbers in filenames.** A lesson is named by its kid, subject, day, and topic. Example: `Sam - Reading Day 1 - Decoding Multisyllabic Words.html`. No `_v2`, no `_FINAL`, no dates.

---

## Section 4: Reading level targets per grade

The Flesch-Kincaid Grade Level formula is the rough yardstick. The validator computes it on all user-visible text (stripping scripts, styles, and HTML tags). The ideal band is where the bulk of teaching prose should land. The soft cap is the absolute ceiling; above it, the validator warns.

| Grade | Ideal FK Range | Soft Cap | Notes |
| ----- | -------------- | -------- | ----- |
| G2    | 1.5 - 3.0      | 4.0      | Short sentences. Common words. Avoid "relevant," "passage," "appropriate," "demonstrate," "identify." Prefer "show," "tell," "find," "say." |
| G3    | 2.5 - 4.0      | 5.0      | Can introduce 3-4 syllable common words. "Multiply," "compare," "explain" are fine. |
| G6    | 5.0 - 7.0      | 9.0      | Middle school transitional. Compound sentences ok. |
| G7    | 5.5 - 8.0      | 10.0     | More precise academic vocabulary acceptable. |
| G8    | 6.0 - 10.0     | 12.0     | Full academic register. "Demonstrate," "evaluate," "synthesize" are fine. Avoid graduate-level abstraction. |

Grade is detected from the filename (Sam=G2, Amelia=G3, Julie=G8) or from the `STUDENT` constant in the JavaScript.

The FK check is a **WARN**, not a FAIL. Reading level is a heuristic; the validator gives the score and the target band so the author can decide. A G2 lesson coming in at FK 4.2 is a flag to revise vocabulary; FK 3.5 is borderline acceptable.

---

## Section 5: Aesthetic palette per student / subject

Each kid x subject pairing has an established aesthetic from Week 1. Stick with it; consistency is part of the brand.

### Sam Story Lab (Sam reading, Sam spelling)
- Fonts: Fraunces (display) + Newsreader (body)
- `--paper: #f6efe1` (warm cream)
- `--card: #fffdf8`
- `--ink: #2a2018`, `--ink2: #5a4a3a`
- `--accent: #b5462f` (terracotta), `--accent-d: #8c3320`
- `--alt: #5a7a4a` (forest green)
- `--good: #1f9d6b`
- Background blobs: `rgba(181,70,47,.10)`, `rgba(90,122,74,.08)`, `rgba(184,138,45,.06)`
- Lab bar label: "Story lab"

### Sam Number Lab (Sam math)
- Same paper / font family as Story Lab
- `--accent: #5a43d6` (violet) for math
- Lab bar label: "Number lab"

### Amelia Lookbook (Amelia math, Amelia reading, Amelia spelling)
- Fonts: Baloo 2 (display) + Mulish (body)
- `--paper: #f2f0fb` (cool lilac)
- `--card: #fff`
- `--ink: #1d1736`, `--ink2: #4a4566`
- `--accent: #5a43d6` (violet), `--accent-d: #3f2bb0`
- `--alt: #e0731a` (orange), `--good: #1f9d6b`
- Background blobs: `rgba(90,67,214,.10)`, `rgba(31,157,107,.08)`, `rgba(224,115,26,.06)`
- Lab bar label: "Number lab" (math) / "Story lab" (reading) / "Word lab" (spelling)

### Julie Training Console (Julie math, Julie reading, Julie spelling)
- Fonts: Anton (display) + Hanken Grotesk (body) + Spline Sans Mono (mono for codes / lab bar)
- `--paper: #f3f1ea` (warm bone)
- `--card: #fff`
- `--ink: #14171c` (near-black)
- `--accent: #ff3b14` (signal red), `--accent-d: #cf2c07`
- `--alt: #1f3b54` (navy)
- `--good: #0f7a3a`
- Grid overlay on `.bg` (graph-paper pattern)
- Background blobs: `rgba(255,59,20,.08)`, `rgba(36,81,166,.10)`, `rgba(255,200,100,.05)`
- Lab bar label: "Session NN" with mono lettering

### Science (per kid)
- Sam: muted teal accent over Story Lab base
- Amelia: teal `#1f7aa8` over Lookbook base
- Julie: lab-grade teal `#147a8a` over Training Console base

### Social Studies (per kid)
- Sam: parchment / atlas browns over Story Lab base
- Amelia: navy `#2c4a78` map atlas accent
- Julie: navy `#1f3b54` / parchment over Training Console base

When in doubt, copy the matching kid x subject pair from Week 1.

---

## Section 6: Item bank rules

Every lesson has a single item bank, 10-16 items strong, used to fill Form A (8 items) and Form B (8 items). The two forms must use DIFFERENT items so a kid who memorized Form A cannot pass Form B by recall.

### Item shape
```js
{
  q:  'The question stem text (HTML allowed for emphasis)',
  o:  ['option A', 'option B', 'option C'],   // 3 or 4 options
  a:  0,                                      // index of the correct option (0/1/2/3)
  why: 'A one-sentence explanation of WHY the correct answer is correct.'
}
```

### Rules
1. **10-16 items per bank.** Below 10, Form A and Form B overlap too much. Above 16, you are over-authoring.
2. **3 or 4 options per item.** Grade 2 leans 3, Grade 8 can use 4. Mix is fine, but every item in a single form should have the same count.
3. **One clearly correct answer.** No "best answer" subjectivity. The right answer is right; the others are wrong.
4. **Distractors come from real misconceptions.** A G3 multiplication distractor like "23,000 + 467" for the expanded form of 23,467 is great because that is what a kid who half-learned the comma rule would write. A nonsense distractor like "purple banana" is bad.
5. **Stems are complete and answerable without the options.** A kid should be able to read the stem and roughly know the answer before reading the choices. Avoid "Which of the following is true?" patterns.
6. **Vary the position of the correct answer.** The validator FAILs if any single position (a:0, a:1, a:2, a:3) accounts for more than 50% of items when total items >= 8. The Week 1 "all-A answers" bug came from authors lazily putting the right answer first every time.
7. **`why` explains the CONCEPT, not the option position.** Bad: "Option A is correct because it has 7,000." Good: "23,467 has 3 thousands; the second digit from the left sits in the thousands place."
8. **Form A and Form B between them should cover all the major sub-skills in the bank.** If the bank has items about syllable count, splitting, and digraph recognition, both forms should test all three.

---

## Section 7: Voice and tone

The lesson is talking to the kid, not over the kid's head to a parent.

### Do
- Address the kid in second person: "you" not "the student."
- Use grade-appropriate, concrete language. Show, then explain.
- Reference things kids care about, calibrated to grade:
  - G2 (Sam): Mario Kart, hockey, the playground, snacks
  - G3 (Amelia): books, parks, family, video views
  - G8 (Julie): math notation, real-world models, precision and proof
- Auto-graded prompts: multiple choice, fill-in-the-blank with exact match, definition match, drag-to-sort. All gradable by JavaScript.
- Embed reading passages on the page when the lesson needs them.

### Don't
- "Grown-up note," "Parent note," "Ask an adult."
- "Read a book," "find a sentence in any text," "go look outside" - any prompt that requires the kid to leave the page.
- Open-ended free text where a person has to score it.
- Self-rating ("how sure are you," "rate your understanding 1-3").
- Patronizing baby talk ("you're a star!"). Confidence-building, sure. Praise, no.
- Talking about the kid in the third person ("the student will...").

---

## Section 8: Required infrastructure (the lock-in)

Every lesson includes these pieces, in this order, baked in. The template is built around them; if you remove one, the validator FAILs.

1. **`<title>`** that includes the lab name and topic.
2. **Meta viewport** for mobile.
3. **Meta description** with a kid-independent summary.
4. **Google Fonts preconnect + load.**
5. **CSS variables** for `--paper`, `--card`, `--ink`, `--accent`, `--good`, `--bg-blob-1..3`.
6. **`.lesson-bg-art`** ambient drift background with `@keyframes lessonDrift1`, `lessonDrift2`, `lessonDrift3` and a `prefers-reduced-motion` override.
7. **Lab bar** with the kid's grade, standard chip, and lab label.
8. **Hero** with kicker, h1, opener, mission, and `.stdtag` containing the verbatim standard.
9. **2-4 teaching stations.**
10. **Mid-lesson practice widget** (optional).
11. **`<button id="toCheck">`** that starts Form A.
12. **Form A runner** (`#check`) with timer, progress, options, why.
13. **24-hour gate** (`#gate`) with countdown logic.
14. **Form B runner** (`#checkB`) with the same structure.
15. **Result panel** (`#result`) used between phases.
16. **Mastery completion** (`#masteryDone`) with badge, scores, and back-to-dashboard.
17. **JavaScript:**
    - Name bridge reading `?kid=` from URL, falling back to `app.activeKid`, then to a grade-matched kid.
    - `KEY`, `STUDENT`, `SUBJECT`, `DAY`, `SNAME` constants.
    - `load()` / `save()` helpers.
    - `rec` accessor on `app.progress[STUDENT][SUBJECT][DAY]`.
    - `syncCloud()` defined once, called at least three times (init, Form A pass, Form B pass).
    - `commitTime()` for time tracking on `beforeunload` and `pagehide`.
    - Form A runner: 8 items, pass at 7, writes `rec.formA` and `rec.formAPassedAt`.
    - 24-hour gate: countdown until `Date.now() - rec.formAPassedAt >= 24*60*60*1000`.
    - Form B runner: 8 different items, on pass sets `rec.status = 'passed'` and shows `#masteryDone`.
    - Resume logic: on reload, if `rec.status === 'passed'` jump to mastery; if Form A passed but Form B not, show the gate.

### The workflow

- Open `templates/lesson-template.html`.
- Copy it to a new file named in the canonical pattern: `<Kid> - <Subject> Day <N> - <Topic>.html`.
- Fill in every `TEMPLATE_SLOT` marker.
- Override `--bg-blob-1..3` and other CSS variables per Section 5.
- Test by opening in a browser (no server needed; the file is self-contained).
- Run `node tools/validate_lesson.cjs <yourfile>`.
- Resolve every FAIL. Reading-level WARNs warrant a revision pass but are not blocking.
- Only then is the lesson ready.

---

## Section 9: What's banned

The validator enforces every item in this list. Most produce a FAIL; reading-level produces a WARN.

| Banned thing | How the validator catches it |
| ------------ | ---------------------------- |
| em-dash (U+2014) | character search |
| en-dash (U+2013) | character search |
| `'mastered'` as a status string | regex on `status:'mastered'` and `'mastered'` followed by `,;)]}` |
| `id="ptDone"` | string match |
| `<textarea id="explainText">` | regex |
| "Grown-up note" / "Parent note" / `class="critrow"` | case-insensitive string match |
| Missing `id="masteryDone"` | string match |
| Missing `syncCloud()` definition | regex on `function syncCloud` |
| Fewer than 3 `syncCloud()` call sites | substring count minus definitions |
| Missing `formAPassedAt` reference | string match |
| Missing `.lesson-bg-art` element or `@keyframes lessonDrift1` | regex |
| Missing `prefers-reduced-motion` media query | regex |
| Missing name bridge (`?kid=` or `activeKid` read + `__sname` populator) | combined regex |
| External http(s) URLs outside Google Fonts | URL extraction + allowlist |
| Remote `<img src="https...">` or `<script src="https...">` | regex |
| Answer-key skew (any value > 50%) | count `a:N` patterns, check distribution |
| Missing MO standard code | regex for digit.LETTERS.X pattern |
| Reading level out of grade band | Flesch-Kincaid computation, WARN only |

Beyond the validator, these are also banned but caught by reviewer / human eye:
- Stock photos
- Cartoon characters
- Self-rating UI of any kind (`id="explainRate"`, `id="critRate"`, "Met/Approaching/Below" buttons, `data-v="proficient"`)
- Open-ended free-text inputs that aren't auto-gradable (a `<textarea>` is fine only if the lesson never grades or saves its contents)
- Fixed `height: 600px` style viewport-height declarations on body or wrap
- "Read this to a grown-up" or any prompt requiring an adult
- Any sentence with the words "performance task" or "rubric"

---

## Section 10: The authoring workflow

```
1. Read this contract end to end.
2. Read reference/BUILD-PLAN.md hard rules section.
3. Look at reference/build-manifest.json to confirm the standard
   you are about to author against and its verbatim text.
4. Copy templates/lesson-template.html to a new filename:
       <Kid> - <Subject> Day <N> - <Topic>.html
5. Fill in TEMPLATE_SLOT markers:
       - TITLE, STANDARD_CODE, STANDARD_TEXT, GRADE, SUBJECT
       - DEFAULT_STUDENT, AESTHETIC
       - STATIC_TEACH (2-4 stations)
       - INTERACTIVE_PRACTICE (one mid-lesson widget)
       - ITEM_BANK (10-16 items)
       - FORM_A_ITEMS, FORM_B_ITEMS (8 indices each)
6. Override CSS variables per Section 5 aesthetic palette.
7. Override --bg-blob-1, --bg-blob-2, --bg-blob-3 to match.
8. Override the font <link> if the aesthetic calls for a
   different display font.
9. Set the lab bar label and kicker per aesthetic.
10. Open the file in a browser. Walk through Form A and Form B.
    Verify the masteryDone screen renders.
11. Run: node tools/validate_lesson.cjs "<your file>"
12. Fix every FAIL. WARNs are advisory; a single reading-level WARN
    out by 1 grade level is acceptable; out by 3+ needs a revision.
13. Commit. No version numbers in the filename. Lesson is done.
```

---

## Appendix A: Common authoring mistakes (lessons learned from Week 1)

1. **All-A answers.** Every item had the correct answer at index 0. The "Vary the position" rule and validator check 15 exist because of this.
2. **`'mastered'` vs `'passed'`.** Lessons wrote `rec.status = 'mastered'` but the dashboard read `'passed'`. Result: lessons looked incomplete on the dashboard even when the kid had finished. One string. Standardized to `'passed'`.
3. **Missing parts of the flow.** A few lessons had Form A but no 24-hour gate. A few had no mastery completion screen. Both are now infrastructure baked into the template.
4. **Em-dashes from copy-paste.** Source standards documents and some reference materials contain em-dashes. They look fine; they break the kid-facing rule. Always grep U+2014 before commit.
5. **Drift in CSS variable names.** Some lessons used `--mute`, others `--mut`. Same color, different name. The template fixes this to `--mut`.
6. **Forgetting `?kid=` parameter handling.** A lesson opened directly worked fine, but the dashboard launches lessons with `?kid=sam` etc. Without the parameter handler, all lessons defaulted to whichever kid was hard-coded in the file.
7. **External CDN images.** A few lessons pulled images from external URLs to "save space." The validator now bans this. Self-contained means self-contained.

---

## Appendix B: Quick reference

| Constant | Value |
| -------- | ----- |
| `KEY` | `'edu.app'` |
| `PASS` (per form) | `7` of 8 |
| `QTIME` (per item) | `25` seconds |
| `GATE_MS` | `24 * 60 * 60 * 1000` |
| Status on Form A pass | `'formA-passed'` |
| Status on Form B pass | `'passed'` |
| Dashboard link template | `dashboard.html?kid=<kidId>` |

| File | Role |
| ---- | ---- |
| `templates/lesson-template.html` | The canonical skeleton. Copy, fill in slots, ship. |
| `tools/validate_lesson.cjs` | The gate. Run before commit. |
| `docs/LESSON-CONTRACT.md` | This document. The contract. |
| `reference/BUILD-PLAN.md` | The hard rules and project state. |
| `reference/build-manifest.json` | The per-standard map of what's built and what's not. |
