var selectedHouse = "";
var displayedCharacters = []
function loadHouses() {
    let houses_div = document.querySelector(".houses");

    houses_div.appendChild(createHouse("Gryffindor","images/logo/Gryffindor.png"));
    houses_div.appendChild(createHouse("Hufflepuff","images/logo/Hufflepuff.png"));
    houses_div.appendChild(createHouse("Ravenclaw","images/logo/Ravenclaw.png"));
    houses_div.appendChild(createHouse("Slytherin","images/logo/Slytherin.png"));
}

function createHouse(houseName,imagePath) {
    let house = document.createElement("div");
    house.classList.add(houseName);
    house.innerHTML += `
        <picture>
            <img src="${imagePath}" alt="${houseName} emblem" id="${houseName}" />
        </picture>
    `

    addHouseEvent(house)

    return house;
}

function addHouseEvent(house) {
    house.addEventListener("click", (e) => {
        selectedHouse = e.target.id;
        displayedCharacters.forEach(character => {
            character.remove();
        })
        displayCharacters(selectedHouse);
    })
}

async function getCharacters(){
    return await fetch("https://hp-api.onrender.com/api/characters")
    .then(res => res.json())
    .catch(err => console.log(err));
}

async function displayCharacters(house) {

    let characters_div = document.querySelector(".characters");

    let characters_response = await getCharacters();

    characters_response = sort(characters_response, house);

    for (let i = 0; i < 12; i++) {
        let character = createCharacter(characters_response[i])
        characters_div.appendChild(character);
        displayedCharacters.push(character);
    }
}

function sort(characters, house) {
    if (house !== "") {
        characters = characters.filter((character) => character.house === house);
    }

    characters.sort((CharacterA, CharacterB) => CharacterA.name.localeCompare(CharacterB.name));

    return characters;
}
function createCharacter(characterData){
    let character = document.createElement("div");
    character.innerHTML += `
        <a href="./details.html">
        <img class="${characterData.house}_Character" src="${characterData.image === "" ? "./images/characters/troll.jpg" : characterData.image}" alt="${characterData.name}"/>
        <p>${characterData.name}</p>
        </a>
    `
    return character;
}

function load() {
    loadHouses();
    displayCharacters(selectedHouse);
}

load()