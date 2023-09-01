import { getPhotographers} from '../api/api.js';
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
        photographersSection.appendChild(element);
    }
}

/**
 * 
 */
async function init() {
    // Retrieve photographer data (object destructuring part photographers)
    const { photographers } = await getPhotographers();
    //programmation asynchrone => await
    const objetsPhotographer = await factoryObject(photographers, 'photographers')
    //display 6 articles with personals data
    displayData(objetsPhotographer)
}

//Entry point in the file
init();

