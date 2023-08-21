/* eslint-disable no-debugger */
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
        //ensemble des travaux des photographes
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
            imgElement.classList.add("photo")
            imgElement.setAttribute("src", portfolioPicture)
            imgElement.setAttribute("alt", `le titre de la photo${title}`)
            //je rempli l'article avec l'image
            article.appendChild(imgElement)

        } else if (video) {
            //partie video
            const videoElement = document.createElement("video")
            videoElement.classList.add("video")
            videoElement.setAttribute("src", portfolioVideo)
            videoElement.setAttribute("type", "mp4")
            //videoElement.setAttribute("controls", ' ')
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

    //******************************************************lightBox****************************************************/

    //partie qui permet d'ouvrir la light-box au click sur l'element image ou video
    // Récupérer le tableau d'éléments image et video
    const myImage = document.getElementsByClassName("photo")
    const myVideo = document.getElementsByClassName("video")
    const modalLightBox = document.querySelector("#modalLightBox")
    const closeLightBox = document.querySelector("#closeLightBox")
    const imageLightBox = document.querySelector(".modalLightBox-content img")
    const modalLightBoxContent = document.querySelector(".modalLightBox-content")

    // Ajouter un événement onClick() sur chacune des photos ou videos pour ouvrir la light box
    for (let photo of myImage) {
        photo.addEventListener("click", function () {
           
            //recuperation de l'index de l'element en cours...
            let reponse = calculeIndex(filteredPhotographers, this.src)
            let index = reponse.index
            // const that = this: memorisation du contexte (click)         
            modalLightBox.addEventListener('click', function () {
                index = index + 1
                if (index === 10) {
                    index = 0;
                }
                
                const url = reponse.sourcePhoto[index]
                const taille = reponse.sourcePhoto.length
                const cheminDuFichier = url
                const partiesDuChemin = cheminDuFichier.split('.');
                const extensionDuFichier = partiesDuChemin[partiesDuChemin.length - 1];
               
                if (index >= taille) {
                    // index = 0
                    // const url = reponse.sourcePhoto[index]
                    // if(extensionDuFichier === "mp4"){
                    //     const photoLightBox = document.querySelector(".photoLightBox")
                    //     photoLightBox.remove()
                    //     const videoElement = document.createElement("video")
                    //     videoElement.setAttribute("name", "videoLightBox")
                    //     videoElement.classList.add("videoLightBox")
                    //     //recuperation de la source de la video dans le contexte
                    //     videoElement.setAttribute("src", `${url}`)
                    //     videoElement.setAttribute("type", "mp4")
                    //     videoElement.setAttribute("controls", ' ')
                    //     modalLightBoxContent.appendChild(videoElement)
                    // }else{
                    //     index = index + 1
                    //     const url = reponse.sourcePhoto[index]
                    //     imageLightBox.setAttribute("src", `${url}`)
                    // }                 
                } else {  
                    if(extensionDuFichier === "mp4"){
                        const photoLightBox = document.querySelector(".photoLightBox")
                        photoLightBox.remove()
                        const videoElement = document.createElement("video")
                        videoElement.setAttribute("name", "videoLightBox")
                        videoElement.classList.add("videoLightBox")
                        //recuperation de la source de la video dans le contexte
                        videoElement.setAttribute("src", `${url}`)
                        videoElement.setAttribute("type", "mp4")
                        videoElement.setAttribute("controls", ' ')
                        modalLightBoxContent.appendChild(videoElement)
                    }else{
                        const url = reponse.sourcePhoto[index]
                        imageLightBox.setAttribute("src", `${url}`)  
                    }
                }
            })




            // On obtient la référence de la collection HTML
            const collection = document.getElementsByTagName('video')
            // Vérifiez si "photoLightBox" existe dans ma collection avec le nom de la balise img
            const elementRecherche = collection.namedItem('videoLightBox');

            if (elementRecherche !== null) {
                console.log('L\'élément "videoLightBox" existe dans la collection.');
                const videoLightBox = document.querySelector(".videoLightBox")
                videoLightBox.remove()
                const photoElement = document.createElement("img")
                photoElement.setAttribute("name", "photoLightBox")
                photoElement.classList.add("photoLightBox")
                //recuperation de la source de la video dans le contexte(objet photo)
                photoElement.src = this.src
                modalLightBoxContent.appendChild(photoElement)
            } else {
                console.log('L\'élément "videoLightBox" n\'existe pas dans la collection.');
                const imageLightBox = document.querySelector(".modalLightBox-content img")
                //console.log('context', this.src)
                imageLightBox.setAttribute("src", this.src)
            }
            //affichage de l'image dans la modale
            modalLightBox.classList.add("show")
        })
    }
    for (let video of myVideo) {
        // Ajoutez l'événement click aux éléments enfants de l'élément vidéo     
        video.addEventListener("click", function (event) {
            event.defaultPrevented
            // On obtient la référence de la collection HTML
            const collection = document.getElementsByTagName('img');

            // Vérifiez si "photoLightBox" existe dans ma collection avec le nom de la balise img
            const elementRecherche = collection.namedItem('photoLightBox');

            if (elementRecherche !== null) {
                console.log('L\'élément "photoLightBox" existe dans la collection.');
                const photoLightBox = document.querySelector(".photoLightBox")
                photoLightBox.remove()
                const videoElement = document.createElement("video")
                videoElement.setAttribute("name", "videoLightBox")
                videoElement.classList.add("videoLightBox")
                //recuperation de la source de la video dans le contexte
                videoElement.setAttribute("src", this.src)
                videoElement.setAttribute("type", "mp4")
                videoElement.setAttribute("controls", ' ')
                modalLightBoxContent.appendChild(videoElement)
            } else {
                console.log('L\'élément "photoLightBox" n\'existe pas dans la collection.');
            }
            //affichage de la modale
            modalLightBox.classList.add("show")
        })
    }

    //fermeture de la modale de la light box
    closeLightBox.addEventListener("click", function () {
        modalLightBox.classList.remove("show")
    })

    //on ferme au click sur la modale de la light box
    // modalLightBox.addEventListener("click", function () {
    //     modalLightBox.classList.remove("show")
    // })
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
    await displayData(identity, picture, filteredPhotographers, photographers);
}

//point d'entrée dans le fichier
init();
