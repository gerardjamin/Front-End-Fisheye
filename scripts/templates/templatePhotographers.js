/* eslint-disable no-unused-vars */

/**
 * 
 * @param {*} data ( or array photoGraphers)
 * @returns object java script
 */
function photographerHeader(data) {
<<<<<<< HEAD
=======

>>>>>>> ce9ba1911bb0d1cb0c31a11357613bc9b2be51a0
    const { name, id,city, country, tagline, portrait} = data;
    const picture = `../assets/Photographers/${portrait}`;

    //object to display
    function getUserCardDOM() {

        //Creation of the node to be inserted
        const identity = document.createElement('article');
        identity.className = "identity"
        const h2 = document.createElement('h2');
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
        img.setAttribute('alt', `photo de profil de ${name}`)

        return { identity: identity, picture: img }; // Return the article element and the image
    }

    //Return the JavaScript object
    return {getUserCardDOM} 
}