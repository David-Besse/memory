// Importation des fonctions nécessaires
import { initialiserJeu } from "./game.js";
import { setupEventListeners } from "./ui.js";

const init = () => {
  setupEventListeners();
  initialiserJeu();
};

// Initialisation du jeu
document.addEventListener("DOMContentLoaded", () => {
  init();
});
