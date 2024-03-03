
export function heroSection(main_site) {
    const section = document.createElement("section")
    section.classList.add("hero-section", "set-bg")
    section.setAttribute("data-setbg", "/src/img/bg.jpg")
    section.setAttribute("style", "background-image: url(/src/img/bg.jpg);")

    let container = document.createElement("div")
    container.classList.add("container", "hero-text", "text-white")

    let h2 = document.createElement("h2")
    let p = document.createElement("p")
    let link = document.createElement("a")

    let element = main_site["hero"]
    h2.textContent = element["h2"]
    p.textContent = element["p"]
    link.classList.add("site-btn")
    link.href = element["button"]["link"]
    link.textContent = element["button"]["text"]
    container.append(h2, p, link)
    section.append(container)
    return section
};