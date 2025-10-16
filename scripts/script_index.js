function loadHouses() {
    let houses_div = document.querySelector(".houses");

    houses_div.appendChild(createHouse("Gryffindor","images/logo/Gryffindor.png"));
    houses_div.appendChild(createHouse("Hufflepuff","images/logo/Hufflepuff.png"));
    houses_div.appendChild(createHouse("Ravenclaw","images/logo/Ravenclaw.png"));
    houses_div.appendChild(createHouse("Slytherin","images/logo/Slytherin.png"));
}

function load() {
    loadHouses();
    displayCharacters()
}

function createHouse(houseName,imagePath) {
    let house = document.createElement("div");
    house.classList.add(houseName);
    house.innerHTML += `
        <picture>
            <img src="${imagePath}" alt="${houseName} emblem" />
        </picture>
    `
    return house;
}

async function getCharacters(){
    return await fetch("https://hp-api.onrender.com/api/characters")
    .then(res => res.json())
    .catch(err => console.log(err));
}

async function displayCharacters() {
    let characters_div = document.querySelector(".characters");

    let characters_response = await getCharacters();

    for (let i = 0; i < 12; i++) {
        characters_div.appendChild(createCharacter(characters_response[i]));
    }
}

function createCharacter(characterData){
    let character = document.createElement("div");
    character.innerHTML += `
        <img class="${characterData.house}_Character" src="${characterData.image}" alt="${characterData.name}"/>
        <p>${characterData.name}</p>
    `
    return character;
}


load()