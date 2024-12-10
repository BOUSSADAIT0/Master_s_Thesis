import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

  // // Import the functions you need from the SDKs you need
  // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
  // // TODO: Add SDKs for Firebase products that you want to use
  // // https://firebase.google.com/docs/web/setup#available-libraries

  // // Your web app's Firebase configuration
  // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseApp =initializeApp( {
    apiKey: "AIzaSyBbejAPdqCuEU-J5sDafR1WxJyJrnnAi2M",
    authDomain: "by-app-1.firebaseapp.com",
    projectId: "by-app-1",
    storageBucket: "by-app-1.appspot.com",
    messagingSenderId: "996602410630",
    appId: "1:996602410630:web:b11f55511908041131c307",
    measurementId: "G-NF9XVVNLXN"
  });

  // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  const auth = getAuth(firebaseApp);

  onAuthStateChanged(auth, user => {
  if(user != null) {
  console.log(' logged in!');
  } else {
  console.log("No user");}
  });