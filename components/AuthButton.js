'use client';

import { useAuth } from './AuthProvider';
import styles from './AuthButton.module.css';

export default function AuthButton() {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <span className={styles.status} role="status" aria-live="polite">
        &hellip;
      </span>
    );
  }

  if (user) {
    const name = user.displayName || user.email || 'Account';
    return (
      <div className={styles.wrap}>
        <span className={styles.greeting} title={name}>
          {user.displayName ? user.displayName.split(' ')[0] : name}
        </span>
        <button
          type="button"
          className={styles.button}
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button type="button" className={styles.button} onClick={() => signIn()}>
      Sign in
    </button>
  );
}
