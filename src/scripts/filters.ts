export function initFilters(): void {
  const dialog = document.querySelector<HTMLDialogElement>("[data-filters-dialog]");
  const openBtn = document.querySelector<HTMLButtonElement>("[data-filters-open]");
  const closeBtn = document.querySelector<HTMLButtonElement>("[data-filters-close]");

  if (!dialog || !openBtn || !closeBtn) return;

  openBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  closeBtn.addEventListener("click", () => {
    dialog.close();
  });

  const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

  desktopMediaQuery.addEventListener("change", (e: MediaQueryListEvent) => {
    if (e.matches && dialog.open) {
      dialog.close();
    }
  });
}
