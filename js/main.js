// =========================================================
// Sea Tax Services — main.js
// Vanilla JS, no dependencies. IE11+ ES2015 features only.
// =========================================================

(function () {
  'use strict';

  // ----- Current year in footer -----
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Sticky header scroll shadow -----
  var header = document.getElementById('site-header');
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  // ----- Mobile nav toggle -----
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close mobile nav when a link is tapped
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----- Active nav link based on current page -----
  (function () {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === path) link.classList.add('active');
    });
  }());

  // ----- Back to top button -----
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    function onScrollBackTop() {
      if (window.scrollY > 300) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }
    onScrollBackTop();
    window.addEventListener('scroll', onScrollBackTop, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ----- Intersection Observer fade-ins -----
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade-in').forEach(function (el) {
      io.observe(el);
    });
  } else {
    // Fallback — show everything
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ----- Testimonial carousel -----
  (function () {
    var carousel = document.getElementById('testimonial-carousel');
    if (!carousel) return;
    var slides = carousel.querySelector('.testimonial-slides');
    var dots = carousel.querySelectorAll('.testimonial-dot');
    var total = dots.length;
    var index = 0;
    var timer = null;
    var AUTOPLAY_MS = 6000;

    function goTo(i) {
      index = (i + total) % total;
      slides.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach(function (d, di) {
        d.classList.toggle('active', di === index);
      });
    }
    function next() { goTo(index + 1); }

    function start() {
      stop();
      timer = setInterval(next, AUTOPLAY_MS);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        start();
      });
    });

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else start();
    });

    start();
  }());

  // ----- FAQ accordion -----
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;
    question.addEventListener('click', function () {
      var isOpen = item.classList.toggle('open');
      question.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
    });
  });

  // Recalculate open FAQ on resize (content may reflow)
  window.addEventListener('resize', function () {
    document.querySelectorAll('.faq-item.open .faq-answer').forEach(function (a) {
      a.style.maxHeight = a.scrollHeight + 'px';
    });
  });

  // ----- Contact form validation -----
  (function () {
    var form = document.getElementById('contact-form');
    var success = document.getElementById('form-success');
    if (!form) return;

    function isEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    }
    function isPhone(v) {
      if (!v) return true; // optional
      return /^[\d\s\-().+]{7,}$/.test(v);
    }

    function setError(field, hasError) {
      if (hasError) field.classList.add('error');
      else field.classList.remove('error');
    }

    function validateField(input) {
      var field = input.closest('.form-field');
      if (!field) return true;
      var value = (input.value || '').trim();

      if (input.hasAttribute('required') && !value) {
        setError(field, true);
        return false;
      }
      if (input.type === 'email' && value && !isEmail(value)) {
        setError(field, true);
        return false;
      }
      if (input.type === 'tel' && value && !isPhone(value)) {
        setError(field, true);
        return false;
      }
      setError(field, false);
      return true;
    }

    // Validate on blur for real-time feedback
    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () {
        var field = input.closest('.form-field');
        if (field && field.classList.contains('error')) validateField(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var firstInvalid = null;
      form.querySelectorAll('input, select, textarea').forEach(function (input) {
        var ok = validateField(input);
        if (!ok) {
          valid = false;
          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (!valid) {
        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      var submitBtn = form.querySelector('.form-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form)
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          form.style.display = 'none';
          if (success) {
            success.classList.add('visible');
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          alert('Something went wrong. Please try again or call us at (206) 656-8685.');
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        alert('Something went wrong. Please try again or call us at (206) 656-8685.');
      });
    });
  }());

  // ----- Smooth anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    a.addEventListener('click', function (e) {
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

}());
