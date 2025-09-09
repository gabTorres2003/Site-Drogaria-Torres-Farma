import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCA02SDjDBad9wycFhi_JeGF-Bd7x1fRn4",
  authDomain: "dashboard-torres-farma.firebaseapp.com",
  projectId: "dashboard-torres-farma",
  storageBucket: "dashboard-torres-farma.firebasestorage.app",
  messagingSenderId: "648619809572",
  appId: "1:648619809572:web:0f82701ede63ea8e5ef1b1",
  measurementId: "G-DT242TH2N9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);