/* eslint-disable no-unused-vars */
/**
 *
 * @param {*} filteredPhotographers : All the works of the selected photographer.
 * @returns Promise for the array of videos and images : URLs of each of the photos and video
 */
function getTravauxPhotographers(filteredPhotographers) {
  let portfolioPicture = [];
  let portfolioVideo = [];
  let tableauVideoImage = [];

  for (const objet of filteredPhotographers) {
    const { id, photographerId, title, image, video, likes, date, price } =
      objet;
    //Array containing the photos
    if (image !== undefined) {
      portfolioPicture.push(`assets/portofolio/${image}`);
    }
    //Array containing the videos
    if (video !== undefined) {
      portfolioVideo.push(`assets/portofolio/${video}`);
    }
  }
  //Array gathering all the images and videos of the photographer
  tableauVideoImage = portfolioPicture.concat(portfolioVideo);

  return tableauVideoImage;
}

/**
 ******************************************Calculate the index of the clicked photo in the array *************
 * @param {*} filteredPhotographers :All the works of the selected photographer
 * @param {*} src :Path of the clicked photo in the context.
 * @returns : Index of the clicked photo in the sourcePhoto array
 */
function calculeIndex(filteredPhotographers, src) {
  // eslint-disable-next-line no-debugger

  /*In sourcePhoto, you will find all the URLs of the photographer's photos, for example: 0: ../assets/portofolio/Fashion_Yellow_Beach.jpg, 1: ../assets/portofolio/Fashion_Urban_Jungle.jpg, ...*/
  const sourcePhoto = getTravauxPhotographers(filteredPhotographers);
  // The returned array will contain ["namephoto1.jpg", "namephoto2.jpg", "namephoto3.jpg, ..."]
  const urlDePhotos = sourcePhoto.map(function (element) {
    const chemin = element;
    const partiesDuChemin = chemin.split("/");
    //Return the name of the photo with the extension
    return partiesDuChemin[partiesDuChemin.length - 1];
  });

  //exemple of src = http://127.0.0.1:5501/assets/portofolio/Fashion_Yellow_Beach.jpg
  //Here, we retrieve the URL of the clicked photo
  const chemin = src;
  const partiesDuChemin = chemin.split("/");
  let name = partiesDuChemin[partiesDuChemin.length - 1];
  //We are looking for the index of the clicked photo in the sourcePhoto array.
  let index = urlDePhotos.findIndex((imageIndex) => imageIndex === name);

  return { index, sourcePhoto };
}

/**
 * Display the closeUP picture/video
 * @param {*} url: Path of the element
 * @param {*} type mp4 or jpg
 * @param {*} reponse: Index of the clicked element
 * @param {*} index: Position in the array of the next or previous photo
 */

