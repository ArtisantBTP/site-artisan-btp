/* ===================================================
   ARTISAN BTP — pages.js
   Script pour services.html et realisations.html
   =================================================== */

/* ---- Nav scroll ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ---- Menu burger ---- */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link');

burger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

/* ---- Animations au scroll ---- */
const revealEls = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

if (revealEls.length) {
  // Cascade : les cartes d'une même rangée apparaissent en léger décalage
  const cardGroups = new Map();
  revealEls.forEach(el => {
    const card = el.closest('.real-card') || el;
    const top = Math.round(card.getBoundingClientRect().top);
    const count = cardGroups.get(top) || 0;
    el.dataset.delay = count * 90;
    cardGroups.set(top, count + 1);
  });

  const revealObserverPages = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserverPages.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserverPages.observe(el));
}

/* ---- Filtres réalisations ---- */
const filtres = document.querySelectorAll('.filtre');
const cards   = document.querySelectorAll('.real-card');

if (filtres.length && cards.length) {
  filtres.forEach(btn => {
    btn.addEventListener('click', () => {
      filtres.forEach(b => b.classList.remove('actif'));
      btn.classList.add('actif');
      const filtre = btn.dataset.filtre;
      cards.forEach(card => {
        card.classList.toggle('hidden', filtre !== 'tous' && card.dataset.cat !== filtre);
      });
    });
  });
}

/* ---- Lightbox sur réalisations ---- */
const lightbox        = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose   = document.getElementById('lightboxClose');

if (lightbox) {
  document.querySelectorAll('.real-card__img').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const card = item.closest('.real-card');
      const titre = card.querySelector('h3')?.textContent || '';
      const desc  = card.querySelector('p')?.textContent || '';

      if (img && !item.classList.contains('real-card__img--placeholder')) {
        const clone = document.createElement('img');
        clone.src = img.src;
        clone.alt = img.alt;
        clone.style.cssText = 'max-width:90vw;max-height:75vh;border-radius:10px;object-fit:contain;';
        lightboxContent.innerHTML = '';
        lightboxContent.appendChild(clone);
        lightboxCaption.textContent = `${titre} — ${desc}`;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

/* ---- Smooth scroll liens internes ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
    }
  });
});