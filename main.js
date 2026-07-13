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
      const requests = document.getElementById('book-requests').value.trim();
      
      let message = `Ciao Cocktail Kitchen! Vorrei prenotare un tavolo.\n\n\u{1F464} Nome: ${name}\n\u{1F4C5} Giorno: ${day}\n\u{1F465} Persone: ${people}\n\u{1F552} Orario: ${time}`;
      if (requests) {
        message += `\n\u{1F4DD} Richieste Speciali: ${requests}`;
      }
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

  // Menu Accordion Logic
  const accordionBtns = document.querySelectorAll('.menu-accordion-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Close others (optional, but good for UX so it doesn't get too long)
      accordionBtns.forEach(otherBtn => {
        if (otherBtn !== btn && otherBtn.classList.contains('open')) {
          otherBtn.classList.remove('open');
          otherBtn.nextElementSibling.classList.remove('open');
        }
      });

      // Toggle current
      btn.classList.toggle('open');
      const content = btn.nextElementSibling;
      content.classList.toggle('open');
    });
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

  // ============================================================
  // Cookie Consent Logic — GDPR / Garante Privacy Italiano
  // Linee guida: Reg. UE 2016/679 (GDPR), Provvedimento Garante
  // 8 gennaio 2015 e Linee Guida ePrivacy.
  // ============================================================
  const cookieBanner = document.getElementById('cookie-banner');
  const btnAcceptAll = document.getElementById('cookie-accept-all');
  const btnRejectAll = document.getElementById('cookie-reject-all');
  const btnCustomize = document.getElementById('cookie-customize');

  const cookieModal = document.getElementById('cookie-modal');
  const btnCloseCookieModal = document.getElementById('close-cookie-modal');
  const btnSavePrefs = document.getElementById('cookie-save-prefs');
  const btnRejectModal = document.getElementById('cookie-reject-modal');
  const toggleThirdParty = document.getElementById('cookie-third-party');
  const openCookieSettings = document.getElementById('open-cookie-settings');

  const mapPlaceholder = document.getElementById('map-placeholder');
  const mapIframe = document.getElementById('google-maps-iframe');
  const btnAcceptMap = document.getElementById('btn-accept-map');

  const CONSENT_KEY = 'cookie_consent_v1';
  // Garante: richiedere nuovo consenso ogni 6 mesi
  const CONSENT_EXPIRY_DAYS = 180;

  function isConsentExpired(timestamp) {
    if (!timestamp) return true;
    const saved = new Date(timestamp);
    const now = new Date();
    const diffDays = (now - saved) / (1000 * 60 * 60 * 24);
    return diffDays > CONSENT_EXPIRY_DAYS;
  }

  function initCookieConsent() {
    const savedRaw = localStorage.getItem(CONSENT_KEY);
    if (!savedRaw) {
      // Nessun consenso — mostra il banner
      showBanner();
      return;
    }
    const consentObj = JSON.parse(savedRaw);
    // Scadenza 6 mesi — riaprire banner se scaduto
    if (isConsentExpired(consentObj.timestamp)) {
      localStorage.removeItem(CONSENT_KEY);
      showBanner();
      return;
    }
    applyConsent(consentObj);
  }

  function showBanner() {
    if (cookieBanner) cookieBanner.style.display = 'flex';
  }

  function applyConsent(consentObj) {
    if (consentObj.thirdParty) {
      loadGoogleFonts();
      loadGoogleMaps();
    }
  }

  function saveConsent(thirdPartyAllowed) {
    const consentObj = {
      technical: true,      // sempre attivo per legge
      thirdParty: thirdPartyAllowed,
      timestamp: new Date().toISOString(),
      version: '1.0'        // versione policy (aggiornare se cambia la policy)
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentObj));
    if (cookieBanner) cookieBanner.style.display = 'none';
    if (cookieModal) cookieModal.classList.remove('active');
    applyConsent(consentObj);
  }

  // Carica Google Fonts SOLO con consenso (trasmette IP a Google)
  function loadGoogleFonts() {
    if (document.getElementById('google-fonts-loaded')) return; // già caricato
    const link = document.createElement('link');
    link.id = 'google-fonts-loaded';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap';
    document.head.appendChild(link);
  }

  function loadGoogleMaps() {
    if (mapIframe && mapIframe.dataset.src && !mapIframe.src) {
      mapIframe.src = mapIframe.dataset.src;
      mapIframe.classList.add('loaded');
      if (mapPlaceholder) mapPlaceholder.classList.add('hidden');
    }
  }

  // --- Banner: Accetta Tutti ---
  if (btnAcceptAll) {
    btnAcceptAll.addEventListener('click', () => saveConsent(true));
  }

  // --- Banner: Rifiuta Non Necessari ---
  if (btnRejectAll) {
    btnRejectAll.addEventListener('click', () => saveConsent(false));
  }

  // --- Banner: Personalizza → apri modale ---
  if (btnCustomize) {
    btnCustomize.addEventListener('click', () => {
      if (cookieBanner) cookieBanner.style.display = 'none';
      if (cookieModal) cookieModal.classList.add('active');
      // Precompila lo stato corrente
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved && toggleThirdParty) {
        toggleThirdParty.checked = JSON.parse(saved).thirdParty;
      }
    });
  }

  // --- Modale: X (chiudi senza salvare) ---
  if (btnCloseCookieModal) {
    btnCloseCookieModal.addEventListener('click', () => {
      if (cookieModal) cookieModal.classList.remove('active');
      // Se non c'è ancora un consenso salvato, ri-mostra il banner
      const saved = localStorage.getItem(CONSENT_KEY);
      if (!saved && cookieBanner) cookieBanner.style.display = 'flex';
    });
  }

  // --- Modale: Salva Preferenze ---
  if (btnSavePrefs) {
    btnSavePrefs.addEventListener('click', () => {
      saveConsent(toggleThirdParty ? toggleThirdParty.checked : false);
    });
  }

  // --- Modale: Rifiuta Non Necessari ---
  if (btnRejectModal) {
    btnRejectModal.addEventListener('click', () => {
      if (toggleThirdParty) toggleThirdParty.checked = false;
      saveConsent(false);
    });
  }

  // --- Footer: Gestisci Preferenze Cookie ---
  if (openCookieSettings) {
    openCookieSettings.addEventListener('click', (e) => {
      e.preventDefault();
      if (cookieModal) cookieModal.classList.add('active');
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved && toggleThirdParty) {
        toggleThirdParty.checked = JSON.parse(saved).thirdParty;
      }
    });
  }

  // --- Mappa: Accetta e Mostra Mappa (consenso diretto) ---
  if (btnAcceptMap) {
    btnAcceptMap.addEventListener('click', () => {
      saveConsent(true);
    });
  }

  initCookieConsent();

  // --- Social Popup Logic ---
  const socialPopup = document.getElementById('social-popup');
  const closeSocialPopup = document.getElementById('close-social-popup');

  if (socialPopup && closeSocialPopup) {
    const hasSeenSocialPopup = sessionStorage.getItem('hasSeenSocialPopup');
    
    if (!hasSeenSocialPopup) {
      setTimeout(() => {
        socialPopup.classList.add('show');
      }, 5000); // Mostra dopo 5 secondi
    }

    closeSocialPopup.addEventListener('click', () => {
      socialPopup.classList.remove('show');
      sessionStorage.setItem('hasSeenSocialPopup', 'true');
    });
  }

});
