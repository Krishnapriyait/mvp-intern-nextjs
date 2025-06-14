import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfKixI_sJVk0rjSi9pZPjk7tjcR_Kkl3k",
  authDomain: "fooddonationportal.firebaseapp.com",
  projectId: "fooddonationportal",
  storageBucket: "fooddonationportal.appspot.com",
  messagingSenderId: "80436554332",
  appId: "1:80436554332:web:bf74f2190f2a1ed6ac9499",
  measurementId: "G-GBFYQNC7N1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
