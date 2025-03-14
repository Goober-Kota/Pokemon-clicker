// Game State
let pokecoins = 0;
let autoClicksPerSecond = 0;
let clickMultiplier = 1;
let autoClickerCost = 50;
let multiplierCost = 100;
const pokedex = {};
let shinyCount = 0; // Track shiny Pokémon
const achievements = {
  shiny10: false, // Catch 10 shiny Pokémon
  shinyLegendary: false, // Catch a shiny legendary
  arceusCaught: false, // Catch Arceus
  shinyArceusCaught: false // Catch shiny Arceus
};

// Pokémon Rarity System
const pokemonRarities = [
  // Common Pokémon
  { name: "🐦 Pidgey", rarity: "Common", chance: 50, reward: 1 },
  { name: "🐀 Rattata", rarity: "Common", chance: 50, reward: 1 },
  { name: "🐛 Caterpie", rarity: "Common", chance: 50, reward: 1 },
  { name: "🐞 Weedle", rarity: "Common", chance: 50, reward: 1 },
  { name: "🦇 Zubat", rarity: "Common", chance: 50, reward: 1 },

  // Uncommon Pokémon
  { name: "🌱 Bulbasaur", rarity: "Uncommon", chance: 30, reward: 5 },
  { name: "🔥 Charmander", rarity: "Uncommon", chance: 30, reward: 5 },
  { name: "💧 Squirtle", rarity: "Uncommon", chance: 30, reward: 5 },
  { name: "🐍 Ekans", rarity: "Uncommon", chance: 30, reward: 5 },
  { name: "🐟 Magikarp", rarity: "Uncommon", chance: 30, reward: 5 },

  // Rare Pokémon
  { name: "⚡ Pikachu", rarity: "Rare", chance: 15, reward: 20 },
  { name: "🎤 Jigglypuff", rarity: "Rare", chance: 15, reward: 20 },
  { name: "🦊 Vulpix", rarity: "Rare", chance: 15, reward: 20 },
  { name: "🌀 Dratini", rarity: "Rare", chance: 15, reward: 20 },
  { name: "🦉 Hoothoot", rarity: "Rare", chance: 15, reward: 20 },

  // Epic Pokémon
  { name: "🌿 Chikorita", rarity: "Epic", chance: 4, reward: 100 },
  { name: "🌋 Cyndaquil", rarity: "Epic", chance: 4, reward: 100 },
  { name: "🌊 Totodile", rarity: "Epic", chance: 4, reward: 100 },
  { name: "🦎 Treecko", rarity: "Epic", chance: 4, reward: 100 },
  { name: "🔥 Torchic", rarity: "Epic", chance: 4, reward: 100 },

  // Legendary Pokémon
  { name: "🛸 Mewtwo", rarity: "Legendary", chance: 1, reward: 500 },
  { name: "🐉 Rayquaza", rarity: "Legendary", chance: 1, reward: 500 },
  { name: "🌌 Lugia", rarity: "Legendary", chance: 1, reward: 500 },
  { name: "🌠 Ho-Oh", rarity: "Legendary", chance: 1, reward: 500 },
  { name: "🌀 Suicune", rarity: "Legendary", chance: 1, reward: 500 },

  // Arceus (God of Pokémon)
  { name: "🌟 Arceus", rarity: "God", chance: 0.1, reward: 10000 } // 0.1% chance
];

// Calculate total chance for normalization
const totalChance = pokemonRarities.reduce((sum, pokemon) => sum + pokemon.chance, 0);

// DOM Elements
const pokecoinsDisplay = document.getElementById("pokecoins");
const clickButton = document.getElementById("click-button");
const autoClickerButton = document.getElementById("auto-clicker");
const multiplierButton = document.getElementById("click-multiplier");
const pokedexDisplay = document.getElementById("pokedex");
const shinyCounter = document.getElementById("shiny-counter");
const achievementsDisplay = document.getElementById("achievements");

// Save Game
function saveGame() {
  const gameState = {
    pokecoins,
    autoClicksPerSecond,
    clickMultiplier,
    autoClickerCost,
    multiplierCost,
    pokedex,
    shinyCount,
    achievements
  };
  localStorage.setItem("pokemonClickerSave", JSON.stringify(gameState));
  console.log("Game saved!");
}

// Load Game
function loadGame() {
  const savedGame = localStorage.getItem("pokemonClickerSave");
  if (savedGame) {
    const gameState = JSON.parse(savedGame);
    pokecoins = gameState.pokecoins;
    autoClicksPerSecond = gameState.autoClicksPerSecond;
    clickMultiplier = gameState.clickMultiplier;
    autoClickerCost = gameState.autoClickerCost;
    multiplierCost = gameState.multiplierCost;
    Object.assign(pokedex, gameState.pokedex);
    shinyCount = gameState.shinyCount;
    Object.assign(achievements, gameState.achievements);

    // Update UI
    pokecoinsDisplay.textContent = `🪙 Pokécoins: ${pokecoins}`;
    autoClickerButton.textContent = `🤖 Buy Auto-Clicker (Cost: ${autoClickerCost})`;
    multiplierButton.textContent = `✨ Buy Click Multiplier (Cost: ${multiplierCost})`;
    shinyCounter.textContent = `✨ Shinies Caught: ${shinyCount}`;
    renderPokedex();
    renderAchievements(); // Render achievements when the game loads
    console.log("Game loaded!");
  }
}

