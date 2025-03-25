// Game State
let pokecoins = 0;
let autoClicksPerSecond = 0;
let clickMultiplier = 1;
let autoClickerCost = 50;
let multiplierCost = 100;
const pokedex = {};
let shinyCount = 0;

const achievements = {
  shiny10: false,
  shiny100: false,
  shiny1000: false,
  shinyLegendary: false,
  arceusCaught: false,
  shinyArceusCaught: false,
  dex50: false,
  dex100: false
};

// Pokémon Rarity System
const pokemonRarities = [
  // Common Pokémon
  { name: "🐦 Pidgey", rarity: "Common", chance: 50, reward: 1 },
  { name: "🐀 Rattata", rarity: "Common", chance: 50, reward: 1 },
  { name: "🐛 Caterpie", rarity: "Common", chance: 50, reward: 1 },
  { name: "🐞 Weedle", rarity: "Common", chance: 50, reward: 1 },
  { name: "🦇 Zubat", rarity: "Common", chance: 50, reward: 1 },
  { name: "🐍 Ekans", rarity: "Common", chance: 50, reward: 1 },
  { name: "🐟 Magikarp", rarity: "Common", chance: 50, reward: 1 },
  { name: "🐢 Squirtle", rarity: "Common", chance: 50, reward: 1 },
  { name: "🐭 Pichu", rarity: "Common", chance: 50, reward: 1 },
  { name: "🦔 Sandshrew", rarity: "Common", chance: 50, reward: 1 },

  // Uncommon Pokémon
  { name: "🌱 Bulbasaur", rarity: "Uncommon", chance: 30, reward: 5 },
  { name: "🔥 Charmander", rarity: "Uncommon", chance: 30, reward: 5 },
  { name: "💧 Squirtle", rarity: "Uncommon", chance: 30, reward: 5 },
  { name: "🐸 Poliwag", rarity: "Uncommon", chance: 30, reward: 5 },
  { name: "🦉 Hoothoot", rarity: "Uncommon", chance: 30, reward: 5 },
  { name: "🐿️ Sentret", rarity: "Uncommon", chance: 30, reward: 5 },
  { name: "🦊 Vulpix", rarity: "Uncommon", chance: 30, reward: 5 },
  { name: "🐈 Meowth", rarity: "Uncommon", chance: 30, reward: 5 },
  { name: "🐝 Combee", rarity: "Uncommon", chance: 30, reward: 5 },
  { name: "🦋 Butterfree", rarity: "Uncommon", chance: 30, reward: 5 },

  // Rare Pokémon
  { name: "⚡ Pikachu", rarity: "Rare", chance: 15, reward: 20 },
  { name: "🎤 Jigglypuff", rarity: "Rare", chance: 15, reward: 20 },
  { name: "🦎 Charmeleon", rarity: "Rare", chance: 15, reward: 20 },
  { name: "🌿 Ivysaur", rarity: "Rare", chance: 15, reward: 20 },
  { name: "🐢 Wartortle", rarity: "Rare", chance: 15, reward: 20 },
  { name: "🦅 Pidgeotto", rarity: "Rare", chance: 15, reward: 20 },
  { name: "🐍 Arbok", rarity: "Rare", chance: 15, reward: 20 },
  { name: "🦇 Golbat", rarity: "Rare", chance: 15, reward: 20 },
  { name: "🦎 Treecko", rarity: "Rare", chance: 15, reward: 20 },
  { name: "🔥 Torchic", rarity: "Rare", chance: 15, reward: 20 },

  // Epic Pokémon
  { name: "🌿 Chikorita", rarity: "Epic", chance: 4, reward: 100 },
  { name: "🌋 Cyndaquil", rarity: "Epic", chance: 4, reward: 100 },
  { name: "🌊 Totodile", rarity: "Epic", chance: 4, reward: 100 },
  { name: "🦎 Grovyle", rarity: "Epic", chance: 4, reward: 100 },
  { name: "🔥 Blaziken", rarity: "Epic", chance: 4, reward: 100 },
  { name: "🌊 Marshtomp", rarity: "Epic", chance: 4, reward: 100 },
  { name: "🦉 Noctowl", rarity: "Epic", chance: 4, reward: 100 },
  { name: "🦊 Ninetales", rarity: "Epic", chance: 4, reward: 100 },
  { name: "🐉 Dragonair", rarity: "Epic", chance: 4, reward: 100 },
  { name: "🦋 Beautifly", rarity: "Epic", chance: 4, reward: 100 },

  // Legendary Pokémon
  { name: "🛸 Mewtwo", rarity: "Legendary", chance: 1, reward: 500 },
  { name: "🐉 Rayquaza", rarity: "Legendary", chance: 1, reward: 500 },
  { name: "🌌 Lugia", rarity: "Legendary", chance: 1, reward: 500 },
  { name: "🌠 Ho-Oh", rarity: "Legendary", chance: 1, reward: 500 },
  { name: "🌀 Suicune", rarity: "Legendary", chance: 1, reward: 500 },
  { name: "⚡ Zapdos", rarity: "Legendary", chance: 1, reward: 500 },
  { name: "🔥 Moltres", rarity: "Legendary", chance: 1, reward: 500 },
  { name: "❄️ Articuno", rarity: "Legendary", chance: 1, reward: 500 },
  { name: "⏳ Dialga", rarity: "Legendary", chance: 1, reward: 500 },
  { name: "🌍 Groudon", rarity: "Legendary", chance: 1, reward: 500 },

  // Mythical Pokémon
  { name: "🌈 Mew", rarity: "Mythical", chance: 0.5, reward: 1000 },
  { name: "🎶 Celebi", rarity: "Mythical", chance: 0.5, reward: 1000 },
  { name: "🌙 Darkrai", rarity: "Mythical", chance: 0.5, reward: 1000 },
  { name: "☀️ Shaymin", rarity: "Mythical", chance: 0.5, reward: 1000 },
  { name: "🌑 Deoxys", rarity: "Mythical", chance: 0.5, reward: 1000 },

  // God Pokémon
  { name: "🌟 Arceus", rarity: "God", chance: 0.1, reward: 10000 }
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

    pokecoinsDisplay.textContent = `🪙 Pokécoins: ${pokecoins}`;
    autoClickerButton.textContent = `🤖 Buy Auto-Clicker (Cost: ${autoClickerCost})`;
    multiplierButton.textContent = `✨ Buy Click Multiplier (Cost: ${multiplierCost})`;
    shinyCounter.textContent = `✨ Shinies Caught: ${shinyCount}`;
    renderPokedex();
    renderAchievements();
  }
}

