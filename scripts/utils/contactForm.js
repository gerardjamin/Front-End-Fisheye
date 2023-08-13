/* eslint-disable no-unused-vars */
//partie verification formulaire
const form = document.querySelector("#signUp")
const prenomInput = document.forms.formulaire.prenom;
const nomInput = document.forms.formulaire.nom;
const emailInput = document.forms.formulaire.email;
const messageTextarea = document.forms.formulaire.message;

//correction en temps reel du formulaire
var formulaire = document.getElementById("signUp");
var inputs = formulaire.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("blur", function(event) {
        checkSurname()
        checkName()
        checkEmail()
    });
}

/**
 * le prénom ne doit pas etre vide et avoir au moins 2 caractères sans chiffre
 * @returns valid
 */
const checkSurname = () => {
    let valid = false
    const surName = prenomInput.value
    const regex = /^[A-Za-z][a-zA-ZÀ-ÖØ-öø-ÿ\s(--)]+$/
    const estValide = regex.test(surName)

    if (!isRequired(surName)) {
        showError(prenomInput, "Le prenom ne peut pas être vide")
    } else if (!estValide) {
        showError(nomInput, "Entrez un prénom valide")
    } else {
        showSuccess(prenomInput);
        valid = true;
    }
    return valid;
}

/**
 * le nom de famille ne doit pas etre vide et avoir au moins  2 caractères sans chiffre
 * @returns valid
 */
const checkName = () => {
    let valid = false;
    const name = nomInput.value;
    const regex = /^[A-Za-z][a-zA-ZÀ-ÖØ-öø-ÿ\s(--)]+$/;
    const estValide = regex.test(name);

    if (!isRequired(name)) {
        showError(nomInput, "Le nom ne peut pas être vide");
    } else if (!estValide) {
        showError(nomInput, "Entrez un nom de famille valide");
        } else  {
        showSuccess(nomInput);
        valid = true;
    }
    return valid;
}

/**
 * utilisation d'une regex pour comparer le format type mail (ex:const resultat = /^coucou/.test(chaine))
 * @returns valid
 */
const checkEmail = () => {
    let valid = false;
    const email = emailInput.value.trim();
    if (!isRequired(email)) {
        showError(emailInput, "l'email ne peut etre vide");
    } else if (!isEmailValid(email)) {
        showError(emailInput, "Email non valide");
    } else {
        showSuccess(emailInput);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    return emailRegExp.test(email); 
};

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


form.addEventListener("submit", function (event) {
    // empécher l'envois du formulaire(le rechargement de la page)
    event.preventDefault();
  
    // validation des champs
    let isSurnameValid = checkSurname(),
        isNameValid = checkName(),
        isEmailValid = checkEmail()

    let isFormValid =
        isSurnameValid &&
        isNameValid &&
        isEmailValid

        return isFormValid
})




































function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}


