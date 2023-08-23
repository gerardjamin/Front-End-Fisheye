/* eslint-disable no-unused-vars */
/**
 * 
 * @param {*} filteredPhotographers : tous les travaux du photographe sélectionné
 * @returns promesse tableauVideoImage : url de chacune des photos
 */
 function getTravauxPhotographers(filteredPhotographers) {
    let portfolioPicture = []
    let portfolioVideo = []
    let tableauVideoImage = []

    for (const objet of filteredPhotographers) {
        const { id, photographerId, title, image, video, likes, date, price } = objet;
        //tableau regroupant les photos
        if (image !== undefined) {
            portfolioPicture.push(`../assets/portofolio/${image}`);
            // portfolioPicture.push(`../assets/portofolio/${image} , ${id}`);
        }
        //tableau regroupant les videos
        if (video !== undefined) {
            portfolioVideo.push(`../assets/portofolio/${video}`);
            // portfolioVideo.push(`../assets/portofolio/${video} , ${id}`);
        }
    }

    //tableau regroupant toutes les images et video du photographe
    tableauVideoImage = portfolioPicture.concat(portfolioVideo);
    
    return tableauVideoImage
}

/**
 ******************************************calcule l'index du tableau de la phto clickée 
 * @param {*} filteredPhotographers :travaux du photographe sélectionné
 * @param {*} src :source du context de la photo clickée
 * @returns : index du tableau de la photo clickée et le tableau sourcePhoto
 */
function calculeIndex(filteredPhotographers,src) {
  // eslint-disable-next-line no-debugger
  //dans sourcePhoto on trouve tous les url des photos du photographe
  const sourcePhoto = getTravauxPhotographers(filteredPhotographers)
  // Le tableau nomsDeFichiers contiendra ["namephoto1.jpg", "namephoto2.jpg", "namephoto3.jpg ...."]
  const urlDePhotos = sourcePhoto.map(function (element) {
      const chemin = element;
      const partiesDuChemin = chemin.split("/");
      //retourne le nom de la photo avec l'extension
      return partiesDuChemin[partiesDuChemin.length - 1];
  });

  //ici on recupere l'url de la photo clickée
  const chemin = src;
  const partiesDuChemin = chemin.split("/");
  let name = partiesDuChemin[partiesDuChemin.length - 1];
  //on cherche l'index du tableau sourcePhoto de la photo cliquée
  let index = urlDePhotos.findIndex((imageIndex) => imageIndex === name)

  return {index , sourcePhoto}
}

/**
 * affiche l'elements suivant ou precedent
 * @param {*} url: chemin de l'element
 * @param {*} type mp4 ou jpg
 * @param {*} reponse: index de l'element cliqué
 * @param {*} index: placement dans le tableau de la photo suivante ou precedente
 */
function displayNexPrev(url,type,reponse,index) { 
    const modalLightBoxContent = document.querySelector(".modalLightBox-content")
    const videoElement = document.createElement("video")

//on a soit une photo soit une vidéo
if (type === "mp4") {
    //vérification de l'élément video existant dans <modalLightBox-content>
    // On récupère la référence de la collection HTML si elle existe..
    const collection = document.getElementsByTagName('video')
    // Vérifiez si "photoLightBox" existe dans ma collection
    const elementRecherche = collection.namedItem('videoLightBox');
    if (elementRecherche !== null) {
        //injection de l'url de la video du contexte
        videoElement.setAttribute("src", `${url}`)
    } else {
        //si présence d'une image suppression de l'élément et création de l'élément video
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
    }
} else {
    //alors une image existe
    // On obtient la référence de la collection HTML
    const collection = document.getElementsByTagName('video')
    // Vérifiez si "photoLightBox" existe dans ma collection avec le nom de la balise img
    const elementRecherche = collection.namedItem('videoLightBox');
    //si présence d'une video suppression de l'élément et création de l'élément image
    if (elementRecherche !== null) {
        const videoLightBox = document.querySelector(".videoLightBox")
        videoLightBox.remove()
        const photoElement = document.createElement("img")
        photoElement.setAttribute("name", "photoLightBox")
        photoElement.classList.add("photoLightBox")
        modalLightBoxContent.appendChild(photoElement)
        const url = reponse.sourcePhoto[index]
        photoElement.setAttribute("src", `${url}`)
    } else {
        //injection de l'url de l'image du contexte
        const photoLightBox = document.querySelector(".photoLightBox")
        const url = reponse.sourcePhoto[index]
        photoLightBox.setAttribute("src", `${url}`)
    }
}
}






















































// let currentPhotoIndex = 0;
// const photos = [
//     { src: 'photographer1.jpg', caption: 'Photographer 1' },
//     { src: 'photographer2.jpg', caption: 'Photographer 2' },
//     // Ajoutez d'autres photos avec leurs légendes ici
// ];

// function openLightbox(index) {
//     const lightbox = document.getElementById("lightbox");
//     const lightboxImg = document.getElementById("lightbox-img");
//     const lightboxCaption = document.getElementById("lightbox-caption");

//     currentPhotoIndex = index;
//     const currentPhoto = photos[currentPhotoIndex];
//     lightboxImg.src = currentPhoto.src;
//     lightboxCaption.textContent = currentPhoto.caption;
//     lightbox.style.display = "block";
// }

// function changePhoto(offset) {
//     currentPhotoIndex += offset;

//     if (currentPhotoIndex < 0) {
//         currentPhotoIndex = photos.length - 1;
//     } else if (currentPhotoIndex >= photos.length) {
//         currentPhotoIndex = 0;
//     }

//     const lightboxImg = document.getElementById("lightbox-img");
//     const lightboxCaption = document.getElementById("lightbox-caption");

//     const currentPhoto = photos[currentPhotoIndex];
//     lightboxImg.src = currentPhoto.src;
//     lightboxCaption.textContent = currentPhoto.caption;
// }

// ... (votre code existant) ...
