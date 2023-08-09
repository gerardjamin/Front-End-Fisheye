/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
// eslint-disable-next-line no-empty

async function factoryObject(photographers, type) {
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
    //objet
    const myObjet = photographerHeader(photographers).getUserCardDOM()
    return { identity, picture } = myObjet 
  }
  
  else if (type === "videos") {
    const dataVideo =[]
    return dataVideo
  }

  // eslint-disable-next-line no-empty
  else {
  }
}
