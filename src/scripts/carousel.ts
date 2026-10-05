export function initHeroSlider(): void {
  const hero = document.querySelector<HTMLElement>(".hero");
  if (!hero) return;

  const scroller = hero.querySelector<HTMLElement>(".hero__scroller");
  const slides = hero.querySelectorAll<HTMLElement>(".hero__slide");
  const btnPrev = hero.querySelector<HTMLButtonElement>(".hero__arrow--prev");
  const btnNext = hero.querySelector<HTMLButtonElement>(".hero__arrow--next");
  const dots = hero.querySelectorAll<HTMLButtonElement>(".hero__dot");

  const slideList = Array.from(slides);
  const EDGE_TOLERANCE = 10;

  if (!scroller || !slides.length) return;

  btnNext?.addEventListener("click", () => {
    const lastSlide = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - EDGE_TOLERANCE;
    if (lastSlide) {
      scroller.scrollTo({ left: 0, behavior: "instant" });
    } else {
      scroller.scrollBy({ left: scroller.clientWidth });
    }
  });

  btnPrev?.addEventListener("click", () => {
    const firstSlide = scroller.scrollLeft <= EDGE_TOLERANCE;
    if (firstSlide) {
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      scroller.scrollTo({ left: maxScroll, behavior: "instant" });
    } else {
      scroller.scrollBy({ left: -scroller.clientWidth });
    }
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      scroller.scrollTo({ left: index * scroller.clientWidth });
    });
  });

  const observerOptions: IntersectionObserverInit = {
    root: scroller,
    threshold: 0.6,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeIndex = slideList.indexOf(entry.target as HTMLElement);

        dots.forEach((dot, index) => {
          dot.toggleAttribute("aria-selected", index === activeIndex);
        });
      }
    });
  }, observerOptions);

  slides.forEach((slide) => observer.observe(slide));
}
