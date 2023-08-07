import {getPhotographers} from '../api/api.js';
import {photographerHeader} from '../templates/templatePhotographers.js'
/* eslint-disable no-unused-vars */
//Mettre le code JavaScript lié à la page photographer.html
// eslint-disable-next-line no-unused-vars

async function displayData(resultat1, resultat2) {
    const photographersHeader = document.querySelector(".photograph-header")

    //affichage des objets 
    console.log('displayData',resultat1)
    console.log('displayData',resultat2)

    photographersHeader.appendChild(resultat1);
    photographersHeader.appendChild(resultat2);

     //noeud parent
     const photographersSection = document.querySelector(".photograph-header")
     const child = document.querySelector(".contact_button")
     photographersSection.insertBefore(resultat1,child)
    

}

async function init() {
    const { photographers } = await getPhotographers();
    console.log('photographers', photographers[0])
    const data = photographers[0]
    console.log('data',data)
    const objet_0 = photographerHeader(data).getUserCardDOM()
    const{resultat1,resultat2} = objet_0
    console.table('objet_1',resultat1)
    console.log('objet2',resultat2)

    displayData(resultat1,resultat2)
   
}

init();








