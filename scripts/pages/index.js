import { getPhotographers} from '../api/api.js';
//Mettre le code JavaScript lié à la page index.html (home)
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

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
    //console.table(objetsPhotographer)
    //affichage des articles
    displayData(objetsPhotographer)
}

init();

