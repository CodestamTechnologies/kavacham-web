// lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const requiredFields = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID'
  ];

  const missingFields = requiredFields.filter(field => !process.env[field]);
  
  if (missingFields.length > 0) {
    console.error('❌ Missing Firebase environment variables:', missingFields);
    throw new Error(`Missing Firebase configuration: ${missingFields.join(', ')}`);
  }

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