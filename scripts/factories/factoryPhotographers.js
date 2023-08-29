/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
// eslint-disable-next-line no-empty

async function factoryObject(photographers, type,valeurId,media) {
  if (type === "photographers") {
    const dataPhographers = []
    let tabIndex = 1

    photographers.forEach((photographer) => {
      tabIndex++
      //objet
      const photographerModel = photographerTemplate(photographer)
      //elementHTML article
      const userCardDOM = photographerModel.getUserCardDOM(tabIndex)
      //contient tous les articles
      dataPhographers.push(userCardDOM)
    })
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
