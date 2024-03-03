import { anyElement, buttonElement, aElements, imgElement } from "../components/elements.js"


export async function ordersNode() {

    let testOrder = [
        {
            "title": "Silk Pillow Case",
            "price": `${180} rub`,
            "qty": `qty: ${2}`,
            "img": "../uploads/posts/2021-05/1621440923_product-941847-0-productpagedesktop.jpg"
        }
    ]

    const maimDiv = anyElement("div", ["order-body"])

    // let btn = await buttonElement()

    let ulElem = ulAelement(testOrder)
    maimDiv.append(ulElem)

    return maimDiv
}


function ulAelement(collection=[]) {
    let ul = document.createElement("ul")
    // ul.classList.add(ulClass)

    collection.forEach(async function (element, index) {
        let li = document.createElement("li")
        li.classList.add("order-item")
        let aDiv = anyElement("div")
        let spanDiv = anyElement("div")
        // let imgDiv = anyElement("div")
    
        let a = document.createElement("a")
        let titleS = anyElement("span", ["text-descr"], element["title"])
        let priceS = anyElement("span", ["text-descr"], element["price"])
        let qtyS = anyElement("span", ["text-descr"], element["qty"])
        qtyS.setAttribute("data-detail", "detail")
        priceS.setAttribute("data-detail", "detail")
        titleS.setAttribute("data-detail", "detail")
        spanDiv.setAttribute("data-detail", "detail")

        a.href = "#"
       
        a.textContent = element["text"]
        let img = await imgElement(element["img"])
        img.setAttribute("data-detail", "detail")
        spanDiv.append(titleS, priceS, qtyS)
        a.append(img, spanDiv)
        a.setAttribute("data-detail", "detail")
        aDiv.append(a)
        

        li.append(aDiv)
        ul.append(li)
    });
    return ul
};


