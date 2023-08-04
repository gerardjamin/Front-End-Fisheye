/* eslint-disable no-unused-vars */
function photographerTemplate(data) {
    const { name,id,city,country,tagline,price, portrait, } = data;
    console.log(data)

    const picture = `../assets/Photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute('style', 'border-radius: 50%;');
        img.setAttribute('halt',`${name}`)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = `${city}, ${country}`;
        const p = document.createElement('p');
        p.textContent = tagline
        const h4 = document.createElement('h4');
        h4.textContent = `${price}/jour`

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(h4);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}