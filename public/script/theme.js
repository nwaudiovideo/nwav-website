const toggle = document.getElementById("theme-toggle");
const checkbox = document.querySelector("#theme-toggle > input:first-of-type");
const indicator = document.querySelector("#theme-toggle > i:first-of-type");

var storedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
if (storedTheme) {
  document.documentElement.setAttribute("data-theme", storedTheme);
  if (storedTheme === "dark") {
    indicator.classList.add("bx-moon");
    indicator.classList.remove("bx-sun");
    checkbox.checked = true;
  } else {
    indicator.classList.add("bx-sun");
    indicator.classList.remove("bx-moon");
    checkbox.checked = false;
  }
}

toggle.onchange = function () {
  var currentTheme = document.documentElement.getAttribute("data-theme");
  var targetTheme = "light";

  if (currentTheme === "light") {
    targetTheme = "dark";

    indicator.classList.add("bx-moon");
    indicator.classList.remove("bx-sun");
  } else {
    indicator.classList.add("bx-sun");
    indicator.classList.remove("bx-moon");
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
};
