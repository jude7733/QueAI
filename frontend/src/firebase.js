import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB4HIdf3-LXbKuBOtO1oD8tbZ7wBDzmZrs",
  authDomain: "que--ai.firebaseapp.com",
  projectId: "que--ai",
  storageBucket: "que--ai.firebasestorage.app",
  messagingSenderId: "832975211812",
  appId: "1:832975211812:web:281fb623ec11da4c5237b1",
  measurementId: "G-WSPEYXLLYM"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)