import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 FIREBASE
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

// 🔥 DB
const ref = doc(db, "magazines", "state");

let state = { owned: [] };

// 📚 TABS
const tabs = [
  { id: "legacy", name: "🟡 Legacy" },
  { id: "dr", name: "🔵 Dragons Rising" },
  { id: "comic", name: "📖 Képregény" },
  { id: "hero", name: "🦸 Hero" }
];

let activeTab = "legacy";

// 📦 DATA
const items = [
  // LEGACY 2024 + 2025 + 2026
  ...Array.from({length: 6}, (_,i)=>({
    id:`legacy-2024-${i+1}`, series:"legacy", img:`legacy-2024-0${i+1}.webp`
  })),
  "legacy-2025-01.webp","legacy-2025-02.webp","legacy-2025-03.webp","legacy-2025-04.webp","legacy-2025-05.webp","legacy-2025-06.webp","legacy-2026-01.webp","legacy-2026-02.webp","legacy-2026-03.webp"
  .map(f=>({id:f.replace(".webp",""),series:"legacy",img:f})),

  // DR 2024 + existing
  ...Array.from({length:6},(_,i)=>({
    id:`dr-2024-${i+1}`, series:"dr", img:`dr-2024-0${i+1}.webp`
  })),
  "dr-2025-01.webp","dr-2025-02.webp","dr-2025-03.webp","dr-2025-04.webp","dr-2025-05.webp","dr-2025-06.webp","dr-2025-07.webp","dr-2026-01.webp","dr-2026-02.webp","dr-2026-03.webp"
  .map(f=>({id:f.replace(".webp",""),series:"dr",img:f})),

  // COMIC
  ...Array.from({length:4},(_,i)=>({
    id:`comic-2025-${i+1}`, series:"comic", img:`comic-2025-0${i+1}.webp`
  })),
  ...Array.from({length:2},(_,i)=>({
    id:`comic-2026-${i+1}`, series:"comic", img:`comic-2026-0${i+1}.webp`
  })),

  // HERO
  ...Array.from({length:3},(_,i)=>({
    id:`hero-2024-${i+1}`, series:"hero", img:`hero-2024-0${i+1}.webp`
  })),
  ...Array.from({length:2},(_,i)=>({
    id:`hero-2025-${i+1}`, series:"hero", img:`hero-2025-0${i+1}.webp`
  })),
  ...Array.from({length:1},(_,i)=>({
    id:`hero-2026-${i+1}`, series:"hero", img:`hero-2026-0${i+1}.webp`
  }))
];

// 🔁 sync
onSnapshot(ref,(snap)=>{
  if(snap.exists()) state = snap.data();
  render();
});

// ✔ toggle
async function toggle(id){
  if(!state.owned) state.owned = [];

  if(state.owned.includes(id)){
    state.owned = state.owned.filter(x=>x!==id);
  } else {
    state.owned.push(id);
  }

  await setDoc(ref,state);
}

// 🎛️ TAB UI
function renderTabs(){
  let html = `<div class="tabs">`;
  tabs.forEach(t=>{
    html += `<button onclick="setTab('${t.id}')"
      class="${activeTab===t.id?'active':''}">
      ${t.name}
    </button>`;
  });
  html += `</div>`;
  return html;
}

function setTab(id){
  activeTab = id;
  render();
}
window.setTab = setTab;

// 🎨 RENDER
function render(){
  container.innerHTML = renderTabs();

  let filtered = items.filter(i=>{
    if(activeTab==="legacy") return i.series==="legacy";
    if(activeTab==="dr") return i.series==="dr";
    if(activeTab==="comic") return i.series==="comic";
    if(activeTab==="hero") return i.series==="hero";
  });

  let ownedCount=0;

  filtered.forEach(i=>{
    const isOwned = state.owned?.includes(i.id);

    if(isOwned) ownedCount++;

    container.innerHTML += `
      <div class="card ${isOwned?'owned':''}">
        <img src="covers/${i.img}">
        <p>${i.id}</p>

        <button onclick="toggle('${i.id}')">
          ${isOwned?'Megvan ✔':'Nincs meg'}
        </button>
      </div>
    `;
  });

  counter.innerHTML = `Megvan: ${ownedCount} / ${filtered.length}`;
}

render();
