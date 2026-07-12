'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

function getInitialDark() {
  if (typeof document === 'undefined') return false;
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(getInitialDark());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (e) {
      /* ignore storage errors */
    }
  }, [dark, mounted]);

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-pressed={dark}
      onClick={() => setDark((value) => !value)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className={styles.icon} aria-hidden="true">
        {dark ? '\u2600' : '\u263E'}
      </span>
      <span className={styles.label}>{dark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
