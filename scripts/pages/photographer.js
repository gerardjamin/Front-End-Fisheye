import { getPhotographers } from "../api/api.js";
import { compteLikesPhotographer } from "../utils/likes.js"
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
//Mettre le code JavaScript lié à la page photographer.html ici
async function displayData(identity, picture, filteredPhotographers, photographers) {
    //partie identite
    const photographersHeader = document.querySelector(".photograph-header")
    photographersHeader.appendChild(identity)
    photographersHeader.appendChild(picture)
    //noeud parent
    const photographersSection = document.querySelector(".photograph-header")
    //premier enfant
    const child = document.querySelector(".openButton")
    photographersSection.insertBefore(identity, child)

    //partie portofolio
    for (const objet of filteredPhotographers) {
        const { id, photographerId, title, image, video, likes, date, price } =
            objet;
        const portfolioPicture = `../assets/portofolio/${image}`;
        const portfolioVideo = `../assets/portofolio/${video}`;
        const portofolioSection = document.querySelector(".portfolio_section")
        const article = document.createElement("article")
        const container = document.createElement("div")
        //partie titre de l'image et de la video
        const p = document.createElement("p")
        p.textContent = `${title}`

        if (image) {
            //partie image
            const imgElement = document.createElement("img")
            imgElement.setAttribute("src", portfolioPicture)
            imgElement.setAttribute("alt", `le titre de la photo${title}`)
            article.appendChild(imgElement)

        } else if(video) {
            //partie video
            const videoElement = document.createElement("video")
            videoElement.setAttribute("src", portfolioVideo)
            videoElement.setAttribute("type", "mp4")
            videoElement.setAttribute("controls", "true")
            article.appendChild(videoElement)
        }
        //coeur
        const span = document.createElement("span")
        span.innerHTML = `<span>${likes}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24" fill="none">
                    <g clip-path="url(#clip0_120_550)">
                        <path d="M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z" fill="#911C1C" />
                    </g>
                    <defs>
                        <clipPath id="clip0_120_550">
                            <rect width="21" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg> `

        container.appendChild(p);
        container.appendChild(span);
        article.appendChild(container);
        portofolioSection.appendChild(article);
    }
    //partie encart de la page
    const encart = document.getElementById('encart');
    const { photographerId } = filteredPhotographers[0]
    //recuperer le prix horaire du photographe
    function recupererProprieteAssociee(photographers, photographerId) {
        for (const objet of photographers) {
            if (objet.id === parseInt(photographerId)) {
                return objet.price;
            }
        }
        return null; // Si la valeur cherchée n'est pas trouvée
    }
    const priceHour = recupererProprieteAssociee(photographers, photographerId)
    const totalLikes = compteLikesPhotographer(filteredPhotographers)
    const span = document.createElement("span")
    span.innerHTML = `<span>${totalLikes}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24" fill="none">
                    <g clip-path="url(#clip0_120_550)">
                        <path d="M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z" fill="#000000" />
                    </g>
                    <defs>
                        <clipPath id="clip0_120_550">
                            <rect width="21" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg> `
    encart.appendChild(span);
    const h4 = document.createElement('h4');
    h4.textContent = `${priceHour}/jour`
    encart.appendChild(h4)
}

async function init() {
    // Obtenir les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    // Récupérez la valeur de la variable "id" de l'URL
    const valeurId = urlParams.get("id");
    //destructuration
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    //récupération de l'index du tableau correspondant à l'id du photographe
    const trouverIndexParPropriete = (photographers, id, valeurId) => {
        const indexTrouve = photographers.findIndex(
            (objet) => objet[id] === parseInt(valeurId)
        );
        return indexTrouve;
    };
    const indexTrouve = trouverIndexParPropriete(photographers, "id", valeurId);
    const data = photographers[indexTrouve];
    const { identity, picture, filteredPhotographers } = await factoryObject(
        data,
        "identity",
        valeurId,
        media
    );
    //affichage du photographe avec son portofolio
    displayData(identity, picture, filteredPhotographers, photographers);
}
//point d'entrée
init();
