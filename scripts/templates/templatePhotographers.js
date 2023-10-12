/* eslint-disable no-unused-vars */

/**
 * 
 * @param {*} data ( or array photoGraphers)
 * @returns object java script
 */
function photographerHeader(data) {
    const { name, id,city, country, tagline, portrait} = data;
    const picture = `assets/photographers/${portrait}`;

    //object to display
    function getUserCardDOM() {

        //Creation of the node to be inserted
        const identity = document.createElement('article');
        identity.className = "identity"
        const h1 = document.createElement('h1');
        h1.textContent = name;
        const h2 = document.createElement('h2');
        h2.textContent = `${city}, ${country}`;
        const p = document.createElement('p');
        p.textContent = tagline

        identity.appendChild(h1);
        identity.appendChild(h2);
        identity.appendChild(p);

        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute('alt', `${name}`)

        return { identity: identity, picture: img }; // Return the article element and the image
    }

    //Return the function() callback in order to use it a few later..
    return ({ getUserCardDOM }) 
}