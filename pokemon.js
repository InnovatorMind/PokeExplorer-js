let nextUrl = "https://pokeapi.co/api/v2/pokemon?limit=30"; // Initial API URL
let allPokemon = []; // Store all fetched Pokémon

async function fetchPokemon() {
    if (!nextUrl) return; // Stop fetching if no more data

    try {
        const res = await fetch(nextUrl);
        const json = await res.json();

        nextUrl = json.next; 

        const data = json.results;


        const promises = data.map(each => fetch(each.url).then(res => res.json()));
        const pokemonDetails = await Promise.all(promises);

        allPokemon = [...allPokemon, ...pokemonDetails];

        // Display all Pokémon
        displayPokemon(allPokemon);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to display Pokémon
function displayPokemon(pokemonList) {
    const container = document.querySelector(".pokemon-container");
    container.innerHTML = ""; // Clear previous Pokémon before displaying filtered ones

    pokemonList.forEach(pokemon => {
        const types = pokemon.types.map(t => t.type.name).join(", "); // Get types

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <p>#${pokemon.id}</p>
    
            <div class="poke-img">
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            </div>
            <div class="poke-info">
                <h3>${pokemon.name.toUpperCase()}</h3>
                <p>Type: <strong>${types}</strong></p>
            </div>
        `;

        container.appendChild(card);
        card.addEventListener("click", async () => {
            console.log("hi");
          });
    });
}

function searchPokemon() {
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.includes(searchText));
    displayPokemon(filteredPokemon);
}

// Create search bar
const searchBar = document.getElementById("searchInput")
searchBar.oninput = searchPokemon; 

// Add "Load More Pokémon" button
const loadMoreBtn = document.createElement("button");
loadMoreBtn.innerText = "Load More Pokémon";
loadMoreBtn.id = "loadMoreBtn";
loadMoreBtn.onclick = fetchPokemon;
document.body.appendChild(loadMoreBtn);

const container = document.createElement("div");
container.classList.add("pokemon-container");
document.body.appendChild(container);

fetchPokemon();

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