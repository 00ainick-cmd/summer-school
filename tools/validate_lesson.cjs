#!/usr/bin/env node
// validate_lesson.cjs
// Quality validator for Summer Learning Program lesson HTML files.
// Usage:
//   node tools/validate_lesson.cjs "Sam - Reading Day 1 - Decoding Multisyllabic Words.html"
//   node tools/validate_lesson.cjs --all
//
// No external dependencies. Node built-ins only.

'use strict';

const fs = require('fs');
const path = require('path');

// ---------- Color helpers (ANSI; safe to ignore on Windows old CMD) ----------
const C = {
  reset: '\x1b[0m', dim: '\x1b[2m', bold: '\x1b[1m',
  green: '\x1b[32m', red: '\x1b[31m', yellow: '\x1b[33m', cyan: '\x1b[36m'
};

// ---------- File loading ----------
function readFileSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); }
  catch (e) { return null; }
}

// ---------- Line context helper ----------
function findLineNumber(text, needle) {
  const idx = text.indexOf(needle);
  if (idx < 0) return null;
  return text.slice(0, idx).split(/\r?\n/).length;
}

function countOccurrences(text, needle) {
  if (!needle) return 0;
  let count = 0, idx = 0;
  while ((idx = text.indexOf(needle, idx)) !== -1) { count++; idx += needle.length; }
  return count;
}

