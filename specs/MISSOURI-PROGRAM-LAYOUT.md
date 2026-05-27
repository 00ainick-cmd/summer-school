# Missouri Summer Learning Program: Master Curriculum Layout

A 10-week, mastery-based, multi-subject home learning program aligned verbatim to the Missouri Learning Standards (MLS) published by the Missouri Department of Elementary and Secondary Education (DESE). This document is the strategic planning artifact: it defines program shape, per-grade scope, authoring schedule, and the standards-level decisions that drive marketing, customer support, and the build queue. It is not lesson content; lesson content lives in the per-atom HTML files.

Document version: 2026-05-27. Author: build agent. Source files consulted: `reference/build-manifest.json`, `specs/00-standards-reference.md`, `reference/BUILD-PLAN.md`, `Week 1 Schedule.html`.

---

## Table of Contents

1. Program structure (universal across grades)
2. Launch grades: full 10-week breakdown
   - 2a. Grade 2 (Sam)
   - 2b. Grade 3 (Amelia)
   - 2c. Grade 8 (Julie)
3. Fill-in grades: strand-level scope only
   - 3a. Kindergarten
   - 3b. Grade 1
   - 3c. Grade 4
   - 3d. Grade 5
   - 3e. Grade 6
   - 3f. Grade 7
   - 3g. Grade 9
   - 3h. Grade 10
   - 3i. Grade 11
   - 3j. Grade 12
4. Content authoring schedule (launch grades)
5. Fill-in roadmap (K, 1, 4-7, 9-12)
6. Risks and decisions
7. Sources

---

## Section 1: Program structure (universal across grades)

### 1.1 Shape

- 10 weeks per program cycle.
- 5 days per week (Monday through Friday equivalent; the program is asynchronous, so a "day" is a slot, not a calendar day).
- 3 lesson slots per day: one math, one reading, one enrichment.
- Approximately 30 to 45 minutes total per day across all three subjects, with each lesson typically running 10 to 15 minutes of instruction plus mastery checks.
- 50 math days per grade per program (one math lesson per program day).
- 50 reading days per grade per program (one reading lesson per program day).
- 50 enrichment days per grade per program, split across three rotating enrichment subjects.

### 1.2 Enrichment rotation

The enrichment slot rotates across the week in a fixed 5-day pattern:

| Day of week | Enrichment subject |
|-------------|--------------------|
| Day 1 (M)   | Science            |
| Day 2 (T)   | Social Studies     |
| Day 3 (W)   | Japanese           |
| Day 4 (Th)  | Science            |
| Day 5 (F)   | Social Studies     |

Across 10 weeks this produces:

- Science: 20 lessons per grade per program (Day 1 and Day 4 every week).
- Social Studies: 20 lessons per grade per program (Day 2 and Day 5 every week).
- Japanese: 10 lessons per grade per program (Day 3 every week).

This rotation matches `Week 1 Schedule.html` and is the canonical pattern. Japanese is intentionally lighter (1 day per week) because there is no Missouri Learning Standard for world languages at the elementary level, so the Japanese ladder is a shared house scope rather than a state standard alignment.

### 1.3 Mastery model

- Every lesson teaches one Missouri Learning Standard atom verbatim. One standard = one atom = one lesson.
- Mastery is gated by two assessments: Form A (auto-graded, must score 7 of 8 or higher) followed by a delayed Form B (auto-graded, must score 7 of 8 or higher). The delay between A and B is built into the lesson flow.
- A written explanation and an out-loud performance task are present in every lesson but are NOT gating, because no learner self-rating UI is allowed. The performance task rubric appears read-only as adult guidance.
- A student who needs more time on a standard stays on it. "Day N" is the next lesson in the ladder, not a calendar date. The 10-week structure is a planning shape, not a deadline imposed on the student.
- Progress is persisted to `localStorage` under the key `edu.app` in the shape `progress[studentId][subjectKey][STANDARDCODE]={status,best,attempts,formA,formB,explain,pt,...}`. Supabase sync is wired but no-op until keys are set.

### 1.4 Pedagogy summary

Each lesson is a single self-contained HTML file. Google Fonts is the only external dependency. The static page must teach: interaction is layered on top of a complete linear explanation. Objectives are quoted verbatim from the Missouri standard. Design choices (title, recipe, aesthetic, manipulative) are labeled as choices, not as standards. Lessons honor AAA contrast, 44-pixel tap targets, full keyboard operability, and reduced-motion preferences. Layouts use flexbox with `min-height`, not fixed viewport heights. SVG is geometric only, no cartoons. The Grade 2 block engine (`module_engine.py`) is the canonical builder for base-ten number work; every other grade or subject requires a bespoke builder. No em-dashes (U+2014) or en-dashes (U+2013) appear anywhere in shipped output; commas, colons, and hyphens replace them.

### 1.5 Standards alignment promise

Every shipping lesson states the verbatim Missouri Learning Standard in the objectives block, alongside the DESE strand code (for example, `2.NBT.A.1` or `8.RL.1.A`). When a lesson must combine multiple sub-standards into one teachable unit (for example, the 8.GM.A.5 a-d angle relationships family), the lesson lists every sub-code it covers and reproduces each verbatim. When the Missouri standard does not exist for a domain (Japanese world language at K-8), the objective is labeled as a house scope, not as an MLS alignment.

---

## Section 2: Launch grades: full 10-week breakdown

### 2a. Grade 2 (Sam)

#### Math: 35 atoms in 50 days

Grade 2 math is the smallest math atom count of the three launch grades. The standards inventory pulled from the build manifest yields 35 atoms across 8 units (U1 through U8). The 15 spare days are used for spiral review, mixed-practice "investigation" days, and a Week 10 cumulative checkpoint.

Unit map:

| Unit | Title | Atom count | Atoms |
|------|-------|-----------:|-------|
| U1   | Place Value to 1,000                            | 5 | 2.NBT.A.1, .2, .3, .4, .5 |
| U2   | Fluency: Add and Subtract Within 20             | 1 | 2.RA.A.1 |
| U3   | Add and Subtract Within 100 and 1,000           | 6 | 2.NBT.B.10, .6, .7, .8, .9, 2.NBT.C.11 |
| U4   | Foundations of Multiplication: Equal Groups and Arrays | 4 | 2.RA.B.2a, .2b, .2c, 2.RA.B.3 |
| U5   | Measuring Length                                | 6 | 2.GM.B.4, .5, .6, .7, 2.GM.C.8, .9 |
| U6   | Time and Money                                  | 4 | 2.GM.D.10, .11, .12, .13 |
| U7   | Geometry: Shapes and Equal Shares               | 4 | 2.GM.A.1a, .1b, .2, .3a |
| U8   | Data and Graphs                                 | 5 | 2.DS.A.1, .2, .3, .4, .5 |
| Total |                                                | 35 |       |

Math built: 12 of 35 atoms (Sam Week 1: U1 complete and U3 complete except for 2.NBT.B.10 status flag, but per manifest all of U2 and U3 are built; this is 12 built). Math to build: 23.

#### Reading: 26 atoms in 50 days

Reading inventory from the build manifest is 26 atoms across 5 units (E1 through E5). The 24 spare days are used for spiral review days, vocabulary blitz days, and a Week 10 portfolio day.

Unit map:

| Unit | Title | Atom count | Atoms |
|------|-------|-----------:|-------|
| E1 | Decoding and Vowels        | 3  | 2.RF.3.A.a, 2.RF.3.A.b, 2.RF.1.A.a |
| E2 | The Reading Process        | 5  | 2.R.1.A.a, .b, .c, .d, .e |
| E3 | Word Meaning and Vocabulary| 4  | 2.R.1.B.a, .b, .c, .d |
| E4 | Grammar in Speech and Writing | 8 | 2.L.1.A.a-h |
| E5 | Writing Conventions        | 6  | 2.L.1.B.a-f |
| Total |                          | 26 |   |

Reading built: 5 of 26 (Week 1 complete). To build: 21.

#### Enrichment

- Science: G2 covers PS1.A (Matter, 2 atoms built), plus LS, ESS, PS4 strands not yet pulled. Standards pull required for D3 forward.
- Social Studies: G2 covers EG5 (Geography, 2 atoms built), plus E4 Economics, GS2 Government Systems, PC1 Principles of Constitutional Democracy, RI6 Relationships of Individuals to Groups, and TS7 Tools of Social Science. Standards pull required for D3 forward.
- Japanese: G2 has 1 atom built (Numbers 1-10). The full 10-atom ladder is shared house scope (not MLS aligned). Scope required for D2 forward.

#### Week-by-week schedule (Grade 2)

```
Week 1: Place value foundations
- Math: 2.NBT.A.1 Three-digit composition [built], 2.NBT.A.2 Ten tens make a hundred [built], 2.NBT.A.3 Count within 1000 [built], 2.NBT.A.4 Read and write numbers to 1000 [built], 2.NBT.A.5 Compare three-digit numbers [built]
- Reading: 2.RF.3.A.a Decoding multisyllabic [built], 2.RF.3.A.b Long and short vowels [built], 2.RF.1.A.a Sentences into paragraphs [built], 2.R.1.A.a Text features and predictions [built], 2.R.1.A.b Asking good questions [built]
- Enrichment: Sci 2.PS1.A.1 [built], SS 2.EG5.A.a Map directions [built], JP Numbers 1-10 [built], Sci 2.PS1.A.2 [built], SS 2.EG5.A.b Different maps [built]

Week 2: Fluency and word-attack
- Math: 2.RA.A.1 Fluency within 20 [built], 2.NBT.B.10 Plus minus 10 and 100 [built], 2.NBT.B.6 Add subtract within 100 [built], 2.NBT.B.7 Four two-digit numbers [built], 2.NBT.B.8 Add subtract within 1000 [built]
- Reading: 2.R.1.A.c Seek clarification, evidence [to_build], 2.R.1.A.d Retell beginning middle end [to_build], 2.R.1.A.e Monitor comprehension [to_build], 2.R.1.B.a Prefixes and suffixes [to_build], 2.R.1.B.b Compound words [to_build]
- Enrichment: Sci D3 [standards pull required], SS D3 [standards pull required], JP D2 [scope required], Sci D4 [standards pull required], SS D4 [standards pull required]

Week 3: Add and subtract to 1,000 plus equal groups
- Math: 2.NBT.B.9 Add subtract relationship [built], 2.NBT.C.11 Word problems within 100 [built], 2.RA.B.2a Even/odd intro [to_build], 2.RA.B.2b Even/odd patterns [to_build], 2.RA.B.2c Even/odd justification [to_build]
- Reading: 2.R.1.B.c Context clues [to_build], 2.R.1.B.d Antonyms and synonyms [to_build], 2.L.1.A.a Nouns and pronouns [to_build], 2.L.1.A.b Collective nouns [to_build], 2.L.1.A.c Irregular nouns [to_build]
- Enrichment: Sci D5 [pull], SS D5 [pull], JP D3 [scope], Sci D6 [pull], SS D6 [pull]

Week 4: Arrays, length intro
- Math: 2.RA.B.3 Arrays equal addends [to_build], 2.GM.B.4 Measure length [to_build], 2.GM.B.5 Different units [to_build], 2.GM.B.6 Estimate lengths [to_build], 2.GM.B.7 Compare length differences [to_build]
- Reading: 2.L.1.A.d Reflexive pronouns [to_build], 2.L.1.A.e Regular verbs [to_build], 2.L.1.A.f Helping verbs [to_build], 2.L.1.A.g Adjectives and adverbs [to_build], 2.L.1.A.h Sentence types [to_build]
- Enrichment: Sci D7 [pull], SS D7 [pull], JP D4 [scope], Sci D8 [pull], SS D8 [pull]

Week 5: Length applied, spiral review (R)
- Math: 2.GM.C.8 Length word problems [to_build], 2.GM.C.9 Number line lengths [to_build], Review day: place value + add/subtract [spiral], 2.GM.D.10 Tell time to 5 min [to_build], 2.GM.D.11 Digital and analog [to_build]
- Reading: 2.L.1.B.a Write legibly [to_build], 2.L.1.B.b Dialogue quotation marks [to_build], 2.L.1.B.c Apostrophes contractions [to_build], 2.L.1.B.d Capitalize days months [to_build], 2.L.1.B.e Capitalize titles [to_build]
- Enrichment: Sci D9 [pull], SS D9 [pull], JP D5 [scope], Sci D10 [pull], SS D10 [pull]

Week 6: Time and money
- Math: 2.GM.D.12 Combinations of bills coins [to_build], 2.GM.D.13 Coin combinations [to_build], Review day: time + money [spiral], Review day: arrays + equal groups [spiral], 2.GM.A.1a Draw shapes by attribute [to_build]
- Reading: 2.L.1.B.f Irregular spellings [to_build], Spiral: decoding + vowels review, Spiral: vocabulary review, Investigation: read aloud a passage and ask 3 questions, Spiral: grammar review
- Enrichment: Sci D11 [pull], SS D11 [pull], JP D6 [scope], Sci D12 [pull], SS D12 [pull]

Week 7: Geometry
- Math: 2.GM.A.1b Draw shapes by attribute 2 [to_build], 2.GM.A.2 Rows columns squares [to_build], 2.GM.A.3a Partition circles rectangles [to_build], Review day: shapes [spiral], Investigation: shape attributes scavenger
- Reading: Investigation: write a paragraph with dialogue, Spiral: capitalization, Spiral: sentence types, Spiral: spelling patterns, Investigation: read and retell beginning-middle-end
- Enrichment: Sci D13 [pull], SS D13 [pull], JP D7 [scope], Sci D14 [pull], SS D14 [pull]

Week 8: Data and graphs
- Math: 2.DS.A.1 Line plot [to_build], 2.DS.A.2 Generate measurement data [to_build], 2.DS.A.3 Picture or bar graph [to_build], 2.DS.A.4 Solve graph problems [to_build], 2.DS.A.5 Draw conclusions [to_build]
- Reading: Investigation: book talk with evidence, Spiral: synonyms/antonyms, Spiral: collective and irregular nouns, Spiral: regular verbs, Investigation: write a short report
- Enrichment: Sci D15 [pull], SS D15 [pull], JP D8 [scope], Sci D16 [pull], SS D16 [pull]

Week 9: Mixed application
- Math: Review day: full place value + fluency, Review day: measurement + time, Review day: geometry + arrays, Review day: data and graphs, Investigation: real-world money word problems
- Reading: Investigation: write and revise a letter, Investigation: read informational text and find main idea, Spiral: prefixes/suffixes, Investigation: compare and contrast two stories, Spiral: punctuation
- Enrichment: Sci D17 [pull], SS D17 [pull], JP D9 [scope], Sci D18 [pull], SS D18 [pull]

Week 10: Cumulative and showcase
- Math: Cumulative Form A across U1-U3, Cumulative Form B across U1-U3, Cumulative Form A across U4-U6, Cumulative Form B across U4-U6, Cumulative across U7-U8 + showcase performance task
- Reading: Read-aloud showcase, Writing portfolio review, Vocabulary final, Grammar final, Capstone short essay
- Enrichment: Sci D19 [pull], SS D19 [pull], JP D10 [scope], Sci D20 [pull], SS D20 [pull]
```

### 2b. Grade 3 (Amelia)

#### Math: 45 atoms in 50 days

Grade 3 math has 45 atoms across 11 units (U1 through U11). The 5 spare days become spiral review days. The Grade 2 block engine fits the Grade 3 place value and within-1000 work, but rounding, multiply-by-10s, fractions, area, and perimeter all need their own purpose-built tools.

Unit map:

