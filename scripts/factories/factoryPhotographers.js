/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
// eslint-disable-next-line no-empty

/**
 * 
 * @param {*} photographers (all data photographers)
 * @param {*} type (use for build index.html or photographer.html)
 * @param {*} valeurId (identificator about photographers)
 * @param {*} media (all personnels data and works about photographers)
 * @returns dataPhotographers: A table gathering all the article tags of the photographers on the index.html page
 * @returns identity: identity of selected photographers
 * @returns picture: image of selected photographers
 * @returns filtredPhotographers: array gathering all data of every photographers
 */
async function factoryObject(photographers, type,valeurId,media) {
  if (type === "photographers") {
    const dataPhographers = []
    //initialisation
    let tabIndex = 1

    photographers.forEach((photographer) => {
      tabIndex++
      //objet
      const photographerModel = photographerTemplate(photographer)
      //elementHTML article
      const userCardDOM = photographerModel.getUserCardDOM(tabIndex)
      //contains all articles elements html
      dataPhographers.push(userCardDOM)
    })
    return dataPhographers
  }
  else if (type === 'identity'){
    //objet identity et portfolio
    const myObjet = photographerHeader(photographers).getUserCardDOM()
    const { identity, picture } = myObjet
    // Retrieve all the works based on the photographer's ID
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
    console.log("nothing type founded")
  }
}
