/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
async function getPhotographers() {
    return await fetch('./data/photographers.json')
        .then(res => res.json())
        .catch(err => console.log('an error occurs', err))
}

//Point d'entrée
async function init() {
    // Récupère les datas des photographes(destructuration for only photographers array)
    const { photographers } = await getPhotographers();
    factoryObject(photographers, 'photographers')
}

init();

