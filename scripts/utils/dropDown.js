/* eslint-disable no-unused-vars */
/**
 * Displaying the sorting box
 */
function showDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

/**
 * Cleaning the photo gallery before displaying it by (date/popularity/title)
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
 * Display the sorting type in the button
 * @param {*} newText 
 */
function changeText(newText) {
  var dropComment = document.getElementById("dropComment");
  dropComment.textContent = newText;
}