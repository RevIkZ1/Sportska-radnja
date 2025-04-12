import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlc-1W7RI9R_-OYcu-ulehWP5DNi8YGk8",
  authDomain: "rwaanime.firebaseapp.com",
  projectId: "rwaanime",
  storageBucket: "rwaanime.appspot.com",
  messagingSenderId: "67432391430",
  appId: "1:67432391430:web:300889cf97dc7f7ccd7487",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
