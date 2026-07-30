function initSlider(wrapper, listSelector) {
  const list = wrapper.querySelector(listSelector);
  const prevBtn = wrapper.querySelector('.prev-btn');
  const nextBtn = wrapper.querySelector('.next-btn');
  const dotsContainer = wrapper.querySelector('.pagination-dots');
  const cards = Array.from(list.children);

  let dots = [];

  if (dotsContainer) {
    cards.forEach((_, index) => {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => scrollToCard(index));
      dotsContainer.appendChild(dot);
    });
    dots = Array.from(dotsContainer.children);
  }

  function getStep() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(list).gap) || 0;
    return cardWidth + gap;
  }

  function scrollToCard(index) {
    list.scrollTo({ left: index * getStep(), behavior: 'smooth' });
  }

  function updateControls() {
    const step = getStep();
    const activeIndex = step ? Math.round(list.scrollLeft / step) : 0;
    const maxScroll = list.scrollWidth - list.clientWidth;

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });

    prevBtn.disabled = list.scrollLeft <= 0;
    nextBtn.disabled = list.scrollLeft >= maxScroll - 5;
  }

  prevBtn.addEventListener('click', () => {
    list.scrollBy({ left: -getStep(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    list.scrollBy({ left: getStep(), behavior: 'smooth' });
  });

  list.addEventListener('scroll', () => requestAnimationFrame(updateControls));
  window.addEventListener('resize', () => requestAnimationFrame(updateControls));

  updateControls();
}

const bestsellersWrapper = document.querySelector('.bestsellers-slider-wrapper');
if (bestsellersWrapper) {
  initSlider(bestsellersWrapper, '.bestsellers-list');
}

const feedbackWrapper = document.querySelector('.feedback-slider-wrapper');
if (feedbackWrapper) {
  initSlider(feedbackWrapper, '.feedback-list');
}
