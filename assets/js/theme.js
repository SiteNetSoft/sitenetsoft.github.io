/* Color-scheme toggle — vanilla JS, no dependencies.
   Persists to localStorage "pha-color-scheme" (system | light | dark), the same
   key and values quarkus-pha uses, so the choice carries across sitenetsoft.org
   and project docs on the same origin. The early inline script in index.html
   applies the stored value before first paint; this file only wires the button. */
(function () {
  "use strict";

  var KEY = "pha-color-scheme";
  var ORDER = ["system", "light", "dark"];

  var button = document.getElementById("theme-toggle");
  if (!button) return;

  function stored() {
    var value = localStorage.getItem(KEY);
    return value === "light" || value === "dark" ? value : "system";
  }

  function apply(scheme) {
    if (scheme === "system") {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = scheme;
    }
    var next = ORDER[(ORDER.indexOf(scheme) + 1) % ORDER.length];
    button.setAttribute("aria-label", "Color scheme: " + scheme + ". Switch to " + next + ".");
    button.title = "Color scheme: " + scheme;
  }

  button.addEventListener("click", function () {
    var next = ORDER[(ORDER.indexOf(stored()) + 1) % ORDER.length];
    localStorage.setItem(KEY, next);
    apply(next);
  });

  apply(stored());
  button.hidden = false;
})();
