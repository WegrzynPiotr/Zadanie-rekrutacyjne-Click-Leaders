
import "core-js"
import "regenerator-runtime/runtime"
const inputs = document.querySelectorAll("input");
const form = document.getElementById("form");
const submitBtn = document.getElementById("form__button");
submitBtn.setAttribute("disabled", true)
submitBtn.style.cursor = "not-allowed"
let isModal = false;
let markup = ''
let message = "";


const createModal = (...texts) => {

    const modalEl = document.createElement('div');
    const closeBtn = document.createElement("div");
    closeBtn.textContent = "X";
    closeBtn.id = "modal__close"

    modalEl.id = "modal__visible";
    texts.forEach(text => markup = text)
    modalEl.innerHTML = `
    Aby potwierdzić formularz popraw: <br> ${markup}
    `
    if (isModal == true) {
        return;
    }
    isModal = true;
    document.body.appendChild(modalEl);
    modalEl.appendChild(closeBtn);
    closeBtn.addEventListener("click", closeModal)
}

function closeModal() {
    isModal = false;
    markup = ''
    const mod = document.getElementById("modal__visible")
    if (mod)
        mod.remove()
    message = ""
}


const checkName = (input) => {
    let result = /^[a-zA-Z ]+$/.test(input);
    return result;
}

const checkEmail = (input) => {
    let result = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input)
    return result
}

const checkPassword = (input) => {
    let result = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{7,}$/.test(input)
    return result;

}


inputs.forEach(input => {
    input.addEventListener("input", (e) => {
        let namePassed = false;
        let surnamePassed = false;
        let emailPassed = false;
        let passwordPassed = false

        
        if (e.target.placeholder == "Imię") {
            if (checkName(e.target.value))
                namePassed = true;
            else showMessage("Imię")
        }

        if (e.target.placeholder == "Nazwisko") {
            if (checkName(e.target.value))
                surnamePassed = true;
            else showMessage("Nazwisko")
        }

        if (e.target.placeholder == "Email") {
            if (checkEmail(e.target.value))
                emailPassed = true;
            else showMessage("Email")
        }

        if (e.target.placeholder == "Hasło") {
            if (checkPassword(e.target.value)) {
                console.log(e.target.value)
                passwordPassed = true;
            }
            else showMessage("Email")
        }


        if (namePassed && surnamePassed && emailPassed && passwordPassed) {
            allowSubmit();
        }

    })
})

const showMessage = (validateType) => {
    if (validateType == "Imię") {
        message += "W imieniu możesz używać tylko liter!<br>"
    }

    if (validateType == "Nazwisko") {
        message += "W nazwisku możesz używać tylko liter!<br>"

    }

    if (validateType == "Email") {
        message += "Błędny Email!<br>"

    }

    if (validateType == "Hasło") {
        message += "Hasło musi zawierać min. 7 znaków, wielką literę, małą literę i znak specjalny<br>"

    }
    createModal(message)
}
const allowSubmit = () => {
    submitBtn.setAttribute("disabled", false)
    submitBtn.style.cursor = "cursor"
    message = ""
    markup = ""
}