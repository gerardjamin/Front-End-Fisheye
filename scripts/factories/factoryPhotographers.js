/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
async function factoryObject(photographers, type) {
  if (type === "photographers") {
    /*eslint no-undef: "error"*/
    const dataPhographers = [];
    photographers.forEach((photographer) => {
      //call 2 functions)()
      const photographerModel = photographerTemplate(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      dataPhographers.push(userCardDOM);
    });
    return dataPhographers;
  }
  // eslint-disable-next-line no-empty
  else if (type === "videos") {
    return dataVideo
  }

  // eslint-disable-next-line no-empty
  else {
  }
}
