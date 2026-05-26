# Lesson Spec Schema

The authoring contract for a single lesson. One markdown file is the source of truth for one lesson. A renderer skill reads it and produces the category HTML. Content review happens on this file. Render review happens on the HTML.

The pipeline: `lesson.md  ->  renderer skill  ->  category template  ->  lesson.html`

## 1. Naming

- File: `G<grade>-<SUBJECT>-D<day> - <Short Title>.md`, for example `G2-SCIENCE-D1 - Sorting Materials.md`.
- The `id` in front matter is `G<grade>-<SUBJECT>-D<day>`, uppercase subject.

## 2. Front matter (structured data)

```
id: G2-SCIENCE-D1
subject: science          # math | reading | science | social | japanese  (selects the template)
grade: 2
student: shared           # shared, or a name when content is personalized
title: Sorting Materials by What We Observe
recipe: Conceptual        # pedagogy recipe that shaped the lesson (labeled as a design choice)
standards:                # verbatim, sourced, never paraphrased
  - code: 2-PS1-1
    source: NGSS / Missouri 2.PS1.A.1
    text: "Plan and conduct an investigation to describe and classify different kinds of materials by their observable properties."
objectives:               # what mastery looks like, in plain language
  - Define a property as something you can observe.
  - Name observable properties and their opposites.
  - Describe one object using several properties.
  - Sort materials by a chosen property.
  - Explain why scientists classify materials.
mastery:
  pass: 0.8               # fraction correct to pass
  form_size: 6            # how many items a single check draws
  attempt_points: [100, 80, 60, 50]   # base points by passing attempt
```

## 3. Lesson body (a list of blocks)

`lesson:` is an ordered list of blocks. Block `type` is a controlled vocabulary that maps to the pedagogy block library. A lesson is as long as the content needs; a full lesson is usually 8 to 14 blocks.

Universal blocks (any subject):

- `prose` — teaching text. Fields: `heading`, `body`. Body supports `**bold**`, blank-line paragraphs, and `- ` bullets.
- `concept-cards` — a row of small cards. Fields: `heading`, `intro`, `cards: [{label, sub, example}]`.
- `worked-example` — one item solved step by step. Fields: `heading`, `prompt`, `steps: [..]`, `answer`.
- `predict` — predict-then-reveal items. Fields: `heading`, `intro`, `items: [{prompt, answer, why}]`.
- `misconception` — a targeted callout. Fields: `wrong`, `right`.
- `recap` — closing summary. Fields: `heading`, `points: [..]`.

Interactive block (Hybrid: md gives type plus data, template renders and scores):

- `interactive` — Fields: `widget`, `heading`, `intro`, plus widget data. Supported `widget` per category:
  - math: `number-builder` (data: target range), `number-line` (data: `steps: [10,100]`)
  - reading: `magic-e` (data: `words`), `affix-builder` (data: `roots`), `word-sort` (data: `items, bins`)
  - science: `sort-bench` (data: `prompt, bins, items:[{name, answer}]`), `force-lab`
  - social: `compass`, `grid-map` (data: `cols, rows, markers, rounds`)
  - japanese: `flip-cards` (data: `cards`), `char-match` (data: `cards`)

If a lesson has no `interactive` block, the template still renders the prose and the check. Widgets are optional; their data is required when present.

## 4. Check (item bank plus forms)

```
check:
  bank:
    - id: q1
      objective: 1          # which objective it measures
      targets: misconception # optional: what wrong idea the distractors come from
      stem: "A property is something you can ..."
      options: ["observe", "only taste", "only hear"]
      answer: 0             # index of the correct option
      explain: "You observe properties by looking and feeling."
    - id: q2
      ...
  forms:                    # named parallel forms; renderer serves one, rotates on retry
    A: [q1, q2, q4, q6, q8, q10]
    B: [q3, q5, q7, q9, q11, q12]
```

Authoring rules for items (Haladyna / Shank):

- Four options where the content allows, three minimum. One clearly correct.
- Distractors come from real misconceptions, not nonsense.
- Stems are complete and answerable without seeing the options.
- Vary the position of the correct answer across the bank.
- Every objective is measured by at least two items so a form can cover them.
- A bank of 10 to 16 items supports two balanced forms.

## 5. What the renderer does

1. Reads `subject` and loads that category template (its fonts, palette, texture, and widget code).
2. Renders the header from `title`, `grade`, `standards`.
3. Walks `lesson` blocks in order, rendering each into the template aesthetic.
4. Builds the check from `check.forms` (serves form A first, rotates to B on retry) drawn from `bank`.
5. Wraps everything in the shared loop: lesson, then timed check at the `pass` threshold, then two-tap feedback, then points to `edu.app`.

The renderer never invents content. Anything not in the md does not appear.

## 6. Content QA gate (run on the md, before render)

- Every standard is verbatim and has a source.
- Every objective is taught by at least one block and measured by at least two items.
- Each misconception block is matched by at least one distractor in the bank.
- Forms are balanced across objectives and similar in difficulty.
- No em-dashes. Plain language for the grade.
