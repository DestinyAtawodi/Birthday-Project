
const birthdayDate = new Date('2027-04-04T00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = birthdayDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('timer').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        document.getElementById('timer').innerHTML = "Happy Birthday Niya!";
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);




class Carousel {
  constructor() {
    this.carousel = document.querySelector('.carousel');
    this.cards = document.querySelectorAll('.carousel-card');
    this.dotsContainer = document.getElementById('dotsContainer');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    
    this.currentIndex = 0;
    this.autoSlideInterval = null;
    this.autoSlideDuration = 4000; 
    
    console.log('Carousel initialized with', this.cards.length, 'cards');
    this.init();
  }

  init() {
    this.createDots();
    this.attachEventListeners();
    this.startAutoSlide();
  }

  createDots() {
    this.cards.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = `dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });
  }

  attachEventListeners() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
   
    this.carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
    this.carousel.addEventListener('mouseleave', () => this.startAutoSlide());
  }

  updateCarousel() {
    const offset = -this.currentIndex * 100;
    console.log('Updating carousel to index', this.currentIndex, 'with offset', offset + '%');
    this.carousel.style.transform = `translateX(${offset}%)`;
    
   
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    this.updateCarousel();
    this.restartAutoSlide();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.updateCarousel();
    this.restartAutoSlide();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
    this.restartAutoSlide();
  }

  startAutoSlide() {
    if (!this.autoSlideInterval) {
      this.autoSlideInterval = setInterval(() => this.nextSlide(), this.autoSlideDuration);
    }
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  restartAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing carousel...');
  new Carousel();
});
