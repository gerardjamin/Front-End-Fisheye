/* eslint-disable no-unused-vars */
/**
 * 
 * @param {*} data ( or array photoGraphers)
 * @returns array of objects java script
 */
function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    //exemple portrait: "portrait" = "RhodeDubois.jpg"
    const picture = `assets/photographers/${portrait}`;

    //objects to display
    /**
     * build the acticle for every photographer 
     * @param {*} tabIndex 
     * @returns 
     */
    function getUserCardDOM(tabIndex) {
        const article = document.createElement('article');
        const img = document.createElement('img');
        //here tabindex is link to accessibilité
        tabIndex = 0
        img.setAttribute("src", picture)
        img.setAttribute('alt', `Je m'appelle ${name}`)
        const link = document.createElement('a')
        //managment accessibility
        link.setAttribute("role","link")
        link.setAttribute("tabindex", `${tabIndex}`)
        link.setAttribute("title","afficher la page de profil du photographe ?")
        //Link to access the photographer's presentation page
        link.setAttribute('href', 'photographer.html?id=' + id)
        link.appendChild(img)
        const h1 = document.createElement('h1');
        h1.classList.add("nameIndex")
        h1.textContent = name;
        const h2 = document.createElement('h2');
        h2.textContent = `${city}, ${country}`;
        const p = document.createElement('p');
        p.textContent = tagline
        const h3 = document.createElement('h3');
        h3.textContent = `${price}€/jour`

        const identificateur = document.createElement('span')
        identificateur.className = "identificateur"

        article.appendChild(link)
        article.appendChild(h1);
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(h3);

        return (article);
    }
    //Return the function() callback in order to use after..
    return ({ getUserCardDOM })
}