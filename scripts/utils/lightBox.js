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
