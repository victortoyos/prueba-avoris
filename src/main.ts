import "@fontsource/syne/600.css";
import "@fontsource/syne/700.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";

import "./styles/main.scss";

import { initFilters, initFiltersToggle } from "./scripts/filters.ts";
import { initHeroSlider } from "./scripts/carousel.ts";
import { initMobileMenu } from "./scripts/menu.ts";

document.addEventListener("DOMContentLoaded", () => {
  initFilters();
  initFiltersToggle();
  initHeroSlider();
  initMobileMenu();
});
