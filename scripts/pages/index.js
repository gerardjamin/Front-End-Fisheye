async function getPhotographers() {

    try {
        const response = await fetch('./data/photographers.json');
        const data = await response.json()
        return data
    } catch (error) {
        console.log('An error occurs', error)
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    /*global photographerTemplate*/
    /*eslint no-undef: "error"*/
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

