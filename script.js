const magazines = [
  { id: "2024-01", title: "2024/01", issue: "2024 Január", img: "covers/2024-01.jpg" },
  { id: "2024-02", title: "2024/02", issue: "2024 Február", img: "covers/2024-02.jpg" },
  { id: "2024-03", title: "2024/03", issue: "2024 Március", img: "covers/2024-03.jpg" },

  { id: "2025-01", title: "2025/01", issue: "2025 Január", img: "covers/2025-01.jpg" },
  { id: "2025-02", title: "2025/02", issue: "2025 Február", img: "covers/2025-02.jpg" },
];

function loadOwned() {
  return JSON.parse(localStorage.getItem("ownedMagazines") || "[]");
}

function saveOwned(data) {
  localStorage.setItem("ownedMagazines", JSON.stringify(data));
}

let owned = loadOwned();

function toggle(id) {
  if (owned.includes(id)) {
    owned = owned.filter(x => x !== id);
  } else {
    owned.push(id);
  }
  saveOwned(owned);
  render();
}

function render() {
  const container = document.getElementById("container");
  container.innerHTML = "";

  magazines.forEach(m => {
    const isOwned = owned.includes(m.id);

    container.innerHTML += `
      <div class="card">
        <img src="${m.img}" alt="${m.title}">
        <h3>${m.title}</h3>
        <p>${m.issue}</p>
        <button class="${isOwned ? "owned" : "not-owned"}"
                onclick="toggle('${m.id}')">
          ${isOwned ? "Megvan ✔" : "Nincs meg"}
        </button>
      </div>
    `;
  });

  document.getElementById("counter").innerText =
    `Megvan: ${owned.length} / ${magazines.length}`;
}

render();
