/* ===================================================
   ARTISAN BTP — chatbot.js
   Chatbot à réponses préprogrammées — 100% gratuit
   =================================================== */

const REPONSES = [

  /* ---- SALUTATIONS ---- */
  {
    mots_cles: ['bonjour', 'bonsoir', 'salut', 'hello', 'coucou', 'bonne journée', 'bonne soirée'],
    reponse: `Bonjour et bienvenue chez ARTISAN BTP !

Nous sommes spécialistes de la rénovation intérieure en Île-de-France. Je peux vous renseigner sur nos services, nos tarifs, nos délais ou vous aider à prendre rendez-vous.

Comment puis-je vous aider ?`
  },

  /* ---- SERVICES GÉNÉRAUX ---- */
  {
    mots_cles: ['service', 'prestation', 'proposez', 'faites', 'offrez', 'travaux', 'que faites', 'vous faites quoi', 'domaine'],
    reponse: `ARTISAN BTP intervient sur tous les corps de métier du second œuvre intérieur :

• Peinture intérieure — murs, plafonds, boiseries
• Pose de BA13 — cloisons, faux plafonds, doublages
• Plâtrerie et enduits de lissage
• Décoration intérieure et conseil en aménagement
• Rénovation complète clé en main

Chaque projet est piloté par Massinissa Yadel, chef de projet, et suivi de A à Z par toute l'équipe. Vous pouvez demander un devis gratuit sous 48h en remplissant le formulaire de contact ou en appelant directement.`
  },

  /* ---- PEINTURE ---- */
  {
    mots_cles: ['peinture', 'peindre', 'couleur', 'mur', 'plafond', 'boiserie', 'repeindre'],
    reponse: `Notre service peinture intérieure comprend :

• Préparation et protection des surfaces
• Rebouchage et ponçage si nécessaire
• Application de sous-couche et finition
• Conseil colorimétrique personnalisé

Nous intervenons sur les murs, plafonds et boiseries dans les appartements, maisons et locaux professionnels.

Tarif indicatif : à partir de 15€/m² (main d'œuvre + fournitures). Devis gratuit sous 48h.`
  },

  /* ---- BA13 ---- */
  {
    mots_cles: ['ba13', 'cloison', 'plaque', 'plâtre', 'platre', 'faux plafond', 'doublage', 'isolation', 'cloisons'],
    reponse: `Notre service BA13 couvre :

• Cloisons de séparation de pièces
• Doublages pour isolation thermique et phonique
• Faux plafonds avec ou sans spots intégrés
• Habillage de murs, colonnes et conduits

Tarifs indicatifs :
• Cloison BA13 : à partir de 45€/m²
• Faux plafond : à partir de 40€/m²

Devis gratuit sous 48h, déplacement inclus sur toute l'Île-de-France.`
  },

  /* ---- PLATRERIE ---- */
  {
    mots_cles: ['plâtrerie', 'platrerie', 'enduit', 'lissage', 'rebouchage', 'ragréage', 'ponçage'],
    reponse: `Notre service plâtrerie comprend :

• Enduits de lissage pour un rendu parfaitement lisse
• Rebouchage de fissures, trous et imperfections
• Ponçage et préparation des supports
• Mise à niveau des surfaces avant peinture

C'est une étape essentielle pour garantir une finition irréprochable. Nous l'intégrons systématiquement dans nos chantiers de rénovation complète. Devis gratuit sous 48h.`
  },

  /* ---- RENOVATION COMPLETE ---- */
  {
    mots_cles: ['renovation', 'rénovation', 'complet', 'complète', 'appartement', 'maison', 'logement', 'clé en main', 'cle en main', 'tout faire', 'tout refaire'],
    reponse: `Pour une rénovation complète, ARTISAN BTP prend en charge l'ensemble du chantier :

• Démolition et évacuation des gravats
• Pose de BA13, cloisons et isolation
• Plâtrerie et enduits de lissage
• Peinture et finitions
• Coordination de tous les corps de métier
• Suivi quotidien par Massinissa Yadel, chef de projet

Vous avez un seul interlocuteur du début à la fin. Résultat clé en main, livré dans les délais convenus.

Pour discuter de votre projet, contactez-nous au 01 64 57 09 16 ou remplissez le formulaire de contact.`
  },

  /* ---- DECORATION ---- */
  {
    mots_cles: ['décoration', 'decoration', 'aménagement', 'amenagement', 'design', 'intérieur', 'conseil', 'style'],
    reponse: `Notre service décoration intérieure comprend :

• Conseil en aménagement de l'espace
• Choix des couleurs, matières et finitions
• Harmonisation de l'ensemble des pièces
• Suggestions de mobilier et d'éclairage

Nous adaptons chaque projet à votre style de vie et à vos préférences. Pour un premier échange, contactez André Maury au 06 85 07 98 50.`
  },

  /* ---- TARIFS ---- */
  {
    mots_cles: ['prix', 'tarif', 'coût', 'cout', 'combien', 'coute', 'budget', 'montant', 'facture', 'cher'],
    reponse: `Nos tarifs indicatifs :

• Peinture intérieure : à partir de 15€/m²
• Cloison BA13 : à partir de 45€/m²
• Faux plafond BA13 : à partir de 40€/m²
• Rénovation complète : sur devis selon l'ampleur

Ces prix sont donnés à titre indicatif. Le tarif final dépend de l'état des surfaces, des matériaux choisis et de la superficie.

Nous vous proposons un devis gratuit, détaillé et sans engagement sous 48h après visite. Aucune mauvaise surprise.`
  },

  /* ---- DEVIS ---- */
  {
    mots_cles: ['devis', 'gratuit', 'estimation', 'estimer', 'chiffrage', 'chiffrer'],
    reponse: `Le devis est entièrement gratuit et sans engagement.

Voici comment ça se passe :
1. Vous nous contactez par téléphone ou via le formulaire
2. Nous fixons une date de visite à votre convenance
3. Massinissa ou André se déplace chez vous pour évaluer le chantier
4. Vous recevez un devis détaillé sous 48h

Pour démarrer, appelez le 01 64 57 09 16 ou remplissez le formulaire de contact en bas de page.`
  },

  /* ---- PRISE DE RDV ---- */
  {
    mots_cles: ['rdv', 'rendez-vous', 'rendez vous', 'rencontre', 'visite', 'planifier', 'prendre rendez', 'comment prendre'],
    reponse: `Pour prendre rendez-vous, c'est très simple :

Option 1 — Formulaire en ligne :
Remplissez le formulaire en bas de cette page. Choisissez votre interlocuteur (André ou Massinissa), la date et le créneau souhaité. Nous confirmons sous 24h.

Option 2 — Par téléphone :
• André Maury : 06 85 07 98 50
• Massinissa Yadel : 07 80 86 17 39
• Standard entreprise : 01 64 57 09 16

Nous nous déplaçons gratuitement pour évaluer votre projet sur toute l'Île-de-France.`
  },

  /* ---- HORS ILE DE FRANCE ---- */
  {
    mots_cles: ['hors', 'province', 'normandie', 'bretagne', 'lyon', 'marseille', 'bordeaux', 'toulouse', 'nantes', 'lille', 'strasbourg', 'en dehors', 'pas ile de france', 'autre région', 'autre region', 'deplacement', 'déplacement loin'],
    reponse: `Notre zone d'intervention principale est l'Île-de-France.

Pour un chantier en dehors de cette zone, nous vous invitons à contacter directement André Maury ou Massinissa Yadel qui étudieront votre demande au cas par cas :

• André Maury : 06 85 07 98 50
• Massinissa Yadel : 07 80 86 17 39
• Standard entreprise : 01 64 57 09 16

Selon la nature et l'ampleur du projet, nous pourrons vous proposer une solution adaptée.`
  },

  /* ---- ZONE INTERVENTION ---- */
  {
    mots_cles: ['zone', 'secteur', 'déplace', 'intervien', 'où', 'region', 'région', 'ile de france', 'île-de-france', 'paris', 'essonne', 'yvelines', 'val de marne', 'seine', 'hauts de seine'],
    reponse: `Nous intervenons sur toute l'Île-de-France :

• Paris (tous arrondissements)
• Seine-et-Marne (77)
• Yvelines (78)
• Essonne (91) — notre siège est à Mennecy
• Hauts-de-Seine (92)
• Seine-Saint-Denis (93)
• Val-de-Marne (94)
• Val-d'Oise (95)

Le déplacement pour établir le devis est gratuit. Pour un projet hors Île-de-France, appelez-nous directement au 01 64 57 09 16.`
  },

  /* ---- DELAIS ---- */
  {
    mots_cles: ['délai', 'delai', 'temps', 'combien de temps', 'quand', 'disponible', 'disponibilité', 'agenda', 'planning', 'attente'],
    reponse: `Nos délais habituels :

• Réponse à votre demande : sous 48h
• Visite pour établir le devis : sous 1 semaine
• Démarrage des travaux : 2 à 4 semaines après acceptation du devis
• Durée du chantier : variable selon l'ampleur du projet

Pour connaître nos disponibilités actuelles, appelez directement Massinissa Yadel au 07 80 86 17 39.`
  },

  /* ---- COMMENT CA SE PASSE ---- */
  {
    mots_cles: ['comment ça se passe', 'comment ca se passe', 'processus', 'étapes', 'etapes', 'déroulement', 'deroulement', 'procédure', 'procedure', 'première fois', 'premiere fois'],
    reponse: `Voici comment se déroule un chantier avec ARTISAN BTP :

1. Prise de contact — vous nous appelez ou remplissez le formulaire
2. Visite gratuite — nous venons évaluer votre projet chez vous
3. Devis détaillé — vous le recevez sous 48h, sans engagement
4. Démarrage — une fois le devis accepté, nous planifions le chantier
5. Suivi — Massinissa Yadel supervise les travaux chaque jour
6. Livraison — nous vous remettons les clés d'un chantier impeccable

Vous êtes informé à chaque étape. Aucune mauvaise surprise.`
  },

  /* ---- TYPE DE LOGEMENT ---- */
  {
    mots_cles: ['appartement', 'studio', 'maison', 'villa', 'local commercial', 'bureau', 'professionnel', 'neuf', 'ancien', 'immeuble', 'résidence'],
    reponse: `Nous intervenons sur tous types de biens :

• Appartements et studios
• Maisons individuelles et villas
• Locaux commerciaux et bureaux
• Immeubles en copropriété
• Logements neufs ou anciens

Que ce soit pour un simple rafraîchissement ou une rénovation totale, nous adaptons notre intervention à votre situation. Contactez-nous pour un devis gratuit.`
  },

  /* ---- CONTACT ---- */
  {
    mots_cles: ['contact', 'appeler', 'téléphone', 'telephone', 'joindre', 'parler', 'email', 'mail', 'comment vous contacter', 'vous joindre'],
    reponse: `Vous pouvez nous contacter de plusieurs façons :

Téléphone entreprise : 01 64 57 09 16

André Maury (Gérant) :
• 06 85 07 98 50
• andremaury1957@gmail.com

Massinissa Yadel (Chef de projet) :
• 07 80 86 17 39
• yadelmassinissa@gmail.com

Formulaire en ligne : remplissez le formulaire en bas de cette page et nous vous répondons sous 48h.

Adresse : 46 rue Champoreux, 91540 Mennecy`
  },

  /* ---- ANDRE ---- */
  {
    mots_cles: ['andre', 'andré', 'maury', 'gérant', 'gerant', 'directeur', 'responsable'],
    reponse: `André Maury est le gérant et fondateur d'ARTISAN BTP.

Fort d'une solide expérience en gestion d'entreprise, immobilier et administration, André assure la direction stratégique de la société et la relation client. Il s'implique personnellement dans chaque projet pour garantir que vos attentes sont pleinement satisfaites.

Pour le contacter directement :
• 06 85 07 98 50
• andremaury1957@gmail.com`
  },

  /* ---- MASSINISSA ---- */
  {
    mots_cles: ['massinissa', 'yadel', 'chef de projet', 'chef projet', 'terrain', 'équipe', 'equipe'],
    reponse: `Massinissa Yadel est chef de projet chez ARTISAN BTP.

C'est lui qui dirige les chantiers sur le terrain à la tête d'une équipe d'artisans qualifiés. Il coordonne chaque corps de métier, veille au respect des délais et garantit la qualité d'exécution de chaque réalisation. Votre interlocuteur privilégié pour tout ce qui concerne l'avancement de vos travaux.

Pour le contacter directement :
• 07 80 86 17 39
• yadelmassinissa@gmail.com`
  },

  /* ---- GARANTIES / QUALITE ---- */
  {
    mots_cles: ['garantie', 'assurance', 'qualite', 'qualité', 'certifié', 'certifie', 'confiance', 'sérieux', 'serieux', 'fiable', 'professionnel'],
    reponse: `ARTISAN BTP s'engage sur la qualité à chaque étape :

• Artisans qualifiés et expérimentés
• Matériaux de qualité professionnelle
• Suivi quotidien du chantier par le chef de projet
• Devis détaillé et transparent — aucune mauvaise surprise
• Plus de 150 chantiers réalisés avec satisfaction
• Disponibles après la livraison pour tout suivi

Notre réputation repose sur le bouche-à-oreille et la satisfaction de nos clients. Pour toute question, contactez-nous au 01 64 57 09 16.`
  },

  /* ---- PAIEMENT ---- */
  {
    mots_cles: ['paiement', 'payer', 'acompte', 'facture', 'virement', 'chèque', 'cheque', 'espèce', 'espece', 'modalité', 'modalite'],
    reponse: `Pour toute question concernant les modalités de paiement, nous vous invitons à en discuter directement avec André Maury :

• 06 85 07 98 50
• andremaury1957@gmail.com

Les conditions sont définies dans le devis et adaptées à chaque projet.`
  },

  /* ---- URGENCE ---- */
  {
    mots_cles: ['urgent', 'urgence', 'rapidement', 'vite', 'dès que possible', 'des que possible', 'immédiatement', 'immediatement', 'pressé', 'presse'],
    reponse: `Pour une demande urgente, nous vous recommandons de contacter directement par téléphone :

• Standard entreprise : 01 64 57 09 16
• André Maury : 06 85 07 98 50
• Massinissa Yadel : 07 80 86 17 39

Un appel direct est la solution la plus rapide pour évaluer votre situation et trouver un créneau d'intervention dans les meilleurs délais.`
  },

  /* ---- SOUS TRAITANCE ---- */
  {
    mots_cles: ['sous-traitant', 'sous traitant', 'partenaire', 'artisan', 'équipe propre', 'vos artisans', 'qui fait les travaux'],
    reponse: `Les travaux sont réalisés par l'équipe d'ARTISAN BTP, dirigée sur le terrain par Massinissa Yadel, chef de projet.

Nous travaillons avec des artisans qualifiés et sélectionnés pour leur sérieux et la qualité de leur travail. Chaque chantier est supervisé en direct — vous n'avez qu'un seul interlocuteur du début à la fin.`
  },

  /* ---- REMERCIEMENTS ---- */
  {
    mots_cles: ['merci', 'super', 'parfait', 'nickel', 'top', 'excellent', 'très bien', 'tres bien', 'ok merci', 'bonne journée', 'au revoir', 'bye'],
    reponse: `Avec plaisir ! N'hésitez pas à nous contacter pour toute autre question.

Pour aller plus loin :
• Remplissez le formulaire de contact pour un devis gratuit
• Appelez le 01 64 57 09 16 pour parler directement à l'équipe

Bonne journée et à bientôt chez ARTISAN BTP !`
  },

  /* ---- AVIS / REFERENCES ---- */
  {
    mots_cles: ['avis', 'référence', 'reference', 'témoignage', 'temoignage', 'client', 'satisfaction', 'retour', 'recommandation', 'recommande'],
    reponse: `ARTISAN BTP compte plus de 150 chantiers réalisés en Île-de-France, avec une clientèle qui nous recommande principalement par bouche-à-oreille.

Pour obtenir des références ou échanger avec d'anciens clients, n'hésitez pas à contacter André Maury directement :

• 06 85 07 98 50
• andremaury1957@gmail.com`
  }

];

