# Build Plan and Handoff
This bundle moves the e-learning build into Claude Code. It contains the lesson engine, all builder scripts, the curriculum source, and `build-manifest.json`, a complete map of every lesson with status.
## What is built vs not (after Week 1 build)
- **Week 1 complete:** all 45 slots wired (3 students x 5 days x 3 subjects). 25 new lessons authored this batch; 20 carried over.
- Math standards total: **132**, built: **22**, to build: **110**.
- Reading: 15 built (Sam 5 G2, Amelia 5 G3, Julie 5 G8). G3/G8 ladders need standards pulled beyond Week 1.
- Science: 6 built (D1+D2 per student). G2/G3/G8 ladders need standards pulled beyond D2.
- Social Studies: 6 built (D1+D2 per student). G2/G3/G8 ladders need standards pulled beyond D2.
- Japanese: 3 built (D1 per student). Full scope still needed.
## Hard rules (never break)
- No em-dash or en-dash anywhere (grep U+2014 and U+2013 must be 0).
- One self-contained HTML file per lesson; only external dependency is Google Fonts.
- The static page must teach; interaction is layered on top.
- Objectives are the verbatim standard; design choices (title, recipe, aesthetic) are labeled as choices.
- AAA contrast, 44px tap targets, keyboard operable, honors reduced-motion.
- No fixed viewport heights; flexbox with min-height. Geometric SVG only, no cartoons.
- Mastery is gated on auto-graded Form A (>=7/8) plus a delayed Form B (>=7/8). No learner self-rating UI. No open-ended free-text response, no parent-rubric performance task. The lesson is complete after Form B passes; show a "mastery achieved" completion screen and return the kid to their dashboard.
- Save with a descriptive filename, no version numbers.
## The engine
`module_engine.py` exposes `build_module(cfg)`. It fits Grade 2 and grade-appropriate Grade 3 base-ten number work (hundreds/tens/ones block builder). It does NOT fit Grade 8 math, reading, science, social studies, or Japanese; those need their own builders.
Use `build_sam_a2.py` as the canonical CFG template. Each builder writes its HTML to `/mnt/user-data/outputs/`.
## How to run
```
python3 build_sam_batch2.py      # build a math batch
python3 hub_builder.py           # regenerate gated index pages
python3 build_hub.py             # regenerate Home Dashboards
python3 build_schedule.py        # regenerate Week 1 Schedule
python3 publish.py               # bundle learning-site.zip
python3 generate_manifest.py     # refresh this manifest
```
Note: `hub_builder.py` reads the curriculum at a hard-coded path. The source HTML is included under `sources/`; adjust the path in `hub_builder.py` if needed.
## QA gate (run before shipping any lesson)
- `grep` U+2014 and U+2013 both return 0.
- `node --check` on the concatenated `<script>` blocks parses.
- Only external deps are Google Fonts.
- `syncCloud()` appears 3 times; writes the correct `edu.app` slot.
- No rating UI (`id="explainRate"|id="critRate"|>Met<|data-v="proficient"` all 0); `id="ptDone"` absent; `<textarea id="explainText"` absent; no rubric tables with parent-grading columns; no "Grown-up note" or "Parent note" callouts; a `#masteryDone` completion screen exists and is shown after Form A + Form B both pass.
## Next work, in order (Week 2 forward)
1. Pull next-atom standards for the ladders Week 1 only scratched: Science D3+ each grade, Social Studies D3+ each grade, Japanese full ladder, Reading G3/G8 D6+.
2. Sam math Week 2: enter U4 Foundations of Multiplication (2.RA.B.2a/b/c odd/even, 2.RA.B.3 arrays). Engine needs an equal-groups + array tool.
3. Sam reading Week 2: continue E2 The Reading Process (2.R.1.A.c-e, 2.R.1.B.a-d vocabulary).
4. Amelia math Week 2: enter U2 Multiplication (3.RA.A.2-5 interpret quotients, situations; 3.RA.B.6 properties).
5. Amelia reading Week 2: 3.R.1.A.d monitor comprehension, 3.R.2.A character/plot/theme, 3.R.3.A.a author's purpose.
6. Julie math Week 2: U2 Exponents (8.EEI.A.1 integer exponents, A.2 roots, A.3 scientific notation). Each needs a bespoke G8 interactive.
7. Julie reading Week 2: 8.RI.1.A-D informational ladder, 8.RL.2.D literary devices.
8. Then continue down each ladder toward full mastery coverage.

See `build-manifest.json` for the full per-student, per-subject, per-atom map with verbatim standards, status, and output filenames.
