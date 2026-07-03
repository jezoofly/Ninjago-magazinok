const firebaseConfig = {
  apiKey: "AIzaSyCpJlIVF-qgGOKK1hUCU1sOToP4UgGVv3s",
  authDomain: "ninjago-magazin-cc4a9.firebaseapp.com",
  projectId: "ninjago-magazin-cc4a9",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const container = document.getElementById("container");
const tabsDiv = document.getElementById("tabs");
const counter = document.getElementById("counter");

const docRef = db.collection("magazines").doc("state");

let state = { owned: [] };

let activeTab = "legacy";

const data = {
  legacy: [
    "legacy-2024-01.webp","legacy-2024-02.webp","legacy-2024-03.webp","legacy-2024-04.webp","legacy-2024-05.webp","legacy-2024-06.webp",
    "legacy-2025-01.webp","legacy-2025-02.webp","legacy-2025-03.webp","legacy-2025-04.webp","legacy-2025-05.webp","legacy-2025-06.webp",
    "legacy-2026-01.webp","legacy-2026-02.webp","legacy-2026-03.webp"
  ],
  dr: [
    "dr-2024-01.webp","dr-2024-02.webp","dr-2024-03.webp","dr-2024-05.webp","dr-2024-06.webp","dr-2024-07.webp",
    "dr-2025-01.webp","dr-2025-02.webp","dr-2025-03.webp","dr-2025-04.webp","dr-2025-05.webp","dr-2025-06.webp","dr-2025-07.webp",
    "dr-2026-01.webp","dr-2026-02.webp","dr-2026-03.webp"
  ],
  comic: [
    "comic-2025-01.webp","comic-2025-02.webp","comic-2025-03.webp","comic-2025-04.webp",
    "comic-2026-01.webp","comic-2026-02.webp"
  ],
  hero: [
    "hero-2024-01.webp","hero-2024-02.webp","hero-2024-03.webp",
    "hero-2025-01.webp","hero-2025-02.webp",
    "hero-2026-01.webp"
  ]
};

// FIREBASE SYNC
docRef.onSnapshot(doc => {
  if (doc.exists && doc.data().owned) {
    state = doc.data();
  } else {
    state = { owned: [] };
  }
  render();
});

// TOGGLE
function toggle(id) {
  if (!state.owned) state.owned = [];

  if (state.owned.includes(id)) {
    state.owned = state.owned.filter(x => x !== id);
  } else {
    state.owned.push(id);
  }

  docRef.set({ owned: state.owned });
}

window.toggle = toggle;

// TABS
function setTab(tab) {
  activeTab = tab;
  render();
}

window.setTab = setTab;

// RENDER
function render() {
  tabsDiv.innerHTML = Object.keys(data)
    .map(tab => `
      <button class="tab ${activeTab === tab ? "active" : ""}"
        onclick="setTab('${tab}')">
        ${tab.toUpperCase()}
      </button>
    `).join("");

  const list = data[activeTab];

  container.innerHTML = "";

  let count = 0;

  list.forEach(file => {
    const id = file.replace(".webp", "");
    const isOwned = state.owned.includes(id);

    if (isOwned) count++;

    container.innerHTML += `
      <div class="card ${isOwned ? "owned" : ""}">
        <img src="covers/${file}" onclick="openLightbox('covers/${file}')">

        <p>${id.replace("-", " / ")}</p>

        <button class="${isOwned ? "btn-owned" : "btn-not"}"
          onclick="toggle('${id}')">
          ${isOwned ? "Megvan ✔" : "Nincs meg"}
        </button>
      </div>
    `;
  });

  counter.innerHTML = `Megvan: ${count} / ${list.length}`;
}

// LIGHTBOX + ZOOM
let zoom = 1;

function openLightbox(src) {
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightbox-img").src = src;
  zoom = 1;
  updateZoom();
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function zoomIn() {
  zoom += 0.2;
  updateZoom();
}

function zoomOut() {
  zoom = Math.max(0.5, zoom - 0.2);
  updateZoom();
}

function resetZoom() {
  zoom = 1;
  updateZoom();
}

function updateZoom() {
  document.getElementById("lightbox-img").style.transform =
    `scale(${zoom})`;
}

render();
