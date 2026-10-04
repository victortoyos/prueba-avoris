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

export function initFiltersToggle(): void {
  const moreBtn = document.querySelector<HTMLButtonElement>("[data-filters-more]");
  const extraItems = document.querySelectorAll<HTMLElement>("[data-extra]");
  const btnText = moreBtn?.querySelector<HTMLSpanElement>(".link-button__text");

  if (!moreBtn || extraItems.length === 0 || !btnText) return;

  const extraCount = extraItems.length;

  btnText.textContent = `Ver ${extraCount} más`;

  moreBtn.addEventListener("click", () => {
    const isExpanded = moreBtn.getAttribute("aria-expanded") === "true";
    const nextState = !isExpanded;

    extraItems.forEach((item) => {
      item.hidden = !nextState;
    });

    moreBtn.setAttribute("aria-expanded", String(nextState));

    btnText.textContent = nextState ? "Ver menos" : `Ver ${extraCount} más`;
  });
}
