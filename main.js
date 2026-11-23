/* =====================================================
   EL BARBER SHOP — JavaScript
   Navigation, language toggle, smooth interactions
   ===================================================== */

(function () {
  'use strict';

  // ---- Mobile menu ----
  const burger = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-menu__link') : [];

  function toggleMenu(open) {
    const isOpen = typeof open === 'boolean' ? open : !mobileMenu.classList.contains('is-open');
    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (burger && mobileMenu) {
    burger.addEventListener('click', function () { toggleMenu(); });
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () { toggleMenu(false); });
    });
    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        toggleMenu(false);
        burger.focus();
      }
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#' || id === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Nav background on scroll ----
  var nav = document.querySelector('.nav');
  var lastScroll = 0;
  function onScroll() {
    var y = window.scrollY;
    if (y > 60) {
      nav.style.background = 'rgba(32,37,33,.97)';
    } else {
      nav.style.background = 'rgba(32,37,33,.92)';
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Language toggle (English ↔ Spanish) ----
  var translations = {
    en: {
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.about': 'About',
      'nav.gallery': 'Gallery',
      'nav.contact': 'Contact',
      'nav.book': 'Book Now',
      'nav.call': 'Call Now',
      'hero.eyebrow': 'Irving, Texas',
      'hero.headline': 'GOOD CUTS.<br>GOOD PEOPLE.<br>GOOD VIBES.',
      'hero.sub': 'More than a haircut. It\'s your neighborhood spot for fresh styles, great people and a welcoming atmosphere. Walk in or book your next visit.',
      'hero.book': 'Book an Appointment',
      'hero.call': 'Call Now',
      'trust.years': '5 Years',
      'trust.community': 'Serving Our Community',
      'trust.walkins': 'Walk-ins',
      'trust.welcome': 'Welcome Anytime',
      'trust.bilingual': 'Bilingual',
      'trust.languages': 'English & Spanish',
      'services.eyebrow': 'What We Do',
      'services.title': 'Our Services',
      'services.intro': 'From classic cuts to modern fades, we bring the skill, the style and the conversation. Every chair, every time.',
      'services.haircuts': 'Men\'s Haircuts',
      'services.haircuts_desc': 'Clean, tailored cuts for every style and texture. From classic to contemporary.',
      'services.fades': 'Fades & Modern Styles',
      'services.fades_desc': 'Skin fades, tapers, line-ups and textured crops. Precision meets personality.',
      'services.beard': 'Beard Grooming',
      'services.beard_desc': 'Shape-ups, hot towel treatments and detailed beard work. Look sharp from every angle.',
      'services.kids': 'Kids\' Haircuts',
      'services.kids_desc': 'A friendly, patient experience for the younger crew. They leave looking great and feeling confident.',
      'services.book': 'Book Now',
      'services.call': 'or call to ask →',
      'about.eyebrow': 'Our Story',
      'about.title': 'Your Neighborhood<br>Barber Shop',
      'about.body1': 'El Barber Shop has been part of Irving\'s Belt Line community for five years. What started as one chair and a vision has grown into a destination for anyone who values a great haircut and a genuine welcome.',
      'about.body2': 'Our barbers bring experience, steady hands and an eye for what works with your face shape, hair type and personal style. We speak English and Spanish, and we treat every client — walk-in or appointment — like a regular.',
      'about.body3': 'This is a place where the music is good, the conversation flows and you leave looking and feeling your best.',
      'about.book': 'Book a Visit',
      'gallery.eyebrow': 'Our Work',
      'gallery.title': 'The Portfolio',
      'reviews.eyebrow': 'What Clients Say',
      'reviews.title': 'Real Feedback',
      'reviews.r1': '"Best barber shop in Irving. They take their time and always get the fade right. Great vibes every visit."',
      'reviews.r1_src': '— via Google Reviews',
      'reviews.r2': '"My son and I both get our cuts here. Friendly, professional and they speak Spanish, which my family appreciates."',
      'reviews.r2_src': '— via Booksy',
      'reviews.r3': '"Walk-ins welcome and they still treat you like you have an appointment. Quality cuts, fair prices."',
      'reviews.r3_src': '— via Google Reviews',
      'reviews.google': 'Read on Google →',
      'reviews.booksy': 'Read on Booksy →',
      'contact.eyebrow': 'Visit Us',
      'contact.title': 'Come Through',
      'contact.address': '221 S Belt Line Rd, Suite 104<br>Irving, TX 75060',
      'contact.hours': 'Call or message us for current hours',
      'contact.book': 'Book an Appointment',
      'contact.directions': 'Get Directions',
      'contact.open_map': 'Open in Maps',
      'footer.tagline': 'Fresh cuts and good vibes<br>on Belt Line since 2019.',
      'footer.nav_heading': 'Navigate',
      'footer.connect_heading': 'Connect',
      'footer.ready_heading': 'Ready?',
      'actionbar.call': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg><span>Call</span>',
      'actionbar.directions': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg><span>Directions</span>',
      'actionbar.book': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span>Book</span>'
    },
    es: {
      'nav.home': 'Inicio',
      'nav.services': 'Servicios',
      'nav.about': 'Nosotros',
      'nav.gallery': 'Galería',
      'nav.contact': 'Contacto',
      'nav.book': 'Reservar',
      'nav.call': 'Llamar',
      'hero.eyebrow': 'Irving, Texas',
      'hero.headline': 'BUENOS CORTES.<br>BUENA GENTE.<br>BUENA VIBRA.',
      'hero.sub': 'Más que un corte de pelo. Tu lugar de confianza para estilos frescos, buena gente y un ambiente acogedor. Ven sin cita o reserva tu próxima visita.',
      'hero.book': 'Reservar Cita',
      'hero.call': 'Llamar Ahora',
      'trust.years': '5 Años',
      'trust.community': 'Sirviendo a Nuestra Comunidad',
      'trust.walkins': 'Sin Cita',
      'trust.welcome': 'Bienvenido Cuando Quieras',
      'trust.bilingual': 'Bilingüe',
      'trust.languages': 'Inglés y Español',
      'services.eyebrow': 'Lo Que Hacemos',
      'services.title': 'Nuestros Servicios',
      'services.intro': 'Desde cortes clásicos hasta degradados modernos, traemos la habilidad, el estilo y la conversación. Cada silla, cada vez.',
      'services.haircuts': 'Cortes para Hombres',
      'services.haircuts_desc': 'Cortes limpios y a medida para todo tipo de estilo y textura. De lo clásico a lo contemporáneo.',
      'services.fades': 'Degradados y Estilos Modernos',
      'services.fades_desc': 'Degradados de piel, tapers, line-ups y texturas. Precisión con personalidad.',
      'services.beard': 'Arreglo de Barba',
      'services.beard_desc': 'Perfilado, toalla caliente y trabajo detallado de barba. Que te veas bien desde todos los ángulos.',
      'services.kids': 'Cortes para Niños',
      'services.kids_desc': 'Una experiencia amigable y paciente para los más jóvenes. Se van viéndose genial y sintiéndose seguros.',
      'services.book': 'Reservar',
      'services.call': 'o llama para preguntar →',
      'about.eyebrow': 'Nuestra Historia',
      'about.title': 'Tu Barbería<br>de Confianza',
      'about.body1': 'El Barber Shop ha sido parte de la comunidad de Belt Line en Irving por cinco años. Lo que empezó con una silla y una visión se ha convertido en un destino para cualquiera que valora un gran corte y una bienvenida genuina.',
      'about.body2': 'Nuestros barberos traen experiencia, manos firmes y ojo para lo que funciona con tu forma de cara, tipo de pelo y estilo personal. Hablamos inglés y español, y tratamos a cada cliente — con o sin cita — como a un regular.',
      'about.body3': 'Este es un lugar donde la música es buena, la conversación fluye y te vas viéndote y sintiéndote en tu mejor momento.',
      'about.book': 'Reservar una Visita',
      'gallery.eyebrow': 'Nuestro Trabajo',
      'gallery.title': 'El Portafolio',
      'reviews.eyebrow': 'Lo Que Dicen Nuestros Clientes',
      'reviews.title': 'Opiniones Reales',
      'reviews.r1': '"La mejor barbería en Irving. Se toman su tiempo y siempre logran el degradado perfecto. Gran ambiente en cada visita."',
      'reviews.r1_src': '— vía Google Reviews',
      'reviews.r2': '"Mi hijo y yo nos cortamos aquí. Amigables, profesionales y hablan español, lo cual mi familia aprecia."',
      'reviews.r2_src': '— vía Booksy',
      'reviews.r3': '"Aceptan sin cita y aun así te tratan como si tuvieras una. Cortes de calidad, precios justos."',
      'reviews.r3_src': '— vía Google Reviews',
      'reviews.google': 'Leer en Google →',
      'reviews.booksy': 'Leer en Booksy →',
      'contact.eyebrow': 'Visítanos',
      'contact.title': 'Pasa por Aquí',
      'contact.address': '221 S Belt Line Rd, Suite 104<br>Irving, TX 75060',
      'contact.hours': 'Llama o envíanos un mensaje para conocer el horario actual',
      'contact.book': 'Reservar Cita',
      'contact.directions': 'Cómo Llegar',
      'contact.open_map': 'Abrir en Mapas',
      'footer.tagline': 'Cortes frescos y buena vibra<br>en Belt Line desde 2019.',
      'footer.nav_heading': 'Navegar',
      'footer.connect_heading': 'Conectar',
      'footer.ready_heading': '¿Listo?',
      'actionbar.call': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.11 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg><span>Llamar</span>',
      'actionbar.directions': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg><span>Llegar</span>',
      'actionbar.book': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span>Reservar</span>'
    }
  };

  var currentLang = 'en';

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    var dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // Update toggle button labels
    var nextLang = lang === 'en' ? 'ES' : 'EN';
    document.querySelectorAll('[data-i18n-toggle] .lang-toggle__label').forEach(function (el) {
      el.textContent = nextLang;
    });
  }

  document.querySelectorAll('[data-i18n-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLanguage(currentLang === 'en' ? 'es' : 'en');
    });
  });

  // ---- Active nav link on scroll ----
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  function highlightNav() {
    var scrollPos = window.scrollY + 200;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('is-active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });

})();
