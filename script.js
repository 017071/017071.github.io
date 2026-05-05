// ── CURSOR
const co = document.getElementById("curOuter");
const ci = document.getElementById("curInner");
let mx = 0,
  my = 0,
  ox = 0,
  oy = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  ci.style.left = mx + "px";
  ci.style.top = my + "px";
});
function animCursor() {
  ox += (mx - ox) * 0.12;
  oy += (my - oy) * 0.12;
  co.style.left = ox + "px";
  co.style.top = oy + "px";
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll("a,button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    co.style.transform = "translate(-50%,-50%) scale(1.8)";
    co.style.borderColor = "rgba(201,243,29,0.9)";
  });
  el.addEventListener("mouseleave", () => {
    co.style.transform = "translate(-50%,-50%) scale(1)";
    co.style.borderColor = "rgba(201,243,29,0.5)";
  });
});

// ── NAV STUCK
const nav = document.getElementById("nav");
window.addEventListener(
  "scroll",
  () => nav.classList.toggle("stuck", scrollY > 60),
  { passive: true },
);

// ── SCROLL REVEAL
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

// ── ACTIVE NAV LINK
const sections = document.querySelectorAll("section[id]");
const navAs = document.querySelectorAll(".nav-links a");
window.addEventListener(
  "scroll",
  () => {
    let cur = "";
    sections.forEach((s) => {
      if (scrollY >= s.offsetTop - 120) cur = s.id;
    });
    navAs.forEach((a) => {
      a.style.color = a.getAttribute("href") === "#" + cur ? "var(--text)" : "";
    });
  },
  { passive: true },
);

// ── TYPED HEADLINE effect (subtle char flicker on load)
const headline = document.querySelector(".hero-headline");
if (headline) {
  const orig = headline.innerHTML;
  let done = false;
  setTimeout(() => {
    if (!done) {
      done = true;
      headline.innerHTML = orig;
    }
  }, 1200);
}
