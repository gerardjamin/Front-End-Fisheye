/* eslint-disable no-unused-vars */

/**
 * 
 * @param {*} filteredPhotographers 
 * @returns promesse tableauVideoImage
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

function calculeIndex(filteredPhotographers,src) {

  // eslint-disable-next-line no-debugger
  const sourcePhoto = getTravauxPhotographers(filteredPhotographers)
  // Le tableau nomsDeFichiers contiendra ["photo1.jpg", "photo2.jpg", "photo3.jpg ...."]
  const nomsDePhotos = sourcePhoto.map(function (element) {
      const chemin = element;
      const partiesDuChemin = chemin.split("/");
      return partiesDuChemin[partiesDuChemin.length - 1];
  });
  //on recupere seulement le nom de la photo qui a ete cliquée du context
  const chemin = src;
  const partiesDuChemin = chemin.split("/");
  let name = partiesDuChemin[partiesDuChemin.length - 1];
  //on obtiens l'index du tableau sourcePhoto dans le tableau des photos du photographe
  let index = nomsDePhotos.findIndex((imageIndex) => imageIndex === name)

  //../assets/portofolio/Travel_Tower.jpg 
  //../assets/portfolio/${nomsDePhotos[index]}  => donne le chemin de la photo cliquée
  //on passera a la photo d'apres avec index + 1

//   console.table('sourcePhoto', sourcePhoto)
//   console.table('nomDePhoto', nomsDePhotos)
//   console.log('index dans nomsDePhoto', index)

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
