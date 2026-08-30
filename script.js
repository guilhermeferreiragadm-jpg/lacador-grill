/* =============================================================
   Faixas de preço do buffet e contadores do hero.
   ============================================================= */

/* Sempre en-US: o preço é o mesmo que está na etiqueta do balcão em
   Orlando. Em pt-BR o Intl formataria "US$ 15,99", que confunde. */
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function renderBuffetPrice() {

  const wrap = document.getElementById("buffetTiers");
  if (!wrap) return;

  wrap.innerHTML = BUFFET.tiers
    .map(
      (tier) => `
      <div class="buffet-tier">
        <span class="buffet-price">${money.format(tier.pricePerLb)}</span>
        <span class="buffet-unit">${t("menu.buffetUnit")}</span>
        <span class="buffet-when">${tier[currentLang]}</span>
      </div>`
    )
    .join("");
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
  renderBuffetPrice();
}

document.addEventListener("DOMContentLoaded", () => {
  refreshMenuUI();
  setupCounters();
  document.addEventListener("languagechange", refreshMenuUI);
});
