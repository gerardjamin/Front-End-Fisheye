/* eslint-disable no-unused-vars */
export function filtrage(type, filteredPhotographers) {

    //filtrage du tableau par popularite decroissante
    if (type === "like") {
        filteredPhotographers.sort((a, b) => b.likes - a.likes)
    } else if (type === "date") {
        //filtrage par date croissante
        filteredPhotographers.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else if (type === "titre") {
        //filtrage personnalisé des titres par ordre aphabetique
        filteredPhotographers.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (titleA < titleB) {
                return -1;
            } else if (titleA > titleB) {
                return 1;
            }
            //aucun changement dans le tableau
            return 0
        })
    }
    return filteredPhotographers
}