import { getPhotographers} from '../api/api.js';
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
//Mettre le code JavaScript lié à la page index.html (home)
function displayData(data) {
    const photographersSection = document.querySelector(".photographer_section")
    //affichage des objets 
    for (let element of data) {
        photographersSection.appendChild(element);
    }
}

async function init() {
    // Récupère les datas des photographes(destructuration de l'objet)
    const { photographers } = await getPhotographers();
    //programmation asynchrone => await
    const objetsPhotographer = await factoryObject(photographers, 'photographers')
    //affichage des articles
    displayData(objetsPhotographer)
}

//Point d'entrée
init();

