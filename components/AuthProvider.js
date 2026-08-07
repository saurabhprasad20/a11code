'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getFirebaseApp } from '../lib/firebase';

const AuthContext = createContext({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};
    let active = true;

    // If auth cannot resolve quickly (network/config), stop blocking the UI so
    // the sign-in prompt is shown instead of an indefinite "checking" state.
    const safety = setTimeout(() => {
      if (active) setLoading(false);
    }, 4000);

    // Firebase Auth relies on browser APIs, so load it only on the client.
    import('firebase/auth')
      .then(({ getAuth, onAuthStateChanged }) => {
        if (!active) return;
        const auth = getAuth(getFirebaseApp());
        unsubscribe = onAuthStateChanged(
          auth,
          (currentUser) => {
            setUser(currentUser);
            setLoading(false);
          },
          () => {
            setLoading(false);
          }
        );
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      clearTimeout(safety);
      unsubscribe();
    };
  }, []);

  async function signIn() {
    setAuthError(null);
    const { getAuth, GoogleAuthProvider, signInWithPopup } = await import(
      'firebase/auth'
    );
    const auth = getAuth(getFirebaseApp());
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      if (err && err.code === 'auth/popup-closed-by-user') return;
      setAuthError(
        'Sign-in could not be completed. Please try again.'
      );
      throw err;
    }
  }

  async function signOut() {
    const { getAuth, signOut: fbSignOut } = await import('firebase/auth');
    const auth = getAuth(getFirebaseApp());
    await fbSignOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, authError, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
