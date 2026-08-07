'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import styles from './CourseGate.module.css';

export default function CourseGate({ children }) {
  const { user, loading, authError, signIn } = useAuth();
  const [signingIn, setSigningIn] = useState(false);

  async function handleSignIn() {
    setSigningIn(true);
    try {
      await signIn();
    } catch (e) {
      // Error message is surfaced via authError from the provider.
    } finally {
      setSigningIn(false);
    }
  }

  if (loading) {
    return (
      <div className="page-content">
        <div className="container">
          <p role="status" aria-live="polite" className={styles.status}>
            Checking your sign-in status&hellip;
          </p>
        </div>
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  return (
    <div className="page-content">
      <div className="container">
        <section className={styles.gate} aria-labelledby="signin-heading">
          <h1 id="signin-heading" className={styles.gateHeading}>
            Sign in to view this course
          </h1>
          <p className={styles.gateText}>
            Course content is available to signed-in learners. To read the
            chapters, please sign in with your Google account. We do not store
            passwords &mdash; sign-in is handled securely by Google.
          </p>

          <button
            type="button"
            className={styles.signInButton}
            onClick={handleSignIn}
            disabled={signingIn}
            aria-busy={signingIn}
          >
            <span className={styles.googleMark} aria-hidden="true">
              <svg viewBox="0 0 18 18" width="18" height="18" focusable="false">
                <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92A8.78 8.78 0 0 0 17.64 9.2z" />
                <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.34A9 9 0 0 0 9 18z" />
                <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.94H.96a9 9 0 0 0 0 8.12l3.01-2.34z" />
                <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.94l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58z" />
              </svg>
            </span>
            {signingIn ? 'Opening Google sign-in\u2026' : 'Sign in with Google'}
          </button>

          {authError ? (
            <p role="alert" className={styles.error}>
              {authError}
            </p>
          ) : null}

          <p className={styles.backLink}>
            <Link href="/courses">&larr; Back to all courses</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
