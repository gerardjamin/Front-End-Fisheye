/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
async function factoryObject(photographers, type) {
    if (type === 'photographers') {
        //async function displayData(photographers) {
            const photographersSection = document.querySelector(".photographer_section");
            /*global photographerTemplate*/
            /*eslint no-undef: "error"*/
            photographers.forEach((photographer) => {
                //call 2 functions)()
                const photographerModel = photographerTemplate(photographer);
                const userCardDOM = photographerModel.getUserCardDOM();
                photographersSection.appendChild(userCardDOM);
            });
        //}
    }
    // eslint-disable-next-line no-empty
    else if (type === 'videos'){

    }

    // eslint-disable-next-line no-empty
    else {
        
    }
}