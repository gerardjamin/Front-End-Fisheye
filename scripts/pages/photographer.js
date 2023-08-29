/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import { getPhotographers } from "../api/api.js"
import { compteLikesPhotographer, compteLikesPagePhotographer } from "../utils/likes.js"
import { filtrage } from "../utils/sortFiltered.js"

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
    let tabIndex = 7

    //**************************************GESTION PARTIE PORTOFOLIO GALERIE********************************
    for (const objet of filteredPhotographers) {
        const { id, photographerId, title, image, video, likes, date, price } =
            objet;
        //ensemble des travaux des photographes
        const portfolioPicture = `../assets/portofolio/${image}`;
        const portfolioVideo = `../assets/portofolio/${video}`;

        const portofolioSection = document.querySelector(".portfolio_section")
        const article = document.createElement("article")
        const container = document.createElement("div")
        //partie titre de l'image et de la video
        const p = document.createElement("p")
        p.textContent = `${title}`
        tabIndex++
        if (image) {
            //partie image
            const imgElement = document.createElement("img")
            //gestion accessibilité
            imgElement.setAttribute("tabindex", `${tabIndex}`)
            imgElement.classList.add("photo")
            imgElement.setAttribute("src", portfolioPicture)
            imgElement.setAttribute("alt", `le titre de la photo${title}`)
            //je rempli l'article avec l'image
            article.appendChild(imgElement)

        } else if (video) {
            //partie video
            const videoElement = document.createElement("video")
            videoElement.classList.add("video")
            //gestion accessibilité
            videoElement.setAttribute("tabindex", `${tabIndex}`)
            videoElement.setAttribute("src", portfolioVideo)
            videoElement.setAttribute("type", "mp4")
            //videoElement.setAttribute("controls", ' ')
            article.appendChild(videoElement)
        }

        //*************************************************GESTION INCREMENTER LIKES PARTIE HTML************************************
        //coeur
        const div = document.createElement("div")
        div.classList.add("likesPhotographer")
        div.setAttribute('id', 'likesPhotographer')
        //personnalisation du like (id)
        div.innerHTML = `<span class="like-${id}" id="likes">${likes}</span>
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
        container.appendChild(p)
        container.appendChild(div)
        article.appendChild(container)
        portofolioSection.appendChild(article)
    }
    //**************************************************************GESTION ENCART DE LA PAGE*********************************
    const encart = document.getElementById('encart')
    const { photographerId } = filteredPhotographers[0]
    //const { photographerId } = filteredPhotographers

    //recuperer le prix horaire de chaque photographe
    function recupererProprieteAssociee(photographers, photographerId) {
        for (const objet of photographers) {
            if (objet.id === parseInt(photographerId)) {
                return objet.price
            }
        }
        return null // Si la valeur cherchée n'est pas trouvée
    }

    const priceHour = recupererProprieteAssociee(photographers, photographerId)
    //comptage des likes de tous les travaux du photographe recuperé dans le fichier JASON
    const totalLikes = compteLikesPhotographer(filteredPhotographers)
    const div = document.createElement("div")
    div.setAttribute('id', 'encartLike')
    div.classList.add("encartLike")
    div.innerHTML = `<span>${totalLikes}</span>
                <svg class="svg-encart" xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24" fill="none">
                    <g clip-path="url(#clip0_120_550)">
                        <path d="M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z" fill="#000000" />
                    </g>
                    <defs>
                        <clipPath id="clip0_120_550">
                            <rect width="21" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg> 
                <h4>${priceHour}/jour</h4>`
    encart.appendChild(div);
    // const h4 = document.createElement('h4');
    // h4.textContent = `${priceHour}/jour`
    // encart.appendChild(h4)

    //*********************************************GESTION INCREMENTATION DES LIKES********************************************* */
    //enregistre dans une liste (node list) les likes de chacune des photos
    const likesPhoto = document.querySelectorAll(".likesPhotographer")
    //on boucle sur cette node list en attente d'un evenement
    for (let like of likesPhoto) {
        //enregistre la classe du premier enfant du noeud
        let premierEnfant = like.childNodes[0]
        //on le selectionne
        const likeCoeur = like.querySelector("span")
        //convertit en type entier le contenu de likeCoeur
        let likesCount = parseInt(likeCoeur.textContent)
        //ici attente de l'evenement........ 
        like.addEventListener('click', function () {
            //initialise getLikeStorage si une valeur existe
            const getLikeStorage = localStorage.getItem(`${premierEnfant.classList[0]}`)
            if (getLikeStorage === premierEnfant.classList[0]) {
                //nothing , on a deja incremente le like de la photo
            } else {
                //alors on incremente le like
                likesCount++
                //on injecte la valeur dans l'objet HTML du contexte
                likeCoeur.textContent = likesCount
                //on appelle la fonction qui compte le nombre total de like de la page actuelle
                let totalLikes = compteLikesPagePhotographer()
                const encartLike = document.querySelector(".encartLike span")
                //on met à jour la nouvelle valeur
                encartLike.textContent = totalLikes
                //on enregistre dans le local storage le nom de sa classe (like clické)
                localStorage.setItem(`${premierEnfant.classList[0]}`, premierEnfant.classList[0]);
            }
        })
    }

    //*********************************GESTION DE LA LIGHTBOX*LIGHTBOX***************************************************/

    //partie qui permet d'ouvrir la light-box au click sur l'element image ou video
    // Récupérer le tableau d'éléments image et video

    const myImage = document.getElementsByClassName("photo")
    const myVideo = document.getElementsByClassName("video")
    // Utilisation de l'opérateur de propagation (...) pour concaténer
    const concatenatedArray = [...myImage, ...myVideo];
    const modalLightBox = document.querySelector("#modalLightBox")
    const closeLightBox = document.querySelector("#closeLightBox")
    // const imageLightBox = document.querySelector(".modalLightBox-content img")
    const modalLightBoxContent = document.querySelector(".modalLightBox-content")
    const lightBoxSuivant = document.getElementById("lightBoxSuivant")
    const lightBoxPrecedent = document.getElementById("lightBoxPrecedent")

    // Ajouter un événement onClick() sur chacune des photos ou videos pour ouvrir la light box
    //et gérer l'accessibilité
    for (let photo of concatenatedArray) {
        photo.addEventListener("click", function () {
            //je sauvegarde le contexte
            let that = this.src
            openLightbox(modalLightBox,filteredPhotographers,modalLightBoxContent,that)
            //affichage de l'image dans la modale
            modalLightBox.classList.add("show")
        })

        photo.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
               //je sauvegarde le contexte
            let that = this.src
            openLightbox(modalLightBox,filteredPhotographers,modalLightBoxContent,that)
            //affichage de l'image dans la modale
            modalLightBox.classList.add("show")
            }
        })
    }

   

    //fermeture de la modale de la light box sur la croix
    closeLightBox.addEventListener("click", function () {
        modalLightBox.classList.remove("show")
    })

    //fermeture au click sur la modale de la light box
    modalLightBox.addEventListener("click", function () {
        modalLightBox.classList.remove("show")
    })

    // fermeture de la modale modalLightBox avec la touche escape du clavier
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalLightBox.classList.contains('show')) {
            e.preventDefault()
            modalLightBox.classList.remove("show")
        }
    })
    //*********************************GESTION DU DROPDOWN POUR LE TRIE********************************************************** */

    //ferme le dropdown si on clicke a l'exterieur 
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    document.getElementById("popularite").addEventListener("click", function (event) {
        // Empêcher le comportement par défaut du lien (navigation)
        event.preventDefault()
        cleanUp()
        const triePopularite = filtrage("like", filteredPhotographers)
        // portfolio_section
        displayData(identity, picture, triePopularite, photographers)
    })

    document.getElementById("date").addEventListener("click", function (event) {
        // Empêcher le comportement par défaut du lien (navigation)
        event.preventDefault()
        cleanUp()
        const trieDate = filtrage("date", filteredPhotographers)
        // portfolio_section
        displayData(identity, picture, trieDate, photographers)
    })

    document.getElementById("titre").addEventListener("click", function (event) {
        // Empêcher le comportement par défaut du lien (navigation)
        event.preventDefault()
        cleanUp()
        const trieTitre = filtrage("titre", filteredPhotographers)
        // portfolio_section
        displayData(identity, picture, trieTitre, photographers)
    })

}   //la page web est entièrement chargée

window.addEventListener('load', function () {
    // Code à exécuter une fois que la page est entièrement chargée
    console.log('La page est entièrement chargée.');
});

async function init() {
    //suprime la variable like du localstorage
    localStorage.clear()
    // Obtenir les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search)
    // Récupérez la valeur de la variable "id" de l'URL
    const valeurId = urlParams.get("id")
    //destructuration
    const { photographers } = await getPhotographers()
    const { media } = await getPhotographers()
    //récupération de l'index du tableau correspondant à l'id du photographe
    const trouverIndexParPropriete = (photographers, id, valeurId) => {
        const indexTrouve = photographers.findIndex(
            (objet) => objet[id] === parseInt(valeurId)
        );
        return indexTrouve;
    };
    const indexTrouve = trouverIndexParPropriete(photographers, "id", valeurId)
    const data = photographers[indexTrouve];
    const { identity, picture, filteredPhotographers } = await factoryObject(
        data,
        "identity",
        valeurId,
        media
    );

    //********************GESTION DE L'AFFICHAGE DU PORTOFOLIO DU PHOTOGRAPHE**************
    await displayData(identity, picture, filteredPhotographers, photographers)
    // const filtrageDate = filtrage("titre", filteredPhotographers)
    //console.log(filteredPhotographers)

    /**************************************************************************************************************** */
}

//point d'entrée dans le fichier
init();
