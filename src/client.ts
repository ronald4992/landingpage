const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
const mainNavigation = document.querySelector<HTMLElement>("#main-nav");
const menuLabel = menuToggle?.querySelector<HTMLElement>(".sr-only");

function setMenuOpen(isOpen: boolean): void {
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  mainNavigation?.classList.toggle("is-open", isOpen);
  if (menuLabel) menuLabel.textContent = isOpen ? "Cerrar navegación" : "Abrir navegación";
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

mainNavigation?.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

