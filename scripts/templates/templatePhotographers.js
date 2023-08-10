/* eslint-disable no-unused-vars */
function photographerHeader(data) {

    const { name, id,city, country, tagline, portrait} = data;
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

        return { identity: identity, picture: img }; // Retourne l'élément article et l'image
    }

    //retourne l'objet java script
    return {getUserCardDOM} 
}