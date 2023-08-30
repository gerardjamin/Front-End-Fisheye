/* eslint-disable no-unused-vars */
export function filtrage(type, filteredPhotographers) {

    //Filter the table by decreasing popularity.
    if (type === "like") {
        filteredPhotographers.sort((a, b) => b.likes - a.likes)
    } else if (type === "date") {
        //filter the table by increasing date
        filteredPhotographers.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else if (type === "titre") {
        //Custom filtering of titles in alphabetical order
        filteredPhotographers.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (titleA < titleB) {
                return -1;
            } else if (titleA > titleB) {
                return 1;
            }
            //any change into the  array
            return 0
        })
    }
    return filteredPhotographers
}