#!/usr/bin/env node
// apply_24h_gate.cjs
// Retrofits the 24-hour Form B retention gate to lesson HTML files that lack it.
// Idempotent: looks for marker <!-- LESSON_24H_GATE_V1 --> and skips files that
// already contain `formAPassedAt`.
//
// Strategy: minimal-write fallback (matches validator check #9). For every lesson
// file with a Form A pass code path, we insert `rec.formAPassedAt = Date.now();`
// adjacent to the `rec.status='passed'` (or formA-passed) assignment, plus a
// 24h-elapsed check (`Date.now() - (rec.formAPassedAt||0) >= 24*60*60*1000`)
// guarding the Form B start button. We also seed the rec literal default so
// fresh records carry the field. The full countdown UI in the Spelling lessons
// is the gold standard — leave those untouched and use them as the canonical
// pattern.
//
// Usage:
//   node tools/apply_24h_gate.cjs            # apply to all lessons
//   node tools/apply_24h_gate.cjs --dry-run  # show what would change
//   node tools/apply_24h_gate.cjs "Sam - Math - Counting Within 1000.html"

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MARKER = '<!-- LESSON_24H_GATE_V1 -->';
const GATE_MS_LITERAL = '24*60*60*1000';

// ---------- helpers ----------
function listLessonFiles() {
  const all = fs.readdirSync(ROOT).filter(f => f.toLowerCase().endsWith('.html'));
  return all.filter(f => {
    if (/^(welcome|dashboard|index|Build Tracker|Start Here|parent)\b/i.test(f)) return false;
    if (/Dashboard|Schedule|Index/i.test(f)) return false;
    return /^(Sam|Amelia|Julie) - /.test(f);
  });
}

function isCanonicalSpelling(name) {
  return /Spelling Day 3 - Week 1 Words\.html$/i.test(name);
}

function hasGate(html) { return /formAPassedAt/.test(html); }
function hasFormStructure(html) {
  // We need both a Form A pass path AND a Form B start to bother with a gate.
  return /rec\.formA\s*=/.test(html) && /rec\.formB\s*=/.test(html);
}

// Insert (or update) the literal default for `rec` so fresh records have the field.
function patchRecDefault(html) {
  // Common literal: var rec = app.progress[STUDENT][SUBJECT][DAY] || { ... };
  const re = /(rec\s*=\s*app\.progress\[STUDENT\]\[SUBJECT\]\[DAY\]\s*\|\|\s*\{)([^}]*)(\})/;
  const m = html.match(re);
  if (!m) return { html, changed: false, note: 'no rec default literal found' };
  if (/formAPassedAt/.test(m[2])) return { html, changed: false, note: 'rec default already has formAPassedAt' };
  // Tack on formAPassedAt:null before the closing brace, keeping commas tidy.
  const inner = m[2].replace(/\s*$/, '');
  const sep = /,\s*$/.test(inner) ? ' ' : (inner.length ? ', ' : '');
  const updated = inner + sep + 'formAPassedAt:null';
  const replaced = m[1] + updated + m[3];
  return { html: html.replace(re, replaced), changed: true };
}

// Insert the write `rec.formAPassedAt = Date.now()` right after the Form A score
// is captured. We attach it to the `rec.formA = ...` line that lives inside the
// `form === 'A'` branch.
function patchFormAWrite(html) {
  // Heuristic: find the first line where rec.formA = <something> is set.
  // Then, on the same line, append `if(!rec.formAPassedAt) rec.formAPassedAt=Date.now();`.
  // We only do this if the surrounding context references PASS/formB later — i.e. this
  // looks like a true Form A path, not a single-quiz lesson.
  const re = /(rec\.formA\s*=\s*[^;]+;)/;
  const m = html.match(re);
  if (!m) return { html, changed: false, note: 'no rec.formA= assignment found' };
  // Avoid double-insertion.
  // Insert immediately after the match, on the same line so prettifiers leave us alone.
  const insertion = ' if(!rec.formAPassedAt && (rec.formA||0)>=(typeof PASS!=="undefined"?PASS:(DATA&&DATA.PASS)||7)) rec.formAPassedAt=Date.now();';
  // Only insert once.
  const idx = html.indexOf(m[1]);
  if (idx < 0) return { html, changed: false, note: 'match index lookup failed' };
  if (html.slice(idx, idx + m[1].length + insertion.length + 50).includes('formAPassedAt')) {
    return { html, changed: false, note: 'formAPassedAt already adjacent' };
  }
  const updated = html.slice(0, idx + m[1].length) + insertion + html.slice(idx + m[1].length);
  return { html: updated, changed: true };
}

