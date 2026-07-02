const container = document.getElementById("container");
const counter = document.getElementById("counter");

// 📦 mentett állapot
let owned = JSON.parse(localStorage.getItem("ownedMagazines") || "[]");

// 🖼️ képek automatikus listája (GitHub mappából)
const imageList = [
  // 🟡 LEGACY 2025-2026
  "legacy-2025-01.webp",
  "legacy-2025-02.webp",
  "legacy-2025-03.webp",
  "legacy-2025-04.webp",
  "legacy-2025-05.webp",
  "legacy-2025-06.webp",
  "legacy-2026-01.webp",
  "legacy-2026-02.webp",
  "legacy-2026-03.webp",

  // 🔵 DRAGONS RISING 2025-2026
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

// 💾 mentés
function save() {
  localStorage.setItem("ownedMagazines", JSON.stringify(owned));
}

// ✔ toggle
function toggle(id) {
  if (owned.includes(id)) {
    owned = owned.filter(x => x !== id);
  } else {
    owned.push(id);
  }
  save();
  render();
}

// 🧠 kategória felismerés
function getSeries(file) {
  if (file.startsWith("legacy")) return "Legacy";
  if (file.startsWith("dr")) return "Dragons Rising";
  return "Unknown";
}

// 🧠 cím generálás
function getTitle(file) {
  return file.replace(".webp", "").replace("-", "/");
}

// 🎨 render
function render() {
  container.innerHTML = "";

  let legacyOwned = 0;
  let drOwned = 0;

  let legacyTotal = 0;
  let drTotal = 0;

  imageList.forEach(file => {
    const id = file.replace(".webp", "");
    const series = getSeries(file);
    const title = getTitle(file);

    const isOwned = owned.includes(id);

    if (series === "Legacy") legacyTotal++;
    if (series === "Dragons Rising") drTotal++;

    if (isOwned) {
      if (series === "Legacy") legacyOwned++;
      if (series === "Dragons Rising") drOwned++;
    }

    container.innerHTML += `
      <div class="card ${isOwned ? "owned-card" : ""}">
        <img src="covers/${file}" alt="${title}">
        <h3>${series}</h3>
        <p>${title}</p>

        <button class="${isOwned ? "owned" : "not-owned"}"
          onclick="toggle('${id}')">
          ${isOwned ? "Megvan ✔" : "Nincs meg"}
        </button>
      </div>
    `;
  });

  counter.innerHTML = `
    🟡 Legacy: ${legacyOwned} / ${legacyTotal}<br>
    🔵 Dragons Rising: ${drOwned} / ${drTotal}
  `;
}

render();
