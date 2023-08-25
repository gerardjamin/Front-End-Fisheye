/* eslint-disable no-unused-vars */
//partie vérification du formulaire
const form = document.querySelector("#signUp")
const prenomInput = document.forms.formulaire.prenom;
const nomInput = document.forms.formulaire.nom;
const emailInput = document.forms.formulaire.email;
const messageTextarea = document.forms.formulaire.message;

//correction en temps reel des champs du formulaire
var formulaire = document.getElementById("signUp");
var inputs = formulaire.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function () {
        checkSurname()
        checkName()
        checkEmail()
        checkMessage()
    });
}

//correction en temps reel de la zone areatext
var area = document.getElementById("message");
area.addEventListener("input", function () {
    checkMessage()
});


/**
 * le prénom ne doit pas etre vide et avoir au moins 2 caractères sans chiffre
 * @returns valid
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
        valid = true;
    }
    return valid
}

/**
 * utilisation d'une regex pour comparer le format type mail (ex:const resultat = /^coucou/.test(chaine))
 * @returns valid
 */
const checkEmail = () => {
    let valid = false;
    const email = emailInput.value.trim();
    if (!isRequired(email)) {
        showError(emailInput, "l'email ne peut pas être vide");
    } else if (!isEmailValid(email)) {
        showError(emailInput, "Email non valide");
    } else {
        showSuccess(emailInput);
        valid = true;
    }
    return valid
};

/**
 * verifie que la zone areatext ne soit pas vide
 * @returns valid
 */
const checkMessage = () => {
    let valid = false
    const message = messageTextarea.value.trim()
    if (!isRequired(message)) {
        showError(messageTextarea, "Votre message ne dois pas être vide");
    } else {
        showSuccess(messageTextarea);
        valid = true
    }
    return valid
}

/**
 * 
 * @param {*} email 
 * @returns le resultat du test (false ou true)
 */
const isEmailValid = (email) => {
    let emailRegExp = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]{2,}$/i
    return emailRegExp.test(email);
};

// Si la value retourne une chaine de caractére vide alors isRequired = false
const isRequired = (value) => (value === "" ? false : true);

//gère l'affichage de l'erreur
const showError = (input, message) => {
    // Récupération de l'élément parent de formulaire
    const formField = input.parentElement;
    // ajout de la classe error
    formField.classList.remove("success");
    formField.classList.add("error");

    // envoie le message d'erreur dans la balise small
    const error = formField.querySelector("small");
    error.style.color = "red";
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

/**
 * verification de l'intégrité du formulaire
 * @returns le resultat de la vérification (false ou true)
 */
form.addEventListener("submit", function (event) {
    // empécher l'envois du formulaire(le rechargement de la page)
    event.preventDefault();

    // validation des champs
    let isSurnameValid = checkSurname(),
        isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isMessageValid = checkMessage()

    let isFormValid =
        isSurnameValid &&
        isNameValid &&
        isEmailValid &&
        isMessageValid

    return isFormValid
})

//gestion de la modale en matiere d'accessibilité
const header = document.getElementById("head")
const main = document.getElementById("main")
const encart = document.getElementById("encart")
const modal = document.getElementById("contact_modal")
const openButton = document.getElementById("openButton")
const closeButton = document.querySelector("#closeButton")  /*boutton*/
const inputPrenom = document.getElementById('prenom')

/**
 * setTimeout pour attendre la mise en focus de l'element
 */
function closeModal() {
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
    modal.style.display = "block";
    header.setAttribute('aria-hidden', 'true')
    main.setAttribute('aria-hidden', 'true')
    encart.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-hidden', 'false')
    setTimeout(() => {
        // inputPrenom.focus()
        closeButton.focus()
    }, 5)
}

// fermeture de la modale avec la touche escape du clavier
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        e.preventDefault()
        closeModal()
    }
});









