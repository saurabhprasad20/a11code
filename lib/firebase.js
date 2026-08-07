// Firebase initialization for A11Code.
//
// The values below are the public Firebase Web app configuration. For Firebase
// web apps these identifiers (including apiKey) are meant to be shipped in the
// client bundle — they identify the project, they are not secrets. Access is
// controlled by Firebase Authentication and Security Rules, not by hiding this
// config. No passwords are ever stored by this app: sign-in is delegated to
// Google via OAuth.

import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAg0MzsKHzbmSM77Y-MUg9RXm6CWs5w2EA',
  authDomain: 'a11code-web.firebaseapp.com',
  projectId: 'a11code-web',
  storageBucket: 'a11code-web.firebasestorage.app',
  messagingSenderId: '24559074281',
  appId: '1:24559074281:web:80fcf35e67936053ff2978',
};

export function getFirebaseApp() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}
