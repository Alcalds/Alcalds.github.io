const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const themeButton = document.getElementById("themeButton");
const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();

function closeMenu() {
  navMenu.classList.remove("open");
  menuButton.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const willOpen = !navMenu.classList.contains("open");
  navMenu.classList.toggle("open", willOpen);
  menuButton.classList.toggle("open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
  menuButton.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
  document.body.classList.toggle("menu-open", willOpen);
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) closeMenu();
});

const savedTheme = localStorage.getItem("joselito-portfolio-theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "joselito-portfolio-theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-menu > a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));
