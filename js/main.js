/* ===================================================
   ARTISANT BTP — main.js
   EmailJS : 2 destinations selon l'interlocuteur choisi
   =================================================== */

/* ----  EmailJS config ---- 
   Remplis ces 4 valeurs depuis emailjs.com
   SERVICE_ID     : ton Service ID (ex: "service_abc123")
   TEMPLATE_ANDRE : Template ID pour André
   TEMPLATE_YADEL : Template ID pour Massinissa
   PUBLIC_KEY     : ta Public Key EmailJS
*/
const EMAILJS_SERVICE_ID     = 'service_h567z1c';
const EMAILJS_TEMPLATE_ANDRE = 'template_rwrzowh';
const EMAILJS_TEMPLATE_YADEL = 'template_mohuzog';
const EMAILJS_PUBLIC_KEY     = '8UiHqs1DEDlNcYDNw';

/* ---- Calendly : un lien d'événement par interlocuteur ----
   À REMPLACER par les vrais liens une fois les comptes Calendly créés.
   Format attendu : https://calendly.com/NOM-UTILISATEUR/NOM-EVENEMENT
*/
const CALENDLY_LINKS = {
  andre:       'https://calendly.com/andre-artisant-btp/rdv-30min',
  massinissa:  'https://calendly.com/massinissa-artisant-btp/rdv-30min'
};

/* ---- Nav scroll ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ---- Menu burger ---- */
const burger      = document.getElementById('burger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

burger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

/* ---- Reveal au scroll ---- */
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.equipe__card').forEach((el, i) => {
  el.dataset.delay = i * 120;
});
document.querySelectorAll('.confiance__point').forEach((el, i) => {
  el.dataset.delay = i * 90;
});
document.querySelectorAll('.avis-card').forEach((el, i) => {
  el.dataset.delay = i * 110;
});

reveals.forEach(el => revealObserver.observe(el));

/* ---- Boutons RDV section équipe ---- */
const rdvBtns         = document.querySelectorAll('.equipe__rdv-btn');
const radioAndre      = document.getElementById('radioAndre');
const radioMassinissa = document.getElementById('radioMassinissa');
const calendlyWidget  = document.getElementById('calendlyWidget');
const calendlyHint    = document.getElementById('calendlyHint');
const rdvDateTimeInput = document.getElementById('rdvDateTime');

/* Charge le calendrier Calendly du bon interlocuteur dans le widget */
function loadCalendly(contact) {
  const url = CALENDLY_LINKS[contact];
  if (!calendlyWidget || !url) return;

  // Reset : un rendez-vous déjà pris pour l'autre interlocuteur n'est plus valable
  rdvDateTimeInput.value = '';
  calendlyWidget.innerHTML = '';
  calendlyHint.textContent = '';

  if (window.Calendly) {
    window.Calendly.initInlineWidget({
      url: url + '?hide_event_type_details=1&hide_gdpr_banner=1',
      parentElement: calendlyWidget
    });
  } else {
    // Le script Calendly n'est pas encore chargé, on réessaie un peu plus tard
    setTimeout(() => loadCalendly(contact), 300);
  }
}

/* Écoute la confirmation de prise de RDV envoyée par l'iframe Calendly */
window.addEventListener('message', (e) => {
  if (e.data?.event === 'calendly.event_scheduled') {
    // Calendly ne renvoie pas toujours l'heure exacte dans le message ;
    // on marque simplement le créneau comme confirmé pour valider le formulaire.
    rdvDateTimeInput.value = new Date().toISOString();
    calendlyHint.textContent = '✅ Créneau réservé dans l\'agenda. Complétez le formulaire ci-dessous pour finaliser.';
    calendlyHint.style.color = '#1e8e3e';
  }
});

function selectInterlocuteur(contact) {
  if (contact === 'andre' && radioAndre)                radioAndre.checked = true;
  else if (contact === 'massinissa' && radioMassinissa) radioMassinissa.checked = true;
  loadCalendly(contact);
}

