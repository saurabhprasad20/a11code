// Pure editing logic for the accessible code editor in the Code Playground.
//
// Given the current textarea value, the caret/selection, and a key event, these
// functions decide how to transform the text to provide the "code editor"
// conveniences learners expect: auto-indentation on Enter, auto-closing of
// brackets and quotes, indent/dedent with Tab, skipping over a closing
// character, and deleting an empty pair with Backspace.
//
// The logic is deliberately kept as a pure function (no DOM) so it can be unit
// tested and so the caller can apply the change through the browser's own edit
// pipeline (document.execCommand) to preserve native undo/redo.

export const INDENT = '    '; // four spaces

const PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };
const OPENERS = new Set(['(', '[', '{']);
const CLOSERS = new Set([')', ']', '}', '"', "'", '`']);
const QUOTES = new Set(['"', "'", '`']);

function lineStart(value, pos) {
  return value.lastIndexOf('\n', pos - 1) + 1;
}

function leadingWhitespace(s) {
  const m = s.match(/^[ \t]*/);
  return m ? m[0] : '';
}

const isWord = (ch) => /[A-Za-z0-9_]/.test(ch);

// Returns an edit descriptor, or null to let the browser handle the key
// normally. Descriptor shapes:
//   { from, to, text, selStart, selEnd }  -> replace value[from..to] with text
//   { caret }                             -> only move the caret (no text change)
export function computeEdit({ key, shiftKey, ctrlKey, metaKey, altKey, value, start, end }) {
  // Never interfere with keyboard shortcuts (Ctrl/Cmd/Alt combos), except the
  // plain Tab/Enter/Backspace keys which carry no printable character.
  if ((ctrlKey || metaKey || altKey) && key !== 'Tab') return null;

  const hasSel = start !== end;
  const selected = value.slice(start, end);
  const prevChar = start > 0 ? value[start - 1] : '';
  const nextChar = end < value.length ? value[end] : '';

  // ----- Enter: preserve indentation, and add a level after an opener/colon.
  if (key === 'Enter' && !shiftKey) {
    const ls = lineStart(value, start);
    const lineToCursor = value.slice(ls, start);
    const indent = leadingWhitespace(lineToCursor);
    const trimmed = lineToCursor.trim();

    // Pressing Enter between an empty pair like {  } or (  ) opens a block:
    // the closing character drops to its own line and the caret rests on an
    // indented middle line.
    if (OPENERS.has(prevChar) && nextChar === PAIRS[prevChar]) {
      const inner = indent + INDENT;
      const text = '\n' + inner + '\n' + indent;
      const caret = start + 1 + inner.length;
      return { from: start, to: end, text, selStart: caret, selEnd: caret };
    }

    const opensBlock =
      OPENERS.has(prevChar) || /[:{([]$/.test(trimmed) || trimmed.endsWith(':');
    const text = '\n' + indent + (opensBlock ? INDENT : '');
    const caret = start + text.length;
    return { from: start, to: end, text, selStart: caret, selEnd: caret };
  }

  // ----- Tab / Shift+Tab: indent or dedent line(s).
  if (key === 'Tab') {
    const regionStart = lineStart(value, start);
    const region = value.slice(regionStart, end);
    const lines = region.split('\n');
    let firstDelta = 0;
    let totalDelta = 0;

    const newLines = lines.map((ln, i) => {
      if (shiftKey) {
        const m = ln.match(/^( {1,4}|\t)/);
        const removed = m ? m[0].length : 0;
        if (i === 0) firstDelta = removed;
        totalDelta += removed;
        return ln.slice(removed);
      }
      // Do not indent a trailing empty line produced by a selection that ends
      // exactly at a line break.
      if (i === lines.length - 1 && ln === '' && lines.length > 1) return ln;
      if (i === 0) firstDelta = INDENT.length;
      totalDelta += INDENT.length;
      return INDENT + ln;
    });

    const text = newLines.join('\n');
    if (shiftKey) {
      const selStart = Math.max(regionStart, start - firstDelta);
      const selEnd = Math.max(selStart, end - totalDelta);
      return { from: regionStart, to: end, text, selStart, selEnd };
    }
    // Single caret (no selection): just insert one indent unit at the caret.
    if (!hasSel) {
      return {
        from: start,
        to: end,
        text: INDENT,
        selStart: start + INDENT.length,
        selEnd: start + INDENT.length,
      };
    }
    const selStart = start + firstDelta;
    const selEnd = end + totalDelta;
    return { from: regionStart, to: end, text, selStart, selEnd };
  }

  // ----- Backspace: delete an empty pair such as ()  []  {}  ""  ''  ``.
  if (key === 'Backspace' && !hasSel && PAIRS[prevChar] && nextChar === PAIRS[prevChar]) {
    return { from: start - 1, to: end + 1, text: '', selStart: start - 1, selEnd: start - 1 };
  }

  // ----- Printable single characters.
  if (key.length === 1) {
    // Type a closing character when the same one is right ahead: step over it
    // instead of inserting a duplicate.
    if (CLOSERS.has(key) && !hasSel && nextChar === key) {
      return { caret: start + 1 };
    }

    // Opener or quote: wrap a selection, or insert a matching closer.
    if (PAIRS[key]) {
      const close = PAIRS[key];
      if (hasSel) {
        const text = key + selected + close;
        return { from: start, to: end, text, selStart: start + 1, selEnd: end + 1 };
      }
      // Quote guard: avoid auto-closing when it is likely an apostrophe inside
      // a word (for example don't) or when typing right before a word.
      if (QUOTES.has(key) && isWord(prevChar)) return null;
      if (isWord(nextChar)) return null;

      return { from: start, to: end, text: key + close, selStart: start + 1, selEnd: start + 1 };
    }
  }

  return null;
}
