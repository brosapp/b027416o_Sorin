
// Theme toggle with temporary 5s reset


const toggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const root = document.documentElement;

// Default theme = light
let currentTheme = "light";

// Get current theme - checks localStorage and system)
function getCurrentTheme() {
  const savedData = localStorage.getItem("theme");
  if (savedData) {
    try {
      const { theme, time } = JSON.parse(savedData);
      if (Date.now() - time < 5000) return theme;
      localStorage.removeItem("theme");
    } catch {
      localStorage.removeItem("theme");
    }
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Apply theme function 

function applyTheme(theme) {
  currentTheme = theme;
  root.setAttribute("data-theme", theme);

  // Update toggle button icon

  if (themeIcon) {
    themeIcon.src = theme === "dark" ? "images/sun.png" : "images/moon.png";
    themeIcon.alt = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  }

}

// Set theme temporarily and reset after 5s

function setTheme(theme) {
  const data = { theme: theme, time: Date.now() };
  localStorage.setItem("theme", JSON.stringify(data));
  applyTheme(theme);

  // Auto-reset after 5s

  setTimeout(() => {
    localStorage.removeItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    applyTheme(systemTheme);
  }, 5000);
}

// Initial theme on page load

applyTheme(getCurrentTheme());

// Watch system changes (if no temporary override)

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    applyTheme(e.matches ? "dark" : "light");
  }
});

// Toggle button click

toggleBtn.addEventListener("click", () => {
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
});
