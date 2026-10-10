
import { getPlayers } from "./players-api.js";

const playerOneSelect = document.querySelector("#player-one");
const playerTwoSelect = document.querySelector("#player-two");
const compareButton = document.querySelector("#compare-button");
const comparisonResults = document.querySelector("#comparison-results");
const compareMessage = document.querySelector("#compare-message");

let players = [];

/* =========================
   LOAD PLAYERS
========================= */

async function loadPlayers() {
  try {
    players = await getPlayers();

    populateSelectors();

  } catch (error) {
    compareMessage.textContent =
      "Unable to load players. Please try again later.";
  }
}

/* =========================
   POPULATE PLAYER SELECTORS
========================= */

function populateSelectors() {
  const sortedPlayers = [...players].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  sortedPlayers.forEach(player => {
    const optionOne = document.createElement("option");
    optionOne.value = player.id;
    optionOne.textContent = player.name;

    const optionTwo = optionOne.cloneNode(true);

    playerOneSelect.appendChild(optionOne);
    playerTwoSelect.appendChild(optionTwo);
  });
}

/* =========================
   DISPLAY VALUES
========================= */

function displayValue(value) {
  return value === null || value === undefined
    ? "N/A"
    : value;
}

/* =========================
   CREATE COMPARISON CARD
========================= */

function createComparisonCard(player) {
  return `
    <article class="comparison-card">
      <img
        src="${player.image}"
        alt="${player.name} soccer portrait"
        width="180"
        height="225"
      >

      <h2>${player.name}</h2>
      <p>${player.country} | ${player.position}</p>

      <div class="comparison-stats">
        <div class="comparison-stat">
          <span>Goals</span>
          <span>${displayValue(player.goals)}</span>
        </div>

        <div class="comparison-stat">
          <span>Assists</span>
          <span>${displayValue(player.assists)}</span>
        </div>

        <div class="comparison-stat">
          <span>Total Titles</span>
          <span>${displayValue(player.totalTitles)}</span>
        </div>

        <div class="comparison-stat">
          <span>World Cups</span>
          <span>${displayValue(player.worldCups)}</span>
        </div>

        <div class="comparison-stat">
          <span>Ballon d'Or</span>
          <span>${displayValue(player.ballonDor)}</span>
        </div>

        <div class="comparison-stat">
          <span>Individual Awards</span>
          <span>${displayValue(player.individualAwards)}</span>
        </div>
      </div>
    </article>
  `;
}

/* =========================
   COMPARE PLAYERS
========================= */

function comparePlayers() {
  const playerOneId = Number(playerOneSelect.value);
  const playerTwoId = Number(playerTwoSelect.value);

  comparisonResults.hidden = true;
  comparisonResults.innerHTML = "";
  compareMessage.textContent = "";

  if (!playerOneId || !playerTwoId) {
    compareMessage.textContent =
      "Please select two players to compare.";
    return;
  }

  if (playerOneId === playerTwoId) {
    compareMessage.textContent =
      "Please select two different players.";
    return;
  }

  const playerOne = players.find(player =>
    player.id === playerOneId
  );

  const playerTwo = players.find(player =>
    player.id === playerTwoId
  );

  if (!playerOne || !playerTwo) {
    compareMessage.textContent =
      "Unable to find the selected players.";
    return;
  }

  comparisonResults.innerHTML = `
    <div class="comparison-grid">
      ${createComparisonCard(playerOne)}
      ${createComparisonCard(playerTwo)}
    </div>
  `;

  comparisonResults.hidden = false;
}

/* =========================
   EVENT LISTENERS
========================= */

compareButton.addEventListener("click", comparePlayers);

loadPlayers();
