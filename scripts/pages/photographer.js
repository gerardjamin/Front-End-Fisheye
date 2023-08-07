/* eslint-disable no-unused-vars */
//Mettre le code JavaScript lié à la page photographer.html
// eslint-disable-next-line no-unused-vars

async function getPhotographers() {
    return await fetch('./data/photographers.json')
        .then(res => res.json())
        .catch(err => console.log('an error occurs', err))
}


function photographerHeader(data) {
    const { name, city, country, tagline, portrait, } = data;
    const picture = `../assets/Photographers/${portrait}`;

    //object to display
    function getUserCardDOM() {

        //creation du noeud à inserer
        const identity = document.createElement('article');
        identity.className = "identity"
        const h2 = document.createElement('h1');
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = `${city}, ${country}`;
        const p = document.createElement('p');
        p.textContent = tagline

        identity.appendChild(h2);
        identity.appendChild(h3);
        identity.appendChild(p);

        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute('alt', `Je m'appelle ${name}`)

        return { resultat1: identity, resultat2: img }; // Retourne l'élément article et l'image
    }

    //retourne l'objet java script
    return {getUserCardDOM} 
}

async function displayData(resultat1, resultat2) {
    const photographersHeader = document.querySelector(".photograph-header")

    //affichage des objets 
    console.log('displayData',resultat1)
    console.log('displayData',resultat2)

    photographersHeader.appendChild(resultat1);
    photographersHeader.appendChild(resultat2);

     //noeud parent
     const photographersSection = document.querySelector(".photograph-header")
     const child = document.querySelector(".contact_button")
     photographersSection.insertBefore(resultat1,child)
    

}

async function init() {
    const { photographers } = await getPhotographers();
    console.log('photographers', photographers[0])
    const data = photographers[0]
    console.log('data',data)
    const objet_0 = photographerHeader(data).getUserCardDOM()
    const{resultat1,resultat2} = objet_0
    console.table('objet_1',resultat1)
    console.log('objet2',resultat2)

    displayData(resultat1,resultat2)
   
}

init();








