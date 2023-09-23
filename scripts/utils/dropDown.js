/* eslint-disable no-unused-vars */
/**
 * Displaying the sorting box or removing it
 * create a dropdown, displaying or hidding an element when the user click on button.
*/
function showDropdown() {
  // toggle add or remove the class (show)
  document.getElementById("myDropdown").classList.toggle("show");
  const chevronDown = document.querySelector(".fa-chevron-down")
  const chevronUp = document.querySelector(".fa-chevron-up")
  console.log("showDropdown")
  if(chevronDown){
    chevronDown.classList.remove("fa-chevron-down");
    chevronDown.classList.add("fa-chevron-up") 
  }else{
    chevronUp.classList.remove("fa-chevron-up");
    chevronUp.classList.add("fa-chevron-down")
  }
}

/**
 * Cleaning the photo gallery and encart before displaying the page by (date/popularity/title) after sorting
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
 * Display the sorting type inside the button
 * @param {*} newText 
 */
function changeText(newText) {
  let dropComment = document.getElementById("Span-popularite");
  dropComment.textContent = newText;
}