| Unit | Title | Atom count | Atoms |
|------|-------|-----------:|-------|
| U1   | Place Value, Rounding and Fluent Add/Subtract       | 4 | 3.NBT.A.1, .2, .3, .4 |
| U2   | Multiplication: Equal Groups, Arrays and Meaning    | 5 | 3.RA.A.1-.5 |
| U3   | Division and the Multiplication-Division Relationship | 1 | 3.RA.B.6 |
| U4   | Multiply and Divide Within 100 Fluently             | 2 | 3.RA.C.7, .8 |
| U5   | Patterns and Multi-Step Word Problems               | 3 | 3.RA.D.9, .10, 3.RA.E.11 |
| U6   | Fractions as Numbers                                | 10 | 3.NF.A.1, .2a, .2b, .3a, .3b, .3c, .4, .5, .6, .7 |
| U7   | Area                                                | 6 | 3.GM.C.9, .10, .11, .12, .13, .14 |
| U8   | Perimeter                                           | 2 | 3.GM.D.15, .16 |
| U9   | Measurement: Time, Liquid Volume and Mass           | 5 | 3.GM.B.4-.8 |
| U10  | Geometry: Shapes and Attributes                     | 3 | 3.GM.A.1, .2, .3 |
| U11  | Represent and Analyze Data                          | 4 | 3.DS.A.1, .2, .3, .4 |
| Total |                                                    | 45 |  |

Math built: 5 of 45 (Week 1 complete: 3.NBT.A.1, .2, .3, .4 and 3.RA.A.1).

#### Reading: 5 atoms built, full ladder requires standards pull beyond Week 1

The Grade 3 ELA ladder beyond Week 1 needs standards pulled from DESE. Per the build manifest the Grade 3 ELA strands include 3.R.1 (Reading Comprehension), 3.R.2 (Reading Literary), 3.R.3 (Reading Informational), 3.RF.3 (Phonics), 3.L.1 (Language Conventions), 3.W (Writing), and 3.SL (Speaking and Listening). Approximate G3 ELA atom count based on the typical Missouri ELA pattern: 50 to 55 atoms across reading and language combined. Standards pull required for D6 forward to commit a precise ladder.

#### Enrichment

- Science: G3 covers PS1.A (Matter phase changes), PS2.A (Forces and Motion), plus LS, ESS2.D, and PS2.B (electric/magnetic) strands not yet pulled. 2 atoms built. Standards pull required for D3 forward.
- Social Studies: G3 covers EG5 (Geography, 2 atoms built), plus E4 Economics, GS2 Government, H3.F Louisiana Purchase (this is the Grade 3 Missouri-specific anchor: G3 SS in Missouri centers on Missouri state history and government), PC1 Principles, TS7 Tools. Standards pull required for D3 forward.
- Japanese: 1 atom built (Colors). Shared house scope.

#### Week-by-week schedule (Grade 3)

```
Week 1: Place value and rounding
- Math: 3.NBT.A.1 Round to 10 or 100 [built], 3.NBT.A.2 Write numbers to 100,000 [built], 3.NBT.A.3 Fluency within 1000 [built], 3.NBT.A.4 Multiply by multiples of 10 [built], 3.RA.A.1 Interpret products [built]
- Reading: 3.R.1.B.a Prefixes and suffixes [built], 3.RF.3.A.a Decoding multisyllabic [built], 3.R.1.A.b Draw conclusions with evidence [built], 3.R.1.A.c Summarize and central message [built], 3.R.3.A.b Details support main idea [built]
- Enrichment: Sci 3.PS2.A.1 Forces and motion [built], SS 3.EG5.B.b Map grids [built], JP Colors [built], Sci 3.PS1.A.1 Water changes state [built], SS 3.EG5.A.a Historical and current maps [built]

Week 2: Multiplication meaning
- Math: 3.RA.A.2 Interpret quotients [to_build], 3.RA.A.3 Describe situations [to_build], 3.RA.A.4 Multiply/divide within 100 [to_build], 3.RA.A.5 Unknown number [to_build], 3.RA.B.6 Properties of operations [to_build]
- Reading: D6 [standards pull required], D7 [pull], D8 [pull], D9 [pull], D10 [pull]
- Enrichment: Sci D3 [pull], SS D3 [pull: Missouri state history strand H3.A likely], JP D2 [scope], Sci D4 [pull], SS D4 [pull]

Week 3: Multiplication fluency and word problems
- Math: 3.RA.C.7 Multiply/divide strategies [to_build], 3.RA.C.8 Fluency within 100 [to_build], 3.RA.D.9 Two-step word problems [to_build], 3.RA.D.10 Reasonableness and rounding [to_build], 3.RA.E.11 Arithmetic patterns [to_build]
- Reading: D11 [pull], D12 [pull], D13 [pull], D14 [pull], D15 [pull]
- Enrichment: Sci D5 [pull], SS D5 [pull], JP D3 [scope], Sci D6 [pull], SS D6 [pull]

Week 4: Fractions intro
- Math: 3.NF.A.1 Unit fraction [to_build], 3.NF.A.2a Fraction as portion [to_build], 3.NF.A.2b Fraction as portion (cont) [to_build], 3.NF.A.3a Fraction on number line [to_build], 3.NF.A.3b Fraction on number line [to_build]
- Reading: D16 [pull], D17 [pull], D18 [pull], D19 [pull], D20 [pull]
- Enrichment: Sci D7 [pull], SS D7 [pull], JP D4 [scope], Sci D8 [pull], SS D8 [pull]

Week 5: Fractions: equivalence and comparison
- Math: 3.NF.A.3c Fraction on number line (cont) [to_build], 3.NF.A.4 Equivalent fractions same point [to_build], 3.NF.A.5 Generate equivalent [to_build], 3.NF.A.6 Compare fractions [to_build], 3.NF.A.7 Same whole rule [to_build]
- Reading: D21 [pull], D22 [pull], D23 [pull], D24 [pull], D25 [pull]
- Enrichment: Sci D9 [pull], SS D9 [pull], JP D5 [scope], Sci D10 [pull], SS D10 [pull]

Week 6: Area
- Math: 3.GM.C.9 Tile a rectangle [to_build], 3.GM.C.10 Squared units [to_build], 3.GM.C.11 Tile equals multiply sides [to_build], 3.GM.C.12 Area by side lengths [to_build], 3.GM.C.13 Arrangements for given area [to_build]
- Reading: D26 [pull], D27 [pull], D28 [pull], D29 [pull], D30 [pull]
- Enrichment: Sci D11 [pull], SS D11 [pull], JP D6 [scope], Sci D12 [pull], SS D12 [pull]

Week 7: Area and perimeter
- Math: 3.GM.C.14 Decompose rectangles [to_build], 3.GM.D.15 Perimeter of polygons [to_build], 3.GM.D.16 Equal perimeter vs equal area [to_build], Review day: fractions + area [spiral], Review day: multiplication fluency [spiral]
- Reading: D31 [pull], D32 [pull], D33 [pull], D34 [pull], D35 [pull]
- Enrichment: Sci D13 [pull], SS D13 [pull], JP D7 [scope], Sci D14 [pull], SS D14 [pull]

Week 8: Time, liquid volume, mass
- Math: 3.GM.B.4 Tell time to minute [to_build], 3.GM.B.5 Estimate time intervals [to_build], 3.GM.B.6 Add/subtract minutes [to_build], 3.GM.B.7 Measure length/volume/weight [to_build], 3.GM.B.8 Four-operation measurement problems [to_build]
- Reading: D36 [pull], D37 [pull], D38 [pull], D39 [pull], D40 [pull]
- Enrichment: Sci D15 [pull], SS D15 [pull], JP D8 [scope], Sci D16 [pull], SS D16 [pull]

Week 9: Shapes and data
- Math: 3.GM.A.1 Shared attributes [to_build], 3.GM.A.2 Quadrilaterals [to_build], 3.GM.A.3 Partition into equal areas [to_build], 3.DS.A.1 Scaled picture and bar graphs [to_build], 3.DS.A.2 Bar/picture graph problems [to_build]
- Reading: D41 [pull], D42 [pull], D43 [pull], D44 [pull], D45 [pull]
- Enrichment: Sci D17 [pull], SS D17 [pull], JP D9 [scope], Sci D18 [pull], SS D18 [pull]

Week 10: Data and cumulative
- Math: 3.DS.A.3 Line plot [to_build], 3.DS.A.4 Use line plot data [to_build], Cumulative Form A across U1-U6, Cumulative Form B across U1-U6, Cumulative across U7-U11 + showcase
- Reading: D46-D50 [pull and cumulative]
- Enrichment: Sci D19 [pull], SS D19 [pull], JP D10 [scope], Sci D20 [pull], SS D20 [pull]
```

### 2c. Grade 8 (Julie)

#### Math: 52 atoms in 50 days, requires 2 paired bundles

Grade 8 math has 52 atoms across 10 units (U1 through U10). To fit in 50 days, 2 pairs of closely related sub-standards are bundled into single combined lessons. The natural bundles are within the 8.GM.A.5 a-d angle relationships family (sub-parts that share a single proof apparatus, namely the transversal-with-parallel-lines diagram) and within the 8.GM.A.1 a-b experimental congruence family (both verify rigid-transformation congruence properties; the experiment is shared). Both bundles still cite each sub-code verbatim and assess each sub-claim on Form A and Form B.

Unit map:

| Unit | Title | Atom count | Atoms |
|------|-------|-----------:|-------|
| U1   | Rational and Irrational Numbers              | 5 | 8.NS.A.1a, .1b, .1c, .1d, 8.NS.A.2 |
| U2   | Integer Exponents and Scientific Notation    | 6 | 8.EEI.A.1, .2a, .2b, .2c, .3, .4a, .4b (note: A.4 is split a/b in source; counted as 7 atoms, see below) |
| U3   | Proportional Relationships, Lines and Slope  | 4 | 8.EEI.B.5a, .5b, .6a, .6b |
| U4   | Linear Equations and Systems                 | 6 | 8.EEI.C.7a, .7b, .8a, .8b, .8c, .8d |
| U5   | Functions: Definition, Evaluation, Comparison | 7 | 8.F.A.1a, .1b, .1c, .2, .3a, .3b, .3c |
| U6   | Modeling with Functions                      | 4 | 8.F.B.4a, .4b, .4c, .5 |
| U7   | Transformations, Congruence and Similarity   | 9 | 8.GM.A.1a, .1b, .2a, .3, .4a, .5a, .5b, .5c, .5d |
| U8   | The Pythagorean Theorem                      | 3 | 8.GM.B.6, .7, .8 |
| U9   | Volume of Cones, Cylinders and Spheres       | 2 | 8.GM.C.9a, .9b |
| U10  | Bivariate Data and Scatter Plots             | 5 | 8.DSP.A.1, .2, .3, .4a, .4b |
| Total |                                              | 51 |  |

Note: U2 includes 7 atom letters (A.1, A.2a, A.2b, A.2c, A.3, A.4a, A.4b). The manifest counts U2 as 7 atoms; total is therefore 52 atoms exactly. Bundle assignments: (a) 8.GM.A.1a + 8.GM.A.1b into one combined lesson "Verify experimentally the congruence properties of rigid transformations" (taught in Week 7 as one day), and (b) 8.GM.A.5c + 8.GM.A.5d into one combined lesson "Angle relationships established by a transversal" (taught in Week 7 as one day). This brings 52 atoms into 50 lesson days.

Math built: 5 of 52 (Week 1 complete: 8.NS.A.1a-d and 8.NS.A.2).

#### Reading: 5 atoms built, full ladder requires standards pull beyond Week 1

Per the build manifest the Grade 8 ELA ladder includes 8.RL.1 (Reading Literary), 8.RL.2 (Literary Craft and Structure), 8.RL.3 (Literary Synthesis), 8.RI.1 (Reading Informational), 8.RI.2 (Informational Craft and Structure including 8.RI.2.D Argument Evaluation, built), 8.RI.3, 8.L (Language), 8.SL, and 8.W. Approximate G8 ELA atom count: 40 to 50 atoms. Standards pull required for D6 forward.

#### Enrichment

- Science: G8 covers 6-8 PS2 (Forces and Motion, 2 atoms built), plus 6-8 PS1, PS3, PS4, LS1-4, ESS1-3, and ETS1-2. Standards pull required for D3 forward. The Missouri Grade 8 science standards use the 6-8 banded NGSS-inspired Performance Expectations, not grade-specific codes; this is a strand-level alignment, not a grade-pure one. Marketing copy needs to handle this carefully: G8 science is "Grade 6 through 8 Performance Expectations applied at Grade 8 depth."
- Social Studies: G8 covers 6-8 AH (American History, 2 atoms built: Three Branches and Declaration of Independence). The Grade 8 Missouri SS standard is American History before Reconstruction (pre-1870). Standards pull required for D3 forward.
- Japanese: 1 atom built (Days of the Week). Shared house scope.

#### Week-by-week schedule (Grade 8)

