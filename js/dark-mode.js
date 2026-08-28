(function () {
  var toggleBtn = document.getElementById('dark-mode-toggle');
  var storageKey = 'darkMode';

  function isDarkMode() {
    return document.documentElement.classList.contains('dark-mode');
  }

  function updateButton() {
    if (!toggleBtn) return;
    var dark = isDarkMode();
    toggleBtn.textContent = dark ? '\u2600' : '\u263E';
    toggleBtn.setAttribute('aria-label', dark ? 'Light mode aktivieren' : 'Dark mode aktivieren');
    toggleBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }

  function setDarkMode(enabled) {
    document.documentElement.classList.toggle('dark-mode', enabled);
    try {
      localStorage.setItem(storageKey, enabled ? 'true' : 'false');
    } catch (e) {}
    updateButton();
  }

  if (toggleBtn) {
    updateButton();
    toggleBtn.addEventListener('click', function () {
      setDarkMode(!isDarkMode());
    });
  }
})();
