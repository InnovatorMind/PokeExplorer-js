const MAX_POKEMON = 495;
let nextUrl = "https://pokeapi.co/api/v2/pokemon"; // Initial API URL
let allPokemon = []; // Store all fetched Pokémon

fetch(`${nextUrl}?limit=${MAX_POKEMON}`)
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data.results;
    // console.log(data.results);
    displayPokemons(allPokemons);
  });

// async function fetchPokemon() {
//     if (!nextUrl) return; // Stop fetching if no more data

//     try {
//         const res = await fetch(nextUrl);
//         const json = await res.json();

//         nextUrl = json.next;

//         const data = json.results;

//         const promises = data.map(each => fetch(each.url).then(res => res.json()));
//         const pokemonDetails = await Promise.all(promises);

//         allPokemon = [...allPokemon, ...pokemonDetails];

//         // Display all Pokémon
//         displayPokemons(allPokemon);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

// Function to display Pokémon
const container = document.querySelector(".pokemon-container");
function displayPokemons(pokemon) {
  console.log(pokemon);
  container.innerHTML = ""; // Clear previous Pokémon before displaying filtered ones

  pokemon.forEach((pokemon) => {
    //     const types = pokemon.types.map(t => t.type.name).join(", "); // Get types

    const pokemonID = pokemon.url.split("/")[6];
    console.log(pokemonID);
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
}

const searchText = document.getElementById("searchInput");
searchText.addEventListener("keyup", searchPokemon);
function searchPokemon() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

//   if (nameFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm)
    );
//   } else {
//     filteredPokemons = allPokemons;
//   }

  displayPokemons(filteredPokemons);

//   if (filteredPokemons.length === 0) {
//     notFoundMessage.style.display = "block";
//   } else {
//     notFoundMessage.style.display = "none";
//   }
}

const toggleButton = document.getElementById("theme-toggle");

toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleButton.innerHTML = `
        <i class="fa-regular fa-moon"></i>&nbsp; Dark Mode
        `
    } else {
        localStorage.setItem("theme", "light");
    }
});

window.onload = () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
};
