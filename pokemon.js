const MAX_POKEMON = 30;
let nextUrl = "https://pokeapi.co/api/v2/pokemon";
let allPokemon = [];
let isFetching = false; // Prevent duplicate requests

// fetch pokemon data
function fetchPokemons() {
  if (isFetching || !nextUrl) return;
  isFetching = true;

  fetch(nextUrl)
    .then((response) => response.json())
    .then((data) => {
      nextUrl = data.next; // Store next page URL

      allPokemon = [...allPokemon, ...data.results]; 
      displayPokemons(data.results); 
      isFetching = false;
    })
    .catch((error) => {
      console.error("Error fetching Pokémon:", error);
      isFetching = false;
    });
}

// Function to display Pokémon
const container = document.querySelector(".pokemon-container");
function displayPokemons(pokemon) {
  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    // console.log(pokemonID);
    const card = document.createElement("div");
    card.className = "list-item";
    card.classList.add("card");

    card.innerHTML = `
            <p>#${pokemonID}</p>
    
            <div class="poke-img">
                <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${
      pokemon.name
    }">
            </div>
            <div class="poke-info">
                <h3>${pokemon.name.toUpperCase()}</h3>
            </div>
        `;
    //             <p>Type: <strong>${types}</strong></p>

    container.appendChild(card);
    //     card.addEventListener("click", async () => {
    //         console.log("hi");
    //       });
  });
  if (!nextUrl) {
    document.getElementById("target").style.display = "none";
  }
}

// search pokemon
const searchText = document.getElementById("searchInput");
searchText.addEventListener("keypress", searchPokemon);
function searchPokemon() {
  if (event.key === "Enter") {
    alert("feature is under development");
  }
  //   const searchTerm = searchInput.value.toLowerCase();
  //   let filteredPokemons;

  //   filteredPokemons = allPokemons.filter((pokemon) =>
  //     pokemon.name.toLowerCase().startsWith(searchTerm)
  //   );

  //   displayPokemons(filteredPokemons);
}

// Infinite Loading
const target = document.getElementById("target");
// Create an Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      target.innerHTML = `<img id="loading" src="images/pokeLoad.gif" alt="Observed Image"><p>Loading...</p>`;
      console.log("Element is visible!");
      fetchPokemons();
    }
  },
  { threshold: 0.1 }
); // Fires when 100% of the element is in view

// Start observing the target element
observer.observe(target);

// dark-light mode
const toggleButton = document.getElementById("theme-toggle");
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleButton.innerHTML = `
        <i class="fa-regular fa-moon"></i>&nbsp; Dark Mode
        `;
  } else {
    localStorage.setItem("theme", "light");
  }
});

window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
};
