/* eslint-disable no-unused-vars */
function photographerTemplate(data) {
    const { name,id,city,country,tagline,price, portrait } = data;
    const picture = `../assets/Photographers/${portrait}`;

    //object to display
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)  
        img.setAttribute('alt',`Je m'appelle ${name}`)
        const link = document.createElement('a')
        link.setAttribute('href','photographer.html?id='+id)
        link.appendChild(img)
        const h1 = document.createElement( 'h2' );
        h1.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = `${city}, ${country}`;
        const p = document.createElement('p');
        p.textContent = tagline
        const h4 = document.createElement('h4');
        h4.textContent = `${price}/jour`

        const identificateur = document.createElement('span')
        identificateur.className="identificateur"
       
        article.appendChild(link)
        article.appendChild(h1);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(h4);
        return (article);
    }
    //retourne l'objet java script
    return ({ getUserCardDOM })
}