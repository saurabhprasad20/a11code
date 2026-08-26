'use client';

import { useEffect, useRef, useState } from 'react';
import { LANGUAGES, getLanguage, runCode } from '../lib/executor';
import styles from './Playground.module.css';

const STORAGE_PREFIX = 'a11code-playground:';

function buildSamples() {
  const map = {};
  for (const lang of LANGUAGES) map[lang.id] = lang.sample;
  return map;
}

export default function Playground() {
  const [languageId, setLanguageId] = useState(LANGUAGES[0].id);
  const [codeByLang, setCodeByLang] = useState(buildSamples);
  const [stdin, setStdin] = useState('');
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const outputRef = useRef(null);
  const hydrated = useRef(false);

  const language = getLanguage(languageId);
  const code = codeByLang[languageId] ?? '';

  // Restore any code the learner saved earlier (per language), after the first
  // render so the server and client markup match.
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    if (typeof window === 'undefined') return;
    setCodeByLang((prev) => {
      const next = { ...prev };
      for (const lang of LANGUAGES) {
        try {
          const saved = window.localStorage.getItem(STORAGE_PREFIX + lang.id);
          if (saved !== null) next[lang.id] = saved;
        } catch (e) {
          /* localStorage unavailable; ignore */
        }
      }
      return next;
    });
  }, []);

  function updateCode(value) {
    setCodeByLang((prev) => ({ ...prev, [languageId]: value }));
    try {
      window.localStorage.setItem(STORAGE_PREFIX + languageId, value);
    } catch (e) {
      /* ignore */
    }
  }

  function handleLanguageChange(e) {
    setLanguageId(e.target.value);
    setResult(null);
    setErrorMessage('');
    setStatus('');
  }

  function resetToExample() {
    const sample = getLanguage(languageId).sample;
    updateCode(sample);
    setStatus('The example program has been loaded into the editor.');
  }

  async function handleRun() {
    if (running) return;
    setRunning(true);
    setResult(null);
    setErrorMessage('');
    setStatus('Running your ' + language.label + ' program. Please wait.');
    try {
      const res = await runCode({ languageId, code, stdin });
      setResult(res);
      setStatus(summarize(res));
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong while running your program.');
      setStatus('The program could not be run. ' + (err.message || ''));
    } finally {
      setRunning(false);
      // Move focus to the results so screen-reader users land on the output.
      requestAnimationFrame(() => {
        if (outputRef.current) outputRef.current.focus();
      });
    }
  }

  function handleEditorKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
    }
  }

  return (
    <div className={styles.playground}>
      {/* Live status region: announces run start, completion and errors. */}
      <p className={styles.srStatus} role="status" aria-live="polite">
        {status}
      </p>

      <div className={styles.toolbar}>
        <div className={styles.field}>
          <label htmlFor="pg-language" className={styles.label}>
            Language
          </label>
          <select
            id="pg-language"
            className={styles.select}
            value={languageId}
            onChange={handleLanguageChange}
            disabled={running}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRun}
            disabled={running}
            aria-keyshortcuts="Control+Enter"
          >
            {running ? 'Running\u2026' : 'Run'}
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={resetToExample}
            disabled={running}
          >
            Reset to example
          </button>
        </div>
      </div>

      <div className={styles.editorGroup}>
        <label htmlFor="pg-code" className={styles.label}>
          Code editor
        </label>
        <p id="pg-code-help" className={styles.help}>
          Write your {language.label} program here. Press Control plus Enter (or
          Command plus Enter) to run it. The Tab key moves to the next control, so
          use spaces to indent your code.
        </p>
        <textarea
          id="pg-code"
          className={styles.editor}
          value={code}
          onChange={(e) => updateCode(e.target.value)}
          onKeyDown={handleEditorKeyDown}
          aria-describedby="pg-code-help"
          spellCheck="false"
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          wrap="off"
          rows={16}
        />
      </div>

      <div className={styles.editorGroup}>
        <label htmlFor="pg-stdin" className={styles.label}>
          Standard input (optional)
        </label>
        <p id="pg-stdin-help" className={styles.help}>
          Text you put here is sent to your program as its input, for example for
          Python&apos;s input() or C&apos;s scanf. Leave it empty if your program
          does not read input.
        </p>
        <textarea
          id="pg-stdin"
          className={styles.stdin}
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
          aria-describedby="pg-stdin-help"
          spellCheck="false"
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          rows={4}
        />
      </div>

      <section
        className={styles.output}
        aria-labelledby="pg-output-heading"
        tabIndex={-1}
        ref={outputRef}
      >
        <h2 id="pg-output-heading" className={styles.outputHeading}>
          Output
        </h2>
        <OutputBody running={running} result={result} errorMessage={errorMessage} />
      </section>
    </div>
  );
}

function summarize(res) {
  if (res.compileMessages && !res.success) {
    return 'Compilation failed. See the compilation messages in the Output section.';
  }
  let msg = 'Program finished with exit code ' + res.exitCode + '. ';
  if (res.stdoutLines > 0) {
    msg += 'The program output has ' + res.stdoutLines + ' line' + (res.stdoutLines === 1 ? '' : 's') + '. ';
  } else {
    msg += 'The program produced no output. ';
  }
  if (res.stderrLines > 0) {
    msg += 'There is also error output.';
  }
  return msg.trim();
}

function OutputBody({ running, result, errorMessage }) {
  if (running) {
    return (
      <p className={styles.placeholder}>Running&hellip; your results will appear here.</p>
    );
  }

  if (errorMessage) {
    return (
      <div className={styles.block}>
        <h3 className={styles.blockHeading}>Could not run the program</h3>
        <p className={styles.errorText}>{errorMessage}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <p className={styles.placeholder}>
        Run your program to see its output here. The result will include the
        program output, any error messages, and the exit code.
      </p>
    );
  }

  const nothing =
    !result.compileMessages && !result.stdout && !result.stderr;

  return (
    <div>
      {result.compileMessages ? (
        <div className={styles.block}>
          <h3 className={styles.blockHeading}>Compilation messages</h3>
          <pre className={styles.pre} tabIndex={0}>
            {result.compileMessages}
          </pre>
        </div>
      ) : null}

      {result.stdout ? (
        <div className={styles.block}>
          <h3 className={styles.blockHeading}>Program output</h3>
          <pre className={styles.pre} tabIndex={0}>
            {result.stdout}
          </pre>
        </div>
      ) : null}

      {result.stderr ? (
        <div className={styles.block}>
          <h3 className={styles.blockHeading}>Error output</h3>
          <pre className={`${styles.pre} ${styles.preError}`} tabIndex={0}>
            {result.stderr}
          </pre>
        </div>
      ) : null}

      {nothing ? (
        <p className={styles.placeholder}>
          Your program ran successfully but produced no output.
        </p>
      ) : null}

      <p className={styles.summary}>
        Finished with exit code{' '}
        <strong>{result.exitCode === null ? 'unknown' : result.exitCode}</strong>
        {result.signal ? ', stopped by signal ' + result.signal : ''}. Ran as{' '}
        {result.language}.
      </p>
    </div>
  );
}