// Show Notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => notification.remove(), 1000);
  }, 3000);
}

// Render Achievements
function renderAchievements() {
  achievementsDisplay.innerHTML = "";
  if (achievements.shiny10) {
    achievementsDisplay.innerHTML += `<div>🎉 Achievement Unlocked: Catch 10 Shiny Pokémon!</div>`;
  }
  if (achievements.shiny100) {
    achievementsDisplay.innerHTML += `<div>🌟 Achievement Unlocked: Catch 100 Shiny Pokémon!</div>`;
  }
  if (achievements.shiny1000) {
    achievementsDisplay.innerHTML += `<div>🌈 Achievement Unlocked: Catch 1000 Shiny Pokémon!</div>`;
  }
  if (achievements.shinyLegendary) {
    achievementsDisplay.innerHTML += `<div>✨ Achievement Unlocked: Catch a Shiny Legendary!</div>`;
  }
  if (achievements.arceusCaught) {
    achievementsDisplay.innerHTML += `<div>👑 Achievement Unlocked: Catch Arceus, the God of Pokémon!</div>`;
  }
  if (achievements.shinyArceusCaught) {
    achievementsDisplay.innerHTML += `<div>🌟 Achievement Unlocked: Catch a Shiny Arceus!</div>`;
  }
  if (achievements.dex50) {
    achievementsDisplay.innerHTML += `<div>📘 Achievement Unlocked: Catch 50 Unique Pokémon!</div>`;
  }
  if (achievements.dex100) {
    achievementsDisplay.innerHTML += `<div>📚 Achievement Unlocked: Catch 100 Unique Pokémon!</div>`;
  }
}

