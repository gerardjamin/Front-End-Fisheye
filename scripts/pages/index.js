async function getPhotographers() {

    return await fetch('./data/photographers.json')
        .then(res => res.json())
        .catch(err => console.log('an error occurs', err))
}


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    /*global photographerTemplate*/
    /*eslint no-undef: "error"*/
   
    photographers.forEach((photographer) => {
        //call 2 functions)()
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

//Enter point
async function init() {
    // Récupère les datas des photographes(only photographers array)
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

