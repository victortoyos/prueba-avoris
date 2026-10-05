export function initMobileMenu(): void {
  const dialog = document.querySelector<HTMLDialogElement>("[data-nav-dialog]");
  const openBtn = document.querySelector<HTMLButtonElement>("[data-nav-open]");
  const closeBtn = document.querySelector<HTMLButtonElement>("[data-nav-close]");

  if (!dialog || !openBtn || !closeBtn) return;

  const openMenu = () => {
    dialog.showModal();
    openBtn.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    dialog.close();
    openBtn.setAttribute("aria-expanded", "false");
  };

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  dialog.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

  desktopMediaQuery.addEventListener("change", (e: MediaQueryListEvent) => {
    if (e.matches && dialog.open) {
      dialog.close();
      openBtn.setAttribute("aria-expanded", "false");
    }
  });
}
