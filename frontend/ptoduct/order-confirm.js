import { anyElement, buttonElement, aElements, imgElement } from "../components/elements.js"

let ws = new WebSocket("wss://api-cosmetic.tesseractmaks.tech/api/v1/orders/ws/2")


export async function orderConfirm() {


    let testOrder = [
        {
            "title": "заказ принят",
            "confId": "conf-1",
        },
        {
            "title": "заказ формируется",
            "confId": "conf-2",
        },
        {
            "title": "заказ передан на доставку",
            "confId": "conf-3",
        },
        {
            "title": "курьер направляется к вам",
            "confId": "conf-4",
        },

    ]

    let elemDom = document.querySelector("#dle-content")
    elemDom.innerHTML = ""


    const mainDiv = anyElement("div", ["order-body"], "", "tr")

    let ulElem = await ulAelementConfirm(testOrder)

    ws.onmessage = async function (evt) {
        let recived_msg = await evt.data
        console.log(recived_msg, "=------=")
        if (recived_msg.slice(-1) == 5) {
            let li = done()
            ulElem.append(li)
        }
        // mainDiv.append(ulElem)
        // elemDom.append(mainDiv)
    }


    mainDiv.append(ulElem)
    elemDom.append(mainDiv)


    // Confirm buttons event
    // console.log(mainDiv)
    await xz()



    return elemDom
}

orderConfirm()



async function xz() {
    let buttonBlock = await document.getElementsByClassName("div-descr-cnf")
    // let buttonElem = buttonBlock.getElementsByTagName("button")
    // let ws = new WebSocket("ws://127.0.0.1:8000/api/v1/orders/ws/2")


    Array.from(buttonBlock).forEach(function (element, index) {


        let buttonElem = element.getElementsByTagName("button")
        // console.log(buttonElem[0])

        if (index == 0) {
            buttonElem[0].removeAttribute('disabled')
            buttonElem[0].classList.remove("confirm-btn-disable")
        }
        let ws = new WebSocket("wss://api-cosmetic.tesseractmaks.tech/api/v1/orders/ws/2")


        buttonElem[0].addEventListener("click", async function (e) {
            if(ws){


            e.preventDefault()
            let idx = buttonElem[0].id.slice(-1)
            setTimeout(wSocket(ws, idx), 1200)
            // console.log(buttonElem[0].id)
            buttonElem[0].setAttribute('disabled', 'true')
            buttonElem[0].classList.add("confirm-btn-disable")


            try {
                let buttonElemF = Array.from(buttonBlock)[index + 1].getElementsByTagName("button")
                buttonElemF[0].removeAttribute('disabled')
                buttonElemF[0].classList.remove("confirm-btn-disable")

            }
            catch (err) { }
        }

            // let topic = buttonElem[0].id
            // let response = await fetch(`http://127.0.0.1:8000/api/v1/orders/topic/${topic}/`);
            // const eventData = await response.json();
            // console.log(eventData) 

            // document.addEventListener("onload", wSocket)

        })
    })


}



function wSocket(ws, idx) {
    // if("WebSocket" in window){


    // ws.onopen = function() {
    //     console.log("open - Websockett!!!!!!!!11")
    // }



    ws.send(idx)

    // const orderT = await orderTrack(4)
    // catalogProducts([], null, orderT)


    ws.onclose = function () {
        console.log("Close  -  Websockett!!!!!!!!11")
    }
    // }


}

function ulAelementConfirm(collection = []) {
    let ul = document.createElement("ul")

    collection.forEach(async function (element, index) {
        let li = document.createElement("li")
        li.classList.add("order-item")
        let aDiv = anyElement("div")
        let spanDiv = anyElement("div")
        let buttonTr = await buttonElement("выполнить", ["confirm-btn"], element["confId"])
        buttonTr.setAttribute('disabled', 'true')
        buttonTr.classList.add("confirm-btn-disable")

        let titleS = anyElement("span", ["text-descr-cnf"], element["title"])


        titleS.setAttribute("data-detail", "detail")
        spanDiv.setAttribute("data-detail", "detail")

        let img = await imgElement(element["img"])
        img.setAttribute("data-detail", "detail")
        spanDiv.classList.add("div-descr-cnf")
        spanDiv.append(titleS, buttonTr)

        aDiv.append(spanDiv)

        li.append(aDiv)
        ul.append(li)


    });
    return ul
}

function done() {
    let li = document.createElement("li")
    li.classList.add("order-item")
    let aDiv = anyElement("div")
    let titleS = anyElement("span", ["text-descr-cnf"], "заказ получен")
    let spanDiv = anyElement("div")

    spanDiv.classList.add("div-descr-cnf")
    spanDiv.classList.add("done-block")
    titleS.classList.add("done-text")
    spanDiv.append(titleS)

    aDiv.append(spanDiv)
    li.append(aDiv)
    return li
}





