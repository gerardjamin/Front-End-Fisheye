/* eslint-disable no-unused-vars */
function photographerTemplate(data) {
    const { name,id,city,country,tagline,price, portrait, } = data;
    console.log(data)

    const picture = `../assets/Photographers/${portrait}`;
    const border = '50%'

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute('style', 'border-radius: 50%;');
        img.setAttribute('halt',`${name}`)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}