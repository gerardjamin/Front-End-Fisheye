/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
// eslint-disable-next-line no-empty
async function factoryObject(photographers, type) {
  if (type === "photographers") {
    const dataPhographers = []
    photographers.forEach((photographer) => {
      //call 2 functions)()
      const photographerModel = photographerTemplate(photographer)
      const userCardDOM = photographerModel.getUserCardDOM()
      dataPhographers.push(userCardDOM)
    });
    return dataPhographers
  }
  
  else if (type === "videos") {
    const dataVideo =[]

    return dataVideo
  }

  // eslint-disable-next-line no-empty
  else {
  }
}
