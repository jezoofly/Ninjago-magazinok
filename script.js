const magazines = [
  // 🟡 LEGACY 2025
  { id: "legacy-2025-01", series: "Legacy", title: "2025/01", img: "covers/legacy-2025-01.webp" },
  { id: "legacy-2025-02", series: "Legacy", title: "2025/02", img: "covers/legacy-2025-02.webp" },
  { id: "legacy-2025-03", series: "Legacy", title: "2025/03", img: "covers/legacy-2025-03.webp" },
  { id: "legacy-2025-04", series: "Legacy", title: "2025/04", img: "covers/legacy-2025-04.webp" },
  { id: "legacy-2025-05", series: "Legacy", title: "2025/05", img: "covers/legacy-2025-05.webp" },
  { id: "legacy-2025-06", series: "Legacy", title: "2025/06", img: "covers/legacy-2025-06.webp" },

  // 🟡 LEGACY 2026
  { id: "legacy-2026-01", series: "Legacy", title: "2026/01", img: "covers/legacy-2026-01.webp" },
  { id: "legacy-2026-02", series: "Legacy", title: "2026/02", img: "covers/legacy-2026-02.webp" },
  { id: "legacy-2026-03", series: "Legacy", title: "2026/03", img: "covers/legacy-2026-03.webp" },

  // 🔵 DRAGONS RISING 2025
  { id: "dr-2025-01", series: "Dragons Rising", title: "2025/01", img: "covers/dr-2025-01.webp" },
  { id: "dr-2025-02", series: "Dragons Rising", title: "2025/02", img: "covers/dr-2025-02.webp" },
  { id: "dr-2025-03", series: "Dragons Rising", title: "2025/03", img: "covers/dr-2025-03.webp" },
  { id: "dr-2025-04", series: "Dragons Rising", title: "2025/04", img: "covers/dr-2025-04.webp" },
  { id: "dr-2025-05", series: "Dragons Rising", title: "2025/05", img: "covers/dr-2025-05.webp" },
  { id: "dr-2025-06", series: "Dragons Rising", title: "2025/06", img: "covers/dr-2025-06.webp" },
  { id: "dr-2025-07", series: "Dragons Rising", title: "2025/07", img: "covers/dr-2025-07.webp" },

  // 🔵 DRAGONS RISING 2026
  { id: "dr-2026-01", series: "Dragons Rising", title: "2026/01", img: "covers/dr-2026-01.webp" },
  { id: "dr-2026-02", series: "Dragons Rising", title: "2026/02", img: "covers/dr-2026-02.webp" },
  { id: "dr-2026-03", series: "Dragons Rising", title: "2026/03", img: "covers/dr-2026-03.webp" },
];

let owned = JSON.parse(localStorage.getItem("ownedMagazines") || "[]");

function save() {
  localStorage.setItem("ownedMagazines", JSON.stringify(owned));
}

function toggle(id) {
  if (owned.includes(id)) {
    owned = owned.filter(x => x !== id);
  } else {
    owned.push(id);
  }
  save();
  render();
}

function render() {
  const container = document.getElementById("container");
  container.innerHTML = "";

  let legacyCount = 0;
  let drCount = 0;

  magazines.forEach(m => {
    const isOwned = owned.includes(m.id);

    if (isOwned) {
      if (m.series === "Legacy") legacyCount++;
      if (m.series === "Dragons Rising") drCount++;
    }

    container.innerHTML += `
      <div class="card">
        <img src="${m.img}" alt="${m.title}">
        <h3>${m.series}</h3>
        <p>${m.title}</p>

        <button class="${isOwned ? "owned" : "not-owned"}"
          onclick="toggle('${m.id}')">
          ${isOwned ? "Megvan ✔" : "Nincs meg"}
        </button>
      </div>
    `;
  });

  document.getElementById("counter").innerHTML = `
    🟡 Legacy: ${legacyCount} / ${magazines.filter(m => m.series === "Legacy").length}
    <br>
    🔵 Dragons Rising: ${drCount} / ${magazines.filter(m => m.series === "Dragons Rising").length}
  `;
}

render();
