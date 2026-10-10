
const legendsContainer = document.querySelector("#legends-container");

let players = [];

// Fetch player data
async function getPlayers() {
  try {
    const response = await fetch("data/players.json");

    if (!response.ok) {
      throw new Error("Failed to load player data.");
    }

    players = await response.json();

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
      </div>
    `;

    legendsContainer.appendChild(card);
  });
}

getPlayers();
