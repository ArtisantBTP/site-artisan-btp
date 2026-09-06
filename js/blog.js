/* ==========================================================================
   BLOG — récupère les articles écrits via /admin directement depuis GitHub.
   Aucune étape de build : la liste des articles est lue en direct.
   Config GitHub (GITHUB_USER, GITHUB_REPO, RAW_ROOT...) : voir js/github-config.js
   ========================================================================== */
const API_BASE = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/content/articles?ref=${GITHUB_BRANCH}`;
const RAW_BASE = RAW_ROOT + 'content/articles/';

/* ---- Parseur de front matter (--- ... ---) minimaliste ---- */
function parseArticle(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta = {};
  match[1].split('\n').forEach(line => {
    const m = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (m) {
      let value = m[2].trim();
      value = value.replace(/^"(.*)"$/, '$1'); // retire les guillemets
      meta[m[1]] = value;
    }
  });

  return { meta, body: match[2].trim() };
}

/* ---- Rendu markdown → HTML très simple (titres, paragraphes, gras, liens) ---- */
function renderMarkdown(md) {
  return md
    .split(/\n\s*\n/)
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('### ')) return `<h3>${inline(block.slice(4))}</h3>`;
      if (block.startsWith('## '))  return `<h2>${inline(block.slice(3))}</h2>`;
      if (block.startsWith('# '))   return `<h2>${inline(block.slice(2))}</h2>`;
      return `<p>${inline(block).replace(/\n/g, '<br>')}</p>`;
    })
    .join('\n');
}
function inline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ---- Récupère la liste des fichiers .md du dossier content/articles ---- */
async function fetchArticleList() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Impossible de charger les articles (dépôt GitHub non configuré ?)');
  const files = await res.json();
  return files.filter(f => f.name.endsWith('.md'));
}

async function fetchArticle(filename) {
  const res = await fetch(RAW_BASE + filename);
  const raw = await res.text();
  return parseArticle(raw);
}

/* ==================== PAGE LISTE (blog.html) ==================== */
async function renderBlogList() {
  const container = document.getElementById('blogList');
  if (!container) return;

  try {
    const files = await fetchArticleList();
    if (!files.length) {
      container.innerHTML = '<p class="blog-empty">Aucun article publié pour le moment.</p>';
      return;
    }

    const articles = await Promise.all(files.map(async f => {
      const { meta } = await fetchArticle(f.name);
      return { ...meta, slug: f.name.replace(/\.md$/, '') };
    }));

    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = articles.map(a => `
      <a href="article.html?slug=${encodeURIComponent(a.slug)}" class="blog-card reveal">
        ${a.image ? `<div class="blog-card__img"><img src="${a.image}" alt="${a.title || ''}" loading="lazy" /></div>` : ''}
        <div class="blog-card__body">
          <span class="blog-card__date">${formatDate(a.date)}</span>
          <h3>${a.title || 'Sans titre'}</h3>
          <p>${a.excerpt || ''}</p>
        </div>
      </a>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p class="blog-empty">${err.message}</p>`;
  }
}

/* ==================== PAGE ARTICLE (article.html) ==================== */
async function renderSingleArticle() {
  const container = document.getElementById('articleContent');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (!slug) {
    container.innerHTML = '<p class="blog-empty">Article introuvable.</p>';
    return;
  }

  try {
    const { meta, body } = await fetchArticle(slug + '.md');
    document.title = `${meta.title || 'Article'} — ARTISAN BTP`;
    container.innerHTML = `
      <p class="article__date">${formatDate(meta.date)}</p>
      <h1>${meta.title || ''}</h1>
      ${meta.image ? `<img class="article__cover" src="${meta.image}" alt="${meta.title || ''}" />` : ''}
      <div class="article__body">${renderMarkdown(body)}</div>
    `;
  } catch (err) {
    container.innerHTML = `<p class="blog-empty">Impossible de charger cet article.</p>`;
  }
}

renderBlogList();
renderSingleArticle();