[radioAndre, radioMassinissa].forEach(radio => {
  radio?.addEventListener('change', (e) => loadCalendly(e.target.value));
});

rdvBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    selectInterlocuteur(btn.dataset.contact);

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const top = contactSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- Formulaire — envoi EmailJS ---- */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = form?.querySelector('button[type="submit"]');

if (form) {

  // Initialiser EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Un interlocuteur doit être sélectionné (condition pour charger le bon Calendly)
    if (!form.querySelector('input[name="interlocuteur"]:checked')) {
      calendlyHint.textContent = '⚠️ Choisissez d\'abord un interlocuteur.';
      calendlyHint.style.color = '#e53935';
      return;
    }

    // Le créneau doit avoir été réservé via Calendly avant l'envoi
    if (!rdvDateTimeInput.value) {
      calendlyHint.textContent = '⚠️ Sélectionnez un créneau disponible dans le calendrier ci-dessus.';
      calendlyHint.style.color = '#e53935';
      calendlyWidget.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Validation des autres champs obligatoires
    const required = form.querySelectorAll('[required]:not(#rdvDateTime)');
    let valid = true;
    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#e53935';
        valid = false;
      }
    });
    if (!valid) {
      form.querySelector('[required][style*="e53935"]')?.focus();
      return;
    }

    // Récupérer les valeurs
    const interlocuteur = form.querySelector('input[name="interlocuteur"]:checked')?.value || 'andre';
    const nom           = document.getElementById('nom').value;
    const tel           = document.getElementById('tel').value;
    const email         = document.getElementById('email').value;
    const type          = document.getElementById('type').value;
    const message       = document.getElementById('message').value;

    // Choisir le bon template et destinataire selon l'interlocuteur
    const templateId   = interlocuteur === 'massinissa' ? EMAILJS_TEMPLATE_YADEL : EMAILJS_TEMPLATE_ANDRE;
    const nomContact   = interlocuteur === 'massinissa' ? 'Massinissa Yadel'     : 'André Bertrand';
    const emailContact = interlocuteur === 'massinissa' ? 'yadelmassinissa@gmail.com' : 'andre.bertrand@artisant-btp.fr';

    // Paramètres envoyés au template EmailJS
    // Ces noms de variables doivent correspondre aux {{variables}} dans ton template EmailJS
    const templateParams = {
      to_name:        nomContact,
      to_email:       emailContact,
      from_name:      nom,
      from_email:     email,
      from_tel:       tel,
      rdv_creneau:    'Réservé via l\'agenda en ligne (voir invitation Calendly)',
      rdv_type:       type,
      message:        message,
      interlocuteur:  nomContact
    };

    // Désactiver le bouton pendant l'envoi
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, templateId, templateParams);

      // Succès — le créneau est déjà confirmé dans l'agenda via Calendly
      form.reset();
      calendlyWidget.innerHTML = '';
      calendlyHint.textContent = "Sélectionnez d'abord un interlocuteur ci-dessus.";
      calendlyHint.style.color = '';
      formSuccess.classList.add('visible');
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (err) {
      console.error('EmailJS error:', err);
      alert(`❌ Erreur lors de l'envoi. Veuillez contacter ${nomContact} directement :\n📞 ${interlocuteur === 'massinissa' ? '07 80 86 17 39' : '06 12 34 56 78'}`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1.5" y="2" width="15" height="14" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 1.5v2M13 1.5v2M1.5 7h15" stroke="currentColor" stroke-width="1.3"/></svg> Envoyer ma demande de RDV';
    }
  });
}

/* ---- Active nav link sur scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a:not(.nav__cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) link.style.color = 'var(--blue)';
  });
}, { passive: true });

/* ---- Smooth scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
});


const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".image-modal__close");

document.querySelectorAll(".zoomable").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});