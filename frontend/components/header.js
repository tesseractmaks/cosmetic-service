
import { ulAelement, pIelements, aIelements, Ielement } from "./elements.js"

export function headerTopLeft(main_site) {
    let topLeft = document.createElement("div")
    topLeft.classList.add("col-lg-6")
    topLeft.classList.add("header-top-left")
    let faClass;
    let textPart1;

    for (let i = 1; i < 3; i++) {
        let div = document.createElement("div")
        div.classList.add("top-info")
        // console.log(main_site)

        switch (i) {
            case 1: faClass = "fa-phone", textPart1 = " " + main_site["header"]["phone"]
                break
            case 2: faClass = "fa-envelope", textPart1 = " " + main_site["header"]["email"]
                break
        };
        let iElem = Ielement(faClass, textPart1)

        div.append(iElem)
        topLeft.append(div)
    };

    return topLeft
};

export function headerTopRight(main_site) {
    let topRight = document.createElement("div")
    topRight.classList.add("col-lg-6")
    topRight.classList.add("text-lg-right")
    topRight.classList.add("header-top-right")

    let topSocial = document.createElement("div")
    topSocial.classList.add("top-social")

    let links = main_site["header"]["socialLinks"]
    let faClass;

    for (let i = 0; i < links.length; i++) {
        switch (i) {
            case 0: faClass = "fa-facebook"
                break
            case 1: faClass = "fa-twitter"
                break
            case 2: faClass = "fa-instagram"
                break
            case 3: faClass = "fa-pinterest"
                break
            case 4: faClass = "fa-linkedin"
                break
        };

        let a = aIelements(links[i], faClass)
        topSocial.append(a)
    };

    let divUserPanel = document.createElement("div")
    // const auth =  registrationForm()
    // const login =  loginForm()
    // divUserPanel.append(auth, login)
    divUserPanel.classList.add("user-panel")
    let aRegister = aIelements("/registration", "fa-user-circle-o", " Register")
    
    let aLogin = aIelements("/login", "fa-sign-in", " Login")
    divUserPanel.append(aRegister, aLogin)

    

    // aLogin.addEventListener("click", async function (elem) {
    //     elem.preventDefault();
    //     router.navigate("/login")
    // });


    topRight.append(topSocial, divUserPanel)
    return topRight
};

export function mainMenu(main_site) {
    const divContainer = document.createElement("div")
    divContainer.classList.add("container")

    let divRow = document.createElement("div")
    divRow.classList.add("row")

    let divCol12 = document.createElement("div")
    divCol12.classList.add("col-12")

    let divNavbar = document.createElement("div")
    divNavbar.classList.add("site-navbar")

    let aLogo = document.createElement("a")
    aLogo.href = "/"
    aLogo.classList.add("site-logo")

    let imgLogo = document.createElement("img")
    imgLogo.setAttribute("src", "/src/img/logo.png")
    imgLogo.setAttribute("alt", "logo")
    aLogo.append(imgLogo)

    let divNaSwich = document.createElement("div")
    divNaSwich.classList.add("nav-switch")
    let i = Ielement("fa-bars")
    divNaSwich.append(i)

    let links = main_site["header"]["mainMenu"]
    let ulMenu = ulAelement("main-menu", links)

    divNavbar.append(aLogo, divNaSwich, ulMenu)
    divCol12.append(divNavbar)
    divRow.append(divCol12)
    divContainer.append(divRow)
    return divContainer
};


export async function getHeader(main_site) {
    // let main_site = await mainSite()

    const headerElement = document.createElement("header")
    headerElement.classList.add("header-section")

    let divHeader = document.createElement("div")
    divHeader.classList.add("header-top")

    let divContainerHeader = document.createElement("div")
    divContainerHeader.classList.add("container")

    let divRowHeader = document.createElement("div")
    divRowHeader.classList.add("row")

    const headerLeft = headerTopLeft(main_site)
    const headerRight = headerTopRight(main_site)
    const headerMainMenu = mainMenu(main_site)

    divRowHeader.append(headerLeft, headerRight)
    divContainerHeader.append(divRowHeader)
    divHeader.append(divContainerHeader, headerMainMenu)
    headerElement.append(divHeader)
    
    return headerElement
};