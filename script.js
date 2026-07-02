const firebaseConfig = {
  apiKey: "AIzaSyCpJlIVF-qgGOKK1hUCU1sOToP4UgGVv3s",
  authDomain: "ninjago-magazin-cc4a9.firebaseapp.com",
  projectId: "ninjago-magazin-cc4a9",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const container = document.getElementById("container");
const counter = document.getElementById("counter");

const docRef = db.collection("magazines").doc("state");

const items = [
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
  "dr-2026-03.webp"
];

let state = { owned: [] };

// realtime
docRef.onSnapshot(doc => {
  if (doc.exists) {
    state = doc.data();
  }
  render();
});

// toggle
function toggle(id) {
  if (!state.owned) state.owned = [];

  if (state.owned.includes(id)) {
    state.owned = state.owned.filter(x => x !== id);
  } else {
    state.owned.push(id);
  }

  docRef.set(state);
}

window.toggle = toggle;

// render
function render() {
  container.innerHTML = "";

  let count = 0;

  items.forEach(file => {
    const id = file.replace(".webp", "");
    const isOwned = state.owned?.includes(id);

    if (isOwned) count++;

    container.innerHTML += `
      <div class="card ${isOwned ? "owned" : ""}">
        <img src="covers/${file}">
        <p>${id}</p>

        <button onclick="toggle('${id}')"
          style="background:${isOwned ? "#2ecc71" : "#555"}">
          ${isOwned ? "Megvan ✔" : "Nincs meg"}
        </button>
      </div>
    `;
  });

  counter.innerHTML = `Megvan: ${count} / ${items.length}`;
}

render();
