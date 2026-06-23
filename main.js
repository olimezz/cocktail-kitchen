document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar & Navbar Action Buttons Visibility
  const navbar = document.getElementById('navbar');
  const navActionBtns = document.getElementById('nav-action-btns');
  const heroCta = document.querySelector('.hero-cta');

  window.addEventListener('scroll', () => {
    // Sticky navbar
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Toggle navbar action buttons visibility
    if (heroCta && navActionBtns) {
      const heroCtaBottom = heroCta.getBoundingClientRect().bottom;
      const navbarHeight = navbar.offsetHeight || 80;
      
      if (heroCtaBottom < navbarHeight) {
        navActionBtns.classList.add('visible');
      } else {
        navActionBtns.classList.remove('visible');
      }
    }
  });


  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  // Booking Dropdown Toggle
  const bookingToggle = document.getElementById('booking-toggle');
  const bookingDropdown = document.getElementById('booking-dropdown');
  
  if (bookingToggle && bookingDropdown) {
    bookingToggle.addEventListener('click', () => {
      bookingToggle.classList.toggle('open');
      bookingDropdown.classList.toggle('open');
    });
  }

  // Booking Form Submission (WhatsApp)
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('book-name').value;
      const day = document.getElementById('book-day').value;
      const people = document.getElementById('book-people').value;
      const time = document.getElementById('book-time').value;
      
      const message = `Ciao Cocktail Kitchen! Vorrei prenotare un tavolo.\n\n\u{1F464} Nome: ${name}\n\u{1F4C5} Giorno: ${day}\n\u{1F465} Persone: ${people}\n\u{1F552} Orario: ${time}`;
      const encodedMessage = encodeURIComponent(message);
      
      const whatsappUrl = `https://wa.me/393513798648?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      // Reset form and close dropdown
      bookingForm.reset();
      bookingToggle.classList.remove('open');
      bookingDropdown.classList.remove('open');
    });
  }

  // Download Menu Modal Logic
  const navDownloadBtn = document.getElementById('nav-download-menu-btn');
  const heroDownloadBtn = document.getElementById('hero-download-menu-btn');
  const downloadModal = document.getElementById('download-modal');
  const closeModal = document.getElementById('close-modal');

  const openModal = (e) => {
    e.preventDefault();
    downloadModal.classList.add('active');
  };

  if (navDownloadBtn) navDownloadBtn.addEventListener('click', openModal);
  if (heroDownloadBtn) heroDownloadBtn.addEventListener('click', openModal);

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      downloadModal.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === downloadModal) {
      downloadModal.classList.remove('active');
    }
  });

  // Carousel Logic
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-track img');
  const nextBtn = document.getElementById('carousel-next');
  const prevBtn = document.getElementById('carousel-prev');
  const indicatorsContainer = document.getElementById('carousel-indicators');

  if (track && slides.length > 0) {
    let currentIndex = 0;
    const slideCount = slides.length;

    // Create indicators
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-indicator');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(dot);
    });

    const indicators = document.querySelectorAll('.carousel-indicator');

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateCarousel();
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });

    // Auto scroll
    let autoScrollInterval = setInterval(nextSlide, 3000);

    function resetInterval() {
      clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(nextSlide, 3000);
    }
  }

});
