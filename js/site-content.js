/* ==========================================================================
   CONTENU ÉDITABLE — va chercher content/site.json sur GitHub et remplace
   le contenu par défaut du HTML par celui saisi dans /admin.
   Si le dépôt n'est pas encore configuré (voir js/github-config.js) ou en
   cas d'erreur réseau, le contenu par défaut déjà présent dans le HTML
   reste affiché (rien ne casse).
   ========================================================================== */

/* ---- Mini-rendu texte → HTML : paragraphes + listes à puces (lignes "- ...") ---- */
function renderBody(text) {
  if (!text) return '';
  return text
    .split(/\n\s*\n/)
    .map(block => {
      block = block.trim();
      if (!block) return '';
      const lines = block.split('\n').map(l => l.trim());
      if (lines.every(l => l.startsWith('- '))) {
        return '<ul class="service-page__list">' + lines.map(l => `<li>${l.slice(2)}</li>`).join('') + '</ul>';
      }
      return `<p>${block}</p>`;
    })
    .join('\n');
}

/* ---- Page Services ---- */
async function renderServicesPage() {
  const blocks = document.querySelectorAll('.service-page');
  if (!blocks.length) return; // pas sur cette page

  try {
    const data = await fetchContentJSON('content/services.json');
    const items = data?.items;
    if (!items || !items.length) return;

    blocks.forEach((block, i) => {
      const item = items[i];
      if (!item) return;

      const content = block.querySelector('.service-page__content');
      if (content) {
        const num = String(i + 1).padStart(2, '0');
        content.innerHTML = `
          <span class="service-page__num">${num}</span>
          <h2>${item.title || ''}</h2>
          ${renderBody(item.body)}
          <p class="service-page__tarif">${item.tarif || ''}</p>
          <a href="index.html#contact" class="btn btn--primary">Demander un devis gratuit</a>
        `;
      }

      const img = block.querySelector('.service-page__visual img');
      if (img && item.image) {
        img.src = item.image;
        img.alt = item.alt || item.title || '';
      }
    });

    // En-tête de page (titre + texte d'intro)
    if (data.intro_title) {
      const h1 = document.querySelector('.page-header__title');
      if (h1) h1.textContent = data.intro_title;
    }
    if (data.intro_text) {
      const desc = document.querySelector('.page-header__desc');
      if (desc) desc.textContent = data.intro_text;
    }
  } catch (err) {
    // Dépôt pas encore configuré ou hors ligne : le contenu par défaut du HTML reste affiché.
    console.warn('Contenu éditable non chargé, affichage du contenu par défaut.', err.message);
  }
}

renderServicesPage();