// Catch Pokémon
function catchPokemon() {
  const roll = Math.random() * totalChance;
  let cumulativeChance = 0;

  for (const pokemon of pokemonRarities) {
    cumulativeChance += pokemon.chance;
    if (roll < cumulativeChance) {
      const isShiny = pokemon.rarity === "Legendary" || pokemon.rarity === "God" || pokemon.rarity === "Mythical" ? 
        Math.random() < 0.25 : Math.random() < 0.5;
      const shinyMultiplier = isShiny ? 2 : 1;
      const reward = pokemon.reward * clickMultiplier * shinyMultiplier;
      const pokemonName = isShiny ? `✨ ${pokemon.name} ✨` : pokemon.name;

      pokecoins += reward;
      updatePokedex(pokemonName);
      pokecoinsDisplay.textContent = `🪙 Pokécoins: ${pokecoins}`;

      if (isShiny) {
        shinyCount++;
        shinyCounter.textContent = `✨ Shinies Caught: ${shinyCount}`;
        animateShiny();
        checkAchievements(pokemon.rarity, pokemon.name);
      }

      if (pokemon.name === "🌟 Arceus") {
        achievements.arceusCaught = true;
        if (isShiny) {
          achievements.shinyArceusCaught = true;
        }
        renderAchievements();
      }

      saveGame();
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
    let rarityColor = "";
    
    const pokemon = pokemonRarities.find(p => p.name === name.replace(/✨/g, "").trim());
    if (pokemon) {
      switch(pokemon.rarity) {
        case "Common": rarityColor = "gray"; break;
        case "Uncommon": rarityColor = "green"; break;
        case "Rare": rarityColor = "blue"; break;
        case "Epic": rarityColor = "purple"; break;
        case "Legendary": rarityColor = "orange"; break;
        case "Mythical": rarityColor = "pink"; break;
        case "God": rarityColor = "gold"; break;
      }
    }
    
    entry.innerHTML = `<span style="color:${rarityColor}">${name}</span>: ${count} caught`;
    pokedexDisplay.appendChild(entry);
  }
}

// Check Achievements
function checkAchievements(rarity, pokemonName) {
  const uniquePokemonCaught = Object.keys(pokedex).length;
  
  if (shinyCount >= 10 && !achievements.shiny10) {
    achievements.shiny10 = true;
    showNotification("🎉 Achievement Unlocked: Catch 10 Shiny Pokémon!");
    renderAchievements();
  }
  if (shinyCount >= 100 && !achievements.shiny100) {
    achievements.shiny100 = true;
    showNotification("🌟 Achievement Unlocked: Catch 100 Shiny Pokémon!");
    renderAchievements();
  }
  if (shinyCount >= 1000 && !achievements.shiny1000) {
    achievements.shiny1000 = true;
    showNotification("🌈 Achievement Unlocked: Catch 1000 Shiny Pokémon!");
    renderAchievements();
  }
  if (rarity === "Legendary" && !achievements.shinyLegendary) {
    achievements.shinyLegendary = true;
    showNotification("✨ Achievement Unlocked: Catch a Shiny Legendary!");
    renderAchievements();
  }
  if (uniquePokemonCaught >= 50 && !achievements.dex50) {
    achievements.dex50 = true;
    showNotification("📘 Achievement Unlocked: Catch 50 Unique Pokémon!");
    renderAchievements();
  }
  if (uniquePokemonCaught >= 100 && !achievements.dex100) {
    achievements.dex100 = true;
    showNotification("📚 Achievement Unlocked: Catch 100 Unique Pokémon!");
    renderAchievements();
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

// Buy Auto-Clicker
function buyAutoClicker() {
  if (pokecoins >= autoClickerCost) {
    pokecoins -= autoClickerCost;
    autoClicksPerSecond++;
    autoClickerCost *= 2;
    pokecoinsDisplay.textContent = `🪙 Pokécoins: ${pokecoins}`;
    autoClickerButton.textContent = `🤖 Buy Auto-Clicker (Cost: ${autoClickerCost})`;
    saveGame();
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
    saveGame();
  }
}

// Auto-Clicker Logic
setInterval(() => {
  pokecoins += autoClicksPerSecond * clickMultiplier;
  pokecoinsDisplay.textContent = `🪙 Pokécoins: ${pokecoins}`;
  saveGame();
}, 1000);

// Event Listeners
clickButton.addEventListener("click", catchPokemon);
autoClickerButton.addEventListener("click", buyAutoClicker);
multiplierButton.addEventListener("click", buyClickMultiplier);

// Load the game when the page loads
window.addEventListener("load", loadGame);
