/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
// eslint-disable-next-line no-empty

async function factoryObject(photographers, type,valeurId,media) {
  if (type === "photographers") {
    const dataPhographers = []

    photographers.forEach((photographer) => {
      //objet
      const photographerModel = photographerTemplate(photographer)
      //elementHTML article
      const userCardDOM = photographerModel.getUserCardDOM()
      //contient tous les articles
      dataPhographers.push(userCardDOM)
    });
    
    //retourne un tableau d'articles pour chaque photographe: 
    // <article>
    //   <a href="photographer.html?id=243"><img src="..../MimiKeel.jpg" alt="Je m'appelle Mimi Keel"></a>
    //   <h2>Mimi Keel</h2>
    //   <h3>London, UK</h3>
    //   <p>Voir le beau dans le quotidien</p>
    //   <h4>400/jour</h4>
    // </article>
    return dataPhographers
  }
  else if (type === 'identity'){
    //objet identity et portfolio
    const myObjet = photographerHeader(photographers).getUserCardDOM()
    const { identity, picture } = myObjet
    // récupère tous les travaux en fonction de l'id du photographe
    const filteredPhotographers = media.filter(image => image.photographerId === parseInt(valeurId));

    return  {
      identity,
      picture,
      filteredPhotographers  //portfolio
    }
  }
  
  else if (type === "videos") {
    const dataVideo =[]
    return dataVideo
  }

  // eslint-disable-next-line no-empty
  else {
  }
}
