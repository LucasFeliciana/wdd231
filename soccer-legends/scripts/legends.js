
const legendsContainer = document.querySelector("#legends-container");
const playerModal = document.querySelector("#player-modal");
const modalTitle = document.querySelector("#modal-title");
const modalContent = document.querySelector("#modal-content");
const closeModalButton = document.querySelector("#close-modal");

const countryFilter = document.querySelector("#country-filter");
const positionFilter = document.querySelector("#position-filter");
const searchPlayer = document.querySelector("#search-player");
const noResults = document.querySelector("#no-results");


let players = [];

let favorites = JSON.parse(localStorage.getItem("soccerFavorites")) || [];

// Fetch player data
async function getPlayers() {
  try {
    const response = await fetch("data/players.json");

    if (!response.ok) {
      throw new Error("Failed to load player data.");
    }

    players = await response.json();

    populateFilters()
    displayPlayers(players);

  } catch (error) {
    console.error("Error loading players:", error);

    legendsContainer.textContent =
      "Unable to load players. Please try again later.";
  }
}

// Generate player cards
function displayPlayers(playerList) {
  legendsContainer.innerHTML = "";

  playerList.forEach((player) => {
    const card = document.createElement("article");
    card.classList.add("legend-card");

    card.innerHTML = `
      <img
        src="${player.image}"
        alt="${player.name} soccer portrait"
        width="400"
        height="500"
        loading="lazy"
      >

      <div class="legend-card-content">
        <h2>${player.name}</h2>

        <p>${player.country} | ${player.position}</p>

        <p><strong>World Cups:</strong> ${player.worldCups}</p>

        <p><strong>Ballon d'Or:</strong> ${player.ballonDor}</p>

        <button type="button" class="more-info"
                data-id="${player.id}">
          More Info
        </button>
        <button type="button" class="favorite-button"
                data-id="${player.id}"
                aria-pressed="${favorites.includes(player.id)}">
            ${favorites.includes(player.id) ? "★ Remove Favorite" : "☆ Add to Favorites"}
        </button>
      </div>
    `;

    legendsContainer.appendChild(card);
  });
}

getPlayers();


/* =========================
   PLAYER INFORMATION MODAL
========================= */

function showPlayerModal(playerId) {
  const player = players.find((player) => player.id === playerId);

  if (!player) {
    return;
  }

  modalTitle.textContent = player.name;

  const displayValue = (value) => {
    return value === null || value === undefined
      ? "N/A"
      : value;
  };

  modalContent.innerHTML = `
    <img
      src="${player.image}"
      alt="${player.name} soccer portrait"
      class="modal-player-image"
      width="400"
      height="500"
    >

    <div class="modal-player-details">
      <p><strong>Country:</strong> ${player.country}</p>
      <p><strong>Position:</strong> ${player.position}</p>
      <p><strong>Goals:</strong> ${displayValue(player.goals)}</p>
      <p><strong>Assists:</strong> ${displayValue(player.assists)}</p>
      <p><strong>Total Titles:</strong> ${displayValue(player.totalTitles)}</p>
      <p><strong>Individual Awards:</strong> ${displayValue(player.individualAwards)}</p>
      <p><strong>World Cups:</strong> ${player.worldCups}</p>
      <p><strong>Ballon d'Or:</strong> ${player.ballonDor}</p>

      <h3>Clubs</h3>
      <p>${player.clubs.join(", ")}</p>

      <h3>Career Highlights</h3>
      <p>${player.description}</p>
    </div>
  `;

  playerModal.showModal();
}


/* =========================
   MODAL EVENT LISTENERS
========================= */

legendsContainer.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest(".favorite-button");

  if (favoriteButton) {
    const playerId = Number(favoriteButton.dataset.id);
    toggleFavorite(playerId);
    return;
  }

  const infoButton = event.target.closest(".more-info");

  if (infoButton) {
    const playerId = Number(infoButton.dataset.id);
    showPlayerModal(playerId);
  }
});

// Close modal
closeModalButton.addEventListener("click", () => {
  playerModal.close();
});



/* =========================
   POPULATE FILTERS
========================= */

function populateFilters() {
  const countries = [...new Set(players.map(player => player.country))];
  const positions = [...new Set(players.map(player => player.position))];

  countries.sort();
  positions.sort();

  countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countryFilter.appendChild(option);
  });

  positions.forEach(position => {
    const option = document.createElement("option");
    option.value = position;
    option.textContent = position;
    positionFilter.appendChild(option);
  });
}


/* =========================
   FILTER PLAYERS
========================= */

function filterPlayers() {
  const selectedCountry = countryFilter.value;
  const selectedPosition = positionFilter.value;
  const searchText = searchPlayer.value.trim().toLowerCase();

  const filteredPlayers = players.filter(player => {
    const matchesCountry =
      selectedCountry === "all" ||
      player.country === selectedCountry;

    const matchesPosition =
      selectedPosition === "all" ||
      player.position === selectedPosition;

    const matchesSearch =
      player.name.toLowerCase().includes(searchText);

    return matchesCountry && matchesPosition && matchesSearch;
  });

  displayPlayers(filteredPlayers);

  noResults.hidden = filteredPlayers.length > 0;
}

/* FILTER EVENT LISTENERS */

countryFilter.addEventListener("change", filterPlayers);
positionFilter.addEventListener("change", filterPlayers);
searchPlayer.addEventListener("input", filterPlayers);


/* =========================
   FAVORITE PLAYERS
========================= */

function toggleFavorite(playerId) {

  if (favorites.includes(playerId)) {
    favorites = favorites.filter(id => id !== playerId);
  } else {
    favorites.push(playerId);
  }

  localStorage.setItem(
    "soccerFavorites",
    JSON.stringify(favorites)
  );

  filterPlayers();
}
