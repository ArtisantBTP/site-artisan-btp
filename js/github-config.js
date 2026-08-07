/* ==========================================================================
   CONFIG GITHUB — utilisée par js/blog.js ET js/site-content.js
   ⚠️ À CONFIGURER une fois votre dépôt GitHub créé : ces 2 fichiers
   partagent cette config, vous n'avez besoin de la modifier qu'ICI.
   ========================================================================== */
const GITHUB_USER   = 'VOTRE-PSEUDO-GITHUB';   // ex: 'andre-artisanbtp'
const GITHUB_REPO   = 'VOTRE-DEPOT';           // ex: 'site-artisan-btp'
const GITHUB_BRANCH = 'main';

const RAW_ROOT = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/`;

/* Récupère un fichier JSON de contenu (ex: content/site.json) */
async function fetchContentJSON(path) {
  const res = await fetch(RAW_ROOT + path + '?t=' + Date.now()); // évite le cache navigateur
  if (!res.ok) throw new Error('Contenu introuvable : ' + path);
  return res.json();
}
