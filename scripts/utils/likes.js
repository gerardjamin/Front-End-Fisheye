/* eslint-disable no-unused-vars */
/**
 * compte les likes de chaque photographe issue du fichier JSON
 * @param {*} filteredPhotographers 
 * @returns 
 */
export function compteLikesPhotographer(filteredPhotographers) {
    let totalLikes = 0
    for (const objet of filteredPhotographers) {
        totalLikes += parseInt(objet.likes)
    }
    return totalLikes
}

/**
 * compte les likes de chacun des photographes issue de la page photographer.html
 * et update le nombre total de likes
 * @param {*}  
 * @returns totalLikes
 */
export function compteLikesPagePhotographer() {
    let totalLikes = 0
    //enregistre dans une liste (node list) les likes de chacune des photos
    const likes = document.querySelectorAll(".likesPhotographer")
    //on boucle sur la liste
    for (let like of likes) {
        const likeCoeur = like.querySelector("#likes")
        //passage en entier du contenu de likeCoeur
        let likes = parseInt(likeCoeur.textContent)
        totalLikes += likes
    }
    return totalLikes
}

export function incrementeLikes(premierEnfant,likesCount,likeCoeur) {
     //initialise getLikeStorage si une valeur existe
     const getLikeStorage = localStorage.getItem(
        `${premierEnfant.classList[0]}`
      );
      if (getLikeStorage === premierEnfant.classList[0]) {
        //nothing , on a deja incremente le like de la photo
      } else {
        //alors on incremente le like
        likesCount++;
        //on injecte la valeur dans l'objet HTML du contexte
        likeCoeur.textContent = likesCount;
        //on appelle la fonction qui compte le nombre total de like de la page actuelle
        let totalLikes = compteLikesPagePhotographer();
        const encartLike = document.querySelector(".encartLike span");
        //on met à jour la nouvelle valeur
        encartLike.textContent = totalLikes;
        //on enregistre dans le local storage le nom de sa classe (like clické)
        localStorage.setItem(
          `${premierEnfant.classList[0]}`,
          premierEnfant.classList[0]
        );
      }
}


