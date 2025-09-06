// lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBlLjwyCCSZv9qzcP6UYLZ8EGKUcuCXkGM",
  authDomain: "kavachamtalks-271f5.firebaseapp.com",
  projectId: "kavachamtalks-271f5",
  storageBucket: "kavachamtalks-271f5.firebasestorage.app",
  messagingSenderId: "780054150448",
  appId: "1:780054150448:web:ee95fe7fd291fcb3c49cf5",
  measurementId: "G-VRN58BN7QX"
};

// Initialize Firebase app (prevent multiple initialization)
let app;
try {
  // Check if Firebase app is already initialized
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized successfully');
  } else {
    app = getApp();
    console.log('✅ Firebase app already initialized');
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  throw error;
}

// Initialize Firestore
let db;
try {
  db = getFirestore(app);
  console.log('✅ Firestore initialized successfully');
} catch (error) {
  console.error('❌ Firestore initialization error:', error);
  throw error;
}

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
    console.log('✅ Firebase Analytics initialized successfully');
  } catch (error) {
    console.error('❌ Firebase Analytics initialization error:', error);
  }
}

export { db, analytics };
export default app;