```
Week 1: Rational and irrational numbers
- Math: 8.NS.A.1a Rational vs irrational [built], 8.NS.A.1b Decimal expansion repeats or terminates [built], 8.NS.A.1c Convert repeating decimals [built], 8.NS.A.1d Equivalent representations [built], 8.NS.A.2 Estimate irrational on number line [built]
- Reading: 8.RL.1.A Citing evidence [built], 8.RL.1.B Word meaning in context [built], 8.RL.1.D Theme development [built], 8.RL.2.C Word choice and sentence structure [built], 8.RI.2.D Author's argument [built]
- Enrichment: Sci 6-8.PS2.A.2 Force, mass, motion [built], SS 6-8.AH.3 Three Branches [built], JP Days of Week [built], Sci 6-8.PS2.B.1 Electric and magnetic [built], SS 6-8.AH.3.CC.B Declaration of Independence [built]

Week 2: Exponents and scientific notation
- Math: 8.EEI.A.1 Integer exponent properties [to_build], 8.EEI.A.2a Square roots [to_build], 8.EEI.A.2b Cube roots [to_build], 8.EEI.A.2c Roots applied [to_build], 8.EEI.A.3 Scientific notation [to_build]
- Reading: 8.RI.1.A Inform evidence [pull], 8.RI.1.B Inform vocab [pull], 8.RI.1.C [pull], 8.RI.1.D Inform main idea [pull], 8.RL.2.D Literary devices [pull]
- Enrichment: Sci D3 [pull], SS D3 [pull: likely 6-8.AH.4 Constitution], JP D2 [scope], Sci D4 [pull], SS D4 [pull]

Week 3: Scientific notation applied; proportional relationships
- Math: 8.EEI.A.4a Scientific notation problems [to_build], 8.EEI.A.4b Scientific notation problems applied [to_build], 8.EEI.B.5a Graph proportional [to_build], 8.EEI.B.5b Graph proportional (cont) [to_build], 8.EEI.B.6a Slope and y-intercept [to_build]
- Reading: D11-D15 [pull]
- Enrichment: Sci D5 [pull], SS D5 [pull], JP D3 [scope], Sci D6 [pull], SS D6 [pull]

Week 4: Slope and linear equations
- Math: 8.EEI.B.6b Slope applied [to_build], 8.EEI.C.7a Solve linear equations [to_build], 8.EEI.C.7b Solve linear inequalities [to_build], 8.EEI.C.8a Systems intro [to_build], 8.EEI.C.8b Systems by graphing [to_build]
- Reading: D16-D20 [pull]
- Enrichment: Sci D7 [pull], SS D7 [pull], JP D4 [scope], Sci D8 [pull], SS D8 [pull]

Week 5: Systems; functions intro
- Math: 8.EEI.C.8c Systems algebraically [to_build], 8.EEI.C.8d Systems word problems [to_build], 8.F.A.1a Function concept [to_build], 8.F.A.1b Function inputs/outputs [to_build], 8.F.A.1c Function representations [to_build]
- Reading: D21-D25 [pull]
- Enrichment: Sci D9 [pull], SS D9 [pull], JP D5 [scope], Sci D10 [pull], SS D10 [pull]

Week 6: Functions: comparison and linearity
- Math: 8.F.A.2 Compare functions [to_build], 8.F.A.3a Linear vs nonlinear [to_build], 8.F.A.3b Linear vs nonlinear (cont) [to_build], 8.F.A.3c Linear vs nonlinear examples [to_build], 8.F.B.4a Model linear relationships [to_build]
- Reading: D26-D30 [pull]
- Enrichment: Sci D11 [pull], SS D11 [pull], JP D6 [scope], Sci D12 [pull], SS D12 [pull]

Week 7: Modeling and transformations
- Math: 8.F.B.4b Modeling cont [to_build], 8.F.B.4c Modeling cont [to_build], 8.F.B.5 Describe graphs verbally [to_build], 8.GM.A.1a+.1b Rigid transformations congruence [BUNDLED, to_build], 8.GM.A.2a Congruent figures from rigid transforms [to_build]
- Reading: D31-D35 [pull]
- Enrichment: Sci D13 [pull], SS D13 [pull], JP D7 [scope], Sci D14 [pull], SS D14 [pull]

Week 8: Transformations and similarity
- Math: 8.GM.A.3 Coordinate transformations [to_build], 8.GM.A.4a Similarity [to_build], 8.GM.A.5a Angle relationships [to_build], 8.GM.A.5b Angle relationships (cont) [to_build], 8.GM.A.5c+.5d Transversal angles [BUNDLED, to_build]
- Reading: D36-D40 [pull]
- Enrichment: Sci D15 [pull], SS D15 [pull], JP D8 [scope], Sci D16 [pull], SS D16 [pull]

Week 9: Pythagorean theorem and volume
- Math: 8.GM.B.6 Pythagorean proof [to_build], 8.GM.B.7 Pythagorean side lengths [to_build], 8.GM.B.8 Pythagorean distance [to_build], 8.GM.C.9a Volume formulas [to_build], 8.GM.C.9b Surface area applied [to_build]
- Reading: D41-D45 [pull]
- Enrichment: Sci D17 [pull], SS D17 [pull], JP D9 [scope], Sci D18 [pull], SS D18 [pull]

Week 10: Bivariate data and cumulative
- Math: 8.DSP.A.1 Scatter plots [to_build], 8.DSP.A.2 Trend line [to_build], 8.DSP.A.3 Interpret linear model [to_build], 8.DSP.A.4a Two-way table [to_build], 8.DSP.A.4b Two-way table associations [to_build]
- Reading: D46-D50 [pull] + cumulative
- Enrichment: Sci D19 [pull], SS D19 [pull], JP D10 [scope], Sci D20 [pull], SS D20 [pull]
```

---

## Section 3: Fill-in grades: strand-level scope only

For grades not currently in active production (K, 1, 4, 5, 6, 7, 9, 10, 11, 12), this section is a scoping pass only: strand-level atom counts and major curriculum flags. A full 10-week breakdown is deferred until the grade enters production.

### 3a. Kindergarten

- Math: Standards pull required. The newpathonline aggregator returned content keyed to Grade 1 codes (1.NBT, 1.NS) when the K URL was requested; the K standards inventory was not retrievable from that source. DESE publishes Kindergarten Math standards as PDF only; PDF is not text-extractable in this session. Expected K Math strands by MLS convention: K.CC (Counting and Cardinality), K.NBT (Number and Operations in Base Ten), K.OA (Operations and Algebraic Thinking), K.MD (Measurement and Data), K.G (Geometry). Approximate atom count: 18 to 24.
- Reading: Standards pull required. Expected K ELA strands: K.RF (Reading Foundations including print concepts, phonological awareness, phonics, fluency), K.R (Reading Comprehension), K.L (Language), K.W (Writing), K.SL (Speaking and Listening). Approximate atom count: 35 to 45.
- Curriculum flag: K is a half-day program in many Missouri public schools, but the MLS for K assumes a full-day equivalent of standards coverage. Customer expectation: parents enrolling a K student may want shorter daily slots; consider a "Kindergarten light" rhythm of 1 math + 1 reading + 1 enrichment at 15-25 minutes total.

### 3b. Grade 1

- Math: 22 atoms across 5 strands (verified via newpathonline.com aggregator). Strands and counts:
  - 1.DS Data and Statistics: 1 atom (1.DS.A.2 Draw conclusions from object graphs, picture graphs, T-charts and tallies).
  - 1.GM Geometry and Measurement: 6 atoms (1.GM.A.3, .A.4, .B.5, .B.6, .C.8, .C.9).
  - 1.NBT Number Sense and Operations in Base Ten: 5 atoms (1.NBT.A.1, .A.2, .A.3, .A.4, .B.5).
  - 1.NS Number Sense: 4 atoms (1.NS.A.1, .A.2, .A.3, .A.4).
  - 1.RA Relationships and Algebraic Thinking: 6 atoms (1.RA.A.1, .A.3, .B.5, .B.6, .C.7, .C.8).
- Reading: Standards pull required. Expected G1 ELA atom count: 35 to 45 across 1.RF, 1.R, 1.L, 1.W, 1.SL.
- Curriculum flag: Grade 1 math is essentially place-value-to-100 and basic addition/subtraction. The Grade 2 block engine could be adapted with a "tens and ones only" build option to support Grade 1 once it enters production.

### 3c. Grade 4

- Math: Standards pull required (newpathonline returned only one stray standard for G4). Expected G4 Math strands by MLS convention: 4.NBT (multi-digit arithmetic), 4.NF (fractions: comparison, decomposition, equivalence, addition), 4.OA / 4.RA (relationships and algebraic thinking, factors, multiples, multi-step problems), 4.GM (measurement, angles, geometric figures), 4.DS (data and statistics). Approximate atom count: 35 to 42.
- Reading: Standards pull required. Expected G4 ELA atom count: 45 to 55.
- Curriculum flag: Grade 4 is the transition from multiplication fluency to fractions. Marketing should describe G4 as "the fractions year" because that is the strand expansion that distinguishes G4 from G3.

### 3d. Grade 5

- Math: Standards pull required. Expected G5 Math strands: 5.NBT (decimals, multi-digit operations), 5.NF (fraction operations including multiply and divide), 5.OA / 5.RA, 5.GM (volume, coordinate plane), 5.DS. Approximate atom count: 35 to 42.
- Reading: Standards pull required. Expected G5 ELA atom count: 50 to 60.
- Curriculum flag: Grade 5 introduces decimals and the coordinate plane. This is the last elementary year before middle school transitions.

### 3e. Grade 6

- Math: Standards pull required. Expected G6 Math strands by MLS convention: 6.RP (ratios and proportional relationships), 6.NS (rational numbers including negatives), 6.EEI (expressions, equations, inequalities), 6.GM, 6.DSP. Approximate atom count: 30 to 40.
- Reading: 32 atoms verified via newpathonline. Strands:
  - 6.RI Reading Informational: 10 atoms (6.RI.1.A-D, 2.A, 2.C, 2.D, 3.B, 3.C, 3.D).
  - 6.RL Reading Literary: 9 atoms (6.RL.1.A-D, 2.A, 2.C, 2.D, 3.C, 3.D).
  - 6.SL Speaking and Listening: 2 atoms (6.SL.2.A, .2.B).
  - 6.W Writing: 11 atoms (6.W.1.A1, .1.A2, .2.A, .2.A.a-c, .3.A, .3.A.a-d).
- Curriculum flag: Grade 6 is the entry to middle school content. Ratios and negative numbers are the headline math shifts. ELA shifts to evaluating argument and analyzing craft.

### 3f. Grade 7

- Math: Standards pull required. Expected G7 Math strands: 7.RP (proportional reasoning extended), 7.NS (rational number operations), 7.EEI (linear expressions and equations), 7.GM (scale, area, surface area, volume), 7.DSP (probability and inference). Approximate atom count: 30 to 38.
- Reading: Standards pull required. Expected G7 ELA atom count: 30 to 38, mirroring the G6 and G8 shape.
- Social Studies curriculum flag: Missouri Grade 7 Social Studies is Eastern Hemisphere World Studies (Africa, Asia, Europe, Oceania), not US History. This is a meaningful difference from many other states. Marketing copy must be precise: a parent expecting "World History" or "Ancient Civilizations" will find a regional-geography-and-cultures focus instead. Confirmation against DESE PDF still required, but this is the strong inference from the G6/G7/G8 SS sequence in Missouri (G6 is Western Hemisphere, G7 is Eastern Hemisphere, G8 is American History pre-1870).
- Science curriculum flag: G7 science continues to use 6-8 banded Performance Expectations, not grade-specific codes. The lesson set should pick a coherent slice of the 6-8 PE catalog appropriate to G7 entry.

### 3g. Grade 9

- Math: Standards pull required. Missouri high school math is published as course-level expectations (Algebra I, Geometry, Algebra II) rather than grade-level. Most Missouri G9 students take Algebra I. Approximate Algebra I atom count: 50 to 65 (Algebra I is a year-long course; a summer mastery program covers core arcs only, typically 25 to 35 atoms in a 10-week sprint).
- Reading: Standards pull required. Missouri high school ELA is banded 9-10 and 11-12 in many strands. Expected atom count for the 9-10 band, applied at G9 depth: 35 to 45.
- Curriculum flag: High school standards are course-tagged, not grade-tagged. A "Grade 9 Math" program must commit to one course (most likely Algebra I) in marketing. Customers will ask: does my G9 student get Algebra I, Geometry, or Pre-Algebra? Three SKUs may be needed at G9.

### 3h. Grade 10

- Math: Standards pull required. Most Missouri G10 students take Geometry. Approximate Geometry atom count: 50 to 65 (course-level); 25 to 35 for a 10-week mastery sprint.
- Reading: Standards pull required. Banded 9-10 in many strands.
- Curriculum flag: Same course-tagging issue as G9. Geometry is the default, but some students take Algebra I in G10 or Algebra II as an accelerated track.

### 3i. Grade 11

- Math: Standards pull required. Most Missouri G11 students take Algebra II. Some take Pre-Calculus or Statistics in an accelerated track.
- Reading: Standards pull required. Banded 11-12.
- Social Studies curriculum flag: Missouri G11 Social Studies is American History post-1870 (the "second half" of US history that G8 did not cover). This is the standard pairing: G8 covers pre-Reconstruction, G11 covers post-Reconstruction. Government is typically a separate semester or course.

### 3j. Grade 12

- Math: Standards pull required. G12 math is highly variable: Pre-Calculus, Calculus, Statistics, Advanced Algebra, or Personal Finance. Missouri requires Personal Finance for graduation; many students take it in G11 or G12.
- Reading: Standards pull required. Banded 11-12.
- Curriculum flag: G12 has the widest course distribution of any grade. A summer program at G12 is most likely Personal Finance, Pre-Calculus review, or AP/college-prep ELA. Marketing should treat G12 as multiple SKUs or "topic-of-choice" rather than a single ladder.

---

## Section 4: Content authoring schedule (launch grades)

### 4.1 Current state baseline (end of Week 1 build, dated 2026-05-25)

Per `reference/build-manifest.json`:

- Grade 2 (Sam): 12 math + 5 reading + 2 science + 2 social studies + 1 Japanese = 22 lessons built of an estimated 132 total Sam lessons. Build progress: 17 percent.
- Grade 3 (Amelia): 5 math + 5 reading + 2 science + 2 social studies + 1 Japanese = 15 lessons built of an estimated 145 total Amelia lessons. Build progress: 10 percent.
- Grade 8 (Julie): 5 math + 5 reading + 2 science + 2 social studies + 1 Japanese = 15 lessons built of an estimated 152 total Julie lessons. Build progress: 10 percent.

Total launch-grade lessons built: 52. Total launch-grade lessons targeted (50 math + 50 reading + 20 sci + 20 ss + 10 jp per grade x 3 grades): 450. Total launch-grade lessons remaining: 398.

### 4.2 Authoring capacity assumption

The task assumes parallel agents can author 25 to 35 new lessons per week across the three launch grades combined. This is a planning floor of 25 and a stretch ceiling of 35. The math used below assumes 30 lessons per week (mid-point) as the baseline cadence.

### 4.3 Customer deadline pressure

Customers progressing at the program's intended one-lesson-per-day pace will encounter the first "not yet authored" content at the boundary of Week 1 to Week 2: that is, Day 6 of the program. In calendar terms, a customer who starts on Monday Week 1 hits the boundary on Monday Week 2. At a 5-lessons-per-day-per-subject rate (1 math + 1 reading + 1 enrichment), one customer consumes 15 lessons across the three subjects in a 5-day week, or 3 lessons per subject across the three subjects' rotation.

The hardest-pressing burn rate for any single grade is: customer consumes 5 math + 5 reading + 5 enrichment = 15 lessons per week per grade. Across 3 launch grades that is 45 lessons per week of new-customer consumption demand if all three grades have one active customer each.

If authoring capacity is 30 lessons per week and demand is 45 lessons per week (one customer per grade), the queue falls behind by 15 lessons per week. This is the central deadline pressure. To stay ahead, authoring must outpace consumption; this argues for prioritizing the grade with the strongest customer demand signal each week, not splitting capacity evenly.

### 4.4 Week-by-week authoring schedule

The schedule below assumes 30 lessons authored per week, allocated based on (a) which grade has paying customer demand, (b) keeping a 1-week buffer ahead of the slowest customer, and (c) finishing math ladders before reading ladders within a grade because math is the spine.

