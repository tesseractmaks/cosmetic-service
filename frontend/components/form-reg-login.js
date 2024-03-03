import { formElement, formInputElement } from "../components/form.js"
import { anyElement, buttonElement, aElements } from "../components/elements.js"
import { router } from "../../index.js"

export async function registrationForm() {
    const mainDiv =  anyElement("div", ["modal"])
    const formDiv =  anyElement("div", ["modal__box"])
    const mainh3 =  anyElement("h3")
    mainh3.textContent = "регистрация"

    const formBtn = await buttonElement("регистрация", ["btn-reg"], "reg-Btn")

    const formElem = formElement(formBtn, ["reg-form"])

    const usernameInput = formInputElement(
        "reg-username",
         "",
         "text",
         "username",
         "username",
         "one@mail.ru1"
         )


    const passwordInput = formInputElement(
    "reg-password",
        "",
        "text",
        "password",
        "password",
        "qwerty"
        )

    const passwordReInput = formInputElement(
        "reg-password-re",
            "",
            "text",
            "password-re",
            "re-password",
            "qwerty"
            )


    formElem.prepend(usernameInput, passwordInput, passwordReInput)

    formDiv.append(mainh3, formElem)
    mainDiv.append(formDiv)

    return mainDiv
}


export async function loginForm() {
    const mainDiv = await anyElement("div", ["modal"])
    const formDiv = await anyElement("div", ["modal__box"])
    const mainh3 = await anyElement("h3")
    mainh3.textContent = "вход"

    const formBtn = await buttonElement("вход", ["btn-reg"], "reg-Btn")

    const formElem = formElement(formBtn, ["reg-form"])

    const usernameInput = formInputElement(
        "login-username",
         "",
         "text",
         "username",
         "username"
         )

    const passwordInput = formInputElement(
    "login-password",
        "",
        "text",
        "password",
        "password"
        )


    formElem.prepend(usernameInput, passwordInput)

    formDiv.append(mainh3, formElem)
    mainDiv.append(formDiv)

    return mainDiv
}
