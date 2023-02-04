import { initializeApp } from "firebase/app";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOGWIIKixpSJv2iUts5-RrcGJ3I0QncIY",
  authDomain: "santa-ines-jard.firebaseapp.com",
  projectId: "santa-ines-jard",
  storageBucket: "santa-ines-jard.appspot.com",
  messagingSenderId: "145381176859",
  appId: "1:145381176859:web:f9b5c033031f9dd3c22abe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const checkUser = async (auth, email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed incxi
      //console.log(userCredential);
      return userCredential.user.accessToken;
    })
    .catch((error) => {
      return [error.message];
    });
};
