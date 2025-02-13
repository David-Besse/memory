// État du jeu
let etatJeu = {
  cartesRetournees: [],
  pairesRestantes: 8,
};

/**
 * Fonction pour créer des paires de cartes à partir d'un ensemble de lettres.
 * Cette fonction double chaque lettre dans le tableau pour créer des paires.
 * @returns {Array} - Un tableau contenant les paires de lettres.
 */
const creerPaires = () => {
  // Déclare un tableau de lettres uniques
  const lettres = ["A", "B", "C", "D", "E", "F", "G", "H"];

  // Retourne un nouveau tableau contenant chaque lettre deux fois
  return [...lettres, ...lettres];
};

/**
 * Fonction pour mélanger les cartes.
 * @param {Array} cartes - Le tableau de cartes à mélanger.
 * @returns {Array} - Le tableau de cartes mélanger aléatoirement.
 */
const melangerCartes = (cartes) => {
  // Copie le tableau de cartes et le mélange en utilisant une fonction de tri aléatoire
  return [...cartes].sort(() => Math.random() - 0.5);
};

/**
 * Fonction pour créer une carte.
 * @param {string} lettre - La lettre à afficher sur la carte.
 * @param {number} index - L'index de la carte.
 * @returns {HTMLDivElement} - L'élément DOM de la carte.
 */
const creerCarte = (lettre, index) => {
  const carte = document.createElement("div");
  carte.className = "carte";
  carte.dataset.valeur = lettre;
  carte.dataset.index = index;

  carte.innerHTML = `
        <div class="face">${lettre}</div>
        <div class="dos"></div>
    `;

  return carte;
};

/**
 * Vérifie si les deux cartes retournées forment une paire.
 * Si c'est le cas, ajoute la classe "trouvee" à la face de la carte.
 * Sinon, retire la classe "retournee" de la carte.
 */
const verifierPaire = () => {
  const [carte1, carte2] = etatJeu.cartesRetournees;
  const valeurIdentique = carte1.dataset.valeur === carte2.dataset.valeur;

  if (valeurIdentique) {
    // Si c'est une paire, ajoute la classe "trouvee" à la face de la carte
    carte1.querySelector(".face").classList.add("trouvee");
    carte2.querySelector(".face").classList.add("trouvee");
    etatJeu.pairesRestantes--;
  } else {
    // Sinon, retire la classe "retournee" de la carte après 500ms
    setTimeout(() => {
      carte1.classList.remove("retournee");
      carte2.classList.remove("retournee");
    }, 500);
  }

  // Réinitialise le tableau des cartes retournées
  etatJeu.cartesRetournees = [];
};

/**
 * Gestionnaire d'événement pour le clic sur une carte.
 * Vérifie si la carte est déjà retournée et si le nombre de cartes retournées est inférieur à 2.
 * Si c'est le cas, ajoute la classe "retournee" à la carte et l'ajoute au tableau des cartes retournées.
 * Si le tableau des cartes retournées contient 2 éléments, appelle la fonction verifierPaire().
 * @param {Event} event - L'événement de clic sur la carte.
 */
const gererClicCarte = (event) => {
  const carte = event.currentTarget;

  // Vérifie si la carte est déjà retournée et si le nombre de cartes retournées est inférieur à 2
  if (
    !carte.classList.contains("retournee") &&
    etatJeu.cartesRetournees.length < 2
  ) {
    // Ajoute la classe "retournee" à la carte et l'ajoute au tableau des cartes retournées
    carte.classList.add("retournee");
    etatJeu.cartesRetournees.push(carte);

    // Si le tableau des cartes retournées contient 2 éléments, appelle la fonction verifierPaire()
    if (etatJeu.cartesRetournees.length === 2) {
      verifierPaire();
    }
  }
};

/**
 * Fonction pour réinitialiser le jeu.
 * Cette fonction réinitialise l'état du jeu, efface les cartes de la grille
 * et ajoute de nouvelles cartes mélanger aléatoirement.
 */
const initialiserJeu = () => {
  // Réinitialise l'état du jeu
  etatJeu = {
    cartesRetournees: [],
    pairesRestantes: 8,
  };

  // Récupère l'élément de la grille
  const grille = document.getElementById("grille");

  // Efface les cartes existantes
  grille.innerHTML = "";

  // Crée les paires de cartes, les mélange et les stocke dans un tableau
  const cartesMelangees = melangerCartes(creerPaires());

  // Pour chaque lettre dans le tableau des cartes mélangées
  cartesMelangees.forEach((lettre, index) => {
    // Crée une carte avec la lettre et l'index actuels
    const carte = creerCarte(lettre, index);

    // Ajoute un gestionnaire d'événement de clic à la carte
    carte.addEventListener("click", gererClicCarte);

    // Ajoute la carte à la grille
    grille.appendChild(carte);
  });
};

// Exportation de la fonction initialiserJeu
export { initialiserJeu };
