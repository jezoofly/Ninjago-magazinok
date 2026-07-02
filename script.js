import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 IDE JÖN A TE CONFIGOD
const firebaseConfig = {
  apiKey: "AIzaSyCpJlIVF-qgGOKK1hUCU1sOToP4UgGVv3s",
  authDomain: "ninjago-magazin-cc4a9.firebaseapp.com",
  projectId: "ninjago-magazin-cc4a9",
  storageBucket: "ninjago-magazin-cc4a9.firebasestorage.app",
  messagingSenderId: "523873001942",
  appId: "1:523873001942:web:eca9202f7449020f400477"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.getElementById("container");
const counter = document.getElementById("counter");

const imageList = [
  "legacy-2025-01.webp",
  "legacy-2025-02.webp",
  "legacy-2025-03.webp",
  "legacy-2025-04.webp",
  "legacy-2025-05.webp",
  "legacy-2025-06.webp",
  "legacy-2026-01.webp",
  "legacy-2026-02.webp",
  "legacy-2026-03.webp",

  "dr-2025-01.webp",
  "dr-2025-02.webp",
  "dr-2025-03.webp",
  "dr-2025-04.webp",
  "dr-2025-05.webp",
  "dr-2025-06.webp",
  "dr-2025-07.webp",
  "dr-2026-01.webp",
  "dr-2026-02.webp",
  "dr-2026-03.webp",
];

// 🔥 Firestore doc
const ref = doc(db, "magazines", "state");

// alap állapot
let state = { owned: [] };

// realtime sync
onSnapshot(ref, (snap) => {
  if (snap.exists()) {
    state = snap.data();
  }
  render();
});

// toggle
async function toggle(id) {
  if (!state.owned) state.owned = [];

  if (state.owned.includes(id)) {
    state.owned = state.owned.filter(x => x !== id);
  } else {
    state.owned.push(id);
  }

  await setDoc(ref, state);
}

// render
function render() {
  container.innerHTML = "";

  let legacyOwned = 0;
  let drOwned = 0;
  let legacyTotal = 0;
  let drTotal = 0;

  imageList.forEach(file => {
    const id = file.replace(".webp", "");
    const series = file.startsWith("legacy") ? "Legacy" : "Dragons Rising";
    const isOwned = state.owned?.includes(id);

    if (series === "Legacy") legacyTotal++;
    if (series === "Dragons Rising") drTotal++;

    if (isOwned) {
      if (series === "Legacy") legacyOwned++;
      if (series === "Dragons Rising") drOwned++;
    }

    container.innerHTML += `
      <div class="card ${isOwned ? "owned" : ""}">
        <img src="covers/${file}">
        <h3>${series}</h3>
        <p>${id}</p>

        <button onclick="toggle('${id}')"
          style="background:${isOwned ? "#2ecc71" : "#555"}">
          ${isOwned ? "Megvan ✔" : "Nincs meg"}
        </button>
      </div>
    `;
  });

  counter.innerHTML = `
    🟡 Legacy: ${legacyOwned}/${legacyTotal}<br>
    🔵 Dragons Rising: ${drOwned}/${drTotal}
  `;
}

window.toggle = toggle;
