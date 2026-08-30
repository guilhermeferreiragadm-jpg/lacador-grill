/* =============================================================
   Funções compartilhadas: horário, navegação, WhatsApp, reveal.
   Depende de menu-data.js e i18n.js (carregados antes).
   ============================================================= */

/* Hora atual no fuso do restaurante, não no do visitante.
   Metade do público está no Brasil olhando o site — sem isso o
   badge "aberto agora" mentiria por uma ou cinco horas. */
function nowAtRestaurant() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: RESTAURANT.timeZone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type) => parts.find((p) => p.type === type)?.value;
  const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const hour = Number(get("hour")) % 24;

  return { day: days[get("weekday")], minutes: hour * 60 + Number(get("minute")) };
}

function formatTime(totalMinutes, lang = currentLang) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (lang === "pt") return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
}

function hoursFor(day) {
  return HOURS.find((h) => h.day === day) || null;
}

function getStoreStatus(now = nowAtRestaurant()) {
  const today = hoursFor(now.day);

  if (today && now.minutes >= today.open && now.minutes < today.close) {
    return { open: true, message: t("status.closesAt", { time: formatTime(today.close) }) };
  }
  if (today && now.minutes < today.open) {
    return { open: false, message: t("status.opensToday", { time: formatTime(today.open) }) };
  }

  // Já passou do fechamento (ou hoje é dia fechado): procura o próximo dia aberto.
  for (let ahead = 1; ahead <= 7; ahead++) {
    const day = (now.day + ahead) % 7;
    const next = hoursFor(day);
    if (!next) continue;
    const time = formatTime(next.open);
    if (ahead === 1) return { open: false, message: t("status.opensTomorrow", { time }) };
    return { open: false, message: t("status.opensOn", { day: t("day." + day), time }) };
  }
  return { open: false, message: "" };
}

function setupStoreStatus() {
  const badges = document.querySelectorAll("[data-store-status]");
  if (!badges.length) return;

  const render = () => {
    const status = getStoreStatus();
    badges.forEach((badge) => {
      badge.classList.toggle("status-open", status.open);
      badge.classList.toggle("status-closed", !status.open);
      badge.querySelector(".status-label").textContent = status.open ? t("status.open") : t("status.closed");
      badge.querySelector(".status-detail").textContent = status.message;
    });
  };

  render();
  document.addEventListener("languagechange", render);
  setInterval(render, 60 * 1000);
}

/* Agrupa dias seguidos com o mesmo horário: "Seg–Sáb 10h–20h". */
function groupedHours() {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const groups = [];

  order.forEach((day) => {
    const h = hoursFor(day);
    const key = h ? `${h.open}-${h.close}` : "closed";
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.days.push(day);
    else groups.push({ key, days: [day], hours: h });
  });

  return groups.map((g) => ({
    label:
      g.days.length === 1
        ? t("days." + g.days[0])
        : `${t("days." + g.days[0])} – ${t("days." + g.days[g.days.length - 1])}`,
    value: g.hours
      ? `${formatTime(g.hours.open)} – ${formatTime(g.hours.close)}`
      : t("days.closed"),
    today: g.days.includes(nowAtRestaurant().day),
  }));
}

function renderHours() {
  const list = document.getElementById("hoursList");
  if (!list) return;
  list.innerHTML = groupedHours()
    .map(
      (row) => `
      <li class="${row.today ? "is-today" : ""}">
        <span class="hours-day">${row.label}</span>
        <span class="hours-time">${row.value}</span>
      </li>`
    )
    .join("");
}

function waLink(messageKey = "wa.default", vars) {
  return `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(t(messageKey, vars))}`;
}

/* Os links de WhatsApp carregam a mensagem no idioma ativo. */
function setupWhatsAppLinks() {
  const render = () => {
    document.querySelectorAll("[data-wa]").forEach((el) => {
      el.href = waLink(el.dataset.wa || "wa.default");
    });
  };
  render();
  document.addEventListener("languagechange", render);
}

function setupNavToggle() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  if (!toggle || !header) return;

  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupHeaderScroll() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => observer.observe(el));
}

function setupCookieConsent() {
  const banner = document.getElementById("cookieBanner");
  if (!banner) return;
  if (localStorage.getItem("lacador_cookie_consent") === "accepted") return;

  banner.classList.add("visible");
  document.getElementById("cookieAccept")?.addEventListener("click", () => {
    localStorage.setItem("lacador_cookie_consent", "accepted");
    banner.classList.remove("visible");
  });
}

function fillContactDetails() {
  document.querySelectorAll("[data-phone-link]").forEach((el) => {
    el.href = "tel:" + RESTAURANT.phone;
    if (el.dataset.phoneLink === "text") el.textContent = RESTAURANT.phoneDisplay;
  });
  document.querySelectorAll("[data-email-link]").forEach((el) => {
    el.href = "mailto:" + RESTAURANT.email;
    el.textContent = RESTAURANT.email;
  });
  document.querySelectorAll("[data-maps-link]").forEach((el) => {
    el.href = RESTAURANT.mapsUrl;
  });
  const map = document.getElementById("mapFrame");
  if (map) map.src = RESTAURANT.mapsEmbed;
}

document.addEventListener("DOMContentLoaded", () => {
  setupLanguage();
  fillContactDetails();
  setupStoreStatus();
  setupWhatsAppLinks();
  setupNavToggle();
  setupHeaderScroll();
  setupReveal();
  setupCookieConsent();
  renderHours();
  document.addEventListener("languagechange", renderHours);
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
