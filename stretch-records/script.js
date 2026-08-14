const cardsContainer = document.querySelector(".cards");

async function loadArtists() {
  cardsContainer.innerHTML =
    '<p id="loading">Loading data from multiple servers...</p>';

  try {
    // Fetch from both servers simultaneously using Promise.all
    const [artistsResponse, labelResponse] = await Promise.all([
      fetch("http://localhost:3000/artists"),
      fetch("http://localhost:3001/label"),
    ]);

    if (!artistsResponse.ok || !labelResponse.ok) {
      throw new Error("Failed to fetch data from one or more servers.");
    }

    const artistsData = await artistsResponse.json();
    const labelData = await labelResponse.json();
    const artists = artistsData.artists;
    const labelInfo = labelData.label;

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Clear and render header/label info + cards
    cardsContainer.innerHTML = `
      <div class="label-banner" style="margin-bottom: 20px; padding: 10px; background: #eee; border-radius: 4px;">
        <h2>${labelInfo.name}</h2>
        <p>Founded: ${labelInfo.founded} | Location: ${labelInfo.location}</p>
      </div>
    `;

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
    cardsContainer.innerHTML = `<p class="error">Oops! ${error.message}</p>`;
    console.error("Caught error:", error);
  } finally {
    console.log("Multi-server loading cycle finalized.");
  }
}

// Initial load
loadArtists();

// Handle Form Submission (POST Request)
const form = document.getElementById("artist-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newArtist = {
      name: document.getElementById("name").value,
      genre: document.getElementById("genre").value,
      total: document.getElementById("total").value,
    };

    try {
      const response = await fetch("http://localhost:3000/artists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArtist),
      });

      console.log("POST Response Status:", response.status); // Expecting 201 Created

      if (!response.ok) {
        throw new Error("Failed to add artist");
      }

      // Reload the artist list to show the new addition
      loadArtists();
      form.reset();
    } catch (error) {
      console.error("Error posting artist:", error);
    }
  });
}
