import { getPhotographers } from '../api/api.js';
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
//Mettre le code JavaScript lié à la page photographer.html
async function displayData(identity, picture, filteredImages) {
    const photographersHeader = document.querySelector(".photograph-header")
    photographersHeader.appendChild(identity);
    photographersHeader.appendChild(picture);
    //noeud parent
    const photographersSection = document.querySelector(".photograph-header")
    //premier enfant
    const child = document.querySelector(".contact_button")
    photographersSection.insertBefore(identity, child)

    //partie portofolio
    for (const objet of filteredImages) {
        const { id, photographerId, title, image, video, likes, date, price } = objet;
        const portfolioPicture = `../assets/portofolio/${image}`;
        const portfolioVideo = `../assets/portofolio/${video}`
        const portofolioSection = document.querySelector(".portfolio_section")
        const article = document.createElement('article')
        
        if (image) {
            const img = document.createElement('img')
            img.setAttribute("src", portfolioPicture)
            img.setAttribute('alt', `le titre de la photo${title}`)
            const p = document.createElement('p')
            p.textContent = `${title}`
            article.appendChild(img)
            article.appendChild(p)
            portofolioSection.appendChild(article)
        }else{
            const video = document.createElement('video')
            video.setAttribute("src", portfolioVideo)
            video.setAttribute("type",'mp4')
            video.setAttribute("controls", "true")
            const p = document.createElement('p')
            p.textContent = `${title}`
            article.appendChild(video)
            article.appendChild(p)
            portofolioSection.appendChild(article)    
        }
    }

}

async function init() {
    // Obtenir les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    // Récupérez la valeur de la variable "id" de l'URL
    const valeurId = urlParams.get('id');
    //destructuration
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    //récupération de l'index du tableau
    const trouverIndexParPropriete = (photographers, id, valeurId) => {
        const indexTrouve = photographers.findIndex(objet => objet[id] === parseInt(valeurId));
        return indexTrouve;
    };
    const indexTrouve = trouverIndexParPropriete(photographers, 'id', valeurId);
    const data = photographers[indexTrouve]
    const { identity, picture, filteredImages } = await factoryObject(data, 'identity', valeurId, media)

    //affichage du photographe avec son portofolio
    displayData(identity, picture, filteredImages)
}
//point d'entrée
init();








