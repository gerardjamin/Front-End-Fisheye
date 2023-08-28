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

function getExtensionFromUrl(url) {
    const cheminDuFichier = url
    // On sépare la chaîne de caractères et on retourne la dernière partie de la chaîne (extension)
    const partiesDuChemin = cheminDuFichier.split('.') 
    // Retourne l'extension du fichier
    return partiesDuChemin[partiesDuChemin.length - 1]
}

function openLightbox(modalLightBox,filteredPhotographers,modalLightBoxContent,src) {

    //recuperation de l'index de l'element clické et du tableau de phottos
    let reponse = calculeIndex(filteredPhotographers, src)
    let index = reponse.index
    //calcule la taille du tableau sourcePhoto
    const taille = reponse.sourcePhoto.length
    // const that = this: memorisation du contexte lors du (click) 

    //**********PARTIE GESTION (prev/next) & (arrow left/right) LIGHT BOX DU SITE****************************************
    const precedent = document.getElementById('modalLightBox').querySelector('.lightBoxPrecedent')
    //en attente d'un évennement...
    precedent.addEventListener("click", function (event) {
        //evite la propagation de l'evenement jusqu'au parent
        event.stopPropagation()
        // decremente l'indice du tableau pour passer a l'element precedent lors du click
        index = index - 1
        if (index < 0) {
            index = taille - 1
        }
        //************************je bascule sur le tableau sourcePhoto pour afficher les photos
        //url de la photo clickée
        const url = reponse.sourcePhoto[index]
        //appelle la fonction d'affichage
        displayNexPrev(url, getExtensionFromUrl(url), reponse, index)

    })

    const suivant = document.getElementById('modalLightBox').querySelector('.lightBoxSuivant')
    //en attente d'un évennement...
    suivant.addEventListener('click', function (event) {
        //arrete la propagation de l'action jusqu'au parent
        event.stopPropagation()
        //augmente l'indice du tableau pour passer a l'element suivant lors du click
        index = index + 1
        if (index === taille) {
            index = 0;
        }
        //************************je bascule sur le tableau sourcePhoto pour afficher les photos
        //url de la photo clickée
        const url = reponse.sourcePhoto[index]
        //appelle la fonction d'affichage
        displayNexPrev(url, getExtensionFromUrl(url), reponse, index)
    })
    //en attente d'un évennement...
    window.addEventListener('keydown', (e) => {
        // passage a la photo precedente avec la touche flèche gauche
        if (e.key === 'ArrowLeft' && modalLightBox.classList.contains('show')) {
            e.preventDefault();
            // decremente l'indice du tableau pour passer a l'element precedent lors du click
            index = index - 1
            if (index < 0) {
                index = taille - 1
            }
            //************************je bascule sur le tableau sourcePhoto pour afficher les photos
            //url de la photo clickée
            const url = reponse.sourcePhoto[index]
            //appelle la fonction d'affichage
            displayNexPrev(url, getExtensionFromUrl(url), reponse, index)
        }

        // passage a la photo suivante avec la touche flèche droite
        if (e.key === 'ArrowRight' && modalLightBox.classList.contains('show')) {
            e.preventDefault();
            //augmente l'indice du tableau pour passer a l'element suivant lors du click
            index = index + 1
            if (index === taille) {
                index = 0;
            }
            //************************je bascule sur le tableau sourcePhoto pour afficher les photos
            //url de la photo clickée
            const url = reponse.sourcePhoto[index]
            //appelle la fonction d'affichage
            displayNexPrev(url, getExtensionFromUrl(url), reponse, index)
        }
    });

    //*********************************PARTIE GESTION ZOOM DE LA PHOTO/VIDEO AU CLICK**************************************************
    let extension = getExtensionFromUrl(this.src)
    if (extension === 'jpg') {
        // On obtient la référence de la collection HTML
        const collection = document.getElementsByTagName('video')
        // Vérifiez si "photoLightBox" existe dans ma collection avec le nom de la balise img
        const elementRecherche = collection.namedItem('videoLightBox')

        if (elementRecherche !== null) {
            console.log('L\'élément "videoLightBox" existe dans la collection.')
            const videoLightBox = document.querySelector(".videoLightBox")
            videoLightBox.remove()
            const photoElement = document.createElement("img")
            photoElement.setAttribute("name", "photoLightBox")
            photoElement.classList.add("photoLightBox")
            //recuperation de la source de la video dans le contexte(objet photo)
            photoElement.src = this.src
            modalLightBoxContent.appendChild(photoElement)
        } else {
            console.log('L\'élément "videoLightBox" n\'existe pas dans la collection.')
            const imageLightBox = document.querySelector(".modalLightBox-content img")
            //console.log('context', this.src)
            imageLightBox.setAttribute("src", this.src)
        }
    } else {
        //<img> est présent à l'initialisation de la page WEB 
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
    }
    //affichage de l'image dans la modale
    modalLightBox.classList.add("show")

}   //la page web est entièrement chargée
