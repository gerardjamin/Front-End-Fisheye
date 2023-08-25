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


