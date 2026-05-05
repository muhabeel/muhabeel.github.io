(function () {
  var root = document.documentElement;
  var storageKey = "portfolio-theme";

  function readSavedTheme() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function getPreferredTheme() {
    var savedTheme = readSavedTheme();

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  }

  function applyTheme(theme, toggle, toggleText) {
    root.setAttribute("data-theme", theme);

    if (!toggle || !toggleText) {
      return;
    }

    var isDark = theme === "dark";
    toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    toggleText.textContent = isDark ? "Light" : "Dark";
  }

  function initThemeToggle() {
    var toggle = document.querySelector(".theme-toggle");
    var toggleText = document.querySelector(".theme-toggle-text");

    applyTheme(getPreferredTheme(), toggle, toggleText);

    if (!toggle || !toggleText) {
      return;
    }

    toggle.addEventListener("click", function () {
      var currentTheme = root.getAttribute("data-theme") || "light";
      var nextTheme = currentTheme === "dark" ? "light" : "dark";

      saveTheme(nextTheme);
      applyTheme(nextTheme, toggle, toggleText);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeToggle);
  } else {
    initThemeToggle();
  }
})();
