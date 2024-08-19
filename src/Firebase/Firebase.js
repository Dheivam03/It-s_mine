import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLv6ZQWXs0uZ4uIcKInp7ko7FN0sxvDFY",
  authDomain: "insta-clone-62afd.firebaseapp.com",
  projectId: "insta-clone-62afd",
  storageBucket: "insta-clone-62afd.appspot.com",
  messagingSenderId: "68402226572",
  appId: "1:68402226572:web:f7d1e2c5c67d4007e2a2a9",
  measurementId: "G-97YLLKE79Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
// const database = getDatabase(app)

// export default database

export { app,auth,firestore,storage }; 
