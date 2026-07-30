const wrapper = document.querySelector('.bestsellers-slider-wrapper');

if (wrapper) {
  const list = wrapper.querySelector('.bestsellers-list');
  const prevBtn = wrapper.querySelector('.prev-btn');
  const nextBtn = wrapper.querySelector('.next-btn');
  const dotsContainer = wrapper.querySelector('.pagination-dots');
  const cards = Array.from(list.children);

  cards.forEach((_, index) => {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => scrollToCard(index));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

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
    const activeIndex = Math.round(list.scrollLeft / step);
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
