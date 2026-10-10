export async function getPlayers() {
  try {
    const response = await fetch("data/players.json");

    if (!response.ok) {
      throw new Error("Failed to load player data.");
    }

    return await response.json();

  } catch (error) {
    console.error("Error loading players:", error);
    throw error;
  }
}
