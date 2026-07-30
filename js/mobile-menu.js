const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-menu]");
const menuLinks = mobileMenu.querySelectorAll("a, button");

const toggleMenu = () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";

  menuButton.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(!isExpanded));

  mobileMenu.classList.toggle("is-open");
  document.body.classList.toggle("menu-open");
};

menuButton.addEventListener("click", toggleMenu);

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileMenu.classList.contains("is-open")) {
      toggleMenu();
    }
  });
});
