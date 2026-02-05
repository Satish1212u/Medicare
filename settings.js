/**
 * MediCare - Settings (Theme + Language)
 * Persists theme and language in localStorage. Load this script on every page that has the settings dropdown.
 */
(function () {
  'use strict';

  var THEME_KEY = 'medicare_theme';
  var LANG_KEY = 'medicare_lang';

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  function getStoredLang() {
    return localStorage.getItem(LANG_KEY) || 'en';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });
  }

  function applyLanguage(lang) {
    var select = document.getElementById('languageSelect');
    if (select) select.value = lang;
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
  }

  function init() {
    var theme = getStoredTheme();
    var lang = getStoredLang();
    applyTheme(theme);
    applyLanguage(lang);

    var toggle = document.getElementById('settingsToggle');
    var dropdown = document.getElementById('settingsDropdown');
    if (toggle && dropdown) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
      document.addEventListener('click', function () {
        dropdown.classList.remove('open');
      });
      dropdown.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    }

    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var theme = this.getAttribute('data-theme');
        localStorage.setItem(THEME_KEY, theme);
        applyTheme(theme);
      });
    });

    var langSelect = document.getElementById('languageSelect');
    if (langSelect) {
      langSelect.addEventListener('change', function () {
        var lang = this.value;
        localStorage.setItem(LANG_KEY, lang);
        applyLanguage(lang);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
