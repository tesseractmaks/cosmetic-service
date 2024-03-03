import { pIelements, aElements } from "./elements.js"
import { formInputElement } from "./form.js"
import { getSidebarProperties } from "./list-properties.js"


export async function sidebarAgent() {
    const divSidebar = document.createElement("div")
    divSidebar.classList.add("col-lg-4")
    divSidebar.classList.add("col-md-7")
    divSidebar.classList.add("sidebar")

    let authorCardElem = await authorCard()
    let contactFormCardElem = await contactFormCard()
    let relatedPropertiesElem = await relatedProperties()

    divSidebar.append(authorCardElem, contactFormCardElem, relatedPropertiesElem)

    return divSidebar
};


export async function authorCard() {

    let divAuthor = document.createElement("div")
    divAuthor.classList.add("author-card")

    let divAuthorImg = document.createElement("div")
    divAuthorImg.classList.add("author-img")
    divAuthorImg.classList.add("set-bg")
    divAuthorImg.setAttribute("data-setbg", "/src/img/author.jpg")
    divAuthorImg.setAttribute("style", `background-image: url(/src/img/author.jpg);`)

    let divAuthorInfo = document.createElement("div")
    divAuthorInfo.classList.add("author-info")

    let divAuthorH5 = document.createElement("h5")
    divAuthorH5.textContent = "Gina Wesley"

    let divAuthorP = document.createElement("p")
    divAuthorP.textContent = "Real Estate Agent"

    divAuthorInfo.append(divAuthorH5, divAuthorP)

    let divAuthorContact = document.createElement("div")
    divAuthorContact.classList.add("author-contact")

    let pPhone = pIelements("fa-phone", "(567) 666 121 2233")
    let pEnvelope = pIelements("fa-envelope", "ginawesley26@gmail.com")

    divAuthorContact.append(pPhone, pEnvelope)

    divAuthor.append(divAuthorImg, divAuthorInfo, divAuthorContact)
    return divAuthor
}


export async function contactFormCard() {

    let divContact = document.createElement("div")
    divContact.classList.add("contact-form-card")

    let divH5 = document.createElement("h5")
    divH5.textContent = "Do you have any question?"

    let formElem = document.createElement("form")

    let formInputName = formInputElement(
        "your-name",
        "",
        "text",
        "your-name",
        "Your name"
    )
    let formInputEmail = formInputElement(
        "your-email",
        "",
        "text",
        "your-email",
        "Your email"
    )
    let sendButton = document.createElement("button")
    sendButton.textContent = "SEND"

    let textArea = document.createElement("textarea")
    textArea.setAttribute("placeholder", "Your question")
    textArea.classList.add("input-form")


    textArea.style.minWidth = "270px"
    formInputName.style.minWidth = "270px"
    formInputName.style.padding = "0"
    formInputEmail.style.minWidth = "270px"
    formInputEmail.style.padding = "0"

    formInputName.querySelector("label").remove()
    formInputEmail.querySelector("label").remove()



    let block = document.createElement("div")
    block.classList.add("input-form-sidebar")
    block.style.minWidth = "270px"
    block.style.padding = "0"
    block.append(formInputName, formInputEmail, textArea, sendButton)


    formElem.append(block)

    divContact.append(divH5, formElem)

    return divContact
}

export async function relatedProperties() {
    let divProperties = document.createElement("div")
    divProperties.classList.add("related-properties")

    let propertyData = await getSidebarProperties();
    let divH2 = document.createElement("h2")
    divH2.textContent = "Related Property"
    divProperties.append(divH2)

    // console.log(propertyData)
    propertyData.slice(1, 4).forEach(function (element) {

        // for(let i=0; i < 4; i++){

     
        let divItem = document.createElement("div")
        divItem.classList.add("rp-item")

        let divPic = document.createElement("div")
        divPic.classList.add("rp-pic")
        divPic.classList.add("set-bg")

        divPic.setAttribute("data-setbg", `${element["photo"][0]}`)
        divPic.setAttribute("style", `background-image: url(${element["photo"][0]});`)

        let divSale = document.createElement("div")
        if (element["status"] == "sale") {
            divSale.classList.add("sale-notic")
            divSale.textContent = "FOR SALE"
        };
        if (element["status"] == "rent") {
            divSale.classList.add("rent-notic")
            divSale.textContent = "FOR RENT"
        };

        divPic.append(divSale)

        let divInfo = document.createElement("div")
        divInfo.classList.add("rp-info")

        let infoH5 = document.createElement("h5")
        infoH5.textContent = element["street"]

        let address = ` ${element["city"]}, ${element["state"]} ${element["postal_code"]}`

        let pAdr = pIelements("fa-map-marker", address)

        divInfo.append(infoH5, pAdr)

        let btn = aElements(element["id"], ["rp-price"], element["price"])

        divItem.append(divPic, divInfo, btn)


        divProperties.append(divItem)
        // };
    });

    return divProperties
};