// Render Achievements
function renderAchievements() {
  achievementsDisplay.innerHTML = ""; // Clear existing achievements
  if (achievements.shiny10) {
    achievementsDisplay.innerHTML += `<div>🎉 Achievement Unlocked: Catch 10 Shiny Pokémon!</div>`;
  }
  if (achievements.shinyLegendary) {
    achievementsDisplay.innerHTML += `<div>🌟 Achievement Unlocked: Catch a Shiny Legendary!</div>`;
  }
  if (achievements.arceusCaught) {
    achievementsDisplay.innerHTML += `<div>🌈 Achievement Unlocked: Catch Arceus, the God of Pokémon!</div>`;
  }
  if (achievements.shinyArceusCaught) {
    achievementsDisplay.innerHTML += `<div>🌟 Achievement Unlocked: Catch a Shiny Arceus!</div>`;
  }
}

// Catch Pokémon
function catchPokemon() {
  const roll = Math.random() * totalChance; // Roll based on total chance
  let cumulativeChance = 0;

  for (const pokemon of pokemonRarities) {
    cumulativeChance += pokemon.chance;
    if (roll < cumulativeChance) {
      // Check if the Pokémon is shiny
      const isShiny = pokemon.rarity === "Legendary" || pokemon.rarity === "God" ? Math.random() < 0.25 : Math.random() < 0.5; // 25% for legendary/God, 50% for others
      const shinyMultiplier = isShiny ? 2 : 1; // Double rewards for shiny
      const reward = pokemon.reward * clickMultiplier * shinyMultiplier;

      // Update Pokémon name for shiny
      const pokemonName = isShiny ? `✨ ${pokemon.name} ✨` : pokemon.name;

      pokecoins += reward;
      updatePokedex(pokemonName);
      pokecoinsDisplay.textContent = `🪙 Pokécoins: ${pokecoins}`;

      // Handle shiny Pokémon
      if (isShiny) {
        shinyCount++;
        shinyCounter.textContent = `✨ Shinies Caught: ${shinyCount}`;
        animateShiny();
        checkAchievements(pokemon.rarity, pokemon.name);
      }

      // Handle Arceus catch
      if (pokemon.name === "🌟 Arceus") {
        achievements.arceusCaught = true;
        if (isShiny) {
          achievements.shinyArceusCaught = true;
        }
        renderAchievements(); // Re-render achievements to show new unlocks
      }

      console.log(`Caught a ${pokemonName}! Earned ${reward} Pokécoins.`);
      saveGame(); // Save the game after each catch
      break;
    }
  }
}

// Update Pokédex
function updatePokedex(pokemonName) {
  if (pokedex[pokemonName]) {
    pokedex[pokemonName]++;
  } else {
    pokedex[pokemonName] = 1;
  }
  renderPokedex();
}

// Render Pokédex
function renderPokedex() {
  pokedexDisplay.innerHTML = "";
  for (const [name, count] of Object.entries(pokedex)) {
    const entry = document.createElement("div");
    entry.textContent = `${name}: ${count} caught`;
    pokedexDisplay.appendChild(entry);
  }
}

// Shiny Animation
function animateShiny() {
  const button = document.getElementById("click-button");
  button.style.transform = "scale(1.1)";
  button.style.backgroundColor = "#ffcc00";
  setTimeout(() => {
    button.style.transform = "scale(1)";
    button.style.backgroundColor = "";
  }, 200);
}

// Check Achievements
function checkAchievements(rarity, pokemonName) {
  if (shinyCount >= 10 && !achievements.shiny10) {
    achievements.shiny10 = true;
    renderAchievements(); // Re-render achievements to show new unlocks
  }
  if (rarity === "Legendary" && !achievements.shinyLegendary) {
    achievements.shinyLegendary = true;
    renderAchievements(); // Re-render achievements to show new unlocks
  }
  if (pokemonName === "🌟 Arceus" && !achievements.shinyArceusCaught) {
    achievements.shinyArceusCaught = true;
    renderAchievements(); // Re-render achievements to show new unlocks
  }
}

// Buy Auto-Clicker
function buyAutoClicker() {
  if (pokecoins >= autoClickerCost) {
    pokecoins -= autoClickerCost;
    autoClicksPerSecond++;
    autoClickerCost *= 2;
    pokecoinsDisplay.textContent = `🪙 Pokécoins: ${pokecoins}`;
    autoClickerButton.textContent = `🤖 Buy Auto-Clicker (Cost: ${autoClickerCost})`;
    console.log("Auto-clicker purchased!");
    saveGame(); // Save the game after purchase
  }
}

// Buy Click Multiplier
function buyClickMultiplier() {
  if (pokecoins >= multiplierCost) {
    pokecoins -= multiplierCost;
    clickMultiplier++;
    multiplierCost *= 2;
    pokecoinsDisplay.textContent = `🪙 Pokécoins: ${pokecoins}`;
    multiplierButton.textContent = `✨ Buy Click Multiplier (Cost: ${multiplierCost})`;
    console.log("Click multiplier purchased!");
    saveGame(); // Save the game after purchase
  }
}

// Auto-Clicker Logic
setInterval(() => {
  pokecoins += autoClicksPerSecond * clickMultiplier;
  pokecoinsDisplay.textContent = `🪙 Pokécoins: ${pokecoins}`;
  saveGame(); // Save the game periodically
}, 1000);

// Event Listeners
clickButton.addEventListener("click", catchPokemon);
autoClickerButton.addEventListener("click", buyAutoClicker);
multiplierButton.addEventListener("click", buyClickMultiplier);

// Load the game when the page loads
window.addEventListener("load", loadGame);