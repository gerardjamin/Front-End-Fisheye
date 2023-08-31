/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import { getPhotographers } from "../api/api.js";
import {
    compteLikesPhotographer,
    compteLikesPagePhotographer,
    incrementeLikes
} from "../utils/likes.js";
import { filtrage } from "../utils/sortFiltered.js";


/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
/**
 * 
 * @param {*} identity ("identity of the photographer.)
 * @param {*} picture (Portrait of the photographer.)
 * @param {*} filteredPhotographers (Data from the photographers array in the .json file.)
 * @param {*} photographers (Data from the media array in the .json file. )
 */
async function displayData(
    identity,
    picture,
    filteredPhotographers,
    photographers
) {
    //identity part
    const photographersHeader = document.querySelector(".photograph-header");
    photographersHeader.appendChild(identity);
    photographersHeader.appendChild(picture);
    //node parent
    const photographersSection = document.querySelector(".photograph-header");
    //first child
    const child = document.querySelector(".openButton");
    photographersSection.insertBefore(identity, child);
    //init of number TAB
    let tabIndex = 7;

    //**************************************PORTFOLIO MANAGMENT SECTION(GALERY)********************************
    for (const objet of filteredPhotographers) {
        const { id, photographerId, title, image, video, likes, date, price } =
            objet;

        const portfolioPicture = `../assets/portofolio/${image}`;
        const portfolioVideo = `../assets/portofolio/${video}`;

        const portofolioSection = document.querySelector(".portfolio_section");
        const article = document.createElement("article");
        const container = document.createElement("div");
        //Title Section for Images and Videos
        const p = document.createElement("p");
        p.textContent = `${title}`;
        tabIndex++;
        if (image) {
            //part image
            const imgElement = document.createElement("img");
            //Management accessibility
            imgElement.setAttribute("tabindex", `${tabIndex}`);
            imgElement.classList.add("photo");
            imgElement.setAttribute("src", portfolioPicture);
            imgElement.setAttribute("alt", `le titre de la photo${title}`);
            //I am filling the article with the image
            article.appendChild(imgElement);
        } else if (video) {
            //part video
            const videoElement = document.createElement("video");
            videoElement.classList.add("video");
            //Management accessibility
            videoElement.setAttribute("tabindex", `${tabIndex}`);
            videoElement.setAttribute("src", portfolioVideo);
            videoElement.setAttribute("type", "mp4");
            //videoElement.setAttribute("controls", ' ')
            article.appendChild(videoElement);
        }

        //*************************************************INCREMENT LIKES MANAGEMENT IN HTML SECTION************************************
        //heart
        const div = document.createElement("div");
        div.classList.add("likesPhotographer");
        div.setAttribute("id", "likesPhotographer");
        div.setAttribute("tabindex", `${tabIndex}`);
        //Customization of the Like (id)
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
                </svg> `;
        container.appendChild(p);
        container.appendChild(div);
        article.appendChild(container);
        portofolioSection.appendChild(article);
    }
    //**************************************************************MANAGMENT ENCART OF THE PAGE*********************************
    const encart = document.getElementById("encart");
    const { photographerId } = filteredPhotographers[0];

    //To retrieve the hourly rate of each photographer.
    function recupererProprieteAssociee(photographers, photographerId) {
        for (const objet of photographers) {
            if (objet.id === parseInt(photographerId)) {
                return objet.price;
            }
        }
        return null; // If the sought value is not found
    }

    const priceHour = recupererProprieteAssociee(photographers, photographerId);
    //Counting the likes for all the works of the photographer retrieved from the JSON file
    const totalLikes = compteLikesPhotographer(filteredPhotographers);
    const div = document.createElement("div");
    div.setAttribute("id", "encartLike");
    div.classList.add("encartLike");
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
                <h4>${priceHour}/jour</h4>`;
    encart.appendChild(div);

    //*********************************************LIKES INCREMENT MANAGMENT********************************************* */
    //Store the likes of each photo in a NodeList
    const likesPhoto = document.querySelectorAll(".likesPhotographer");
    //We loop through this NodeList, waiting for an event
    for (let like of likesPhoto) {
        //Record the class of the first child node
        let premierEnfant = like.childNodes[0]
        //We select it
        const likeCoeur = like.querySelector("span")
        //Convert the content of likeCoeur to an integer type
        let likesCount = parseInt(likeCoeur.textContent)

        //Here, waiting for the click event......
        like.addEventListener("click", function () {
            incrementeLikes(premierEnfant, likesCount, likeCoeur)
        })
        //managment of l'accessibility
        like.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                incrementeLikes(premierEnfant, likesCount, likeCoeur)
            }
        })
    }

    //*************************************************MANAGMENT LIGHTBOX***************************************************/

    //Section that enables opening the lightbox when clicking on the image or video element
    // To retrieve the array of image and video elements.

    const myImage = document.getElementsByClassName("photo");
    const myVideo = document.getElementsByClassName("video");
    // Using the spread operator (...) to concatenate.
    const concatenatedArray = [...myImage, ...myVideo];
    const modalLightBox = document.querySelector("#modalLightBox");
    const closeLightBox = document.querySelector("#closeLightBox");
    const modalLightBoxContent = document.querySelector(".modalLightBox-content");
    // const lightBoxSuivant = document.getElementById("lightBoxSuivant");
    // const lightBoxPrecedent = document.getElementById("lightBoxPrecedent");

    // Add an onClick() event on each of the photos or videos to open the lightbox
    // and manage accessibility.
    for (let photo of concatenatedArray) {
        photo.addEventListener("click", function () {
            //record the context
            let that = this.src;
            openLightbox(
                modalLightBox,
                filteredPhotographers,
                modalLightBoxContent,
                that
            )
            //display image into the modale
            modalLightBox.classList.add("show");
        });

        photo.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                //record the context
                let that = this.src;
                openLightbox(
                    modalLightBox,
                    filteredPhotographers,
                    modalLightBoxContent,
                    that
                )
                //display image/video into the modale
                modalLightBox.classList.add("show");
                //managment accessibility
                const videoLightBox = document.querySelector(".videoLightBox")
                if (videoLightBox !== null) {
                    videoLightBox.focus()
                }
            }
        })
    }

    //Closing the modalLightBox by clicking the cross
    closeLightBox.addEventListener("click", function () {
        modalLightBox.classList.remove("show");
    });

    //Closing on click inside the modalLightBox.
    modalLightBox.addEventListener("click", function () {
        modalLightBox.classList.remove("show");
    });

    // Closing the modal modalLightBox with the escape key on the keyboard.
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalLightBox.classList.contains("show")) {
            e.preventDefault();
            modalLightBox.classList.remove("show");
        }
    });
    //*********************************DROPDOWN SORTING MANAGMENT********************************************************** */

    //Close the dropdown if clicked outside
    window.onclick = function (event) {
        if (!event.target.matches(".dropbtn")) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains("show")) {
                    openDropdown.classList.remove("show");
                }
            }
        }
    };

    //Sorting by Category.
    document
        .getElementById("popularite")
        .addEventListener("click", function (event) {
            // Prevent the default behavior of the link (navigation)
            event.preventDefault();
            cleanUp();
            const triePopularite = filtrage("like", filteredPhotographers);
            // portfolio_section
            displayData(identity, picture, triePopularite, photographers);
        });

    document
        .getElementById("date").addEventListener("click", function (event) {
            // Prevent the default behavior of the link (navigation)
            event.preventDefault();
            cleanUp();
            const trieDate = filtrage("date", filteredPhotographers);
            // portfolio_section
            displayData(identity, picture, trieDate, photographers);
        });

    document
        .getElementById("titre").addEventListener("click", function (event) {
            // Prevent the default behavior of the link (navigation)
            event.preventDefault();
            cleanUp();
            const trieTitre = filtrage("titre", filteredPhotographers);
            // portfolio_section
            displayData(identity, picture, trieTitre, photographers);
        });
} //here, the page is loaded

window.addEventListener("load", function () {
    console.log("La page est entièrement chargée.");
});

async function init() {
    //Remove the 'like' variable from local storage
    localStorage.clear();
    // Get the parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    // Retrieve the value of the 'id' variable from the URL
    const valeurId = urlParams.get("id");
    //destructuration
    const { photographers } = await getPhotographers();
    const { media } = await getPhotographers();
    //Retrieving the index of the array corresponding to the photographer's ID.
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

    //********************PHOTOGRAPHER'S PORTFOLIO DISPLAY MANAGMENT**************************************************
    await displayData(identity, picture, filteredPhotographers, photographers);
    /**************************************************************************************************************** */
}

//enter point into the file
init();
