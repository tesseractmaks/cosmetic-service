
export async function heroSectionDetail() {
    const section = document.createElement("section")
    section.classList.add("page-top-section", "set-bg")
    section.setAttribute("data-setbg", "/src/img/page-top-bg.jpg")
    section.setAttribute("style", "background-image: url(/src/img/page-top-bg.jpg);")

    let container = document.createElement("div")
    container.classList.add("container", "text-white")

    let h2 = document.createElement("h2")

    h2.textContent = "Detail- ???"
    container.append(h2)
    section.append(container)
    return section
};