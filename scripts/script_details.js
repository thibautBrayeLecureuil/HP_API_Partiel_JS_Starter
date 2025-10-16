async function loadData() {
    let parameters = new URLSearchParams(window.location.search);
    let id = parameters.get('id');
    let url = "https://hp-api.onrender.com/api/character/" + id;
    console.log(url);
    let characterData = await fetch(url)
        .then(res => res.json())
        .catch(error => {
            console.log(error);
        });

    return characterData[0];

}

async function load() {
    let characterData = await loadData();
    displayCharacter(characterData);
}

function displayCharacter(characterData) {
    let character_div = document.querySelector(".detail__perso");
    character_div.innerHTML += `
        <h3>${characterData.name}</h3>
        <div class="perso">
          <figure class="perso__left">
            <img src="${characterData.image === "" ? "./images/characters/troll.jpg" : characterData.image}" alt="${characterData.name}" srcset="" />
            <figcaption>${characterData.name}</figcaption>
          </figure>
          <div class="perso__right">
        </div>
`
    let house_div = document.querySelector(".house__perso");
    house_div.innerHTML += `
        <img src="${getPathHouseImage(characterData.house)}" alt="" srcset="" />
    `
}

function getPathHouseImage(house) {
    switch (house) {
        case "Gryffindor":
            return "./images/logo/Gryffindor.png";
        case "Hufflepuff":
            return "./images/logo/Hufflepuff.png";
        case "Ravenclaw":
            return "./images/logo/Ravenclaw.png";
        case "Slytherin":
            return "./images/logo/Slytherin.png";
        default:
            return "./images/logo/logo.png";
    }
}

load()