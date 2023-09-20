/* eslint-disable no-unused-vars */
//Form Validation Section
const form = document.querySelector("#signUp")
const prenomInput = document.forms.formulaire.prenom
const nomInput = document.forms.formulaire.nom
const emailInput = document.forms.formulaire.email
const messageTextarea = document.forms.formulaire.message

//Modal Accessibility Management
const header = document.getElementById("head")
const main = document.getElementById("main")
const encart = document.getElementById("encart")
const modal = document.getElementById("contact_modal")
const openButton = document.getElementById("openButton")
const closeButton = document.querySelector("#closeButton")  /*boutton*/
const inputPrenom = document.getElementById('prenom')

//Real-time Form Field Correction.
var formulaire = document.getElementById("signUp");
var inputs = formulaire.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function () {
        checkSurname()
        checkName()
        checkEmail()
        checkMessage()
    })
}

//controls in Real-time input Field zone-text.
var area = document.getElementById("message");
area.addEventListener("input", function () {
    checkMessage()
})


/**
 * The first name must not be empty and should have at least 2 characters without any digits.
 * @returns true or false
 */
const checkSurname = () => {
    let valid = false
    const surName = prenomInput.value.trim()
    const regex = /^[A-Za-z][a-zA-ZÀ-ÖØ-öø-ÿ\s(--)]+$/
    const estValide = regex.test(surName)

    if (!isRequired(surName)) {
        showError(prenomInput, "Le prenom ne peut pas être vide")
    } else if (!estValide) {
        showError(nomInput, "Entrez un prénom valide")
    } else {
        showSuccess(prenomInput)
        valid = true
    }
    return valid
}

/**
 * The family name must not be empty and should have at least 2 characters without any digits.
 * @returns true or false
 */
const checkName = () => {
    let valid = false
    const name = nomInput.value.trim()
    const regex = /^[A-Za-z][a-zA-ZÀ-ÖØ-öø-ÿ\s(--)]+$/
    const estValide = regex.test(name);

    if (!isRequired(name)) {
        showError(nomInput, "Le nom ne peut pas être vide")
    } else if (!estValide) {
        showError(nomInput, "Entrez un nom de famille valide")
    } else {
        showSuccess(nomInput)
        valid = true
    }
    return valid
}

/**
 * Using a regex to match the email format (e.g., const result = /^hello/.test(string))
 * @returns true or false
 */
const checkEmail = () => {
    let valid = false
    const email = emailInput.value.trim()
    if (!isRequired(email)) {
        showError(emailInput, "l'email ne peut pas être vide")
    } else if (!isEmailValid(email)) {
        showError(emailInput, "Email non valide")
    } else {
        showSuccess(emailInput)
        valid = true
    }
    return valid
};

/**
 * Verify that the textarea is not empty.
 * @returns true or false
 */
const checkMessage = () => {
    let valid = false
    const message = messageTextarea.value.trim()
    if (!isRequired(message)) {
        showError(messageTextarea, "Votre message ne dois pas être vide");
    } else {
        showSuccess(messageTextarea)
        valid = true
    }
    return valid
}

/**
 * 
 * @param {*} email 
 * @returns The result of the test (false or true)
 */
const isEmailValid = (email) => {
    let emailRegExp = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]{2,}$/i
    return emailRegExp.test(email)
};

// If the value returns an empty string, then isRequired = false.
const isRequired = (value) => (value === "" ? false : true);

//Manage the display of the error
const showError = (input, message) => {
    // Retrieval of the parent element of the form
    const formField = input.parentElement
    // Adding the 'error' class.
    formField.classList.remove("success")
    formField.classList.add("error")

    // Sending the error message into the 'small' tag
    const error = formField.querySelector("small")
    error.style.color = "red"
    error.textContent = message
}

const showSuccess = (input) => {
    // Retrieving the parent element of the form
    const formField = input.parentElement

    // delete class error
    formField.classList.remove("error")
    formField.classList.add("success")

    // Hiding the error message in the 'small' tag.
    const error = formField.querySelector("small")
    error.textContent = ""
}

/**
 * Verification of the form's integrity
 * @returns The result of the verification (false or true)
 */

form.addEventListener("submit", function (event) {
    // Prevent form submission (page reload).
    event.preventDefault()

    // Field validation
    let isSurnameValid = checkSurname(),
        isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isMessageValid = checkMessage()

    let isFormValid =
        isSurnameValid &&
        isNameValid &&
        isEmailValid &&
        isMessageValid
   // check if the form is empty
   if (isFormValid) {
    console.log("OK");
    // next step : send the valid form to server
    // form.submit();
    //give the focus to cross
    closeButton.focus()
} else {
    console.log("Vous devez remplir le formulaire correctement !");
}
})

/**
 * setTimeout to wait for the element to receive focus.
 */
function closeModal() {
    // remove class "overlay" 
    const main = document.getElementById('main')
    main.classList.remove('overlay')
    modal.style.display = "none";
    header.setAttribute('aria-hidden', 'false')
    main.setAttribute('aria-hidden', 'false')
    encart.setAttribute('aria-hidden', 'false')
    modal.setAttribute('aria-hidden', 'true')
    setTimeout(() => {
        openButton.focus()
    }, 5)
}

function openModal() {
    // Add class "overlay" (role: put backward all elements)
    const main = document.getElementById('main')
    main.classList.add('overlay')
    modal.style.display = "block";
    header.setAttribute('aria-hidden', 'true')
    main.setAttribute('aria-hidden', 'true')
    encart.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-hidden', 'false')
    const nameHeader = document.querySelector("#contact-Name")
    const nameForm = document.querySelector("#main > div.photograph-header > article > h1").textContent
    nameHeader.textContent = nameForm
    setTimeout(() => {
        closeButton.focus()
    }, 5)
}

// Closing the modal with the keyboard's escape key
// window.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && modal.style.display === 'block') {
//         e.preventDefault()
//         closeModal()
//     }
// });









