/* eslint-disable no-unused-vars */
export function compteLikesPhotographer(filteredPhotographers) {
    let totalLikes = 0
    for (const objet of filteredPhotographers) {
        totalLikes += parseInt(objet.likes)
    }
    return totalLikes 
}


