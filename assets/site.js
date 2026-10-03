// keegan.sucks — theme toggle, PNW clock, workspace nav, scroll reveal, 1–3 / T keys.
(function () {
  var root = document.documentElement;

  // --- theme: saved choice, else follow the system ---
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  function current() { return root.dataset.theme || (mq.matches ? "dark" : "light"); }
  function setTheme(t) {
    root.dataset.theme = t;
    try { localStorage.setItem("theme", t); } catch (e) {}
  }
  function toggleTheme() { setTheme(current() === "dark" ? "light" : "dark"); }
  var btn = document.querySelector(".theme-toggle");
  if (btn) btn.addEventListener("click", toggleTheme);

  // --- clock (Pacific time) ---
  var clock = document.getElementById("clock");
  if (clock) {
    var fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", hour12: false });
    var tick = function () { clock.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 15000);
  }

  // --- workspace indicator follows the section in view ---
  var links = {};
  document.querySelectorAll(".workspaces a").forEach(function (a) { links[a.dataset.ws] = a; });
  var sections = ["now", "code", "contact"].map(function (id) { return document.getElementById(id); }).filter(Boolean);
  function markActive() {
    var y = window.innerHeight * 0.45, active = null;
    sections.forEach(function (s) { var c = s.firstElementChild || s; if (c.getBoundingClientRect().top <= y) active = s.id; });
    // at the very bottom the last section can never reach the line, so it wins there
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) active = sections[sections.length - 1].id;
    Object.keys(links).forEach(function (k) { links[k].classList.toggle("active", k === active); });
  }
  window.addEventListener("scroll", markActive, { passive: true });
  markActive();

  // --- reveal on scroll ---
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // --- keys: 1–3 jump between workspaces, T flips the theme (like Super+1..3 in Omarchy) ---
  var order = ["now", "code", "contact"];
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= order.length) {
      document.getElementById(order[n - 1]).scrollIntoView();
      history.replaceState(null, "", "#" + order[n - 1]);
    } else if (e.key === "t" || e.key === "T") {
      toggleTheme();
    }
  });
})();
