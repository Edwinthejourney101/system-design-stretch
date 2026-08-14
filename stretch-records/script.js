const cardsContainer = document.querySelector(".cards");

// 1. Show a loading message immediately
cardsContainer.innerHTML = '<p id="loading">Loading artists...</p>';

fetch("artists.json")
  .then((response) => response.json())
  .then((artists) => {
    // 2. Delay the render by 2 seconds (2000 milliseconds)
    setTimeout(() => {
      // Clear the loading message
      cardsContainer.innerHTML = "";

      // Rebuild the cards
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
    }, 2000);
  })
  .catch((error) => console.error("Error fetching data:", error));
