//Mettre le code JavaScript lié à la page index.html (home)
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
async function getPhotographers() {
    return await fetch('./data/photographers.json')
        .then(res => res.json())
        .catch(err => console.log('an error occurs', err))
}

function displayData(data) {
    const photographersSection = document.querySelector(".photographer_section")
    //affichage des objets 
    for (let element of data) {
        photographersSection.appendChild(element);
    }
}

//Point d'entrée
async function init() {
    // Récupère les datas des photographes(destructuration )
    const { photographers } = await getPhotographers();
    //programmation asynchrone => await
    const objetsPhotographer = await factoryObject(photographers, 'photographers')
    displayData(objetsPhotographer)
}

init();

