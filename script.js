// ========== VARIABLES DU JEU ==========

// Éléments HTML
const cases = document.querySelectorAll(".case");
const statut = document.getElementById("statut");
const boutonRecommencer = document.getElementById("recommencer");

// Variables de jeu
let joueurActuel = "X"; // Commence toujours par X
let plateau = ["", "", "", "", "", "", "", "", ""]; // Tableau vide 3x3 (9 cases)
let jeuActif = true;

// Scores
let scores = {
  x: 0,
  o: 0,
  nul: 0,
};

// Toutes les combinaisons gagnantes possibles
const combinaisonsGagnantes = [
  [0, 1, 2], // Ligne 1
  [3, 4, 5], // Ligne 2
  [6, 7, 8], // Ligne 3
  [0, 3, 6], // Colonne 1
  [1, 4, 7], // Colonne 2
  [2, 5, 8], // Colonne 3
  [0, 4, 8], // Diagonale \
  [2, 4, 6], // Diagonale /
];

// ========== FONCTIONS DU JEU ==========

// Fonction appelée quand on clique sur une case
function cliquerCase(event) {
  const caseCliquee = event.target;
  const index = caseCliquee.getAttribute("data-index");

  // Vérifier si la case est déjà occupée ou si le jeu est terminé
  if (plateau[index] !== "" || !jeuActif) {
    return;
  }

  // Placer le symbole (X ou O)
  plateau[index] = joueurActuel;
  caseCliquee.textContent = joueurActuel;
  caseCliquee.classList.add(joueurActuel.toLowerCase());

  // Vérifier s'il y a un gagnant
  verifierResultat();
}

// Vérifier s'il y a un gagnant ou match nul
function verifierResultat() {
  let gagnant = false;

  // Parcourir toutes les combinaisons gagnantes
  for (let combinaison of combinaisonsGagnantes) {
    const [a, b, c] = combinaison;

    // Vérifier si les 3 cases ont le même symbole (et ne sont pas vides)
    if (plateau[a] && plateau[a] === plateau[b] && plateau[a] === plateau[c]) {
      gagnant = true;

      // Surligner les cases gagnantes
      cases[a].classList.add("gagnant");
      cases[b].classList.add("gagnant");
      cases[c].classList.add("gagnant");

      // Afficher le message de victoire
      statut.textContent = `🎉 Le joueur ${joueurActuel} a gagné ! 🎉`;
      jeuActif = false;

      // Mettre à jour le score
      scores[joueurActuel.toLowerCase()]++;
      mettreAJourScores();

      return;
    }
  }

  // Vérifier s'il y a match nul (toutes les cases remplies)
  if (!plateau.includes("")) {
    statut.textContent = "🤝 Match nul ! 🤝";
    jeuActif = false;
    scores.nul++;
    mettreAJourScores();
    return;
  }

  // Changer de joueur
  joueurActuel = joueurActuel === "X" ? "O" : "X";
  statut.textContent = `Tour du joueur ${joueurActuel}`;
}

// Recommencer une nouvelle partie
function recommencer() {
  joueurActuel = "X";
  plateau = ["", "", "", "", "", "", "", "", ""];
  jeuActif = true;
  statut.textContent = "Tour du joueur X";

  // Vider toutes les cases
  cases.forEach((case_) => {
    case_.textContent = "";
    case_.classList.remove("x", "o", "gagnant");
  });
}

// Mettre à jour l'affichage des scores
function mettreAJourScores() {
  document.getElementById("score-x").textContent = scores.x;
  document.getElementById("score-o").textContent = scores.o;
  document.getElementById("score-nul").textContent = scores.nul;
}

// ========== ÉVÉNEMENTS ==========

// Ajouter un écouteur de clic sur chaque case
cases.forEach((case_) => {
  case_.addEventListener("click", cliquerCase);
});

// Ajouter un écouteur sur le bouton recommencer
boutonRecommencer.addEventListener("click", recommencer);
