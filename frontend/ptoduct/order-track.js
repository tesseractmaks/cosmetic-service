import { anyElement, buttonElement, aElements, imgElement } from "../components/elements.js"
let  ws = new WebSocket("wss://api-cosmetic.tesseractmaks.tech/api/v1/orders/ws/1")

// let  ws = new WebSocket("ws://127.0.0.1:8000/api/v1/orders/ws/1")
export async function orderTrack(idx = 1) {
//    let  ws = new WebSocket("wss://api-cosmetic.tesseractmaks.tech/api/v1/orders/ws/1")
    
   
    let dateNow = new Date()
    let testOrder = [
        {
            "title": "курьер направляется к вам",
            "date": `${dateNow.getFullYear()}.${dateNow.getMonth()}.${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}`,
        },
        {
            "title": "заказ передан на доставку",
            "date": `${dateNow.getFullYear()}.${dateNow.getMonth()}.${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}`,
        },
        {
            "title": "заказ формируется",
            "date": `${dateNow.getFullYear()}.${dateNow.getMonth()}.${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}`,
        },
        {
            "title": "заказ принят",
            "date": `${dateNow.getFullYear()}.${dateNow.getMonth()}.${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}`,
        },
    ]

    const mainDiv = anyElement("div", ["order-body"], "", "tr")
    let ulElem = document.createElement("ul")

    let buttonTr = await buttonElement("заказ получен", ["track-btn"], "tr-btn")
    buttonTr.disabled = true
    buttonTr.classList.add("btn-tr-disabled")
    
    if (idx == 4) {
        buttonTr.removeAttribute("disabled")
        buttonTr.classList.remove("btn-tr-disabled");
    }

    if (idx > 0){
        testOrder.slice(-idx).forEach(async function(elem){
            let li = await ulAelementTrack(elem)
            ulElem.prepend(li)
        })
    }

    let btnDiv = anyElement("div", ["btn-div"])

    btnDiv.append(buttonTr)
    ulElem.append(btnDiv)
    

    // await wSocket(ws)


    btnDiv.append(buttonTr)
    ulElem.append(btnDiv)
    mainDiv.append(ulElem)
     console.log("Cl-------")
    buttonTr.addEventListener("click", async function(e) {
        setTimeout(wSocket(ws), 1200)
    e.preventDefault()
	     })
    ws.onmessage = async function(evt) {
        let recived_msg = await evt.data
        console.log(recived_msg,"==")
    }
    return mainDiv
};


function wSocket(ws) {
   

    // let api = (function(msg) {
    //     console.log(msg);
    //     mainDiv.append(ulElem)
    //     return mainDiv
    //   });

    // if("WebSocket" in window){
        

        // ws.onopen = function() {
        //     console.log("open - Track Websockett!!!!!!!!11")
        // }

       
        ws.send(5)
        // api(recived_msg);
        

        ws.onclose = async function() {
            console.log("Close  -Track   Websockett!!!!!!!!11")
        }
    // }
    // return 
    // return api()
}

ws.onclose = async function() {
            console.log("Close  +-Track   Websockett!!!!!!!!11")
        }

async function ulAelementTrack(element) {
   
    let li = document.createElement("li")
    li.classList.add("order-item-tr")
    let aDiv = anyElement("div")
    aDiv.classList.add("text-tr")
    let spanDiv = anyElement("div")

    let titleS = anyElement("div", ["text-descr-tr"], element["title"])
    
    let qtyS = anyElement("div", ["text-descr-tr"], element["date"])
    let img = await imgElement(element["img"])
    img.setAttribute("data-detail", "detail")
    spanDiv.append(titleS, qtyS)
    spanDiv.classList.add("div-descr-tr")
    aDiv.append(spanDiv)
    li.append(aDiv)
    
    return li
};


// buttonSave.removeAttribute("disabled")
// buttonSave.classList.remove("btn-tr-disabled");
