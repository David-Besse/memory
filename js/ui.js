import { initialiserJeu } from './game.js';

/**
 * Sets up event listeners for the application.
 * This function attaches event handlers to the necessary DOM elements.
 */
const setupEventListeners = () => {
    // Select the restart button
    const recommencer = document.querySelector(".restart");

    // Add a click event listener to the restart button to reinitialize the game
    recommencer.addEventListener("click", initialiserJeu);
};

// Exportation de la fonction setupEventListeners
export { setupEventListeners };
