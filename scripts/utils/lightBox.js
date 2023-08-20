/* eslint-disable no-unused-vars */

async function getTravauxPhotographers(filteredPhotographers) {
    let portfolioPicture = [];
    let portfolioVideo = [];

    for (const objet of filteredPhotographers) {
        const { id, photographerId, title, image, video, likes, date, price } = objet;
        //tableau regroupant les photos
        if (image !== undefined) {
            portfolioPicture.push(`../assets/portofolio/${image}`);
        }
        //tableau regroupant les videos
        if (video !== undefined) {
            portfolioVideo.push(`../assets/portofolio/${video}`);
        }
    }

    //tableau regroupant toutes les images et video du photographe
    const tableauVideoImage = portfolioPicture.concat(portfolioVideo);
    
    return tableauVideoImage
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
