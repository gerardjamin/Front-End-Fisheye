/* eslint-disable no-unused-vars */
//partie verification formulaire
const form = document.querySelector("#signUp")
const prenomInput = document.forms.formulaire.prenom;
const nomInput = document.forms.formulaire.nom;
const emailInput = document.forms.formulaire.email;
const messageTextarea = document.forms.formulaire.message;



//declaration des fonctions

const checkSurname = () => {
    let valid = false;
    const surName = prenomInput.value.trim();

    if (!isRequired(surName)) {
        showError(prenomInput, "Le prenom ne peut pas être vide");
    } else {
        showSuccess(prenomInput);
        valid = true;
    }
    return valid;
}

const checkName = () => {
    let valid = false;
    const name = nomInput.value.trim();

    if (!isRequired(name)) {
        showError(nomInput, "Le nom ne peut pas être vide");
    } else {
        showSuccess(nomInput);
        valid = true;
    }
    return valid;
}
// Si la value retourne une chaine de caractére vide alors isRequired = false
const isRequired = (value) => (value === "" ? false : true);

const showError = (input, message) => {
    // Récupération de l'élément parent de formulaire
    const formField = input.parentElement;
    // ajout de la classe error
    formField.classList.remove("success");
    formField.classList.add("error");

    // voir le message d'erreur dans la balise small
    const error = formField.querySelector("small");
    error.textContent = message;
}

const showSuccess = (input) => {
    // Récupération de l'élément parent de formulaire
    const formField = input.parentElement;

    // supprimer la classe error
    formField.classList.remove("error");
    formField.classList.add("success");

    // cacher le message d'erreur dans la balise small
    const error = formField.querySelector("small");
    error.textContent = "";
}


form.addEventListener("submit", function (e) {
    // empécher l'envois du formulaire(le rechargement de la page)
    e.preventDefault();
  
    // validation des champs
    let isSurnameValid = checkSurname(),
        isNameValid = checkName()


    let isFormValid =
        isSurnameValid &&
        isNameValid 

        console.log(isFormValid)
})




































function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}


