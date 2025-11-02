document.addEventListener("DOMContentLoaded", () => {
  // ----------------------
  // Knowledge Base Items
  // ----------------------
const items = [
  { name: "Language Specification v0.2.a", category: "Coding", url: "knowledge-base/spec.pdf" },
  { name: "eurolite LED SLS-30 COB WW Floor Manual", category: "Lighting", url: "knowledge-base/51915302-manual-127846-1.000-eurolite-led-sls-30-cob-ww-floor-de_en.pdf" },
  { name: "EQUINOX Gigabar MKII COB System Manual", category: "Lighting", url: "https://www.prolight.co.uk/ftp-in/EQLED66_Manual.pdf" },
  { name: "CONTROL2448 Dimmer Master Control Manual", category: "Lighting", url: "https://www.terralec.co.uk/Portals/54/product/images/prd4b805bf4-9841-4757-8738-7401c16a4a34.pdf" }
];

  // ----------------------
  // Elements
  // ----------------------
  const searchInput = document.getElementById("kb-search-input");
  const categoriesContainer = document.getElementById("kb-categories");
  const resultsContainer = document.getElementById("kb-results");
  const sideTab = document.getElementById("side-tab");
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("popup-close");

  // ----------------------
  // Generate categories dynamically
  // ----------------------
  const categories = [...new Set(items.map(item => item.category))];

  function showCategories() {
    categoriesContainer.innerHTML = "";
    resultsContainer.innerHTML = "";
    categories.forEach(cat => {
      const pill = document.createElement("div");
      pill.className = "category-pill";
      pill.textContent = cat;
      pill.addEventListener("click", () => {
        searchInput.value = `?${cat.toLowerCase()}`;
        updateResults();
      });
      categoriesContainer.appendChild(pill);
    });
  }

  // ----------------------
  // Update results based on input
  // ----------------------
  function updateResults() {
    const query = searchInput.value.trim().toLowerCase();
    resultsContainer.innerHTML = "";

    if (query === "") {
      showCategories();
      return;
    }

    let filtered;
    if (query.startsWith("?")) {
      const cat = query.slice(1);
      filtered = items.filter(item => item.category.toLowerCase().includes(cat));
    } else if (query.startsWith("!")) {
      const nameQuery = query.slice(1);
      filtered = items.filter(item => item.name.toLowerCase().includes(nameQuery));
    } else {
      filtered = items.filter(
        item => item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
      );
    }

    if (filtered.length === 0) {
      const none = document.createElement("div");
      none.className = "no-results";
      none.textContent = "No results found.";
      resultsContainer.appendChild(none);
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement("div");
      card.className = "result-card";

      const left = document.createElement("div");
      left.className = "result-left";
      left.innerHTML = `<span class="result-title">${item.name}</span><span class="result-category">${item.category}</span>`;

      const link = document.createElement("a");
      link.className = "result-link";
      link.textContent = "Open";
      link.href = item.url;
      link.target = "_blank";

      card.appendChild(left);
      card.appendChild(link);
      resultsContainer.appendChild(card);
    });

    categoriesContainer.innerHTML = ""; // hide categories when searching
  }

  // ----------------------
  // Event listeners
  // ----------------------
  searchInput.addEventListener("input", updateResults);

  // Initialize
  showCategories();

  // ----------------------
  // Popup logic
  // ----------------------
  sideTab.addEventListener("click", () => popup.style.display = "block");
  closeBtn.addEventListener("click", () => popup.style.display = "none");
  window.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
  });
});
