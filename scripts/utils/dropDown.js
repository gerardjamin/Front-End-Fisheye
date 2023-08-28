/* eslint-disable no-unused-vars */
/**
 * apparition de la box filtrage
 */
function showDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

/**
 * nettoyage de la gallerie photo avant affichage par (date/popularité/titre)
 */
function cleanUp() {
  const portofolio = document.querySelectorAll(".portfolio_section article")
  const encart = document.querySelector(".encartLike")
  encart.remove()
  for (let element of portofolio) {
    element.remove()
  }
}

/**
 * affiche le type de trie dans le boutton
 * @param {*} newText 
 */
function changeText(newText) {
  var dropComment = document.getElementById("dropComment");
  dropComment.textContent = newText;
}