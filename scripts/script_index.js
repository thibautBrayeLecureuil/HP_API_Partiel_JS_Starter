function loadHouses() {
    let houses_div = document.querySelector(".houses");

    houses_div.appendChild(createHouse("Gryffindor","images/logo/Gryffindor.png"));
    houses_div.appendChild(createHouse("Hufflepuff","images/logo/Hufflepuff.png"));
    houses_div.appendChild(createHouse("Ravenclaw","images/logo/Ravenclaw.png"));
    houses_div.appendChild(createHouse("Slytherin","images/logo/Slytherin.png"));
}

function load() {
    loadHouses();
}

function createHouse(houseName,imagePath) {
    let house = document.createElement("div");
    house.innerHTML += `
        <picture>
            <img src="${imagePath}" alt="${houseName} emblem" />
        </picture>
    `
    return house;
}

load()