function displayNexPrev(url, type, reponse, index) {
  const modalLightBoxContent = document.querySelector(".modalLightBox-content");
  const videoElement = document.createElement("video");

  //We have either a photo or a video
  if (type === "mp4") {
    //pick up name and add the name's photo into the alt
    const partiesDuChemin = url.split("/");
    let wholeName = partiesDuChemin[partiesDuChemin.length - 1];
    const name = wholeName.replace(/\.mp4$/, "");
    //Checking for the existing video element inside <modalLightBox-content>
    // We retrieve the reference to the HTML collection if it exists.
    const collection = document.getElementsByTagName("video");
    // Check if 'photoLightBox' exists in my collection
    const elementRecherche = collection.namedItem("videoLightBox");
    if (elementRecherche !== null) {
      //Injecting the URL of the video from the context
      videoElement.setAttribute("src", `${url}`);
      videoElement.focus();
    } else {
      //If an image is present, remove the element and create the video element.
      const photoLightBox = document.querySelector(".photoLightBox");
      photoLightBox.remove();
      const videoElement = document.createElement("video");
      videoElement.setAttribute("name", "videoLightBox");
      videoElement.classList.add("videoLightBox");
      //Retrieving the source of the video from the context.
      videoElement.setAttribute("src", `${url}`);
      videoElement.setAttribute("type", "mp4");
      videoElement.setAttribute("controls", " ");
      modalLightBoxContent.appendChild(videoElement);
      videoElement.focus();
    }
  } else {
    //pick up name and add the name's photo into the alt
    const partiesDuChemin = url.split("/");
    let wholeName = partiesDuChemin[partiesDuChemin.length - 1];
    const name = wholeName.replace(/\.jpg$/, "");
    //So, an image exists
    // We obtain the reference to the HTML collection
    const collection = document.getElementsByTagName("video");
    // Check if 'photoLightBox' exists in my collection with the name of the img tag.
    const elementRecherche = collection.namedItem("videoLightBox");
    //If a video is present, remove the element and create the image element.
    if (elementRecherche !== null) {
      const videoLightBox = document.querySelector(".videoLightBox");
      videoLightBox.remove();
      const photoElement = document.createElement("img");
      photoElement.setAttribute("name", "photoLightBox");
      photoElement.classList.add("photoLightBox");
      //accessibilité
      photoElement.setAttribute("alt", name);
      modalLightBoxContent.appendChild(photoElement);
      const url = reponse.sourcePhoto[index];
      photoElement.setAttribute("src", `${url}`);
      photoElement.focus();
    } else {
      //Injecting the URL into the image from the context
      const photoElement = document.querySelector(".photoLightBox");
      photoElement.setAttribute("alt", name);
      const url = reponse.sourcePhoto[index];
      photoElement.setAttribute("src", `${url}`);
      photoElement.focus();
    }
  }
}

function getExtensionFromUrl(url) {
  const cheminDuFichier = url;
  // We split the string and return the last part of the string (extension).
  const partiesDuChemin = cheminDuFichier.split(".");
  // Return the file extension.
  return partiesDuChemin[partiesDuChemin.length - 1];
}