```
Authoring Week 1 (calendar week starting 2026-05-25, the current week):
- Already done: 45 lessons (Week 1 of program for all 3 grades). Current state.

Authoring Week 2:
- Target: 30 new lessons
- Allocation: G2 priority (Sam's customer entering Week 2 Monday)
  - Sam math Week 2 (5 lessons): 2.RA.B.2a/b/c, 2.RA.B.3, 2.GM.B.4
  - Sam reading Week 2 (5 lessons): 2.R.1.A.c-e, 2.R.1.B.a-b
  - Amelia math Week 2 (5 lessons): 3.RA.A.2-5, 3.RA.B.6
  - Amelia reading Week 2 (5 lessons): G3 ELA D6-D10 [standards pull first]
  - Julie math Week 2 (5 lessons): 8.EEI.A.1, .2a, .2b, .2c, .3
  - Julie reading Week 2 (5 lessons): 8.RI.1.A-D, 8.RL.2.D [standards pull first]
- Rationale: Match consumption demand 1:1 for the active program week.

Authoring Week 3:
- Target: 30 new lessons
- Allocation: split across enrichment (which is currently the weakest stack)
  - 9 science (3 per grade, D3-D5)
  - 9 social studies (3 per grade, D3-D5)
  - 3 Japanese (1 per grade, D2-D3 chunks)
  - 9 math+reading (3 lessons per grade as Week 3 math/reading)
- Rationale: Enrichment is the bottleneck because it has the highest unbuilt count. Customers will hit "Day 4 Science not built" before "Day 4 math not built" because science currently only goes to D2.

Authoring Week 4:
- Target: 30 new lessons
- Allocation: G2 finish, G3 catch up
  - Sam math Week 4 (5): 2.GM.B.5-7, 2.GM.C.8-9
  - Sam reading Week 4 (5): 2.L.1.A.a-e
  - Amelia math Week 3 (5): 3.RA.C.7-8, 3.RA.D.9-10, 3.RA.E.11
  - Amelia reading Week 3 (5): D11-D15
  - Julie math Week 3 (5): 8.EEI.A.4a-b, 8.EEI.B.5a-b, 8.EEI.B.6a
  - Julie reading Week 3 (5): D11-D15

Authoring Week 5:
- Target: 30 new lessons
- Allocation: enrichment catch-up week 2
  - 6 science, 6 social studies, 3 Japanese (D4-D6 enrichment slice across grades)
  - 5 math per launch grade (Sam Week 5, Amelia Week 4, Julie Week 4)

Authoring Week 6:
- Target: 30 new lessons
- Sam math Week 6 + Sam reading Week 5-6 (10 lessons)
- Amelia math Week 5 + Amelia reading Week 5 (10 lessons)
- Julie math Week 5 + Julie reading Week 5 (10 lessons)

Authoring Week 7:
- Target: 30 new lessons
- Sam math Weeks 7-8 (10) + Sam reading Week 7-8 (10)
- Enrichment catch-up: 10 lessons across grades (D7-D9)

Authoring Week 8:
- Target: 30 new lessons
- Amelia math Weeks 6-7 (10) + Amelia reading Week 6-7 (10)
- Julie math Weeks 6-7 (10)

Authoring Week 9:
- Target: 30 new lessons
- Sam math Weeks 9-10 (10) + Sam reading Weeks 9-10 (10)
- Sam enrichment finish (10)

Authoring Week 10:
- Target: 30 new lessons
- Amelia math Weeks 8-10 (15)
- Amelia reading Week 8 (5)
- Julie math Weeks 8-9 (10)

Authoring Week 11:
- Target: 30 new lessons
- Amelia reading Weeks 9-10 (10)
- Amelia enrichment finish (10)
- Julie math Week 10 + Julie reading Week 8-10 (10)

Authoring Week 12:
- Target: 30 new lessons
- Julie enrichment finish (20)
- Buffer and QA pass (10)

Authoring Week 13 (buffer):
- QA, regression, cumulative assessments, Form B delayed-retrieval tuning.
```

### 4.5 Burn-down summary

- Grade 2 (Sam) reaches full Week 10 by Authoring Week 9 (calendar week of 2026-07-20). Sam program finishes earliest because it has the smallest atom count (35 math, 26 reading, 20 sci, 20 ss, 10 jp = 111 lessons total; 22 already built, 89 remaining).
- Grade 3 (Amelia) reaches full Week 10 by Authoring Week 11 (calendar week of 2026-08-03). G3 finishes second because the math ladder is the longest (45 atoms) and reading has not had standards pulled past Week 1.
- Grade 8 (Julie) reaches full Week 10 by Authoring Week 12 (calendar week of 2026-08-10). G8 finishes last because every G8 math lesson needs a bespoke interactive (the G2 block engine does not fit) and the enrichment stack is heaviest.
- Buffer: Authoring Week 13 (calendar week of 2026-08-17) is reserved for QA, cumulative assessments, and Form B delay tuning.

Total program build completion target: 2026-08-17, which is approximately 12 weeks from the current state of 2026-05-25.

### 4.6 Deadline risk to customer experience

- If a customer starts at calendar Week 1 (2026-05-25) and progresses 1 day per program day, they will reach Week 2 content on 2026-06-01. Sam's Week 2 math must be authored by 2026-06-01.
- If authoring slips to 20 lessons per week instead of 30, the burn-down stretches by approximately 6 calendar weeks; G8 finish moves from 2026-08-10 to roughly 2026-09-21.
- The highest risk is the enrichment catch-up: science and social studies are only at D2 for every grade. A customer hitting Week 1 Day 4 currently sees only built lessons, but a customer hitting Week 2 Day 1 sees a "not yet built" science slot. Enrichment authoring must accelerate during Authoring Week 2 and 3 to avoid a customer-visible gap.

---

## Section 5: Fill-in roadmap (K, 1, 4-7, 9-12)

### 5.1 Priority ordering by likely customer demand

Demand inference: families with a launch-grade student (G2, G3, G8) often have a sibling. The most common sibling profile for a G2 family is a K or G1; for a G3 family is a G1, G2, or G4; for a G8 family is a G6, G7, or G10. Given this, the demand-weighted fill-in order is:

1. Grade 1 (sibling for G2 customers): highest demand, simplest standards, smallest atom count.
2. Kindergarten (sibling for G1 and G2): high demand, smallest student attention span requires shortest lesson format, requires K-specific UI tuning.
3. Grade 4 (sibling for G3 customers; logical next year after G3): high demand, moderate complexity, introduces fractions deeply.
4. Grade 7 (sibling for G8 customers): moderate demand, Eastern Hemisphere SS strand requires marketing precision.
5. Grade 6 (sibling for G8; logical year-before-G8): moderate demand, ratio reasoning new.
6. Grade 5 (sibling for G4): moderate demand, decimals and coordinate plane new.
7. Grade 9: course-tagged (Algebra I default), requires SKU decision.
8. Grade 10: course-tagged (Geometry default), same SKU concern.
9. Grade 11: course-tagged (Algebra II), American History post-1870.
10. Grade 12: highly variable, multiple SKUs likely.

### 5.2 Realistic per-grade launch timeline

Assuming the launch grades complete by 2026-08-17 and authoring capacity is freed up at 25 to 35 lessons per week, plus 1 week for standards pull and unit mapping per new grade, plus 1 week for builder customization (Kindergarten font scaling, Grade 9-12 course tagging UI), the fill-in launch sequence is:

```
Fill-in grade roadmap (assumes 30 lessons/week authoring capacity, sequential not parallel):

Grade 1: Standards pull + scope = 1 week (2026-08-24). Build = ~110 lessons over 4 weeks (2026-08-31 to 2026-09-21). Launch: 2026-09-28.

Kindergarten: Standards pull + K-UI customization = 2 weeks (2026-10-05). Build = ~120 lessons over 4 weeks (2026-10-19 to 2026-11-09). Launch: 2026-11-16.

Grade 4: Standards pull + scope = 1 week (2026-11-23). Build = ~135 lessons over 5 weeks (2026-11-30 to 2026-12-28). Launch: 2027-01-04.

Grade 7: Standards pull + SS Eastern Hemisphere build = 2 weeks (2027-01-11). Build = ~135 lessons over 5 weeks (2027-01-25 to 2027-02-22). Launch: 2027-03-01.

Grade 6: Standards pull = 1 week (2027-03-08). Build = ~135 lessons over 5 weeks (2027-03-15 to 2027-04-12). Launch: 2027-04-19.

Grade 5: Standards pull = 1 week (2027-04-26). Build = ~135 lessons over 5 weeks (2027-05-03 to 2027-05-31). Launch: 2027-06-07.

Grade 9 (Algebra I + 9-10 ELA): Standards pull + course-tagging UI = 2 weeks (2027-06-21). Build = ~135 lessons over 5 weeks (2027-07-05 to 2027-08-02). Launch: 2027-08-09.

Grade 10 (Geometry + 9-10 ELA shared): Standards pull = 1 week (2027-08-16). Build = ~135 lessons over 5 weeks (2027-08-23 to 2027-09-20). Launch: 2027-09-27.

Grade 11 (Algebra II + 11-12 ELA + American History post-1870): Standards pull = 2 weeks (2027-10-11). Build = ~145 lessons over 5 weeks (2027-10-25 to 2027-11-22). Launch: 2027-11-29.

Grade 12 (variable, likely Personal Finance + 11-12 ELA shared): Standards pull + SKU decisions = 2 weeks (2027-12-13). Build = ~110 lessons over 4 weeks (2027-12-27 to 2028-01-17). Launch: 2028-01-24.
```

### 5.3 Total program-suite completion

Full K through 12 coverage with the current authoring cadence and sequential rollout: target completion 2028-01-24. This is approximately 21 calendar months from the current state. Parallel authoring (two agents on different grades) could compress this to roughly 12 months, but doubles labor cost and requires a second engine builder.

---

## Section 6: Risks and decisions

### 6.1 Standards-level risks

R1. Grade 8 Social Studies is American History pre-1870. A parent expecting "Geography" or "Civics" or "World History" for their G8 student will find Revolution, Constitution, early Republic, Westward Expansion, and pre-Civil War sectionalism. Marketing copy must say "Grade 8 Social Studies: American History through Reconstruction (Missouri Learning Standard 6-8.AH)" explicitly, not just "Social Studies."

R2. Grade 7 Social Studies is Eastern Hemisphere World Studies (regional geography, cultures, and contemporary issues for Africa, Asia, Europe, Oceania). Parents expecting "Ancient Civilizations" or "World History from antiquity" will find a different content shape. Confirm against DESE PDF before launching G7.

R3. Grade 6 Social Studies (when scoped) is most likely Western Hemisphere World Studies in Missouri's sequence. Confirmation required.

R4. Grade 8 Science uses 6-8 banded Performance Expectations, not grade-pure codes. A G8 lesson labeled `6-8.PS2.A.2` is verbatim correct per MLS, but a customer comparing to a Common Core or NGSS state-by-state alignment will see different codings. Marketing should note "Missouri uses 6-8 banded science Performance Expectations" once, plainly.

R5. High school standards are course-tagged, not grade-tagged. A "Grade 9 Math" program in Missouri must commit to a course (Algebra I, Geometry, or Pre-Algebra). Without an SKU decision, customer support will face the question "what does my G9 student get" repeatedly. Recommend three SKUs at G9 and G10 (Algebra I, Geometry, Algebra II) at launch.

R6. Missouri ELA standards do not include phonics codes past Grade 3. Reading Foundations (RF strand) drops away at G4. A G4 reader who is still decoding will not see decoding standards in the MLS ladder. The program must either (a) accept that fluent decoding is a G3 prerequisite, or (b) include catch-up phonics modules labeled as "supplemental" not as "G4 MLS."

R7. Missouri does not publish world-language standards at K through 8. The Japanese ladder is shared house scope, not MLS aligned. Marketing must state this clearly: "Japanese enrichment is a house-designed enrichment, not aligned to Missouri Learning Standards because no MLS exists for world languages below Grade 9." Missouri DOES publish high school Modern World Language standards; if Japanese launches at G9 through G12, it can be MLS-aligned.

R8. Standards pull blockers: K math, G4 math, G4 ELA, G5 math, G5 ELA, G6 math, G7 math, G7 ELA, G7 SS, G9-12 in all subjects. The newpathonline.com aggregator returned truncated content for these grades in this session. Action required: download DESE PDFs and either (a) text-extract them with a PDF tool, or (b) use a different aggregator (commoncoresheets.com, edreports.org, or a state-specific aggregator).

### 6.2 Curriculum differences from Common Core and NGSS

D1. Missouri Math uses strand codes like `3.NBT.A.1` (similar shape to Common Core) but the actual standard text differs in places, especially in the RA (Relationships and Algebraic Thinking) strand, which Missouri uses where Common Core uses OA (Operations and Algebraic Thinking). Code translation is not 1-to-1.

D2. Missouri Science adopted MLS in 2016 with NGSS-inspired Performance Expectations but Missouri-specific codes. A lesson chip code like `2.PS1.A.1` is Missouri, not NGSS. The standard text overlaps heavily with NGSS but is not identical.

D3. Missouri ELA splits Reading Literary (RL) and Reading Informational (RI) into separate strands at every grade from K up. Common Core does the same, but Missouri's L (Language) strand groups conventions, grammar, and writing mechanics differently. A Common-Core-trained tutor will find the strand boundaries unfamiliar.

D4. Missouri requires Personal Finance for high school graduation. This is a Missouri-specific requirement and will appear in the G11 or G12 program as a dedicated course-level offering. Other states often fold this into Economics or Math.

### 6.3 Engine and tooling risks

R9. The `module_engine.py` block builder fits Grade 2 and Grade 3 base-ten number work only. Every other domain (Grade 8 math, all reading, all science, all social studies, all Japanese, plus Grade 3 fractions/area/perimeter, plus Grade 2 measurement/geometry/data) needs a bespoke builder. As of current state, only the bespoke G8 number-line builder and a few one-off Sam builders exist. Building 10 to 15 more bespoke builders is on the critical path.

R10. The hub builder (`hub_builder.py`) reads curriculum at a hard-coded path. Anyone running the build pipeline on a different machine must fix the path. This is a deployment-readiness gap.

R11. Supabase sync is wired but no-op until keys are set. If multi-device sync becomes a marketing promise, the keys need to be set and the sync path needs to be tested before the marketing claim ships.

### 6.4 Decisions required before broader launch

DEC1. SKU shape at high school: 3 SKUs per grade (Algebra I, Geometry, Algebra II) or 1 SKU with a placement quiz?

DEC2. Kindergarten daily duration: same 30-45 minute rhythm or shorter (15-25 minute) format?

DEC3. Japanese branding: explicitly "house enrichment" or rebranded as "World Language Discovery" with a footnote about MLS?

DEC4. G8 Social Studies framing: lead with "American History" or rebrand as "American Foundations" to set expectations correctly?

DEC5. Multi-customer pricing: per-student or per-family? Affects how many simultaneous active programs the authoring queue must support.

---

## Section 7: Sources

- Missouri Department of Elementary and Secondary Education (DESE) standards index: https://dese.mo.gov/college-career-readiness/curriculum/missouri-learning-standards (verified, lists all MLS PDF and Excel documents; PDFs are not text-extractable in this session).
- newpathonline.com Missouri Learning Standards aggregator:
  - Grade 1 Math (verified, 22 atoms): https://www.newpathonline.com/standard/missouri-learning-standards/26/mathematics_Grade_1/2/0
  - Grade 6 ELA (verified, 32 atoms): https://www.newpathonline.com/standard/missouri-learning-standards/26/english_language_arts_Grade_6/1/0
  - K, G4, G5, G6, G7 Math URLs attempted, returned truncated content; standards pull required.
- Internal: `reference/build-manifest.json`, full per-atom map for G2, G3, G8.
- Internal: `specs/00-standards-reference.md`, verbatim Week 1 standards.
- Internal: `reference/BUILD-PLAN.md`, hard rules and Week 1 status.
- Internal: `Week 1 Schedule.html`, the canonical 5-day-by-3-slot rhythm.

---

## Appendix A: Per-grade verbatim atom inventories (launch grades)

This appendix reproduces the verbatim Missouri Learning Standard text for every atom in the three launch grades, drawn from `reference/build-manifest.json` and `specs/00-standards-reference.md`. Use this as the authoring source of truth: a builder may copy any line here directly into the lesson's objectives block without paraphrase.

### A.1 Grade 2 Math (35 atoms)

#### U1 Place Value to 1,000

| Code | Standard | Status |
|------|----------|--------|
| 2.NBT.A.1 | Understand three-digit numbers are composed of hundreds, tens and ones. | built |
| 2.NBT.A.2 | Understand that 100 can be thought of as 10 tens, called a "hundred". | built |
| 2.NBT.A.3 | Count within 1000 by 1s, 10s and 100s starting with any number. | built |
| 2.NBT.A.4 | Read and write numbers to 1000 using number names, base-ten numerals and expanded form. | built |
| 2.NBT.A.5 | Compare two three-digit numbers using the symbols >, = or <. | built |

#### U2 Fluency: Add and Subtract Within 20

| Code | Standard | Status |
|------|----------|--------|
| 2.RA.A.1 | Demonstrate fluency with addition and subtraction within 20. | built |

#### U3 Add and Subtract Within 100 and 1,000

