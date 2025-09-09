import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

document.getElementById("registrationForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const specialization = document.getElementById("specialization").value;
    const phone = document.getElementById("phone").value;
    const hospital = document.getElementById("hospital").value;
    const experience = document.getElementById("experience").value;
    const regNo = document.getElementById("regNo").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "doctors", user.uid), {
            name,
            email,
            specialization,
            phone,
            hospital,
            experience,
            regNo
        });

        alert("Registration successful! You can now log in.");
        window.location.href = "Vlogin.html";
    } catch (error) {
        alert("Registration failed: " + error.message);
    }
});