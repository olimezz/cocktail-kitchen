document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Animate hamburger icon
      const bars = mobileMenuBtn.querySelectorAll('.bar');
      if (navLinks.classList.contains('active')) {
        bars[0].style.transform = 'translateY(8px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
  }

  // Close mobile menu when clicking a link
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const bars = mobileMenuBtn.querySelectorAll('.bar');
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    });
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
      const people = document.getElementById('book-people').value;
      const time = document.getElementById('book-time').value;
      
      const message = `Ciao Cocktail Kitchen! Vorrei prenotare un tavolo.\n\n👤 Nome: ${name}\n👥 Persone: ${people}\n🕒 Orario: ${time}`;
      const encodedMessage = encodeURIComponent(message);
      
      const whatsappUrl = `https://wa.me/393513798648?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      // Reset form and close dropdown
      bookingForm.reset();
      bookingToggle.classList.remove('open');
      bookingDropdown.classList.remove('open');
    });
  }

});
