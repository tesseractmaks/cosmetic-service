// Clients section 

export async function clientsSection(main_site) {

    let element = main_site["clients"]
    const sectionSlider = document.createElement("section")
    sectionSlider.classList.add("clients-section")

    let containerSlider = document.createElement("div")
    containerSlider.classList.add("container", "clients-container")


    let clientsSlider = document.createElement("div")

    clientsSlider.classList.add("clients-slider")
    element.forEach(function (elem, idx) {
        let span = document.createElement("span")
        let link = document.createElement("a")
        link.setAttribute("href", "https://ya.ru")
        let img = document.createElement("img")
        img.setAttribute("src", `/src/img/partner/${idx + 1}.png`)
        // img.setAttribute("src", elem)
        img.setAttribute("alt", "client")
        span.classList.add("clients-img")

        link.append(img)
        span.append(link)
        clientsSlider.append(span)

    });
    containerSlider.append(clientsSlider)
    sectionSlider.append(containerSlider)
    return sectionSlider
};