import { clientsSection } from "./clients-slider.js"

// Footer section

export async function footerSection(main_site) {

    let element = main_site["footer"]
    let footer = document.createElement("footer")
    footer.classList.add("footer-section", "set-bg")
    footer.setAttribute("data-setbg", "/src/img/footer-bg.jpg")
    footer.setAttribute("style", "background-image: url(/src/img/footer-bg.jpg)")

    let footerContainer = document.createElement("div")
    footerContainer.classList.add("container")

    let rowElement = document.createElement("div")
    rowElement.classList.add("row")



    for (let idx = 0; idx < 4; idx++) {
        let divCol = document.createElement("div")
        divCol.classList.add("col-lg-3")
        divCol.classList.add("col-md-6")
        divCol.classList.add("footer-widget")

        if (idx == 0) {

            let img = document.createElement("img")
            let aimg = document.createElement("a")
            aimg.href = "/"
            img.setAttribute("src", "/src/img/logo.png")
            img.setAttribute("alt", "logo")
            aimg.append(img)

            let p = document.createElement("p")
            p.textContent = element["p"]
            let divLinks = document.createElement("div")
            divLinks.classList.add("social")

            element["socialLinks"].forEach(function (elem, idx) {

                let a = document.createElement("a")
                a.setAttribute("href", elem)
                let i = document.createElement("i")
                i.classList.add("fa")
                if (idx == 0) { i.classList.add("fa-facebook") }
                if (idx == 1) { i.classList.add("fa-twitter") }
                if (idx == 2) { i.classList.add("fa-instagram") }
                if (idx == 3) { i.classList.add("fa-pinterest") }
                if (idx == 4) { i.classList.add("fa-linkedin") }
                a.append(i)
                divLinks.append(a)
            });
            divCol.append(aimg, p, divLinks)
        };
        rowElement.append(divCol)

        if (idx == 1) {

            let divContact = document.createElement("div")
            divContact.classList.add("contact-widget")

            let h5 = document.createElement("h5")
            h5.classList.add("fw-title")
            h5.textContent = "CONTACT US"
            divContact.append(h5)

            element["contacts"].forEach(function (elem, idx) {
                let p = document.createElement("p");
                let i = document.createElement("i")
                i.classList.add("fa")
                if (idx == 0) {
                    p.textContent = elem
                    i.classList.add("fa-map-marker")
                };
                if (idx == 1) {
                    p.textContent = elem
                    i.classList.add("fa-phone")
                };
                if (idx == 2) {
                    p.textContent = elem
                    i.classList.add("fa-envelope")
                };
                if (idx == 3) {
                    p.textContent = elem
                    i.classList.add("fa-clock-o")
                };
                p.prepend(i)
                divContact.append(p)
            });
            divCol.prepend(divContact)
        };


        if (idx == 2) {

            let divDouble = document.createElement("div")
            divDouble.classList.add("double-menu-widget")

            let h5 = document.createElement("h5")
            h5.classList.add("fw-title")
            h5.textContent = "POPULAR PLACES"
            divDouble.append(h5)

            let ul = document.createElement("ul")

            element["popularPlacesLinks"][0].forEach(function (elem, idx) {
                let li = document.createElement("li");
                let a = document.createElement("a");
                a.setAttribute("href", "https://ya.ru")
                a.textContent = elem["title"]
                li.append(a)

                ul.append(li)
            });
            divDouble.append(ul)
            let ul2 = document.createElement("ul")

            element["popularPlacesLinks"][1].forEach(function (elem, idx) {
                let li = document.createElement("li");
                let a = document.createElement("a");
                a.setAttribute("href", "https://ya.ru")
                a.textContent = elem["title"]
                li.append(a)

                ul2.append(li)
            });
            divDouble.append(ul2)
            divCol.append(divDouble)
        };
        rowElement.append(divCol)

        if (idx == 3) {

            let divNewslatter = document.createElement("div")
            divNewslatter.classList.add("newslatter-widget")

            let h5 = document.createElement("h5")
            h5.classList.add("fw-title")
            h5.textContent = "NEWSLETTER"

            let p = document.createElement("p")
            p.textContent = "Subscribe your email to get the latest news and new offer also discount"
            let form = document.createElement("form")
            form.classList.add("footer-newslatter-form")
            let input = document.createElement("input")
            input.setAttribute("type", "text")
            input.setAttribute("placeholder", "Email address")
            let button = document.createElement("button")
            let i = document.createElement("i")
            i.classList.add("fa")
            i.classList.add("fa-send")
            button.append(i)
            form.append(input, button)
            divNewslatter.append(h5, p, form)
            divCol.append(divNewslatter)

        };
        rowElement.append(divCol)



    };

    const clients = await clientsSection(main_site)
    const bottom = await footerBottom(main_site)


    footerContainer.append(rowElement, bottom)
    footer.append(clients, footerContainer)
    return footer
};


async function footerBottom(main_site) {

    let element = main_site["footer"]

    let divBottom = document.createElement("div")
    divBottom.classList.add("footer-bottom")

    let nav = document.createElement("div")
    nav.classList.add("footer-nav")

    let divCopyright = document.createElement("div")
    divCopyright.classList.add("copyright")

    let p = document.createElement("p")
    p.innerHTML = `Copyright &copy ${new Date().getFullYear()} All rights reserved `
    divCopyright.append(p)
    let ul = document.createElement("ul")

    element["footerBottom"].forEach(function (elem, idx) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("href", "/src/img/logo.png")
        // a.setAttribute("href", elem["link"])
        a.textContent = elem["text"]
        li.append(a)
        ul.append(li)
    });
    nav.append(ul)
    divBottom.append(nav, divCopyright)
    return divBottom
};