//***********************************************display the porfolio's photographer**********************
function openLightbox(
  modalLightBox,
  filteredPhotographers,
  modalLightBoxContent,
  that,
  name
) {
  //Retrieval of the index of the clicked element and the array of photos
  let reponse = calculeIndex(filteredPhotographers, that);
  let index = reponse.index;
  //Calculate the size of the sourcePhoto array
  const taille = reponse.sourcePhoto.length;
  // const that = this: Storing the context during the (click)
  const LightBox = document.getElementById("modalLightBox");

  //************************************************MANAGMENT CHEVRON LEFT/RIGHT**************************** */
  const precedent = LightBox.querySelector(".lightBoxPrecedent");
  const suivant = LightBox.querySelector(".lightBoxSuivant");

  //*************************************ZOOM MANAGMENT FOR PHOTO/VIDEO ON CLICK SECTION (closeUp view)***************************
  let extension = getExtensionFromUrl(that);
  if (extension === "jpg") {
    // We obtain the reference to the HTML collection
    const collection = document.getElementsByTagName("video");
    // Check if 'photoLightBox' exists in my collection with the name of the img tag.
    const elementRecherche = collection.namedItem("videoLightBox");

    const partiesDuChemin = that.split("/");
    let wholeName = partiesDuChemin[partiesDuChemin.length - 1];
    const name = wholeName.replace(/\.jpg$/, "");

    if (elementRecherche !== null) {
      console.log('L\'élément "videoLightBox" existe dans la collection.');
      const videoLightBox = document.querySelector(".videoLightBox");
      videoLightBox.remove();
      const photoElement = document.createElement("img");
      photoElement.setAttribute("name", "photoLightBox");
      photoElement.classList.add("photoLightBox");
      photoElement.setAttribute("alt", name);
      //Retrieving the source of the video in the context (photo object)
      photoElement.src = that;

      //remove legend class if exist
      const legend = document.querySelector(".legende");

      if (legend) {
        legend.remove(); // Supprime l'élément s'il existe
      }
      //Title Section for Images and Videos
      const text = document.createElement("p");
      text.style.color = "#DB8876";
      text.textContent = name;
      text.classList.add("legende");
      modalLightBoxContent.appendChild(photoElement);
      modalLightBoxContent.appendChild(text);
    } else {
      //not video tag
      console.log(
        "L'élément \"videoLightBox\" n'existe pas dans la collection."
      );

      const imageLightBox = document.querySelector(
        ".modalLightBox-content img"
      );
      //attribut alt pour accessibilité
      imageLightBox.setAttribute("alt", name);
      //remove legend class if exist
      const legend = document.querySelector(".legende");

      if (legend) {
        legend.remove(); 
      }
      //Title Section for Images and Videos
      const text = document.createElement("p");
      text.style.color = "#DB8876";
      text.textContent = name;
      text.classList.add("legende");
      //give a new clicked source
      imageLightBox.setAttribute("src", that);
      modalLightBoxContent.appendChild(text);
    }
  } else {
    const videoLightBox = document.querySelector(".videoLightBox");
    if (videoLightBox !== null) {
      //nothing to do , the tag video already exist
    } else {
      //The tag "img" is present at the initialization of the web page(the first time loaded page web)
      const photoLightBox = document.querySelector(".photoLightBox");
      photoLightBox.remove();
      const videoElement = document.createElement("video");
      videoElement.setAttribute("tabindex", "0")
      videoElement.setAttribute("name", "videoLightBox");
      videoElement.classList.add("videoLightBox");
      //retrieving the source of video into the context
      videoElement.setAttribute("src", that);
      videoElement.setAttribute("title", "video")
      videoElement.setAttribute("type", "mp4");
      //background picture for video
      videoElement.setAttribute("alt", "")
      videoElement.setAttribute("aria-hidden", true)
      videoElement.setAttribute("controls", true);
      videoElement.setAttribute("aria-label", "closeup view")

      //remove legend class if exist
      const legend = document.querySelector(".legende");

      if (legend) {
        legend.remove(); 
      }
      //  //Title Section for Images and Videos
      const partiesDuChemin = that.split("/");
      let wholeName = partiesDuChemin[partiesDuChemin.length - 1];
      const name = wholeName.replace(/\.mp4$/, "");
      const text = document.createElement("p");
      text.style.color = "#DB8876";
      text.textContent = name;
      text.classList.add("legende");
      modalLightBoxContent.appendChild(videoElement);
      modalLightBoxContent.appendChild(text);
      //managment the start video by key enter
      videoElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === "Return") {
          event.preventDefault(); // avoid all behavior by default of key "Return"
          // start the video
          videoElement.play();
        }
      })
    }
  }

  //********************************************************WAITING FOR AN EVENT...********************************************
  //PRECEDENT
  precedent.addEventListener("click", function (event) {
    //Prevents event propagation to the parent
    event.stopPropagation();
    // Decrement the index of the array to move to the previous element on click
    index = index - 1;
    if (index < 0) {
      index = taille - 1;
    }
    //************************I switch to the sourcePhoto array to display the photos.
    //URL of the clicked photo.
    const url = reponse.sourcePhoto[index];

    //retry name and add the name's photo under photo
    const partiesDuChemin = url.split("/");
    let wholeName = partiesDuChemin[partiesDuChemin.length - 1];

    let extension = wholeName.split(".")
    if (extension[1] === "mp4") {
      name = wholeName.replace(/\.mp4$/, "");
    } else {
      name = wholeName.replace(/\.jpg$/, "");
    }

    const legend = document.querySelector(".legende");
    //remove legend class if exist
    if (legend) {
      legend.remove(); // Supprime l'élément s'il existe
    }

    //Title Section for Images and Videos
    const text = document.createElement("p");
    text.style.color = "#DB8876";
    text.textContent = name;
    text.classList.add("legende");
    //Call the display function
    displayNexPrev(url, getExtensionFromUrl(url), reponse, index);
    modalLightBoxContent.appendChild(text);
  });

  //SUIVANT
  //Waiting for an event...
  suivant.addEventListener("click", function (event) {
    //Prevents event propagation to the parent
    event.stopPropagation();
    //Increment the index of the array to move to the next element on click
    index = index + 1;
    if (index === taille) {
      index = 0;
    }
    //************************I switch to the sourcePhoto[] array and display the photos.
    //URL of the clicked photo.
    const url = reponse.sourcePhoto[index];
    //retry name and add the name's photo under photo
    const partiesDuChemin = url.split("/");
    let wholeName = partiesDuChemin[partiesDuChemin.length - 1];

    let extension = wholeName.split(".")
    if (extension[1] === "mp4") {
      name = wholeName.replace(/\.mp4$/, "");
    } else {
      name = wholeName.replace(/\.jpg$/, "");
    }

    //remove legend class if exist
    const legend = document.querySelector(".legende");
    if (legend) {
      legend.remove(); // Supprime l'élément s'il existe
    }
    //  //Title Section for Images and Videos
    const text = document.createElement("p");
    text.style.color = "#DB8876";
    text.textContent = name;
    text.classList.add("legende");
    //Call the display function
    displayNexPrev(url, getExtensionFromUrl(url), reponse, index);
    modalLightBoxContent.appendChild(text);
  });

  //************************************************MANAGMENT ARROW LEFT/RIGHT**************************** */
  //Waiting for an event...
  window.addEventListener("keydown", (e) => {
    // Moving to the previous photo with the left arrow key.
    if (e.key === "ArrowLeft" && modalLightBox.classList.contains("show")) {
      e.preventDefault();
      // Decrement the index of the array to move to the previous element on click."
      index = index - 1;
      if (index < 0) {
        index = taille - 1;
      }
      //************************I switch to the sourcePhoto array to display the photos.
      //URL linked to clicked photo.
      const url = reponse.sourcePhoto[index];

      //retry name and add the name's photo under photo
      const partiesDuChemin = url.split("/");
      let wholeName = partiesDuChemin[partiesDuChemin.length - 1];

      let extension = wholeName.split(".")
      if (extension[1] === "mp4") {
        name = wholeName.replace(/\.mp4$/, "");
      } else {
        name = wholeName.replace(/\.jpg$/, "");
      }

      //remove legend class if exist
      const legend = document.querySelector(".legende");

      if (legend) {
        legend.remove(); // Supprime l'élément s'il existe
      }
      //  //Title Section for Images and Videos
      const text = document.createElement("p");
      text.style.color = "#DB8876";
      text.textContent = name;
      text.classList.add("legende");
      //Call the display function
      displayNexPrev(url, getExtensionFromUrl(url), reponse, index);
      modalLightBoxContent.appendChild(text);
    }

    // Moving to the next photo with the right arrow key
    if (e.key === "ArrowRight" && modalLightBox.classList.contains("show")) {
      e.preventDefault();
      //Increment the index of the array to move to the next element on click
      index = index + 1;
      if (index === taille) {
        index = 0;
      }
      //************************I switch to the sourcePhoto array to display the photos
      //URL of the clicked photo.
      const url = reponse.sourcePhoto[index];

      //retry name and add the name's photo under photo
      const partiesDuChemin = url.split("/");
      let wholeName = partiesDuChemin[partiesDuChemin.length - 1];

      let extension = wholeName.split(".")
      if (extension[1] === "mp4") {
        name = wholeName.replace(/\.mp4$/, "");
      } else {
        name = wholeName.replace(/\.jpg$/, "");
      }

      //remove legend class if exist
      const legend = document.querySelector(".legende");

      if (legend) {
        legend.remove(); // Supprime l'élément s'il existe
      }
      //  //Title Section for Images and Videos
      const text = document.createElement("p");
      text.style.color = "#DB8876";
      text.textContent = name;
      text.classList.add("legende");
      //Call the display function
      displayNexPrev(url, getExtensionFromUrl(url), reponse, index);
      modalLightBoxContent.appendChild(text);
    }
  });

  console.log(document.activeElement)

  // checked if LightBox have a focus
  // if (document.activeElement === LightBox) {
  //   console.log("L'élément LightBox a le focus.")
  // } else {
  //   console.log("L'élément LightBox n'a pas le focus.")
  // }
} //all web page loading here
