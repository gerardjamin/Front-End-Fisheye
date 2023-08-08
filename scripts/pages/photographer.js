import { getPhotographers } from '../api/api.js';
import { photographerHeader } from '../templates/templatePhotographers.js'
/* eslint-disable no-unused-vars */
//Mettre le code JavaScript lié à la page photographer.html
// eslint-disable-next-line no-unused-vars

async function displayData(identity, picture) {
    const photographersHeader = document.querySelector(".photograph-header")
    photographersHeader.appendChild(identity);
    photographersHeader.appendChild(picture);
    //noeud parent
    const photographersSection = document.querySelector(".photograph-header")
    const child = document.querySelector(".contact_button")
    photographersSection.insertBefore(identity, child)
}

async function init() {
    // Obtenir les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    // Récupérez la valeur de la variable "id" de l'URL
    const valeurId = urlParams.get('id');
    const { photographers } = await getPhotographers();
    //récupération de l'index du tableau
    const trouverIndexParPropriete = (photographers, id, valeurId) => {
        const indexTrouve = photographers.findIndex(objet => objet[id] === parseInt(valeurId));
        return indexTrouve;
    };
    const indexTrouve = trouverIndexParPropriete(photographers, 'id', valeurId);
    const data = photographers[indexTrouve]
    const myObjet = photographerHeader(data).getUserCardDOM()
    const { identity, picture } = myObjet
    //affichage du photographe
    displayData(identity, picture)

}

init();








