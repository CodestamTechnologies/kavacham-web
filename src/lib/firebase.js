// lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Use the main Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlLjwyCCSZv9qzcP6UYLZ8EGKUcuCXkGM",
  authDomain: "kavachamtalks-271f5.firebaseapp.com",
  projectId: "kavachamtalks-271f5",
  storageBucket: "kavachamtalks-271f5.firebasestorage.app",
  messagingSenderId: "780054150448",
  appId: "1:780054150448:web:ee95fe7fd291fcb3c49cf5",
  measurementId: "G-VRN58BN7QX"
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  // Check if any values are undefined or empty
  const emptyFields = Object.entries(firebaseConfig)
    .filter(([key, value]) => !value || value === 'undefined')
    .map(([key]) => key);

  if (emptyFields.length > 0) {
    console.error('❌ Empty Firebase configuration values:', emptyFields);
    throw new Error(`Empty Firebase configuration values: ${emptyFields.join(', ')}`);
  }
};

// Initialize Firebase app (prevent multiple initialization)
let app;
try {
  // Validate configuration first
  validateFirebaseConfig();
  
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

export { db };
export default app;