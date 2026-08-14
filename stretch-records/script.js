const cardsContainer = document.querySelector(".cards");

async function loadArtists() {
  // Show loading message immediately
  cardsContainer.innerHTML = '<p id="loading">Loading artists...</p>';

  try {
    const response = await fetch("artists.json");
    if (!response.ok) {
      throw new Error("Failed to load artist data.");
    }

    const artists = await response.json();

    // Simulate the 2-second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear loading message and render cards
    cardsContainer.innerHTML = "";
    for (const artist of artists) {
      const card = document.createElement("article");

      const title = document.createElement("h3");
      title.textContent = artist.name;

      const text = document.createElement("p");
      text.textContent = `${artist.genre} - ${artist.total}`;

      card.appendChild(title);
      card.appendChild(text);
      cardsContainer.appendChild(card);
    }
  } catch (error) {
    // Show a visitor-readable message if something breaks
    cardsContainer.innerHTML = `<p class="error">We're having trouble loading the artists right now. Please try refreshing the page!</p>`;
    console.error("Error:", error.message);
  } finally {
    // Cleanup / final code block (ensures state management)
    console.log("Artist loading cycle completed.");
  }
}

loadArtists();
