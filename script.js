/* ============================================================
   FORGE AI RESIDENCY — Static Site JavaScript
   Ultra-light vanilla JS for interactions & animations
   ============================================================ */

(function () {
  'use strict';

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  const navbarPill = document.getElementById('navbar-pill');
  const logoDesktop = document.getElementById('navbar-logo-desktop');
  const logoMobile = document.getElementById('navbar-logo-mobile');
  let lastScrolled = false;

  function updateNavbar() {
    const scrolled = window.scrollY > 60;
    if (scrolled === lastScrolled) return;
    lastScrolled = scrolled;
    if (scrolled) {
      navbar.classList.add('scrolled');
      if (logoDesktop) logoDesktop.src = 'assets/levelup-logo-dark.png';
      if (logoMobile) logoMobile.src = 'assets/levelup-logo-dark.png';
    } else {
      navbar.classList.remove('scrolled');
      if (logoDesktop) logoDesktop.src = 'assets/levelup-logo.png';
      if (logoMobile) logoMobile.src = 'assets/levelup-logo.png';
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ---- MOBILE MENU ----
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOpenBtn = document.getElementById('menu-open-btn');
  const menuCloseBtn = document.getElementById('menu-close-btn');

  if (menuOpenBtn && mobileMenu) {
    menuOpenBtn.addEventListener('click', function () {
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }
  if (menuCloseBtn && mobileMenu) {
    menuCloseBtn.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }
  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu) {
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  });

  // ---- HERO PARALLAX ----
  const heroParallax = document.getElementById('hero-parallax');
  if (heroParallax && window.innerWidth >= 768) {
    window.addEventListener('scroll', function () {
      heroParallax.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
    }, { passive: true });
  }

  // ---- SCROLL REVEAL (IntersectionObserver) ----
  var revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '-60px 0px' });
    revealElements.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealElements.forEach(function (el) { el.classList.add('visible'); });
  }

  // ---- SCROLL BOLD TEXT ----
  var scrollBoldEl = document.getElementById('scroll-bold-text');
  if (scrollBoldEl) {
    var text = scrollBoldEl.textContent;
    var words = text.trim().split(/\s+/);
    scrollBoldEl.innerHTML = '';
    words.forEach(function (word) {
      var span = document.createElement('span');
      span.textContent = word + ' ';
      span.style.opacity = '0.3';
      span.style.fontWeight = '400';
      span.style.transition = 'opacity 0.3s, font-weight 0.3s, color 0.3s';
      span.style.display = 'inline';
      span.className = 'scroll-word';
      scrollBoldEl.appendChild(span);
    });
    var wordSpans = scrollBoldEl.querySelectorAll('.scroll-word');
    function updateScrollBold() {
      var rect = scrollBoldEl.getBoundingClientRect();
      var vh = window.innerHeight;
      var progress = Math.max(0, Math.min(1, (vh * 0.9 - rect.top) / (rect.height + vh * 0.5)));
      wordSpans.forEach(function (span, i) {
        var wordProgress = Math.max(0, Math.min(1, (progress * words.length - i) * 2));
        span.style.opacity = 0.3 + wordProgress * 0.7;
        span.style.fontWeight = wordProgress > 0.5 ? '700' : '400';
        span.style.color = wordProgress > 0.5 ? 'var(--fg)' : 'var(--fg-muted)';
      });
    }
    window.addEventListener('scroll', updateScrollBold, { passive: true });
    updateScrollBold();
  }

  // ---- DOT GRID ----
  var dotGrid = document.getElementById('dot-grid');
  if (dotGrid) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 1000; i++) {
      var dot = document.createElement('div');
      dot.className = 'dot ';
      if (i < 840) dot.className += 'dot-grey';
      else if (i < 992) dot.className += 'dot-green';
      else if (i < 999) dot.className += 'dot-amber';
      else dot.className += 'dot-red';
      dot.style.animationDelay = Math.min(i * 0.0006, 0.6).toFixed(4) + 's';
      fragment.appendChild(dot);
    }
    dotGrid.appendChild(fragment);
  }

  // ---- PILLAR CAROUSEL ----
  var pillarPanels = document.querySelectorAll('[data-pillar-panel]');
  var pillarTabs = document.querySelectorAll('.pillar-tab');
  var pillarIndex = 0;
  var pillarTimer = null;

  function showPillar(index) {
    pillarIndex = index;
    pillarPanels.forEach(function (p) { p.classList.remove('active'); });
    pillarTabs.forEach(function (t) { t.classList.remove('active'); });
    var panel = document.querySelector('[data-pillar-panel="' + index + '"]');
    var tab = document.querySelector('.pillar-tab[data-pillar="' + index + '"]');
    if (panel) panel.classList.add('active');
    if (tab) tab.classList.add('active');
  }

  function startPillarTimer() {
    clearInterval(pillarTimer);
    pillarTimer = setInterval(function () {
      showPillar((pillarIndex + 1) % 3);
    }, 5000);
  }

  pillarTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      showPillar(parseInt(this.dataset.pillar));
      startPillarTimer();
    });
  });

  if (pillarPanels.length) {
    showPillar(0);
    startPillarTimer();
  }

  // ---- SCHEDULE ACCORDION ----
  var scheduleImages = [
    'assets/schedule-online-prep.png',
    'assets/11de0180-9fd9-4966-a4a4-aa091c0adaf9.png',
    'assets/schedule-days23-v2.png',
    'assets/schedule-days45.png',
    'assets/schedule-days678.jpg',
    'assets/8254fb1b-ea7c-433b-b7a4-8796e3238dd5.jpg'
  ];
  var scheduleHeroImg = document.getElementById('schedule-hero-img');
  var scheduleAccordion = document.getElementById('schedule-accordion');

  if (scheduleAccordion) {
    var accordionItems = scheduleAccordion.querySelectorAll('.accordion-item');
    accordionItems.forEach(function (item) {
      var trigger = item.querySelector('.accordion-trigger');
      trigger.addEventListener('click', function () {
        var isActive = item.classList.contains('active');
        // Close all
        accordionItems.forEach(function (ai) {
          ai.classList.remove('active');
          var btn = ai.querySelector('.accordion-trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
          var icon = ai.querySelector('.accordion-icon');
          if (icon) icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
        });
        if (!isActive) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          var icon = item.querySelector('.accordion-icon');
          if (icon) icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
          // Update hero image
          var idx = parseInt(item.dataset.schedule);
          if (scheduleHeroImg && scheduleImages[idx]) {
            scheduleHeroImg.src = scheduleImages[idx];
            scheduleHeroImg.alt = item.querySelector('.accordion-title').textContent;
          }
        } else {
          if (scheduleHeroImg) {
            scheduleHeroImg.src = 'assets/schedule-default.jpg';
            scheduleHeroImg.alt = 'Forge Residency';
          }
        }
      });
    });
  }

  // ---- MENTORS CAROUSEL ----
  var mentorCards = document.querySelectorAll('.mentor-card');
  var mentorDots = document.querySelectorAll('.mentor-dot');
  var mentorPrev = document.querySelector('.mentor-prev');
  var mentorNext = document.querySelector('.mentor-next');
  var mentorTrack = document.querySelector('.mentors-track');
  var currentMentor = 0;

  function showMentor(index) {
    currentMentor = index;
    mentorCards.forEach(function (c) { c.classList.remove('active'); });
    mentorDots.forEach(function (d) { d.classList.remove('active'); });
    if (mentorCards[index]) mentorCards[index].classList.add('active');
    if (mentorDots[index]) mentorDots[index].classList.add('active');
    // Scroll to active card
    if (mentorTrack && mentorCards[index]) {
      var card = mentorCards[index];
      var trackRect = mentorTrack.getBoundingClientRect();
      var cardRect = card.getBoundingClientRect();
      var scrollLeft = mentorTrack.scrollLeft + (cardRect.left - trackRect.left) - (trackRect.width / 2) + (cardRect.width / 2);
      mentorTrack.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }

  mentorDots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      showMentor(parseInt(this.dataset.mentorDot));
    });
  });
  mentorCards.forEach(function (card) {
    card.addEventListener('click', function () {
      showMentor(parseInt(this.dataset.mentor));
    });
  });
  if (mentorPrev) {
    mentorPrev.addEventListener('click', function () {
      showMentor((currentMentor - 1 + mentorCards.length) % mentorCards.length);
    });
  }
  if (mentorNext) {
    mentorNext.addEventListener('click', function () {
      showMentor((currentMentor + 1) % mentorCards.length);
    });
  }

  // ---- TESTIMONIALS CAROUSEL ----
  var testimonials = [
    { quote: "honestly did not expect to ship something real in 9 days. like actually real. i built an automation that now handles all my lead followups and a landing page for my new offer. my team thought i hired someone lol. the people in the room were the best part though, still talk and build with half of them every week.", name: "Rishi Malhotra", role: "Co-founder, Koda Labs", location: "Mumbai" },
    { quote: "I've done Udemy courses, YouTube rabbit holes, paid for like 3 different AI tools I never properly used.. this was different. you actually sit and build the thing. no theory, no slides, just here's the tool, here's what we're making today. clicked for me in a way nothing else had.", name: "Ananya Iyer", role: "Freelance Designer", location: "Chennai" },
    { quote: "Was skeptical tbh. thought it would be a lot of 'AI is the future' type content. It wasn't. Day 2 I made my first AI video ad. Day 5 my automation was live. Day 8 I demoed a client dashboard I built from scratch. zero coding background. genuinely changed how I think about what's possible.", name: "Kabir Sehgal", role: "Founder, Blok Studio", location: "Delhi" },
    { quote: "the dot matrix slide alone was worth the trip. but what stayed with me was the people. a founder from Bangalore, a marketer from Delhi, an operator from Pune, all of us just heads down building for 9 days straight. made friends I'll keep for years. also my content output has 3x'd since I got back so.. yeah.", name: "Meera Nambiar", role: "Brand Strategist, Swiggy", location: "Bangalore" },
    { quote: "I run ops for a 40 person company. I came in knowing exactly what was broken, I just didn't know how to fix it. Left with 2 automations running and a third half built. saved us probably 12 hours a week already. the ROI math is very simple.", name: "Aryan Kapoor", role: "Head of Operations, Vahan", location: "Pune" },
    { quote: "ok so I went in thinking I'd learn some tools. came out having completely rethought how I run my agency. the business thinking session on day 3 actually hit different, mapped out my whole workflow and realised I was manually doing 6 things that didn't need a human. fixed 4 of them by day 6.", name: "Priya Sood", role: "Founder, The Copy Co.", location: "Jaipur" },
    { quote: "My biggest fear was being the least technical person in the room. I was probably top 3 non-technical. didn't matter at all?? the tools are genuinely built for people like us. and the mentors don't make you feel stupid for asking basic questions. best 9 days I've spent on my business in 3 years.", name: "Vikram Nair", role: "Senior Marketing Manager, CRED", location: "Bangalore" },
    { quote: "came for the AI. stayed for the community. still in the group chat every day. we've already referred 3 clients between us and one person in my batch is building something I'm going to invest in. didn't expect any of that when I signed up.", name: "Shreya Bhatia", role: "Founder, Mosaic Ventures", location: "Mumbai" }
  ];

  var testimonialText = document.getElementById('testimonial-text');
  var testimonialName = document.getElementById('testimonial-name');
  var testimonialRole = document.getElementById('testimonial-role');
  var testimonialLocText = document.getElementById('testimonial-loc-text');
  var testimonialDotsContainer = document.getElementById('testimonial-dots');
  var testimonialCard = document.getElementById('testimonial-card');
  var currentTestimonial = 0;
  var testimonialTimerVar = null;

  function showTestimonial(index) {
    currentTestimonial = index;
    var t = testimonials[index];
    if (testimonialText) testimonialText.textContent = t.quote;
    if (testimonialName) testimonialName.textContent = t.name;
    if (testimonialRole) testimonialRole.textContent = t.role;
    if (testimonialLocText) testimonialLocText.textContent = t.location;
    // Update dots
    if (testimonialDotsContainer) {
      var dots = testimonialDotsContainer.querySelectorAll('.testimonial-dot');
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === index);
      });
    }
  }

  if (testimonialDotsContainer) {
    for (var ti = 0; ti < testimonials.length; ti++) {
      var dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (ti === 0 ? ' active' : '');
      dot.dataset.index = ti;
      dot.setAttribute('aria-label', 'Testimonial ' + (ti + 1));
      dot.addEventListener('click', function () {
        showTestimonial(parseInt(this.dataset.index));
        resetTestimonialTimer();
      });
      testimonialDotsContainer.appendChild(dot);
    }
  }

  function resetTestimonialTimer() {
    clearInterval(testimonialTimerVar);
    testimonialTimerVar = setInterval(function () {
      showTestimonial((currentTestimonial + 1) % testimonials.length);
    }, 5000);
  }

  if (testimonialText) {
    showTestimonial(0);
    resetTestimonialTimer();
  }

  // Swipe support for testimonials
  if (testimonialCard) {
    var touchStartX = 0;
    testimonialCard.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    testimonialCard.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) showTestimonial((currentTestimonial + 1) % testimonials.length);
        else showTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length);
        resetTestimonialTimer();
      }
    }, { passive: true });
  }

  // ---- PRICING TOGGLE ----
  var btnInclusions = document.getElementById('btn-inclusions');
  var btnExclusions = document.getElementById('btn-exclusions');
  var inclusionsList = document.getElementById('inclusions-list');
  var exclusionsList = document.getElementById('exclusions-list');

  if (btnInclusions && btnExclusions) {
    btnInclusions.addEventListener('click', function () {
      btnInclusions.classList.add('active');
      btnExclusions.classList.remove('active');
      if (inclusionsList) inclusionsList.hidden = false;
      if (exclusionsList) exclusionsList.hidden = true;
    });
    btnExclusions.addEventListener('click', function () {
      btnExclusions.classList.add('active');
      btnInclusions.classList.remove('active');
      if (exclusionsList) exclusionsList.hidden = false;
      if (inclusionsList) inclusionsList.hidden = true;
    });
  }

  // ---- FAQ ACCORDION ----
  var faqList = document.getElementById('faq-list');
  if (faqList) {
    var faqItems = faqList.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      var trigger = item.querySelector('.faq-trigger');
      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(function (fi) {
          fi.classList.remove('open');
          var btn = fi.querySelector('.faq-trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
          var icon = fi.querySelector('.faq-icon');
          if (icon) icon.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
        });
        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          var icon = item.querySelector('.faq-icon');
          if (icon) icon.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        }
      });
    });
  }

  // ---- VENN DIAGRAM ANIMATION ----
  var vennDesktop = document.getElementById('venn-desktop');
  var vennMobile = document.getElementById('venn-mobile');
  if ('IntersectionObserver' in window && (vennDesktop || vennMobile)) {
    var vennObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('venn-animated');
          vennObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    if (vennDesktop) vennObserver.observe(vennDesktop);
    if (vennMobile) vennObserver.observe(vennMobile);
  } else {
    if (vennDesktop) vennDesktop.classList.add('venn-animated');
    if (vennMobile) vennMobile.classList.add('venn-animated');
  }

  // ---- BACK TO TOP ----
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