// ---------- HTML stripper for reading level ----------
function extractVisibleText(html) {
  // Strip scripts and styles first
  let s = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ');
  s = s.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
  // Strip HTML comments
  s = s.replace(/<!--[\s\S]*?-->/g, ' ');
  // Replace tags with spaces
  s = s.replace(/<[^>]+>/g, ' ');
  // Decode a handful of common HTML entities
  s = s.replace(/&nbsp;/g, ' ')
       .replace(/&middot;/g, '.')
       .replace(/&amp;/g, '&')
       .replace(/&lt;/g, '<')
       .replace(/&gt;/g, '>')
       .replace(/&quot;/g, '"')
       .replace(/&#\d+;/g, ' ')
       .replace(/&#x[0-9a-fA-F]+;/g, ' ');
  // Collapse whitespace
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

// ---------- Flesch-Kincaid grade level (simple) ----------
function countSyllablesInWord(w) {
  w = w.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  // Remove silent e
  w = w.replace(/e$/,'');
  // Count vowel groups
  const m = w.match(/[aeiouy]+/g);
  let n = m ? m.length : 0;
  if (n === 0) n = 1;
  return n;
}

function fleschKincaidGrade(text) {
  // Sentence split on . ! ?
  const sentences = text.split(/[.!?]+/).map(s=>s.trim()).filter(Boolean);
  // Words split on whitespace; keep tokens with at least one letter
  const words = text.split(/\s+/).filter(t => /[A-Za-z]/.test(t));
  if (!sentences.length || !words.length) return null;
  let totalSyllables = 0;
  for (const w of words) totalSyllables += countSyllablesInWord(w);
  const W = words.length, S = sentences.length;
  // FK formula
  const grade = 0.39 * (W / S) + 11.8 * (totalSyllables / W) - 15.59;
  return {
    grade: Math.round(grade * 10) / 10,
    words: W, sentences: S, syllables: totalSyllables
  };
}

// ---------- Determine grade from filename or content ----------
function detectGrade(filename, html) {
  const fn = filename.toLowerCase();
  if (fn.includes('sam')) return 2;
  if (fn.includes('amelia')) return 3;
  if (fn.includes('julie')) return 8;
  // Try to read STUDENT / grade var from script
  const studentMatch = html.match(/STUDENT\s*=\s*['"](sam|amelia|julie)['"]/);
  if (studentMatch) {
    const m = { sam: 2, amelia: 3, julie: 8 };
    return m[studentMatch[1]];
  }
  const gradeMatch = html.match(/grade\s*[:=]\s*(\d+)/);
  if (gradeMatch) return parseInt(gradeMatch[1], 10);
  return null;
}

// ---------- Reading level targets per grade ----------
const READING_TARGETS = {
  2: { ideal: [1.5, 3.0], soft: 4.0 },
  3: { ideal: [2.5, 4.0], soft: 5.0 },
  6: { ideal: [5.0, 7.0], soft: 9.0 },
  7: { ideal: [5.5, 8.0], soft: 10.0 },
  8: { ideal: [6.0, 10.0], soft: 12.0 }
};

// ---------- Check runner ----------
function runChecks(filePath) {
  const filename = path.basename(filePath);
  const html = readFileSafe(filePath);
  if (html == null) {
    return { filename, fileError: true, results: [] };
  }
  const results = [];

  function pass(name)          { results.push({ status: 'PASS', name }); }
  function fail(name, detail)  { results.push({ status: 'FAIL', name, detail }); }
  function warn(name, detail)  { results.push({ status: 'WARN', name, detail }); }

  // 1. No em-dashes (U+2014)
  {
    const c = (html.match(/—/g) || []).length;
    if (c === 0) pass('No em-dashes');
    else {
      const line = findLineNumber(html, '—');
      fail('No em-dashes', c + ' found, first at line ' + line);
    }
  }

  // 2. No en-dashes (U+2013)
  {
    const c = (html.match(/–/g) || []).length;
    if (c === 0) pass('No en-dashes');
    else {
      const line = findLineNumber(html, '–');
      fail('No en-dashes', c + ' found, first at line ' + line);
    }
  }

  // 3. Mastery screen present
  if (/id\s*=\s*["']masteryDone["']/.test(html)) pass('Mastery screen present');
  else fail('Mastery screen present', 'no id="masteryDone" element found');

  // 4. No Performance Task / Explain free-text / dead-end routing
  // Expanded after the Sam Reading bug where toExplain + secExplain + ptDone
  // gating left kids stranded on a dead-end page that wasn't caught by the
  // narrower id="ptDone" / textarea checks.
  {
    const bits = [];
    if (/id\s*=\s*["']ptDone["']/.test(html))
      bits.push('id="ptDone" button present');
    if (/<textarea[^>]*id\s*=\s*["']explainText["']/.test(html))
      bits.push('<textarea id="explainText"> present');
    if (/<section[^>]*id\s*=\s*["'](?:explainSec|ptSec)["']/.test(html))
      bits.push('<section id="explainSec/ptSec"> present');
    if (/(?:^|[^a-zA-Z])(?:toExplain|toPT|secExplain|secPT)(?:[^a-zA-Z]|$)/.test(html))
      bits.push('toExplain / toPT / secExplain / secPT reference present');
    if (/if\s*\(\s*passedB\s*&&\s*rec\.ptDone\s*\)/.test(html))
      bits.push('"passedB && rec.ptDone" gating present');
    if (/rmsg\.textContent\s*=\s*['"][^'"]*\b(?:explain in your own words|out[- ]loud|read.*?aloud|out-loud reading task|reading task)\b/i.test(html))
      bits.push('rmsg text references explain/out-loud activity');
    if (!bits.length) pass('No performance task / explain free-text / dead-end routing');
    else fail('No performance task / explain free-text / dead-end routing', bits.join('; '));
  }

  // 5. No parent rubric / grown-up notes
  {
    const bits = [];
    if (/grown-?up note/i.test(html)) bits.push('"Grown-up note" found');
    if (/parent note/i.test(html))    bits.push('"Parent note" found');
    if (/class\s*=\s*["'][^"']*\bcritrow\b/.test(html)) bits.push('class="critrow" found');
    if (!bits.length) pass('No parent rubric / grown-up notes');
    else fail('No parent rubric / grown-up notes', bits.join('; '));
  }

  // 6. syncCloud() defined
  {
    const hasDef = /function\s+syncCloud\b/.test(html) || /var\s+syncCloud\s*=/.test(html);
    if (hasDef) pass('syncCloud() defined');
    else fail('syncCloud() defined', 'no function syncCloud or var syncCloud = found');
  }

  // 7. syncCloud() called >=3 times (excluding the definition line)
  {
    const callCount = countOccurrences(html, 'syncCloud(');
    // Subtract definitions (each definition contributes one usage at "syncCloud(" in "function syncCloud(" etc.)
    const defMatches = (html.match(/function\s+syncCloud\s*\(/g) || []).length
                     + (html.match(/var\s+syncCloud\s*=\s*function\s*\(/g) || []).length;
    const realCalls = callCount - defMatches;
    if (realCalls >= 3) pass('syncCloud() called ' + realCalls + ' times (>=3)');
    else fail('syncCloud() called >=3 times', 'only ' + realCalls + ' call(s) detected');
  }

  // 8. Status string correct: contains 'passed', does NOT contain 'mastered' as a status string
  {
    const hasPassed = /['"]passed['"]/.test(html);
    // We want to flag 'mastered' as a status string, not the word in prose like "Mastered."
    const masteredAsStatus = /status\s*[:=]\s*['"]mastered['"]/.test(html)
                          || /['"]mastered['"]\s*[,;)\]\}]/.test(html);
    if (hasPassed && !masteredAsStatus) pass("Status string is 'passed' not 'mastered'");
    else {
      const bits = [];
      if (!hasPassed) bits.push("'passed' string not found");
      if (masteredAsStatus) bits.push("'mastered' used as status string");
      fail("Status string is 'passed' not 'mastered'", bits.join('; '));
    }
  }

  // 9. 24h gate present (formAPassedAt write AND check)
  {
    if (/formAPassedAt/.test(html)) pass('24h gate field (formAPassedAt) present');
    else fail('24h gate field (formAPassedAt) present', 'no reference to formAPassedAt');
  }

  // 10. Animated bg present
  {
    const hasArt = /class\s*=\s*["'][^"']*\blesson-bg-art\b/.test(html);
    const hasKf  = /@keyframes\s+lessonDrift1/.test(html);
    if (hasArt && hasKf) pass('Animated background present');
    else {
      const bits = [];
      if (!hasArt) bits.push('no .lesson-bg-art element');
      if (!hasKf)  bits.push('no @keyframes lessonDrift1');
      fail('Animated background present', bits.join('; '));
    }
  }

  // 11. Reduced-motion handled
  {
    if (/prefers-reduced-motion/.test(html)) pass('prefers-reduced-motion handled');
    else fail('prefers-reduced-motion handled', 'no @media (prefers-reduced-motion) rule found');
  }

  // 12. Name bridge wired
  {
    const readsKid = /\?kid=/.test(html) || /activeKid/.test(html);
    const populator = /__sname/.test(html);
    if (readsKid && populator) pass('Name bridge wired (?kid= or activeKid + __sname)');
    else {
      const bits = [];
      if (!readsKid) bits.push('no ?kid= or activeKid read');
      if (!populator) bits.push('no __sname populator');
      fail('Name bridge wired', bits.join('; '));
    }
  }

  // 13/14. External deps clean and self-contained
  {
    // Find all hrefs and srcs pointing to http(s)
    const remoteHrefs = [];
    const hrefRegex = /\b(?:href|src)\s*=\s*["'](https?:\/\/[^"']+)["']/gi;
    let m;
    while ((m = hrefRegex.exec(html)) !== null) {
      const url = m[1];
      const ok = /^https?:\/\/fonts\.googleapis\.com(\/|$)/.test(url)
              || /^https?:\/\/fonts\.gstatic\.com(\/|$)/.test(url);
      if (!ok) remoteHrefs.push(url);
    }
    if (remoteHrefs.length === 0) pass('External deps clean (Google Fonts only)');
    else fail('External deps clean', 'non-Google-Fonts URL(s): ' + remoteHrefs.slice(0,3).join(', ') + (remoteHrefs.length > 3 ? ' (+' + (remoteHrefs.length-3) + ' more)' : ''));

    // Self-contained (no <img src="https... or <script src="https...)
    const remoteImg = /<img\b[^>]*\bsrc\s*=\s*["']https?:\/\//i.test(html);
    const remoteScript = /<script\b[^>]*\bsrc\s*=\s*["']https?:\/\//i.test(html);
    if (!remoteImg && !remoteScript) pass('Self-contained (no remote images or scripts)');
    else {
      const bits = [];
      if (remoteImg) bits.push('remote <img> src');
      if (remoteScript) bits.push('remote <script> src');
      fail('Self-contained', bits.join('; '));
    }
  }

  // 15. Answer-key distribution
  {
    // Extract a:NUMBER occurrences inside item bank objects.
    // Pattern is "a:NUMBER" or "a: NUMBER", typically followed by ",".
    const aRegex = /\ba\s*:\s*(\d+)\b/g;
    const dist = {};
    let total = 0;
    let mm;
    while ((mm = aRegex.exec(html)) !== null) {
      // Only count when followed by a comma or closing brace within a short window
      // (loose, but avoids stray matches like CSS lengths)
      const after = html.slice(aRegex.lastIndex, aRegex.lastIndex + 4);
      if (!/^\s*[,}\]]/.test(after)) continue;
      const v = mm[1];
      dist[v] = (dist[v] || 0) + 1;
      total++;
    }
    if (total < 8) {
      warn('Answer-key distribution', 'only ' + total + ' a:N items found (cannot evaluate spread)');
    } else {
      const maxKey = Object.keys(dist).reduce((a,b) => dist[a] >= dist[b] ? a : b);
      const maxPct = dist[maxKey] / total;
      if (maxPct > 0.5) {
        fail('Answer-key distribution', "value '" + maxKey + "' appears in " + dist[maxKey] + ' of ' + total + ' items (' + Math.round(maxPct*100) + '%, max 50%)');
      } else {
        const summary = Object.keys(dist).sort().map(k => k + ':' + dist[k]).join(', ');
        pass('Answer-key distribution (' + summary + ' over ' + total + ')');
      }
    }
  }

  // 16. Standard code present
  {
    // Common MO standard patterns: 2.RF.3.A.a, 3.NBT.A.2, 8.NS.A.1, 6-8.PS, 2.L.1.B.f, 8.EEI.A.1
    // Subparts can be lowercase letters (e.g., .a in 2.RF.3.A.a).
    const stdRegex = /\b\d(?:-\d)?\.[A-Z]{1,4}(?:\.[A-Za-z0-9]+){1,4}\b/;
    if (stdRegex.test(html)) pass('Standard code present');
    else fail('Standard code present', 'no MO-style standard code found (e.g. 2.RF.3.A.a)');
  }

  // 17. Reading level
  {
    const grade = detectGrade(filename, html);
    const text = extractVisibleText(html);
    const fk = fleschKincaidGrade(text);
    if (!fk) {
      warn('Reading level', 'could not compute (no sentences detected)');
    } else if (!grade || !READING_TARGETS[grade]) {
      warn('Reading level', 'FK=' + fk.grade + ' (no target for detected grade ' + grade + ')');
    } else {
      const t = READING_TARGETS[grade];
      const inRange = (fk.grade >= t.ideal[0] && fk.grade <= t.ideal[1]);
      const withinSoft = fk.grade <= t.soft;
      const label = 'G' + grade + ' target ' + t.ideal[0] + '-' + t.ideal[1];
      if (inRange) pass('Reading level FK=' + fk.grade + ' ' + label);
      else if (withinSoft) warn('Reading level', 'FK=' + fk.grade + ' outside ideal ' + label + ' (within soft cap ' + t.soft + ')');
      else warn('Reading level', 'FK=' + fk.grade + ' above soft cap ' + t.soft + ' for ' + label);
    }
  }

  return { filename, fileError: false, results };
}

// ---------- Output ----------
function printReport(rep, opts) {
  opts = opts || {};
  console.log('=== VALIDATION: ' + rep.filename + ' ===');
  if (rep.fileError) {
    console.log(C.red + '[ERROR]' + C.reset + ' could not read file');
    return { pass: 0, fail: 1, warn: 0 };
  }
  let p = 0, f = 0, w = 0;
  for (const r of rep.results) {
    if (r.status === 'PASS') {
      p++;
      console.log(C.green + '[PASS]' + C.reset + ' ' + r.name);
    } else if (r.status === 'FAIL') {
      f++;
      console.log(C.red + '[FAIL]' + C.reset + ' ' + r.name + (r.detail ? '  ' + C.dim + '(' + r.detail + ')' + C.reset : ''));
    } else if (r.status === 'WARN') {
      w++;
      console.log(C.yellow + '[WARN]' + C.reset + ' ' + r.name + (r.detail ? '  ' + C.dim + '(' + r.detail + ')' + C.reset : ''));
    }
  }
  console.log('SUMMARY: ' + p + ' PASS / ' + f + ' FAIL / ' + w + ' WARN');
  return { pass: p, fail: f, warn: w };
}

// ---------- Main ----------
function main() {
  const argv = process.argv.slice(2);
  if (!argv.length) {
    console.error('Usage:');
    console.error('  node tools/validate_lesson.cjs "<lesson.html>"');
    console.error('  node tools/validate_lesson.cjs --all');
    process.exit(2);
  }

  if (argv[0] === '--all') {
    const cwd = path.resolve(__dirname, '..');
    const files = fs.readdirSync(cwd)
      .filter(f => f.endsWith('.html'))
      .filter(f => !/^(welcome|dashboard|index|Build Tracker)\b/i.test(f))
      .filter(f => !/Dashboard|Schedule|Index/i.test(f));
    let totalP = 0, totalF = 0, totalW = 0;
    const rows = [];
    for (const f of files) {
      const fp = path.join(cwd, f);
      const rep = runChecks(fp);
      const counts = (function(){
        let p=0,fl=0,w=0;
        for (const r of rep.results){ if(r.status==='PASS')p++; else if(r.status==='FAIL')fl++; else w++; }
        return {p,fl,w};
      })();
      rows.push({ file: f, ...counts });
      totalP += counts.p; totalF += counts.fl; totalW += counts.w;
    }
    // Print summary table
    console.log('=== --all SUMMARY ===');
    const pad = (s, n) => (s + ' '.repeat(n)).slice(0, n);
    console.log(pad('file', 70) + '  PASS  FAIL  WARN');
    for (const row of rows) {
      const tag = row.fl > 0 ? C.red : (row.w > 0 ? C.yellow : C.green);
      console.log(tag + pad(row.file, 70) + C.reset + '   ' + String(row.p).padStart(2) + '    ' + String(row.fl).padStart(2) + '    ' + String(row.w).padStart(2));
    }
    console.log('---');
    console.log('TOTAL: ' + totalP + ' PASS / ' + totalF + ' FAIL / ' + totalW + ' WARN over ' + rows.length + ' files');
    process.exit(totalF > 0 ? 1 : 0);
    return;
  }

  let totalFail = 0;
  for (const arg of argv) {
    const fp = path.isAbsolute(arg) ? arg : path.resolve(process.cwd(), arg);
    const rep = runChecks(fp);
    const counts = printReport(rep);
    totalFail += counts.fail;
    console.log('');
  }
  process.exit(totalFail > 0 ? 1 : 0);
}

main();
