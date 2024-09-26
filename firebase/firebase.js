import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao",
  authDomain: "contacts-864eb.firebaseapp.com",
  projectId: "contacts-864eb",
  storageBucket: "contacts-864eb.appspot.com",
  messagingSenderId: "873464409138",
  appId: "1:873464409138:web:b84b82d690029b6067a02b",
  measurementId: "G-R2PW2S6BT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
