/* =============================================================
   Cardápio: filtro por categoria e renderização bilíngue.
   ============================================================= */

let activeCategory = "todos";

/* Sempre en-US: o preço é o mesmo que está na etiqueta do balcão em
   Orlando. Em pt-BR o Intl formataria "US$ 12,99", que confunde. */
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function renderCategoryFilters() {
  const wrap = document.getElementById("menuFilters");
  if (!wrap) return;

  const buttons = [{ id: "todos", label: t("menu.all") }].concat(
    MENU_CATEGORIES.map((c) => ({ id: c.id, label: c[currentLang] }))
  );

  wrap.innerHTML = buttons
    .map(
      (b) =>
        `<button type="button" class="filter-btn${b.id === activeCategory ? " active" : ""}" data-filter="${b.id}">${b.label}</button>`
    )
    .join("");

  wrap.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.filter;
      wrap.querySelectorAll(".filter-btn").forEach((b) => b.classList.toggle("active", b === btn));
      renderMenu();
    });
  });
}

function renderMenu() {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;

  const list = activeCategory === "todos" ? MENU : MENU.filter((i) => i.cat === activeCategory);

  if (!list.length) {
    grid.innerHTML = `<p class="menu-empty">${t("menu.empty")}</p>`;
    return;
  }

  grid.innerHTML = list
    .map((item) => {
      const copy = item[currentLang];
      const category = MENU_CATEGORIES.find((c) => c.id === item.cat);
      const price =
        item.price == null
          ? `<span class="menu-weight">${t("menu.byWeight")}</span>`
          : `<span class="menu-price">${money.format(item.price)}</span>`;

      return `
      <article class="menu-card reveal visible${item.highlight ? " is-highlight" : ""}">
        ${item.highlight ? `<span class="menu-flag">${t("menu.favorite")}</span>` : ""}
        <div class="menu-card-head">
          <h3>${copy.name}</h3>
          ${price}
        </div>
        <p>${copy.desc}</p>
        <span class="menu-cat">${category ? category[currentLang] : ""}</span>
      </article>`;
    })
    .join("");
}

function renderBuffetPrice() {
  const el = document.getElementById("buffetPrice");
  if (!el) return;
  el.textContent = money.format(BUFFET.pricePerLb);
}

/* Contadores do hero, animados quando entram na tela. */
function setupCounters() {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;

  const format = (n) => n.toLocaleString(currentLang === "pt" ? "pt-BR" : "en-US");

  const run = (el) => {
    const target = Number(el.dataset.count);

    // Aba em segundo plano congela o requestAnimationFrame: o contador
    // ficaria parado num número qualquer. Melhor já mostrar o valor final.
    if (document.hidden) {
      el.textContent = format(target);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = format(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nums.forEach((el) => (el.textContent = format(Number(el.dataset.count))));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );
  nums.forEach((el) => observer.observe(el));
}

function refreshMenuUI() {
  renderCategoryFilters();
  renderMenu();
  renderBuffetPrice();
}

document.addEventListener("DOMContentLoaded", () => {
  refreshMenuUI();
  setupCounters();
  document.addEventListener("languagechange", refreshMenuUI);
});