/* ---- Réponse par défaut ---- */
const REPONSE_DEFAUT = `Je n'ai pas bien compris votre question. Voici les sujets sur lesquels je peux vous renseigner :

• Nos services (peinture, BA13, rénovation...)
• Nos tarifs et devis gratuit
• Notre zone d'intervention
• Les délais et disponibilités
• Comment prendre rendez-vous
• Contacter André ou Massinissa

Ou appelez-nous directement au 01 64 57 09 16, nous serons ravis de vous répondre.`;

/* ---- Recherche de réponse ---- */
function trouverReponse(message) {
  const msg = message.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, "'");

  for (const item of REPONSES) {
    for (const mot of item.mots_cles) {
      const motNormalise = mot.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      if (msg.includes(motNormalise)) {
        return item.reponse;
      }
    }
  }
  return REPONSE_DEFAUT;
}

/* ---- État ---- */
let isOpen = false;

/* ---- Éléments DOM ---- */
const chatBubble   = document.getElementById('chatBubble');
const chatWindow   = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput    = document.getElementById('chatInput');
const chatSend     = document.getElementById('chatSend');
const chatMinimize = document.getElementById('chatMinimize');
const iconOpen     = document.querySelector('.chat-bubble__icon--open');
const iconClose    = document.querySelector('.chat-bubble__icon--close');
const notifBadge   = document.querySelector('.chat-bubble__notif');

