// ============================================================
// firebase-config.js — Initialize Firebase Services
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// TODO: Replace this with your actual Firebase config object
// You can find this in your Firebase Console > Project Settings
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Only initialize if there's a valid config (to prevent breaking the site for now)
let app, db, auth;

if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
}

// Export for use in other files (if using modules) or attach to window for standard scripts
window.db = db;
window.auth = auth;