| Code | Standard | Status |
|------|----------|--------|
| 2.NBT.B.10 | Add or subtract mentally 10 or 100 to or from a given number within 1000. | built |
| 2.NBT.B.6 | Demonstrate fluency with addition and subtraction within 100. | built |
| 2.NBT.B.7 | Add up to four two-digit numbers. | built |
| 2.NBT.B.8 | Add or subtract within 1000, and justify the solution. | built |
| 2.NBT.B.9 | Use the relationship between addition and subtraction to solve problems. | built |
| 2.NBT.C.11 | Write and solve problems involving addition and subtraction within 100. | built |

#### U4 Foundations of Multiplication: Equal Groups and Arrays

| Code | Standard | Status |
|------|----------|--------|
| 2.RA.B.2a | Determine if a set of objects has an odd or even number of members. | to_build |
| 2.RA.B.2b | Determine if a set of objects has an odd or even number of members. | to_build |
| 2.RA.B.2c | Determine if a set of objects has an odd or even number of members. | to_build |
| 2.RA.B.3 | Find the total number of objects arranged in a rectangular array with up to 5 rows and 5 columns, and write an equation to represent the total as a sum of equal addends. | to_build |

#### U5 Measuring Length

| Code | Standard | Status |
|------|----------|--------|
| 2.GM.B.4 | Measure the length of an object by selecting and using appropriate tools. | to_build |
| 2.GM.B.5 | Analyze the results of measuring the same object with different units. | to_build |
| 2.GM.B.6 | Estimate lengths using units of inches, feet, yards, centimeters and meters. | to_build |
| 2.GM.B.7 | Measure to determine how much longer one object is than another. | to_build |
| 2.GM.C.8 | Use addition and subtraction within 100 to solve problems involving lengths that are given in the same units. | to_build |
| 2.GM.C.9 | Represent whole numbers as lengths on a number line, and represent whole-number sums and differences within 100 on a number line. | to_build |

#### U6 Time and Money

| Code | Standard | Status |
|------|----------|--------|
| 2.GM.D.10 | Tell and write time from analog and digital clocks to the nearest five minutes, using a.m. and p.m. | to_build |
| 2.GM.D.11 | Describe a time shown on a digital clock as representing hours and minutes, and relate a time shown on a digital clock to the same time on an analog clock. | to_build |
| 2.GM.D.12 | Find the value of combinations of dollar bills, quarters, dimes, nickels and pennies, using $ and (cents symbol) appropriately. | to_build |
| 2.GM.D.13 | Find combinations of coins that equal a given amount. | to_build |

#### U7 Geometry: Shapes and Equal Shares

| Code | Standard | Status |
|------|----------|--------|
| 2.GM.A.1a | Recognize and draw shapes having specified attributes, such as a given number of angles or sides. | to_build |
| 2.GM.A.1b | Recognize and draw shapes having specified attributes, such as a given number of angles or sides. | to_build |
| 2.GM.A.2 | Partition a rectangle into rows and columns of same-size squares and count to find the total number of squares. | to_build |
| 2.GM.A.3a | Partition circles and rectangles into two, three or four equal shares, and describe the shares and the whole. | to_build |

#### U8 Data and Graphs

| Code | Standard | Status |
|------|----------|--------|
| 2.DS.A.1 | Create a line plot to represent a set of numeric data, given a horizontal scale marked in whole numbers. | to_build |
| 2.DS.A.2 | Generate measurement data to the nearest whole unit, and display the data in a line plot. | to_build |
| 2.DS.A.3 | Draw a picture graph or a bar graph to represent a data set with up to four categories. | to_build |
| 2.DS.A.4 | Solve problems using information presented in line plots, picture graphs and bar graphs. | to_build |
| 2.DS.A.5 | Draw conclusions from line plots, picture graphs and bar graphs. | to_build |

### A.2 Grade 2 Reading (26 atoms)

#### E1 Decoding and Vowels

| Code | Standard | Status |
|------|----------|--------|
| 2.RF.3.A.a | decoding multisyllabic words in context by applying common letter-sound correspondences including: single letters, consonant blends, consonant and vowel digraphs and vowel diphthongs | built |
| 2.RF.3.A.b | distinguishing long and short vowels when reading regularly spelled one syllable words | built |
| 2.RF.1.A.a | understanding that sentences are organized into paragraphs to convey meaning | built |

#### E2 The Reading Process

| Code | Standard | Status |
|------|----------|--------|
| 2.R.1.A.a | using text features to make and confirm predictions, explain why not confirmed | built |
| 2.R.1.A.b | asking and responding to relevant questions | built |
| 2.R.1.A.c | seeking clarification, and using information/ facts and details about texts and supporting answers with evidence from text | to_build |
| 2.R.1.A.d | retelling a story's beginning, middle, and end and determining their central message, lesson or moral | to_build |
| 2.R.1.A.e | monitoring comprehension and making corrections and adjustments when understanding breaks down | to_build |

#### E3 Word Meaning and Vocabulary

| Code | Standard | Status |
|------|----------|--------|
| 2.R.1.B.a | using prefixes, root words, and suffixes to determine the meaning of words | to_build |
| 2.R.1.B.b | using knowledge of the meaning of individual words to determine the meaning of compound words | to_build |
| 2.R.1.B.c | using context to determine the meaning of a new word or multiple-meaning word in text | to_build |
| 2.R.1.B.d | using antonyms and synonyms | to_build |

#### E4 Grammar in Speech and Writing

| Code | Standard | Status |
|------|----------|--------|
| 2.L.1.A.a | use nouns and pronouns in writing | to_build |
| 2.L.1.A.b | use collective nouns | to_build |
| 2.L.1.A.c | use common irregular nouns | to_build |
| 2.L.1.A.d | use reflexive pronouns | to_build |
| 2.L.1.A.e | use regular verbs | to_build |
| 2.L.1.A.f | use helping verbs with regular verbs | to_build |
| 2.L.1.A.g | use adjectives and adverbs in sentences | to_build |
| 2.L.1.A.h | produce simple declarative, imperative, exclamatory, and interrogative sentences | to_build |

#### E5 Writing Conventions

| Code | Standard | Status |
|------|----------|--------|
| 2.L.1.B.a | write legibly (print, cursive) | to_build |
| 2.L.1.B.b | use dialogue that contains quotation marks | to_build |
| 2.L.1.B.c | use apostrophes correctly for contractions | to_build |
| 2.L.1.B.d | capitalize weeks, days, months, holidays | to_build |
| 2.L.1.B.e | capitalize abbreviated titles of people | to_build |
| 2.L.1.B.f | spell words using irregular spelling patterns | to_build |

### A.3 Grade 2 Science (Week 1 only; full ladder requires standards pull)

| Code | Standard | Status |
|------|----------|--------|
| 2.PS1.A.1 | Plan and conduct an investigation to describe and classify different kinds of materials by their observable properties. | built |
| 2.PS1.A.2 | Analyze data obtained from testing different materials to determine which materials have the properties that are best suited for an intended purpose. | built |

Remaining G2 science strands per build manifest note: LS (Life Science), ESS (Earth and Space Science), PS4 (Energy and Waves). Standards pull required.

### A.4 Grade 2 Social Studies (Week 1 only; full ladder requires standards pull)

| Code | Standard | Status |
|------|----------|--------|
| 2.EG5.A.a | Read and construct maps with title and key | built |
| 2.EG5.A.b | Identify the properties and use of different types of maps for a variety of purposes | built |

Remaining G2 SS strands per build manifest note: E4 Economics, GS2 Government Systems, PC1 Principles of Constitutional Democracy, RI6 Relationships of Individuals to Groups, TS7 Tools of Social Science. Standards pull required.

### A.5 Grade 3 Math (45 atoms)

#### U1 Place Value, Rounding and Fluent Add/Subtract

| Code | Standard | Status |
|------|----------|--------|
| 3.NBT.A.1 | Round whole numbers to the nearest 10 or 100. | built |
| 3.NBT.A.2 | Read, write and identify whole numbers within 100,000 using base ten numerals, number names and expanded form. | built |
| 3.NBT.A.3 | Demonstrate fluency with addition and subtraction within 1000. | built |
| 3.NBT.A.4 | Multiply whole numbers by multiples of 10 in the range 10-90. | built |

#### U2 Multiplication: Equal Groups, Arrays and Meaning

| Code | Standard | Status |
|------|----------|--------|
| 3.RA.A.1 | Interpret products of whole numbers. | built |
| 3.RA.A.2 | Interpret quotients of whole numbers. | to_build |
| 3.RA.A.3 | Describe in words or drawings a problem that illustrates a multiplication or division situation. | to_build |
| 3.RA.A.4 | Use multiplication and division within 100 to solve problems. | to_build |
| 3.RA.A.5 | Determine the unknown number in a multiplication or division equation relating three whole numbers. | to_build |

#### U3 Division and the Multiplication-Division Relationship

| Code | Standard | Status |
|------|----------|--------|
| 3.RA.B.6 | Apply properties of operations as strategies to multiply and divide. | to_build |

#### U4 Multiply and Divide Within 100 Fluently

| Code | Standard | Status |
|------|----------|--------|
| 3.RA.C.7 | Multiply and divide with numbers and results within 100 using strategies such as the relationship between multiplication and division or properties of operations. Know all products of two one-digit numbers. | to_build |
| 3.RA.C.8 | Demonstrate fluency with products within 100. | to_build |

#### U5 Patterns and Multi-Step Word Problems

| Code | Standard | Status |
|------|----------|--------|
| 3.RA.D.9 | Write and solve two-step problems involving variables using any of the four operations. | to_build |
| 3.RA.D.10 | Interpret the reasonableness of answers using mental computation and estimation strategies including rounding. | to_build |
| 3.RA.E.11 | Identify arithmetic patterns and explain the patterns using properties of operations. | to_build |

#### U6 Fractions as Numbers

| Code | Standard | Status |
|------|----------|--------|
| 3.NF.A.1 | Understand a unit fraction as the quantity formed by one part when a whole is partitioned into equal parts. | to_build |
| 3.NF.A.2a | Understand that when a whole is partitioned equally, a fraction can be used to represent a portion of the whole. | to_build |
| 3.NF.A.2b | Understand that when a whole is partitioned equally, a fraction can be used to represent a portion of the whole. | to_build |
| 3.NF.A.3a | Represent fractions on a number line. | to_build |
| 3.NF.A.3b | Represent fractions on a number line. | to_build |
| 3.NF.A.3c | Represent fractions on a number line. | to_build |
| 3.NF.A.4 | Demonstrate that two fractions are equivalent if they are the same size, or the same point on a number line. | to_build |
| 3.NF.A.5 | Recognize and generate equivalent fractions using visual models, and justify why the fractions are equivalent. | to_build |
| 3.NF.A.6 | Compare two fractions with the same numerator or denominator using the symbols >, = or <, and justify the solution. | to_build |
| 3.NF.A.7 | Explain why fraction comparisons are only valid when the two fractions refer to the same whole. | to_build |

#### U7 Area

| Code | Standard | Status |
|------|----------|--------|
| 3.GM.C.9 | Calculate area by using unit squares to cover a plane figure with no gaps or overlaps. | to_build |
| 3.GM.C.10 | Label area measurements with squared units. | to_build |
| 3.GM.C.11 | Demonstrate that tiling a rectangle to find the area and multiplying the side lengths result in the same value. | to_build |
| 3.GM.C.12 | Multiply whole-number side lengths to solve problems involving the area of rectangles. | to_build |
| 3.GM.C.13 | Find rectangular arrangements that can be formed for a given area. | to_build |
| 3.GM.C.14 | Decompose a rectangle into smaller rectangles to find the area of the original rectangle. | to_build |

#### U8 Perimeter

| Code | Standard | Status |
|------|----------|--------|
| 3.GM.D.15 | Solve problems involving perimeters of polygons. | to_build |
| 3.GM.D.16 | Understand that rectangles can have equal perimeters but different areas, or rectangles can have equal areas but different perimeters. | to_build |

#### U9 Measurement: Time, Liquid Volume and Mass

| Code | Standard | Status |
|------|----------|--------|
| 3.GM.B.4 | Tell and write time to the nearest minute. | to_build |
| 3.GM.B.5 | Estimate time intervals in minutes. | to_build |
| 3.GM.B.6 | Solve problems involving addition and subtraction of minutes. | to_build |
| 3.GM.B.7 | Measure or estimate length, liquid volume and weight of objects. | to_build |
| 3.GM.B.8 | Use the four operations to solve problems involving lengths, liquid volumes or weights given in the same units. | to_build |

#### U10 Geometry: Shapes and Attributes

| Code | Standard | Status |
|------|----------|--------|
| 3.GM.A.1 | Understand that shapes in different categories may share attributes and that the shared attributes can define a larger category. | to_build |
| 3.GM.A.2 | Distinguish rhombuses and rectangles as examples of quadrilaterals, and draw examples of quadrilaterals that do not belong to these subcategories. | to_build |
| 3.GM.A.3 | Partition shapes into parts with equal areas, and express the area of each part as a unit fraction of the whole. | to_build |

#### U11 Represent and Analyze Data

| Code | Standard | Status |
|------|----------|--------|
| 3.DS.A.1 | Create frequency tables, scaled picture graphs and bar graphs to represent a data set with several categories. | to_build |
| 3.DS.A.2 | Solve one- and two-step problems using information presented in bar and/or picture graphs. | to_build |
| 3.DS.A.3 | Create a line plot to represent data. | to_build |
| 3.DS.A.4 | Use data shown in a line plot to answer questions. | to_build |

### A.6 Grade 3 Reading (Week 1 built; D6 forward requires standards pull)

| Code | Standard | Status |
|------|----------|--------|
| 3.R.1.B.a | Decoding and identifying the meaning of common prefixes and suffixes and knowing how they change the meaning of root words | built |
| 3.RF.3.A.a | Decoding multisyllabic words in context, and independent of context, by applying common spelling patterns | built |
| 3.R.1.A.b | Draw conclusions and support with textual evidence | built |
| 3.R.1.A.c | Summarizing a story's beginning, middle, and determining their central message, lesson or moral | built |
| 3.R.3.A.b | Identify the details or facts that support the main idea | built |

