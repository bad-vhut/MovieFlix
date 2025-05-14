// Background slideshow functionality
let bgIndex = 0;
const slides = document.querySelectorAll('.bg-slide');

function showSlide() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === bgIndex) {
      slide.classList.add('active');
    }
  });

  bgIndex = (bgIndex + 1) % slides.length;
  setTimeout(showSlide, 5000); // Change every 5 seconds
}

showSlide();

function initSmartCarousel(id) {
  const carousel = document.getElementById(id);

  // Drag Variables
  let isDown = false;
  let startX;
  let scrollLeft;

  // Auto Scroll
  let autoScroll;
  function startAutoScroll() {
    autoScroll = setInterval(() => {
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft += 1;
      }
    }, 20);
  }

  function stopAutoScrollTemporarily() {
    clearInterval(autoScroll);
    setTimeout(() => {
      startAutoScroll();
    }, 4000); // Wait 4s before resuming
  }

  // Mouse/Touch Drag Scroll
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    stopAutoScrollTemporarily();
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed
    carousel.scrollLeft = scrollLeft - walk;
  });

  // Touch Events for mobile
  carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    stopAutoScrollTemporarily();
  });

  carousel.addEventListener('touchend', () => {
    isDown = false;
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });

  startAutoScroll();
}

// Initialize both carousels
initSmartCarousel("thumb-carousel");
initSmartCarousel("clip-carousel");