// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ✅ Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBQrv0DOhdMK7TMANj5uzdmQFr73u5n41Y",
  authDomain: "vidya45-56d45.firebaseapp.com",
  projectId: "vidya45-56d45",
  storageBucket: "vidya45-56d45.firebasestorage.app",
  messagingSenderId: "468364428409",
  appId: "1:468364428409:web:320a4e0cdaae551a50c0a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Hardcoding doctor ID (later replace with login session)
const doctorId = "doctor1"; 

// Load doctor details from Firestore
async function loadDoctorProfile() {
  const docRef = doc(db, "doctors", doctorId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    document.getElementById("doctorName").innerText = data.fullName;
    const details = document.getElementById("doctorDetails");
    details.innerHTML = `
      <h2>${data.fullName}</h2>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Specialization:</strong> ${data.specialization}</p>
      <p><strong>Experience:</strong> ${data.experience} Years</p>
      <p><strong>Hospital:</strong> ${data.hospital}</p>
      <p><strong>Qualifications:</strong> ${data.qualifications}</p>
      <p><strong>Consultation Timings:</strong> ${data.timings}</p>
      <p><strong>Languages:</strong> ${data.languages}</p>
      <div class="social-links">
        <p><strong>Social Media:</strong></p>
        <a href="${data.facebook}" target="_blank">Facebook</a> |
        <a href="${data.instagram}" target="_blank">Instagram</a>
      </div>
    `;

    // Prefill form
    document.getElementById("editName").value = data.fullName;
    document.getElementById("editEmail").value = data.email;
    document.getElementById("editSpecialization").value = data.specialization;
    document.getElementById("editExperience").value = data.experience;
    document.getElementById("editHospital").value = data.hospital;
    document.getElementById("editQualifications").value = data.qualifications;
    document.getElementById("editTimings").value = data.timings;
    document.getElementById("editLanguages").value = data.languages;
    document.getElementById("editFacebook").value = data.facebook;
    document.getElementById("editInstagram").value = data.instagram;
  } else {
    console.log("No doctor profile found!");
  }
}

// Save changes to Firestore
document.getElementById("editForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedData = {
    fullName: document.getElementById("editName").value,
    email: document.getElementById("editEmail").value,
    specialization: document.getElementById("editSpecialization").value,
    experience: document.getElementById("editExperience").value,
    hospital: document.getElementById("editHospital").value,
    qualifications: document.getElementById("editQualifications").value,
    timings: document.getElementById("editTimings").value,
    languages: document.getElementById("editLanguages").value,
    facebook: document.getElementById("editFacebook").value,
    instagram: document.getElementById("editInstagram").value
  };

  await setDoc(doc(db, "doctors", doctorId), updatedData);

  alert("Profile updated successfully!");
  loadDoctorProfile(); // Refresh display
});

// Load data on page load
loadDoctorProfile();
