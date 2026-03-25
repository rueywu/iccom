'use strict';

// ── Language Toggle ──────────────────────────────────────────────────
let currentLang = 'zh';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-TW' : 'en');
  document.querySelectorAll('[data-zh][data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
  document.querySelectorAll('[data-zh-html][data-en-html]').forEach(el => {
    el.innerHTML = el.dataset[lang + 'Html'];
  });
  document.getElementById('lang-toggle').textContent = lang === 'zh' ? 'EN' : '中文';
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  setLang(currentLang === 'zh' ? 'en' : 'zh');
});

// ── Navbar ────────────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
const menuBtn = document.querySelector('.nav-menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Product Tabs ─────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.product-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + target).classList.add('active');
  });
});

// ── Lightbox ──────────────────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.product-img-wrap img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.showModal();
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

function closeLightbox() {
  lightbox.close();
  document.body.style.overflow = '';
}

// ── Smooth scroll offset for fixed navbar ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// ── Scroll-reveal (lightweight) ─────────────────────────────────────
const revealItems = document.querySelectorAll('.timeline-item, .mv-card, .equip-list li, .product-img-wrap, .customer-logo-wrap');
revealItems.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 60 * (i % 8));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealItems.forEach(el => observer.observe(el));
