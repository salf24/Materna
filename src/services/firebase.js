import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBq_6sVlJwWTP3lLJ1HjUh6CYUjn-Gmwp8",
  authDomain: "maternaapp-30e97.firebaseapp.com",
  projectId: "maternaapp-30e97",
  storageBucket: "maternaapp-30e97.firebasestorage.app",
  messagingSenderId: "119822082968",
  appId: "1:119822082968:web:cc3a6b87446c8614f481ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Auth instance 
export const auth = getAuth(app)


export const db = getFirestore(app)

export default app


