
import "core-js"
import "regenerator-runtime/runtime"
const inputs = [...document.querySelectorAll("input")];
const form = document.getElementById("form");
const submitBtn = document.getElementById("form__button");
const checkbox = document.getElementById("form__checkbox")

let isModal = false;
let markup = ''
let message = "";
let isFill = false;
let ischecked = false;
let p1 = null
let p2 = null
let p3 = null
let p4 = null
let p5 = null
const disallowSubmit = () => {
    submitBtn.setAttribute("disabled", "")
    submitBtn.style.cursor = "not-allowed"
}

disallowSubmit()

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
            if (checkName(e.target.value)){
                namePassed = true;
                p1 = namePassed
            }
            else showMessage("Imię")
        }

        if (e.target.placeholder == "Nazwisko") {
            if (checkName(e.target.value)){
                surnamePassed = true;
                p2 = surnamePassed
            }
            else showMessage("Nazwisko")
        }

        if (e.target.placeholder == "Email") {

            if (checkEmail(e.target.value)) {
                emailPassed = true;
                p3 = emailPassed
            }
            else showMessage("Email")
        }


        if (e.target.placeholder == "Hasło") {
            if (checkPassword(e.target.value)) {
                passwordPassed = true;
                p4 = passwordPassed
            } else showMessage("Hasło")
        }

        if (namePassed || surnamePassed || emailPassed || passwordPassed) {
            closeModal()
        }
        if(p1 &&p2 &&p3 &&p4 && checkbox.checked){
            allowSubmit()
        }else{
            disallowSubmit()
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
    submitBtn.removeAttribute("disabled")
    submitBtn.style.cursor = "pointer"
    message = ""
    markup = ""
}


