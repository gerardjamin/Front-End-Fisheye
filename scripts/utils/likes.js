/* eslint-disable no-unused-vars */
/**
 * Count the likes of each photographer from the JSON file
 * @param {*} filteredPhotographers 
 * @returns 
 */
function compteLikesPhotographer(filteredPhotographers) {
    let totalLikes = 0
    for (const objet of filteredPhotographers) {
        totalLikes += parseInt(objet.likes)
    }
    return totalLikes
}

/**
 * Count the likes of each photographer from the photographer.html page and update the total number of likes
 * @param {*}  
 * @returns totalLikes
 */
function compteLikesPagePhotographer() {
    let totalLikes = 0
    //Save the likes of each photo in a node list
    const likes = document.querySelectorAll(".likesPhotographer")
    //We loop through the list
    for (let like of likes) {
        const likeCoeur = like.querySelector("#likes")
        //convert in number
        let likes = parseInt(likeCoeur.textContent)
        totalLikes += likes
    }
    return totalLikes
}

function incrementeLikes(premierEnfant,likesCount,likeCoeur) {
     //init getLikeStorage if a value exist
     const getLikeStorage = localStorage.getItem(
        `${premierEnfant.classList[0]}`
      );
      if (getLikeStorage === premierEnfant.classList[0]) {
        //nothing , because already increase 
      } else {
        //increment
        likesCount++;
        //Inject the value into the HTML object within the context
        likeCoeur.textContent = likesCount;
        //Call the function that counts the total number of likes on the current page
        let totalLikes = compteLikesPagePhotographer();
        const encartLike = document.querySelector(".encartLike div");
        //update the new value
        encartLike.textContent = totalLikes;
        //Save the name of its class (clicked like) in the local storage.
        localStorage.setItem(
          `${premierEnfant.classList[0]}`,
          premierEnfant.classList[0]
        );
      }
}