// Guard the Form B start so it cannot fire before 24h have elapsed.
// We target the click handler that begins Form B. Most lessons wire `startB`.
function patchStartBGuard(html) {
  // Pattern 1: document.getElementById('startB').addEventListener('click',function(){ ...startMC('B')... });
  // Pattern 2: similar variants.
  // Strategy: prepend a tiny guard inside the click handler that checks elapsed time and bails out.
  const handlers = [
    /document\.getElementById\(['"]startB['"]\)\.addEventListener\(\s*['"]click['"]\s*,\s*function\s*\(\s*\)\s*\{/g
  ];
  let changed = false;
  let updated = html;
  for (const re of handlers) {
    updated = updated.replace(re, function(match) {
      // Only inject if the immediate next characters don't already mention formAPassedAt.
      changed = true;
      return match + ' var __gateMs=' + GATE_MS_LITERAL + '; var __ap=rec.formAPassedAt||0; if(__ap && (Date.now()-__ap)<__gateMs){ alert("Form B opens 24 hours after Form A passes. Come back later to lock these in."); return; }';
    });
  }
  return { html: updated, changed };
}

function processFile(filePath, dryRun) {
  const name = path.basename(filePath);
  const original = fs.readFileSync(filePath, 'utf8');
  if (isCanonicalSpelling(name)) return { name, skipped: 'canonical-spelling' };
  if (hasGate(original)) return { name, skipped: 'already-has-gate' };
  if (!hasFormStructure(original)) return { name, skipped: 'no-form-a-b-structure' };

  let html = original;
  const notes = [];

  const r1 = patchRecDefault(html);
  if (r1.changed) { html = r1.html; notes.push('rec-default'); }
  else if (r1.note) notes.push('rec-default:' + r1.note);

  const r2 = patchFormAWrite(html);
  if (r2.changed) { html = r2.html; notes.push('formA-write'); }
  else if (r2.note) notes.push('formA-write:' + r2.note);

  const r3 = patchStartBGuard(html);
  if (r3.changed) { html = r3.html; notes.push('startB-guard'); }

  // Append marker so future runs short-circuit.
  if (!html.includes(MARKER) && (r1.changed || r2.changed || r3.changed)) {
    html = html.replace(/<\/body>/i, MARKER + '\n</body>');
    notes.push('marker');
  }

  if (html === original) return { name, skipped: 'no-changes-applied', notes };
  if (!dryRun) fs.writeFileSync(filePath, html, 'utf8');
  return { name, patched: true, notes };
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const explicit = args.filter(a => !a.startsWith('--'));
  const targets = explicit.length
    ? explicit.map(f => path.isAbsolute(f) ? f : path.join(ROOT, f))
    : listLessonFiles().map(f => path.join(ROOT, f));

  const results = [];
  for (const fp of targets) {
    try { results.push(processFile(fp, dryRun)); }
    catch (e) { results.push({ name: path.basename(fp), error: e.message }); }
  }

  const patched = results.filter(r => r.patched);
  const skipped = results.filter(r => r.skipped);
  const errored = results.filter(r => r.error);

  console.log('=== 24h Gate Retrofit ===' + (dryRun ? ' (DRY RUN)' : ''));
  console.log('Patched: ' + patched.length);
  for (const r of patched) console.log('  + ' + r.name + (r.notes ? '  [' + r.notes.join(', ') + ']' : ''));
  console.log('Skipped: ' + skipped.length);
  for (const r of skipped) console.log('  - ' + r.name + '  (' + r.skipped + ')');
  if (errored.length) {
    console.log('Errors: ' + errored.length);
    for (const r of errored) console.log('  ! ' + r.name + '  ' + r.error);
  }
}

main();
