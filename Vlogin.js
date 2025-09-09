import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ! IMPORTANT: Replace this with your project's configuration object from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBQrv0DOhdMK7TMANj5uzdmQFr73u5n41Y",
  authDomain: "vidya45-56d45.firebaseapp.com",
  projectId: "vidya45-56d45",
  storageBucket: "vidya45-56d45.firebasestorage.app",
  messagingSenderId: "468364428409",
  appId: "1:468364428409:web:320a4e0cdaae551a50c0a8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const docRef = doc(db, "doctors", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const doctorData = docSnap.data();
            localStorage.setItem("doctor", JSON.stringify(doctorData));
            window.location.href = "Vdoctorchat.html";
        } else {
            alert("Doctor profile not found.");
        }
    } catch (error) {
        alert("Login failed: " + error.message);
    }
});