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
      //contient tous les artcles
      dataPhographers.push(userCardDOM)
    });

    return dataPhographers
  }

  else if (type === 'identity'){
    //objet identity et portfolio
    const myObjet = photographerHeader(photographers).getUserCardDOM()
    const { identity, picture } = myObjet
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