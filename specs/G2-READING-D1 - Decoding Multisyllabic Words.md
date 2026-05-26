---
id: G2-READING-D1
subject: reading
grade: 2
student: sam
title: Breaking Big Words Into Bites
recipe: Conceptual
standards:
  - code: 2.RF.3.A.a
    source: Missouri Learning Standards (DESE)
    text: "decoding multisyllabic words in context by applying common letter-sound correspondences including: single letters, consonant blends, consonant and vowel digraphs and vowel diphthongs"
objectives:
  - Hear that a long word is made of beats called syllables.
  - Clap a word to find the number of syllables.
  - Split a written word between two consonants in the middle.
  - Use known letter sounds (single letters, blends, digraphs) to read each part.
  - Blend the parts back into the whole word.
mastery:
  pass: 0.8
  form_size: 8
  attempt_points: [100, 80, 60, 50]
lesson:
  - type: prose
    heading: Big words are just little words stuck together
    body: |
      A **syllable** is one beat in a word. Every syllable has one vowel sound.

      The word **cat** has one beat: *cat*. The word **rabbit** has two beats: *rab* + *bit*. The word **butterfly** has three beats: *but* + *ter* + *fly*.

      When you see a long word, you do not have to read it all at once. You break it into beats, read each beat, and then snap the beats together.
  - type: concept-cards
    heading: The sounds you already know
    intro: You will use these letter-sound friends to read each beat.
    cards:
      - label: Single letters
        sub: one letter, one sound
        example: "m says /m/, t says /t/, a says /a/"
      - label: Consonant blends
        sub: two consonants you can still hear apart
        example: "bl in *blob*, st in *stop*, fr in *frog*"
      - label: Consonant digraphs
        sub: two consonants that make one new sound
        example: "sh in *shop*, ch in *chip*, th in *that*"
      - label: Vowel digraphs and diphthongs
        sub: two vowels making one team sound
        example: "ai in *rain*, oa in *boat*, oi in *coin*"
  - type: worked-example
    heading: Read *picnic* together
    prompt: "How do you read **picnic** when you have not seen it before?"
    steps:
      - "Look for the consonants in the middle: pic**n**ic. There are two consonants together: **cn**."
      - "Split between the two consonants: **pic** + **nic**."
      - "Read beat one: p-i-c, **pic**."
      - "Read beat two: n-i-c, **nic**."
      - "Snap them together: **pic-nic**, *picnic*."
    answer: "picnic"
  - type: interactive
    widget: affix-builder
    heading: Try it on the bench
    intro: Drag the split line between the two middle consonants, then tap each half to hear it.
    roots:
      - word: napkin
        split: 3
        beats: ["nap", "kin"]
      - word: rabbit
        split: 3
        beats: ["rab", "bit"]
      - word: sunset
        split: 3
        beats: ["sun", "set"]
      - word: chipmunk
        split: 4
        beats: ["chip", "munk"]
  - type: misconception
    wrong: "I should sound out every letter one at a time, even in a long word."
    right: "Find the beats first, then sound out each beat. Letter-by-letter takes forever and you forget the start before you reach the end."
  - type: predict
    heading: Predict the split
    intro: Where would you split each word so it has two beats?
    items:
      - prompt: "**muffin**"
        answer: "muf + fin"
        why: "Two consonants in the middle (ff), so split between them."
      - prompt: "**basket**"
        answer: "bas + ket"
        why: "Two consonants in the middle (sk), so split between them."
      - prompt: "**hello**"
        answer: "hel + lo"
        why: "Two consonants in the middle (ll), so split between them."
  - type: recap
    heading: The move
    points:
      - One vowel sound = one beat = one syllable.
      - In the middle of a long word, split between two consonants.
      - Use the letter sounds you already know to read each beat.
      - Snap the beats together to say the whole word.
check:
  bank:
    - id: q1
      objective: 1
      stem: "A syllable is..."
      options: ["one beat in a word", "another word for letter", "a punctuation mark"]
      answer: 0
      explain: "Every syllable has one vowel sound and is one beat."
    - id: q2
      objective: 2
      stem: "How many syllables in **rabbit**?"
      options: ["one", "two", "three"]
      answer: 1
      explain: "rab + bit = two beats."
    - id: q3
      objective: 2
      stem: "How many syllables in **butterfly**?"
      options: ["two", "three", "four"]
      answer: 1
      explain: "but + ter + fly = three beats."
    - id: q4
      objective: 3
      stem: "Where do you split **napkin**?"
      options: ["na + pkin", "nap + kin", "napk + in"]
      answer: 1
      explain: "Split between the two consonants in the middle (p and k)."
    - id: q5
      objective: 3
      stem: "Where do you split **basket**?"
      options: ["ba + sket", "bas + ket", "bask + et"]
      answer: 1
      explain: "Split between s and k, the two consonants in the middle."
    - id: q6
      objective: 4
      stem: "The **sh** in *shop* is a..."
      options: ["digraph (two letters, one sound)", "blend (two sounds you hear)", "single letter"]
      answer: 0
      explain: "sh is a digraph: two letters that make one new sound."
    - id: q7
      objective: 4
      stem: "The **bl** in *blob* is a..."
      options: ["digraph", "blend (two sounds you hear)", "vowel team"]
      answer: 1
      explain: "You can hear both b and l, so it is a blend."
    - id: q8
      objective: 5
      stem: "Beats **pic** and **nic** snap together to make..."
      options: ["picnik", "picnic", "picnack"]
      answer: 1
      explain: "pic + nic = picnic."
    - id: q9
      objective: 5
      stem: "Beats **muf** and **fin** snap together to make..."
      options: ["muffin", "mufin", "muphin"]
      answer: 0
      explain: "muf + fin = muffin. The two f's stay because each half kept its consonant."
    - id: q10
      objective: 1
      stem: "How many syllables in **cat**?"
      options: ["one", "two", "three"]
      answer: 0
      explain: "One vowel sound, one beat."
    - id: q11
      objective: 3
      stem: "Where do you split **sunset**?"
      options: ["su + nset", "sun + set", "suns + et"]
      answer: 1
      explain: "Split between n and s in the middle."
    - id: q12
      objective: 4
      stem: "The **ai** in *rain* is a..."
      options: ["single vowel", "vowel team (digraph)", "blend"]
      answer: 1
      explain: "Two vowels working together to make one sound is a vowel team."
  forms:
    A: [q1, q2, q4, q6, q8, q10, q11, q12]
    B: [q3, q5, q7, q9, q2, q4, q6, q8]
