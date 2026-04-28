(function () {
  'use strict';
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var header = document.getElementById('site-header');
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  (function () {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === path) link.classList.add('active');
    });
  }());

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

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade-in').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.fade-in').forEach(function (el) { el.classList.add('visible'); });
  }

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
      dots.forEach(function (d, di) { d.classList.toggle('active', di === index); });
    }
    function next() { goTo(index + 1); }
    function start() { stop(); timer = setInterval(next, AUTOPLAY_MS); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); start(); });
    });
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
    start();
  }());

  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;
    question.addEventListener('click', function () {
      var isOpen = item.classList.toggle('open');
      question.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) answer.style.maxHeight = answer.scrollHeight + 'px';
      else answer.style.maxHeight = '0';
    });
  });
  window.addEventListener('resize', function () {
    document.querySelectorAll('.faq-item.open .faq-answer').forEach(function (a) {
      a.style.maxHeight = a.scrollHeight + 'px';
    });
  });

  (function () {
    var form = document.getElementById('contact-form');
    var success = document.getElementById('form-success');
    if (!form) return;
    function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
    function isPhone(v) { if (!v) return true; return /^[\d\s\-().+]{7,}$/.test(v); }
    function setError(field, hasError) {
      if (hasError) field.classList.add('error');
      else field.classList.remove('error');
    }
    function validateField(input) {
      var field = input.closest('.form-field');
      if (!field) return true;
      var value = (input.value || '').trim();
      if (input.hasAttribute('required') && !value) { setError(field, true); return false; }
      if (input.type === 'email' && value && !isEmail(value)) { setError(field, true); return false; }
      if (input.type === 'tel' && value && !isPhone(value)) { setError(field, true); return false; }
      setError(field, false);
      return true;
    }
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
        if (!ok) { valid = false; if (!firstInvalid) firstInvalid = input; }
      });
      if (!valid) {
        if (firstInvalid) { firstInvalid.focus(); firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        return;
      }
      form.style.display = 'none';
      if (success) { success.classList.add('visible'); success.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  }());
}());
