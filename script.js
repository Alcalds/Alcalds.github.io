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
  if (window.innerWidth > 960) closeMenu();
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


// Contact-form intent links.
const inquiryType = document.getElementById("inquiryType");
const contactSubject = document.getElementById("contactSubject");
const contactMessage = document.getElementById("contactMessage");

document.querySelectorAll("[data-contact-intent]").forEach((link) => {
  link.addEventListener("click", () => {
    const intent = link.dataset.contactIntent;

    if (intent === "cv" && inquiryType && contactSubject && contactMessage) {
      inquiryType.value = "Request detailed CV";
      contactSubject.value = "Request for Joselito Alcalde's Detailed CV";

      if (!contactMessage.value.trim()) {
        contactMessage.value =
          "Hello Joselito,\\n\\nI would like to request a copy of your detailed CV for a potential opportunity. Please let me know if you require any additional information.\\n\\nThank you.";
      }

      window.setTimeout(() => {
        const nameField = document.querySelector('#contactForm input[name="name"]');
        if (nameField) nameField.focus({ preventScroll: true });
      }, 650);
    }
  });
});

// Update subject suggestions when inquiry type changes.
if (inquiryType && contactSubject) {
  inquiryType.addEventListener("change", () => {
    const suggestions = {
      "Job opportunity": "Job Opportunity for Joselito Alcalde",
      "Request detailed CV": "Request for Joselito Alcalde's Detailed CV",
      "Project collaboration": "Project Collaboration Inquiry",
      "General inquiry": "General Portfolio Inquiry"
    };

    if (!contactSubject.value.trim() ||
        Object.values(suggestions).includes(contactSubject.value)) {
      contactSubject.value = suggestions[inquiryType.value] || "";
    }
  });
}

// Copy-email fallback that works even when no mail application is configured.
const copyEmailButton = document.getElementById("copyEmailButton");
const copyStatus = document.getElementById("copyStatus");
const emailAddress = "joselitoalcalde@gmail.com";

async function copyPortfolioEmail() {
  try {
    await navigator.clipboard.writeText(emailAddress);
    copyStatus.textContent = "Email address copied.";
  } catch (error) {
    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = emailAddress;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";
    document.body.appendChild(temporaryInput);
    temporaryInput.select();
    document.execCommand("copy");
    temporaryInput.remove();
    copyStatus.textContent = "Email address copied.";
  }

  window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 3000);
}

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", copyPortfolioEmail);
}
