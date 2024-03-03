// Services section

export async function servicesSection(main_site) {
    let element = main_site["servicesSection"]
    // console.log(main_site)
    const sectionServices = document.createElement("section")
    sectionServices.classList.add("services-section", "spad", "set-bg")
    sectionServices.setAttribute("data-setbg", "/src/img/service-bg.jpg")
    sectionServices.setAttribute("style", "background-image: url(/src/img/service-bg.jpg);")

    let containerServices = document.createElement("container")
    containerServices.classList.add("container")

    let rowServices = document.createElement("div")
    rowServices.classList.add("row")

    let col6Services = document.createElement("div")
    col6Services.classList.add("col-lg-6")


    let img = document.createElement("img")
    // img.setAttribute("src", element["image"])
    img.setAttribute("src", "/src/img/service.jpg")
    img.setAttribute("alt", "service")
    col6Services.append(img)

    let col5Services = document.createElement("div")
    col5Services.classList.add("col-lg-5", "offset-lg-1", "pl-lg-0")

    let textServices = document.createElement("div")
    textServices.classList.add("section-title", "text-white")

    let h3Serv = document.createElement("h3")
    let pServ = document.createElement("p")
    h3Serv.textContent = element["h3"]
    pServ.textContent = element["p"]
    textServices.append(h3Serv, pServ)

    let servicesServices = document.createElement("div")
    servicesServices.classList.add("services")

    element["serviceItems"].forEach(function (element, idx) {
        let divServ = document.createElement("div")
        divServ.classList.add("service-item")
        let iServ = document.createElement("i")
        iServ.classList.add("fa")
        if (idx == 0) { iServ.classList.add("fa-comments") }
        if (idx == 1) { iServ.classList.add("fa-home") }
        if (idx == 2) { iServ.classList.add("fa-briefcase") }
        divServ.append(iServ)
        let div2 = document.createElement("div")
        let h5Serv = document.createElement("h5")
        let p2 = document.createElement("p")

        h5Serv.textContent = element["h5"]
        p2.textContent = element["p"]
        div2.classList.add("service-text")
        div2.append(h5Serv, p2)
        divServ.append(div2)
        servicesServices.append(divServ)
    });

    col5Services.append(textServices, servicesServices)
    rowServices.append(col6Services, col5Services)
    containerServices.append(rowServices)
    sectionServices.append(containerServices)
    return sectionServices
};