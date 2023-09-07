//import { getPhotographers} from '../api/api.js'
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * display the index.html page
 * @param {*} dataPhographers: A table gathering all the article tags of the photographers for the index.html page
 */
function displayData(dataPhographers) {
    const photographersSection = document.querySelector(".photographer_section")
    //Display objects 
    for (let element of dataPhographers) {
        photographersSection.appendChild(element)
    }
}

//accessibilite: available escape key in order to go to first element 
// j'attends que la page soit complètement chargée
document.addEventListener("DOMContentLoaded", () => {
    // j'attends l'événement de la touche "Escape"
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            e.preventDefault()
            // je trouve le premier élément focusable de ma page
            const firstElement = document.querySelector("a, button, input, select, textarea")
            if (firstElement) {
                firstElement.focus()
            }
        }
    })
})


/**
 * 
 */
async function init() {
    // Retrieve photographer data (object destructuring part photographers)
    const { photographers } = await getPhotographers()
    //programmation asynchrone => await
    const objetsPhotographer = await factoryObject(photographers, 'photographers')
    //display 6 articles with personals data
    displayData(objetsPhotographer)
}

//Entry point in the file
init();