/* ---- Ouvrir / fermer ---- */
function toggleChat() {
  isOpen = !isOpen;
  chatWindow.classList.toggle('open', isOpen);
  iconOpen.style.display  = isOpen ? 'none' : 'block';
  iconClose.style.display = isOpen ? 'block' : 'none';
  if (isOpen) {
    notifBadge.style.display = 'none';
    setTimeout(() => chatInput.focus(), 300);
  }
}

chatBubble.addEventListener('click', toggleChat);
chatMinimize.addEventListener('click', toggleChat);

/* ---- Afficher un message ---- */
function addMessage(text, role) {
  const div = document.createElement('div');
  div.className = `chat-msg chat-msg--${role}`;
  const bubble = document.createElement('div');
  bubble.className = 'chat-msg__bubble';
  bubble.innerHTML = text.replace(/\n/g, '<br/>');
  div.appendChild(bubble);
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* ---- Indicateur frappe ---- */
function showTyping() {
  const div = document.createElement('div');
  div.className = 'chat-msg chat-msg--bot';
  div.id = 'typingIndicator';
  div.innerHTML = `<div class="chat-msg__bubble chat-typing"><span></span><span></span><span></span></div>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

/* ---- Envoyer un message ---- */
function sendMessage(text) {
  const message = (text || chatInput.value).trim();
  if (!message) return;

  chatInput.value = '';
  document.querySelectorAll('.chat-msg__suggestions').forEach(el => el.remove());
  addMessage(message, 'user');
  showTyping();

  setTimeout(() => {
    hideTyping();
    addMessage(trouverReponse(message), 'bot');
  }, 700);
}

/* ---- Événements ---- */
chatSend.addEventListener('click', () => sendMessage());
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
chatMessages.addEventListener('click', (e) => {
  if (e.target.classList.contains('chat-suggestion')) {
    sendMessage(e.target.textContent);
  }
});

/* ---- Notification après 6s ---- */
setTimeout(() => {
  if (!isOpen) {
    notifBadge.style.display = 'flex';
    chatBubble.classList.add('pulse');
  }
}, 6000);