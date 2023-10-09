//import { getPhotographers} from '../api/api.js' not necessary
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * display index.html page
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
//I'm wating for than the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    // I'm wating for than the key "Escape" is pressed
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            e.preventDefault()
            //I found the first element which can be focusable
            const firstElement = document.querySelector("a, button, input, select, textarea")
            if (firstElement) {
                firstElement.focus()
            }
        }
    })
})

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