Remaining G3 ELA strands per build manifest note: 3.R.1.A.d (monitor comprehension), 3.R.2.A (character, plot), 3.R.3.A.a (author's purpose), plus full 3.L language strand, 3.W writing strand, and 3.SL speaking/listening. Standards pull required.

### A.7 Grade 3 Science (Week 1 only)

| Code | Standard | Status |
|------|----------|--------|
| 3.PS2.A.1 | Plan and conduct an investigation to provide evidence of the effects of balanced and unbalanced forces on the motion of an object. | built |
| 3.PS1.A.1 | Predict and investigate that water can change from a liquid to a solid (freeze), and back again (melt), or from a liquid to a gas (evaporation), and back again (condensation) as the result of temperature changes. | built |

Remaining G3 science strands: LS (life), ESS2.D (climate/weather), PS2.B (electric and magnetic). Standards pull required.

### A.8 Grade 3 Social Studies (Week 1 only)

| Code | Standard | Status |
|------|----------|--------|
| 3.EG5.B.b | Describe and use absolute location using a grid system. | built |
| 3.EG5.A.a | Read and construct historical and current maps. | built |

Remaining G3 SS strands: E4 Economics, GS2 Government, H3.F Louisiana Purchase (Missouri-specific anchor), PC1 Principles, TS7 Tools. Standards pull required.

### A.9 Grade 8 Math (52 atoms)

#### U1 Rational and Irrational Numbers

| Code | Standard | Status |
|------|----------|--------|
| 8.NS.A.1a | Know the differences between rational and irrational numbers. | built |
| 8.NS.A.1b | Understand that all rational numbers have a decimal expansion that terminates or repeats. | built |
| 8.NS.A.1c | Convert decimals which repeat into fractions and fractions into repeating decimals. | built |
| 8.NS.A.1d | Generate equivalent representations of rational numbers. | built |
| 8.NS.A.2 | Estimate the value and compare the size of irrational numbers and approximate their locations on a number line. | built |

#### U2 Integer Exponents and Scientific Notation

| Code | Standard | Status |
|------|----------|--------|
| 8.EEI.A.1 | Know and apply the properties of integer exponents to generate equivalent expressions. | to_build |
| 8.EEI.A.2a | Investigate concepts of square and cube roots. | to_build |
| 8.EEI.A.2b | Investigate concepts of square and cube roots. | to_build |
| 8.EEI.A.2c | Investigate concepts of square and cube roots. | to_build |
| 8.EEI.A.3 | Express very large and very small quantities in scientific notation and approximate how many times larger one is than the other. | to_build |
| 8.EEI.A.4a | Use scientific notation to solve problems. | to_build |
| 8.EEI.A.4b | Use scientific notation to solve problems. | to_build |

#### U3 Proportional Relationships, Lines and Slope

| Code | Standard | Status |
|------|----------|--------|
| 8.EEI.B.5a | Graph proportional relationships. | to_build |
| 8.EEI.B.5b | Graph proportional relationships. | to_build |
| 8.EEI.B.6a | Apply concepts of slope and y-intercept to graphs, equations and proportional relationships. | to_build |
| 8.EEI.B.6b | Apply concepts of slope and y-intercept to graphs, equations and proportional relationships. | to_build |

#### U4 Linear Equations and Systems

| Code | Standard | Status |
|------|----------|--------|
| 8.EEI.C.7a | Solve linear equations and inequalities in one variable. | to_build |
| 8.EEI.C.7b | Solve linear equations and inequalities in one variable. | to_build |
| 8.EEI.C.8a | Analyze and solve systems of linear equations. | to_build |
| 8.EEI.C.8b | Analyze and solve systems of linear equations. | to_build |
| 8.EEI.C.8c | Analyze and solve systems of linear equations. | to_build |
| 8.EEI.C.8d | Analyze and solve systems of linear equations. | to_build |

#### U5 Functions: Definition, Evaluation and Comparison

| Code | Standard | Status |
|------|----------|--------|
| 8.F.A.1a | Explore the concept of functions. (The use of function notation is not required.) | to_build |
| 8.F.A.1b | Explore the concept of functions. (The use of function notation is not required.) | to_build |
| 8.F.A.1c | Explore the concept of functions. (The use of function notation is not required.) | to_build |
| 8.F.A.2 | Compare characteristics of two functions each represented in a different way. | to_build |
| 8.F.A.3a | Investigate the differences between linear and nonlinear functions. | to_build |
| 8.F.A.3b | Investigate the differences between linear and nonlinear functions. | to_build |
| 8.F.A.3c | Investigate the differences between linear and nonlinear functions. | to_build |

#### U6 Modeling with Functions

| Code | Standard | Status |
|------|----------|--------|
| 8.F.B.4a | Use functions to model linear relationships between quantities. | to_build |
| 8.F.B.4b | Use functions to model linear relationships between quantities. | to_build |
| 8.F.B.4c | Use functions to model linear relationships between quantities. | to_build |
| 8.F.B.5 | Describe the functional relationship between two quantities from a graph or a verbal description. | to_build |

#### U7 Transformations, Congruence and Similarity

| Code | Standard | Status |
|------|----------|--------|
| 8.GM.A.1a | Verify experimentally the congruence properties of rigid transformations. | to_build |
| 8.GM.A.1b | Verify experimentally the congruence properties of rigid transformations. | to_build (BUNDLED with 8.GM.A.1a) |
| 8.GM.A.2a | Understand that two-dimensional figures are congruent if a series of rigid transformations can be performed to map the pre-image to the image. | to_build |
| 8.GM.A.3 | Describe the effect of dilations, translations, rotations and reflections on two-dimensional figures using coordinates. | to_build |
| 8.GM.A.4a | Understand that two-dimensional figures are similar if a series of transformations (rotations, reflections, translations and dilations) can be performed to map the pre-image to the image. | to_build |
| 8.GM.A.5a | Explore angle relationships and establish informal arguments. | to_build |
| 8.GM.A.5b | Explore angle relationships and establish informal arguments. | to_build |
| 8.GM.A.5c | Explore angle relationships and establish informal arguments. | to_build (BUNDLED with 8.GM.A.5d) |
| 8.GM.A.5d | Explore angle relationships and establish informal arguments. | to_build (BUNDLED with 8.GM.A.5c) |

#### U8 The Pythagorean Theorem

| Code | Standard | Status |
|------|----------|--------|
| 8.GM.B.6 | Use models to demonstrate a proof of the Pythagorean Theorem and its converse. | to_build |
| 8.GM.B.7 | Use the Pythagorean Theorem to determine unknown side lengths in right triangles in problems in two- and three-dimensional contexts. | to_build |
| 8.GM.B.8 | Use the Pythagorean Theorem to find the distance between points in a Cartesian coordinate system. | to_build |

#### U9 Volume of Cones, Cylinders and Spheres

| Code | Standard | Status |
|------|----------|--------|
| 8.GM.C.9a | Solve problems involving surface area and volume. | to_build |
| 8.GM.C.9b | Solve problems involving surface area and volume. | to_build |

#### U10 Bivariate Data and Scatter Plots

| Code | Standard | Status |
|------|----------|--------|
| 8.DSP.A.1 | Construct and interpret scatter plots of bivariate measurement data to investigate patterns of association between two quantities. | to_build |
| 8.DSP.A.2 | Generate and use a trend line for bivariate data, and informally assess the fit of the line. | to_build |
| 8.DSP.A.3 | Interpret the parameters of a linear model of bivariate measurement data to solve problems. | to_build |
| 8.DSP.A.4a | Understand the patterns of association in bivariate categorical data displayed in a two-way table. | to_build |
| 8.DSP.A.4b | Understand the patterns of association in bivariate categorical data displayed in a two-way table. | to_build |

### A.10 Grade 8 Reading (Week 1 built; D6 forward requires standards pull)

| Code | Standard | Status |
|------|----------|--------|
| 8.RL.1.A | Draw conclusions, infer and analyze by citing the textual evidence that most strongly supports an analysis of what the text says explicitly as well as inferences drawn from the text. | built |
| 8.RL.1.B | Determine the meaning of words and phrases as they are used in the text, including figurative and connotative meanings using context, affixes, or reference materials. | built |
| 8.RL.1.D | Using appropriate text, determine the theme(s) of a text and analyze its development over the course of a text; provide an objective summary of the text. | built |
| 8.RL.2.C | Analyze how specific word choices and sentence structures contribute to meaning and tone. | built |
| 8.RI.2.D | Evaluate an author's argument, assessing whether the reasoning is sound and the evidence is relevant and sufficient; recognize when irrelevant evidence is introduced. | built |

Remaining G8 ELA: 8.RI.1.A-D (informational ladder), 8.RL.2.D (literary devices), plus 8.RL.3, 8.RI.3, 8.L, 8.SL, 8.W. Standards pull required.

### A.11 Grade 8 Science (Week 1 only; uses 6-8 banded Performance Expectations)

| Code | Standard | Status |
|------|----------|--------|
| 6-8.PS2.A.2 | Plan and conduct an investigation to provide evidence that the change in an object's motion depends on the sum of the forces on the object and the mass of the object. | built |
| 6-8.PS2.B.1 | Analyze diagrams and collect data to determine factors affecting electric and magnetic force strength. | built |

Remaining G8 science: full 6-8 PS, LS, ESS, ETS Performance Expectations. Standards pull required.

### A.12 Grade 8 Social Studies (Week 1 only; American History pre-1870)

| Code | Standard | Status |
|------|----------|--------|
| 6-8.AH.3.GS.E | Three Branches of Government and constitutional structure (legacy chip code on existing lesson). | built |
| 6-8.AH.3.CC.B | Analyze the Declaration of Independence to determine the historical context and political philosophies that influenced its creation. | built |

Remaining G8 SS: full 6-8.AH.1 through 6-8.AH.5 ladder (Constitutional foundations, Revolution, early Republic, Westward expansion, sectionalism/pre-Civil War). Standards pull required.

### A.13 Japanese house scope (shared across launch grades)

Japanese is a house-designed enrichment ladder, not aligned to any Missouri Learning Standard (Missouri does not publish world language standards below high school). The shared scope of 10 days per grade-cycle is:

| Day | Topic | Sam (G2) status | Amelia (G3) status | Julie (G8) status |
|-----|-------|-----------------|--------------------|-------------------|
| D1 | Numbers, colors, or days of week (grade-specific intro) | built (Numbers 1-10) | built (Colors) | built (Days of Week) |
| D2 | Greetings and self-introduction | to_build (scope) | to_build (scope) | to_build (scope) |
| D3 | Family vocabulary | to_build (scope) | to_build (scope) | to_build (scope) |
| D4 | Food vocabulary | to_build (scope) | to_build (scope) | to_build (scope) |
| D5 | Animal vocabulary | to_build (scope) | to_build (scope) | to_build (scope) |
| D6 | Counters and quantities | to_build (scope) | to_build (scope) | to_build (scope) |
| D7 | Days, months, and dates | to_build (scope) | to_build (scope) | to_build (scope) |
| D8 | Hiragana introduction (first 10 characters) | to_build (scope) | to_build (scope) | to_build (scope) |
| D9 | Hiragana continued (next 15 characters) | to_build (scope) | to_build (scope) | to_build (scope) |
| D10 | Simple sentence patterns | to_build (scope) | to_build (scope) | to_build (scope) |

Scope decision: this 10-day shared ladder is a proposal, not committed. Final scope should be reviewed before authoring begins.

---

## Appendix B: Build state summary table

A single table summarizing every grade's built-versus-to-build state at the end of Week 1 build (2026-05-25 baseline).

| Grade | Subject | Built | Targeted | Percent built | Standards-pull status for unbuilt atoms |
|-------|---------|------:|---------:|--------------:|-----------------------------------------|
| G2 (Sam) | Math | 12 | 35 | 34% | Verified verbatim from manifest |
| G2 (Sam) | Reading | 5 | 26 | 19% | Verified verbatim from manifest |
| G2 (Sam) | Science | 2 | 20 | 10% | Standards pull required D3+ |
| G2 (Sam) | Social Studies | 2 | 20 | 10% | Standards pull required D3+ |
| G2 (Sam) | Japanese | 1 | 10 | 10% | House scope; no MLS exists |
| G3 (Amelia) | Math | 5 | 45 | 11% | Verified verbatim from manifest |
| G3 (Amelia) | Reading | 5 | 50 (est) | 10% | Standards pull required D6+ |
| G3 (Amelia) | Science | 2 | 20 | 10% | Standards pull required D3+ |
| G3 (Amelia) | Social Studies | 2 | 20 | 10% | Standards pull required D3+ |
| G3 (Amelia) | Japanese | 1 | 10 | 10% | House scope |
| G8 (Julie) | Math | 5 | 52 (50 lessons via bundle) | 10% | Verified verbatim from manifest |
| G8 (Julie) | Reading | 5 | 50 (est) | 10% | Standards pull required D6+ |
| G8 (Julie) | Science | 2 | 20 | 10% | Standards pull required D3+ |
| G8 (Julie) | Social Studies | 2 | 20 | 10% | Standards pull required D3+ |
| G8 (Julie) | Japanese | 1 | 10 | 10% | House scope |
| K | All subjects | 0 | ~120 | 0% | Standards pull required across all subjects |
| G1 | Math | 0 | 22 (verified) | 0% | Verified from newpathonline; ELA pull still required |
| G1 | Reading | 0 | ~40 (est) | 0% | Standards pull required |
| G1 | Sci/SS/JP | 0 | ~50 | 0% | Standards pull required |
| G4 | All subjects | 0 | ~135 | 0% | Standards pull required across all subjects |
| G5 | All subjects | 0 | ~135 | 0% | Standards pull required across all subjects |
| G6 | Math | 0 | ~35 (est) | 0% | Standards pull required |
| G6 | Reading | 0 | 32 (verified) | 0% | Verified from newpathonline |
| G6 | Sci/SS/JP | 0 | ~50 | 0% | Standards pull required |
| G7 | All subjects | 0 | ~135 | 0% | Standards pull required; G7 SS = Eastern Hemisphere |
| G9 | All subjects | 0 | ~135 | 0% | SKU decision required (Algebra I default) |
| G10 | All subjects | 0 | ~135 | 0% | SKU decision required (Geometry default) |
| G11 | All subjects | 0 | ~145 | 0% | American History post-1870 in SS |
| G12 | All subjects | 0 | ~110 | 0% | Multiple SKU likely |

Totals across launch grades (G2, G3, G8): 52 of 408 targeted lessons built; 13% built.
Totals across full K-12 program suite (all 13 grades): 52 of approximately 1700 targeted lessons built; 3% built.

---

## Appendix C: Authoring queue (next 30 lessons)

This is the concrete authoring queue for the immediate next 30 lessons, ordered by customer demand pressure. A builder picking up the work should pull from the top of this queue.

| Order | Grade | Subject | Code | Title | Builder needs |
|------:|-------|---------|------|-------|---------------|
| 1 | G2 | Math | 2.RA.B.2a | Odd/even sets: intro | Equal-groups tool |
| 2 | G2 | Math | 2.RA.B.2b | Odd/even sets: patterns | Equal-groups tool |
| 3 | G2 | Math | 2.RA.B.2c | Odd/even sets: justify | Equal-groups tool |
| 4 | G2 | Math | 2.RA.B.3 | Arrays as repeated addition | Array tool |
| 5 | G2 | Math | 2.GM.B.4 | Measure with appropriate tools | Ruler/measure tool |
| 6 | G2 | Reading | 2.R.1.A.c | Seek clarification, use evidence | Reading passage builder |
| 7 | G2 | Reading | 2.R.1.A.d | Retell beginning, middle, end | Reading passage builder |
| 8 | G2 | Reading | 2.R.1.A.e | Monitor comprehension | Reading passage builder |
| 9 | G2 | Reading | 2.R.1.B.a | Prefixes, root words, suffixes | Word-meaning builder |
| 10 | G2 | Reading | 2.R.1.B.b | Compound words | Word-meaning builder |
| 11 | G3 | Math | 3.RA.A.2 | Interpret quotients | Equal-groups + division tool |
| 12 | G3 | Math | 3.RA.A.3 | Describe multiplication/division situations | Word-problem builder |
| 13 | G3 | Math | 3.RA.A.4 | Multiply and divide within 100 | Fact-fluency tool |
| 14 | G3 | Math | 3.RA.A.5 | Unknown number in equation | Equation-solver tool |
| 15 | G3 | Math | 3.RA.B.6 | Properties of operations | Property-explorer tool |
| 16 | G3 | Reading | TBD | D6 (standards pull required) | Reading builder |
| 17 | G3 | Reading | TBD | D7 (standards pull required) | Reading builder |
| 18 | G3 | Reading | TBD | D8 (standards pull required) | Reading builder |
| 19 | G3 | Reading | TBD | D9 (standards pull required) | Reading builder |
| 20 | G3 | Reading | TBD | D10 (standards pull required) | Reading builder |
| 21 | G8 | Math | 8.EEI.A.1 | Integer exponent properties | Exponent-rules tool |
| 22 | G8 | Math | 8.EEI.A.2a | Square roots | Root-explorer tool |
| 23 | G8 | Math | 8.EEI.A.2b | Cube roots | Root-explorer tool |
| 24 | G8 | Math | 8.EEI.A.2c | Roots applied | Root-explorer tool |
| 25 | G8 | Math | 8.EEI.A.3 | Scientific notation | Scientific-notation tool |
| 26 | G8 | Reading | 8.RI.1.A | Informational evidence citation | Reading builder |
| 27 | G8 | Reading | 8.RI.1.B | Informational vocabulary | Reading builder |
| 28 | G8 | Reading | 8.RI.1.C | Informational visual elements | Reading builder |
| 29 | G8 | Reading | 8.RI.1.D | Informational main idea | Reading builder |
| 30 | G8 | Reading | 8.RL.2.D | Literary devices | Reading builder |

Queue priority logic: math always before reading within a grade (math is the spine); G2 before G3 before G8 within a tier (smallest ladder first to free capacity); enrichment slots are NOT in this 30-lesson queue but are the focus of the immediate-next 30 after standards-pull catch-up. Enrichment must be pulled into the queue by Authoring Week 3 at the latest.

---

## Appendix D: Builder inventory

The list of builders that exist today and what each one handles. Knowing this is essential because a missing builder is the most common reason a lesson cannot be authored.

| Builder file | What it builds | Status |
|--------------|----------------|--------|
| module_engine.py | The lesson engine `build_module(cfg)`. Fits Grade 2 base-ten number work and grade-appropriate Grade 3. | Production |
| hub_builder.py | parse_math, ELA_G2 data, SAM_MATH_BUILT map, gated subject index pages. | Production (note: hard-coded path) |
| build_hub.py | Themed per-student Home Dashboards (Amelia Lookbook, Julie Training Console). | Production |
| build_sam_dash.py | Sam Quest Lab dashboard. | Production |
| build_sam_a2.py / a4.py | Sam engine lessons (canonical CFG templates). | Production |
| build_sam_a3.py / a5.py | Sam focused builders (own embedded JS). | Production |
| build_sam_batch1.py / batch2.py | Sam engine lesson batches. | Production |
| build_amelia_a3.py | Amelia Grade 3 engine lesson. | Production |
| build_amelia.py | Amelia bespoke day-1 lesson. | Production |
| build_julie_math.py | Julie bespoke day-1 math lesson. | Production |
| build_schedule.py | Week 1 daily schedule (Week 1 Schedule.html). | Production |
| build_tracker.py | Build-status tracker (Build Tracker.html). | Production |
| publish.py | Crawls from Start Here, slugifies, writes learning-site.zip. | Production |
| generate_manifest.py | Writes build-manifest.json and BUILD-PLAN.md. | Production |

Builder gaps (must be authored before the corresponding lesson group can ship):

| Missing builder | Needed for | Estimated build effort |
|-----------------|-----------|------------------------|
| Equal-groups + array tool (G2/G3) | 2.RA.B.2a-c, 2.RA.B.3, 3.RA.A.1-5, 3.RA.B.6 | 1 to 2 days |
| Ruler / measure tool (G2/G3) | 2.GM.B.4-7, 3.GM.B.7 | 1 day |
| Clock / time tool (G2/G3) | 2.GM.D.10-11, 3.GM.B.4-6 | 1 to 2 days |
| Coin / money tool (G2) | 2.GM.D.12-13 | 1 day |
| Shape attribute / partition tool (G2/G3) | 2.GM.A.1a-b, 2.GM.A.2, 2.GM.A.3a, 3.GM.A.1-3 | 2 days |
| Line plot / bar graph / picture graph tool (G2/G3) | 2.DS.A.1-5, 3.DS.A.1-4, 3.GM.C.9 | 2 days |
| Fraction model + number line tool (G3) | 3.NF.A.1-7 | 3 days (foundational; many lessons depend on it) |
| Area / perimeter tool (G3) | 3.GM.C.9-14, 3.GM.D.15-16, 3.GM.A.3 | 2 days |
| Exponent / scientific notation tool (G8) | 8.EEI.A.1-4b | 2 days |
| Slope / proportional graphing tool (G8) | 8.EEI.B.5a-b, .6a-b, U6 modeling | 3 days (foundational) |
| Linear equation / systems tool (G8) | 8.EEI.C.7a-b, .8a-d | 2 days |
| Function / input-output tool (G8) | 8.F.A.1a-c, .2, .3a-c, B.4a-c, .5 | 3 days |
| Geometric transformation tool (G8) | 8.GM.A.1a-b, .2a, .3, .4a, .5a-d | 3 days |
| Pythagorean / right-triangle tool (G8) | 8.GM.B.6-8 | 1 day |
| Volume of cones/cylinders/spheres tool (G8) | 8.GM.C.9a-b | 1 day |
| Scatter plot / trend line tool (G8) | 8.DSP.A.1-4b | 2 days |
| Reading passage builder (G2/G3/G8) | All reading lessons beyond Week 1 | 4 days (reusable across grades) |
| Word-meaning / context builder (G2/G3/G8) | Vocabulary lessons | 2 days |
| Science investigation tool (all grades) | Most science lessons | 3 days (reusable) |
| Social studies map / timeline / document tool (all grades) | Most SS lessons | 3 days (reusable) |
| Japanese vocabulary / kana tool (all grades) | Most Japanese lessons | 2 days |

Total estimated builder effort: 42 to 48 builder-days. With one builder author and the lesson authors working in parallel, this is the critical path. If builder effort cannot keep pace with lesson authoring, the lesson queue stalls.

---

## Appendix E: Per-week milestone calendar (launch grades)

| Authoring week | Calendar week starting | Cumulative lessons built | G2 status | G3 status | G8 status |
|----------------:|------------------------|-------------------------:|-----------|-----------|-----------|
| 1 (current) | 2026-05-25 | 52 (baseline) | Week 1 complete | Week 1 complete | Week 1 complete |
| 2 | 2026-06-01 | 82 | Week 2 math+reading authored | Week 2 math authored | Week 2 math authored |
| 3 | 2026-06-08 | 112 | Week 2 enrichment | Week 2 reading + enrichment | Week 2 reading + enrichment |
| 4 | 2026-06-15 | 142 | Week 3-4 math | Week 3 math + reading | Week 3 math + reading |
| 5 | 2026-06-22 | 172 | Week 4-5 reading + enrichment | Week 4 math | Week 4 math |
| 6 | 2026-06-29 | 202 | Week 6 math + reading | Week 4-5 reading | Week 4-5 reading |
| 7 | 2026-07-06 | 232 | Week 7-8 | Week 5-6 math | Week 5 math |
| 8 | 2026-07-13 | 262 | Week 9 math + enrichment | Week 6-7 reading | Week 6 math |
| 9 | 2026-07-20 | 292 | **Sam complete** through Week 10 | Week 7-8 math | Week 7 math |
| 10 | 2026-07-27 | 322 | Sam QA only | Week 8-9 math | Week 7-8 reading |
| 11 | 2026-08-03 | 352 | Sam QA only | **Amelia complete** through Week 10 | Week 8-9 math |
| 12 | 2026-08-10 | 382 | Sam QA only | Amelia QA only | **Julie complete** through Week 10 |
| 13 | 2026-08-17 | 408 (full launch) | QA pass | QA pass | QA pass |

---

## Appendix F: Customer-facing milestone calendar (assuming Sam start 2026-05-25)

This is the perspective from a Grade 2 customer (Sam-equivalent) starting the program on the same day Week 1 was completed. It tracks where the customer is in their 10-week ladder versus where the authored lesson catalog is.

| Customer week | Calendar week starting | Customer's day range | First built lesson? | First not-built lesson? |
|---------------|------------------------|----------------------|---------------------|--------------------------|
| 1 | 2026-05-25 | D1-D5 | Yes, all 5 days built | None | 
| 2 | 2026-06-01 | D6-D10 | Math D6-D10 should be built by 2026-06-01 | Enrichment D6+ at risk |
| 3 | 2026-06-08 | D11-D15 | Math should be ahead | Enrichment likely behind by 1 week |
| 4 | 2026-06-15 | D16-D20 | On track if Authoring Week 4 hits | Enrichment may still be behind |
| 5 | 2026-06-22 | D21-D25 | On track | Enrichment catch-up should be complete by now |
| 6 | 2026-06-29 | D26-D30 | On track | All subjects on track |
| 7 | 2026-07-06 | D31-D35 | On track | On track |
| 8 | 2026-07-13 | D36-D40 | On track | On track |
| 9 | 2026-07-20 | D41-D45 | Sam fully authored | On track |
| 10 | 2026-07-27 | D46-D50 | Sam fully authored, customer completes program | Customer finishes |

For Amelia and Julie equivalents starting on the same date, the buffer is tighter and the risk of customer-visible "not yet built" content is higher in calendar weeks 3 through 8. Active monitoring required.

---

## Appendix G: Marketing language by grade (precise standards-truth statements)

These are the exact public-facing descriptions to use in marketing copy. They are tuned so that nothing surprises a customer who reads the Missouri Learning Standards independently.

- Kindergarten: "Math: counting and cardinality, place value to 10s, addition and subtraction within 10. Reading: print awareness, phonological awareness, beginning phonics, listening comprehension. Aligned to Missouri Learning Standards for Kindergarten."

- Grade 1: "Math: place value to 100, addition and subtraction within 100, time to half-hour, coin values. Reading: phonics through digraphs and blends, comprehension of simple texts, basic sentence-level grammar. Aligned to Missouri Learning Standards for Grade 1."

- Grade 2: "Math: place value to 1,000, addition and subtraction fluency, foundations of multiplication via arrays, length measurement, time, money, and basic data. Reading: multisyllabic decoding, prediction and questioning, vocabulary, grammar, and writing conventions. Aligned to Missouri Learning Standards for Grade 2."

- Grade 3: "Math: rounding, multiplication and division within 100, fractions as numbers, area and perimeter, time and measurement. Reading: vocabulary including affixes, comprehension with evidence, main idea and supporting detail, beginning literary analysis. Aligned to Missouri Learning Standards for Grade 3. Social Studies: Missouri state history and government."

- Grade 4: "Math: multi-digit multiplication and division, fractions with operations, decimals, angles, area. Reading: closer literary analysis, informational text structure, vocabulary depth. Aligned to Missouri Learning Standards for Grade 4. Social Studies: Missouri regions and state history."

- Grade 5: "Math: decimal operations, fraction multiplication and division, volume, coordinate plane. Reading: synthesis across texts, theme, complex informational text. Aligned to Missouri Learning Standards for Grade 5. Social Studies: United States history through colonial period and early Republic."

- Grade 6: "Math: ratios and rates, rational numbers including negatives, expressions and inequalities, area and volume formulas, statistics. Reading: literary and informational analysis, argument distinction, formal writing process. Aligned to Missouri Learning Standards for Grade 6. Social Studies: Western Hemisphere world studies (geography, cultures, and contemporary issues for North America, Central and South America)."

- Grade 7: "Math: proportional reasoning, rational number operations, linear expressions, scale and geometry, probability. Reading: literary and informational analysis, argument evaluation, multimedia. Aligned to Missouri Learning Standards for Grade 7. Social Studies: Eastern Hemisphere world studies (Africa, Asia, Europe, Oceania). Note: this is regional studies, not chronological world history."

- Grade 8: "Math: rational and irrational numbers, exponents and scientific notation, linear equations and systems, functions, transformations and similarity, Pythagorean theorem, scatter plots. Reading: literary craft, theme, argument evaluation, complex informational text. Aligned to Missouri Learning Standards for Grade 8. Social Studies: American History (Constitutional foundations, Revolution, early Republic, Westward expansion, sectionalism through Reconstruction). Note: this is American history through 1870, not Geography or Civics as a primary focus."

- Grade 9 (Algebra I default): "Math (Algebra I): linear functions, systems, exponents and exponentials, quadratics, statistics. Reading: 9-10 banded ELA standards focused on close reading, argument, and craft. Aligned to Missouri Learning Standards High School Algebra I and Grades 9-10 ELA."

- Grade 10 (Geometry default): "Math (Geometry): congruence, similarity, right triangles, trigonometry, circles, geometric measurement, modeling. Reading: 9-10 banded ELA. Aligned to Missouri Learning Standards High School Geometry and Grades 9-10 ELA."

- Grade 11 (Algebra II default + American History post-1870): "Math (Algebra II): polynomial and rational functions, exponential and logarithmic functions, trigonometric functions, statistics and probability. Reading: 11-12 banded ELA. Aligned to Missouri Learning Standards High School Algebra II and Grades 11-12 ELA. Social Studies: American History from Reconstruction through the present."

- Grade 12 (variable; Personal Finance default): "Personal Finance: budgeting, credit, saving and investing, insurance, taxation, consumer skills. This course meets the Missouri graduation requirement for Personal Finance. Optional advanced math (Pre-Calculus or Calculus) and 11-12 banded ELA available as separate SKUs."

---

## Appendix H: Checklist for adding a new grade

When a fill-in grade enters production, the build-out follows a fixed sequence. This is the checklist:

1. Standards pull: download the DESE PDFs for that grade and subject. Verify against newpathonline.com aggregator. Resolve any conflicts by trusting DESE.
2. Atom-map: create the per-atom inventory in the same shape as `reference/build-manifest.json`. Confirm unit groupings with the program lead.
3. Builder gap analysis: list every builder needed for that grade. Compare against existing builders. File builder gaps as separate work items.
4. Engine compatibility check: does the Grade 2 block engine fit any of this grade's atoms? If yes, mark which. If no, every lesson is bespoke.
5. Week-by-week schedule: produce a Week 1 through Week 10 daily plan matching the 5-day x 3-slot rhythm. Spiral days are explicit, not implicit.
6. Week 1 build: author 15 lessons (5 math, 5 reading, 5 enrichment) using the same hard-rules QA gate. This is the "soft launch" milestone.
7. Customer-facing schedule HTML: update the per-grade `Week N Schedule.html` generator to include the new grade.
8. Marketing copy: write the precise standards-truth statement for the grade (see Appendix G for the format).
9. SKU decision (high school only): commit to which course the grade represents (Algebra I, Geometry, Algebra II, etc.). Document the decision in the build manifest.
10. Per-grade dashboard: build the home dashboard for the grade. Style it for the age (younger grades get more illustration; older grades get more density).
11. QA pass: run the standard QA gate (no em/en dashes, only-Google-Fonts external dep, AAA contrast, 44px tap targets, keyboard operable, reduced-motion honored, no rating UI, Form A and Form B both score-gated).
12. Ship Week 1 and announce.

---

## Appendix I: Glossary of program terms

- Atom: one Missouri Learning Standard mapped to one lesson. "One standard = one atom = one lesson to mastery."
- Mastery gate: Form A (auto-graded, 7 of 8) followed by Form B (delayed, auto-graded, 7 of 8). The only gates that block progression.
- Performance task (PT): an out-loud demonstration scored by an adult against a read-only rubric. Ungated.
- Written explanation: a free-response prompt scored by an adult. Ungated. No self-rating UI.
- Day: a slot in the schedule, not a calendar day. Students move to the next day when they have passed both Form A and Form B for the current day's lesson.
- Slot: one of the three subject blocks within a day (math, reading, enrichment).
- Enrichment rotation: the fixed weekly rotation Sci/SS/JP/Sci/SS that fills the enrichment slot.
- Strand: a grouping of related standards within a subject (e.g., NBT for Number Sense in Base Ten).
- Unit (U1, U2, ...): a within-subject grouping of strands and atoms; defines pedagogical sequence.
- Bundle: a single combined lesson that teaches two or more closely related sub-standards (only used in G8 math to fit 52 atoms into 50 days).
- Launch grade: G2, G3, G8. The grades currently in active production.
- Fill-in grade: K, 1, 4-7, 9-12. The grades scheduled for future production.
- Builder: a Python script that emits one or more HTML lesson files. Each builder is purpose-built for a domain (e.g., the block-builder engine for base-ten work).
- Engine: `module_engine.py`, the canonical lesson generator for base-ten number work.
- CFG: the configuration dictionary passed to `build_module(cfg)`. `build_sam_a2.py` is the canonical template.
- Standards pull: the act of downloading and verifying verbatim Missouri Learning Standard text from DESE (or a trusted aggregator) for a grade and subject.
- Verbatim: word-for-word as published by DESE. No paraphrase. Verbatim text appears in the lesson objectives block.
- Aesthetic: the visual treatment of a lesson (terminal style, lab notebook style, museum style, etc.). A design choice, not a standards alignment.
- Recipe: the pedagogical shape of a lesson (e.g., predict-explain-show, story-then-mastery, manipulative-then-abstract). A design choice.

---

## Appendix J: Source citations (verbatim URLs consulted in this build)

- DESE Missouri Learning Standards index: https://dese.mo.gov/college-career-readiness/curriculum/missouri-learning-standards
- newpathonline.com Grade 1 Math (verified): https://www.newpathonline.com/standard/missouri-learning-standards/26/mathematics_Grade_1/2/0
- newpathonline.com Grade 6 ELA (verified): https://www.newpathonline.com/standard/missouri-learning-standards/26/english_language_arts_Grade_6/1/0
- newpathonline.com Kindergarten Math (attempted, returned G1 content; pull required): https://www.newpathonline.com/standard/missouri-learning-standards/26/mathematics_Grade_K/2/0 and https://www.newpathonline.com/standard/missouri-learning-standards/26/mathematics_Kindergarten/2/0
- newpathonline.com Grade 4 Math (attempted, truncated; pull required): https://www.newpathonline.com/standard/missouri-learning-standards/26/mathematics_Grade_4/2/0
- newpathonline.com Grade 5 Math (attempted, truncated; pull required): https://www.newpathonline.com/standard/missouri-learning-standards/26/mathematics_Grade_5/2/0
- newpathonline.com Grade 6 Math (attempted, truncated; pull required): https://www.newpathonline.com/standard/missouri-learning-standards/26/mathematics_Grade_6/2/0
- newpathonline.com Grade 7 Math (attempted, truncated; pull required): https://www.newpathonline.com/standard/missouri-learning-standards/26/mathematics_Grade_7/2/0
- newpathonline.com Grade 4 ELA (attempted, returned 1 stray standard; pull required): https://www.newpathonline.com/standard/missouri-learning-standards/26/english_language_arts_Grade_4/1/0
- newpathonline.com Grade 7 ELA (attempted, returned 1 stray standard; pull required): https://www.newpathonline.com/standard/missouri-learning-standards/26/english_language_arts_Grade_7/1/0

Internal sources (this repository):

- `reference/build-manifest.json`: the full per-atom map for the three launch grades, generated 2026-05-25.
- `specs/00-standards-reference.md`: verbatim Week 1 standards reference.
- `reference/BUILD-PLAN.md`: hard rules and Week 1 status report.
- `Week 1 Schedule.html`: the canonical 5-day x 3-slot rhythm artifact.

---

## Appendix K: Per-grade pedagogical recipes (recommended lesson shapes by unit)

For each launch-grade unit, a recommended pedagogical recipe and the manipulative or tool that best teaches it. Recipes are design choices, not standards; they are listed here so that lesson authors do not re-derive them per lesson.

### K.1 Grade 2 (Sam) recipes

| Unit | Recommended recipe | Primary manipulative | Aesthetic suggestion |
|------|--------------------|----------------------|----------------------|
| U1 Place Value to 1,000 | Block builder: hundreds, tens, ones | Hundreds-block stacker (existing engine) | Quest Lab (Sam dashboard match) |
| U2 Fluency Within 20 | Number-line skip + paired-fact retrieval | Number line + flash | Quest Lab |
| U3 Add and Subtract Within 100/1,000 | Block builder + decomposition tool | Hundreds-block stacker | Quest Lab |
| U4 Foundations of Multiplication | Equal-groups array tool | Array grid + counter | Quest Lab |
| U5 Measuring Length | Ruler + estimation game | Virtual ruler with snap | Field guide |
| U6 Time and Money | Clock and coin manipulative | Analog/digital clock + coin tray | Field guide |
| U7 Geometry Shapes | Shape-attribute classifier | Shape selector with attribute filter | Lab notebook |
| U8 Data and Graphs | Bar/picture/line plot builder | Data-set creator + graph builder | Lab notebook |

### K.2 Grade 3 (Amelia) recipes

| Unit | Recommended recipe | Primary manipulative | Aesthetic suggestion |
|------|--------------------|----------------------|----------------------|
| U1 Place Value/Rounding | Number line + rounding zone | Number line with anchor points | Amelia Lookbook |
| U2 Multiplication Meaning | Equal-groups + array | Array grid + label | Amelia Lookbook |
| U3 Division Relationship | Inverse-operation tool | Equation balance | Amelia Lookbook |
| U4 Multiply/Divide Fluency | Fact-fluency timed grid | Multiplication fact grid | Amelia Lookbook |
| U5 Patterns/Word Problems | Multi-step bar model | Bar model builder | Amelia Lookbook |
| U6 Fractions as Numbers | Fraction strips + number line | Fraction strip + number line | Almanac |
| U7 Area | Unit-square tiling tool | Tile-the-rectangle interactive | Almanac |
| U8 Perimeter | Polygon side-length adder | Polygon trace tool | Almanac |
| U9 Measurement | Multi-unit measurement bench | Length/volume/mass interactive | Field guide |
| U10 Geometry Shapes/Attributes | Quadrilateral classifier | Shape-attribute filter | Lab notebook |
| U11 Data | Frequency table/graph builder | Data-set + graph builder | Lab notebook |

### K.3 Grade 8 (Julie) recipes

| Unit | Recommended recipe | Primary manipulative | Aesthetic suggestion |
|------|--------------------|----------------------|----------------------|
| U1 Rational/Irrational | Number line + decimal expansion explorer | Number line, decimal expansion display | Training Console (Julie dashboard match) |
| U2 Exponents | Exponent-rule tester + scientific-notation viewer | Exponent-property explorer | Training Console |
| U3 Slope and Lines | Slope-intercept slider | Live graph with slope/intercept sliders | Training Console |
| U4 Linear Equations and Systems | Equation balance + graphical/algebraic system solver | Two-line graph + solver | Training Console |
| U5 Functions Definition | Input-output table to graph converter | Function machine | Training Console |
| U6 Modeling | Real-world rate-of-change builder | Modeling sandbox with slider parameters | Training Console |
| U7 Transformations | Pre-image to image mapper | Coordinate grid with transformation buttons | Technical drawing |
| U8 Pythagorean Theorem | Right-triangle proof + Cartesian distance | Right-triangle constructor | Technical drawing |
| U9 Volume | 3D solid volume calculator | Solid-of-revolution viewer | Technical drawing |
| U10 Scatter Plots | Bivariate plot + trend-line fitter | Scatter plot + draggable trend line | Newsroom |

---

## Appendix L: Risk register (active issues to track)

A live list of risks the program currently carries. Each one has an ID, a severity, an owner role, and a target resolution date. Severity scale: S1 (blocks launch), S2 (degrades customer experience), S3 (cosmetic or back-of-mind).

| ID | Risk | Severity | Owner | Target |
|----|------|----------|-------|--------|
| RISK-001 | Standards pull blockers for K, G4, G5, G7 in Math and ELA. | S1 | Program Lead | 2026-06-08 |
| RISK-002 | Enrichment ladders only built to Day 2 across all 3 launch grades; customer-visible "not yet built" at Week 2 Day 1. | S1 | Lesson Authors | 2026-06-01 |
| RISK-003 | Builder gaps for fractions, area, slope, transformations, scatter plots. Critical path. | S1 | Engine Author | 2026-07-13 |
| RISK-004 | G8 SS framing risk: customer may expect Geography or Civics. | S2 | Marketing | 2026-06-15 |
| RISK-005 | G7 SS framing risk: Eastern Hemisphere studies, not chronological World History. | S2 | Marketing | When G7 launches |
| RISK-006 | High school SKU decision unresolved (Algebra I vs Geometry vs Algebra II). | S2 | Product | 2026-07-31 |
| RISK-007 | Kindergarten lesson duration may not match attention span. | S2 | UX | When K launches |
| RISK-008 | Japanese is house scope, not MLS aligned. Marketing must disclose. | S2 | Marketing | 2026-06-01 |
| RISK-009 | hub_builder.py has a hard-coded path; cross-machine deployments break. | S3 | Engine Author | 2026-07-06 |
| RISK-010 | Supabase sync wired but no-op; multi-device promise not yet truthful. | S3 | Engine Author | When multi-device ships |
| RISK-011 | G3 Reading ladder standards pull required for D6+; blocks G3 Week 2 authoring. | S1 | Lesson Authors | 2026-06-01 |
| RISK-012 | G8 Reading ladder standards pull required for D6+; blocks G8 Week 2 authoring. | S1 | Lesson Authors | 2026-06-01 |
| RISK-013 | Authoring capacity (25 to 35 lessons/week) may not match customer consumption (45 lessons/week at one customer per grade). Mitigation: stage customer onboarding. | S2 | Operations | Ongoing |
| RISK-014 | DESE PDFs are not text-extractable in this session; standards pull requires alternative tooling. | S2 | Tooling | 2026-06-08 |
| RISK-015 | G2 reading customer consumption may outpace authoring at Week 3 because the E2 unit has 3 unbuilt atoms in a single week. | S2 | Lesson Authors | 2026-06-15 |

---

## Appendix M: Standards pull worklist (concrete URLs to attempt next)

This is the worklist for the standards pull that must precede the next authoring sprint. Each row is a single web-fetch target. The intent is to staff this as a sequential pass: pull, verify against DESE PDF where possible, commit to `specs/00-standards-reference.md` and update `reference/build-manifest.json`.

| Order | Grade | Subject | URL or document | Status |
|------:|-------|---------|-----------------|--------|
| 1 | G2 | Science | DESE K-5 Science PDF | not started |
| 2 | G2 | Social Studies | DESE K-5 SS PDF | not started |
| 3 | G3 | Reading | DESE K-5 ELA PDF (Grade 3 section) | not started |
| 4 | G3 | Science | DESE K-5 Science PDF | not started |
| 5 | G3 | Social Studies | DESE K-5 SS PDF | not started |
| 6 | G8 | Reading | DESE 6-12 ELA PDF (Grade 8 section) | not started |
| 7 | G8 | Science | DESE 6-12 Science PDF | not started |
| 8 | G8 | Social Studies | DESE 6-12 SS PDF (American History) | not started |
| 9 | K | Math | DESE K-5 Math PDF | not started |
| 10 | K | Reading | DESE K-5 ELA PDF (K section) | not started |
| 11 | G1 | Reading | DESE K-5 ELA PDF (G1 section) | not started |
| 12 | G4 | Math | DESE K-5 Math PDF (G4 section) | not started |
| 13 | G4 | Reading | DESE K-5 ELA PDF (G4 section) | not started |
| 14 | G5 | Math | DESE K-5 Math PDF (G5 section) | not started |
| 15 | G5 | Reading | DESE K-5 ELA PDF (G5 section) | not started |
| 16 | G6 | Math | DESE 6-12 Math PDF (G6 section) | not started |
| 17 | G7 | Math | DESE 6-12 Math PDF (G7 section) | not started |
| 18 | G7 | Reading | DESE 6-12 ELA PDF (G7 section) | not started |
| 19 | G7 | Social Studies | DESE 6-12 SS PDF (Eastern Hemisphere World Studies) | not started |
| 20 | G9-12 | Math (course-tagged) | DESE High School Math PDFs (Algebra I, Geometry, Algebra II, Personal Finance, Pre-Calculus) | not started |
| 21 | G9-12 | Reading | DESE 6-12 ELA PDF (9-10 and 11-12 bands) | not started |
| 22 | G9-12 | Science | DESE 9-12 Science PDF | not started |
| 23 | G9-12 | Social Studies | DESE 9-12 SS PDF (Government, American History post-1870, Personal Finance, World History) | not started |

Tooling note: DESE publishes the K-12 standards as an Excel file as well. The Excel file is the cleanest source because it is structured by row. If a PDF-to-text tool is unavailable, the Excel route is the recommended next attempt. Excel file links are listed on the DESE Missouri Learning Standards index page cited in Section 7.

---

## Appendix N: Lesson naming convention

All lesson files follow the pattern `[Student Name] - [Subject] [Day or unit] - [Descriptive title].html`. Examples already shipped:

- `Sam - Math - Place Value Mastery.html` (2.NBT.A.1)
- `Sam - Reading Day 1 - Decoding Multisyllabic Words.html` (2.RF.3.A.a)
- `Sam - Science Day 1 - Sorting Materials.html` (2.PS1.A.1)
- `Amelia - Math Day 5 - Interpret Products.html` (3.RA.A.1)
- `Julie - Math Day 1 - Rational vs Irrational.html` (8.NS.A.1a)

Rules:

- No version numbers in filenames. Build manifest tracks revisions.
- Descriptive title is short, plain English. Not the verbatim standard. The verbatim standard appears inside the lesson, in the objectives block.
- Day numbers in filenames are the SCHEDULE day (where in the 50-day program), not the SUB-STANDARD letter. For example `Julie - Math Day 1 - Rational vs Irrational.html` is Week 1 Day 1, whose standard is 8.NS.A.1a.
- Spaces in filenames are intentional (hyphens are reserved for the dash in titles like "Add and Subtract Within 1000").
- The `publish.py` step slugifies filenames for web deployment. The on-disk human-readable name stays as above.

---

## Appendix O: Final stats summary

- Total Missouri Learning Standard atoms across the launch grades: 158 (35 G2 math + 26 G2 reading + 45 G3 math + ~50 G3 reading est + 52 G8 math + ~50 G8 reading est = 258 with reading estimates; verified verbatim count is 35 + 26 + 45 + 5 + 52 + 5 = 168).
- Total lessons in the launch-grades 10-week program (including enrichment and Japanese): 450 (3 grades x 150 lessons each, where 150 = 50 math + 50 reading + 20 sci + 20 ss + 10 jp).
- Total lessons currently built: 52 (12 G2 math, 5 G2 reading, 2 G2 sci, 2 G2 ss, 1 G2 jp, 5 G3 math, 5 G3 reading, 2 G3 sci, 2 G3 ss, 1 G3 jp, 5 G8 math, 5 G8 reading, 2 G8 sci, 2 G8 ss, 1 G8 jp).
- Lessons remaining for launch-grade completion: 398.
- Target launch-grade completion date (at 30 lessons per week): 2026-08-17.
- Total lessons targeted across the K-12 program suite: approximately 1700.
- Lessons remaining for full K-12 completion: approximately 1648.
- Target full K-12 completion date (sequential rollout, current cadence): 2028-01-24.
- Standards verified verbatim in this build: 168 atoms (launch grades) + 22 G1 math + 32 G6 ELA = 222 verbatim Missouri Learning Standards across the suite.
- Standards pull required (count): approximately 1480 atoms across K, G1 reading, G4, G5, G6 math, G7, G9-12 in all subjects, plus the unbuilt portion of launch grade enrichment.

End of document.
