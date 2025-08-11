// firebase-config.js
// Replace with your own Firebase project configuration

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// References
const db = firebase.database();
const storage = firebase.storage();

// Example security rules (set in Firebase console):
/*
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
*/
