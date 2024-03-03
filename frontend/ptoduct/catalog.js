import { anyElement, imgElement, aElements } from "../components/elements.js"
import  { collectionCategory, collectionTag, collectionFlag} from "./collections-data.js"
import  { ordersNode } from "./order-list.js"
import  { orderTrack } from "./order-track.js"


async function cardProduct(productData, catLable) {

    let mainCont = anyElement(
        "div",
         [
            "col-md-4",
            "col-xs-6",
            "product",
            "product-grid",
            "goods_img"
            ] 
            )

    let clearfix = anyElement(
                "div",
                [
                    "product-item",
                    "clearfix"
                ]
                )

    let hoverTrigger = anyElement(
                    "div",
                    [
                        "product-img",
                        "hover-trigger"
                    ]
                    )

    let a26 = aElements(productData["link_detail"])

    let imgProduct = await imgElement(productData["image"])
    let imgProductClass = await imgElement(productData["image"])
    imgProductClass.classList.add("back-img")

    a26.append(imgProduct, imgProductClass)
    

    let labelProduct = anyElement("div",["product-label"])
    if (catLable == "Новые") {
        productData["label"] = "new"
        let labelNew = anyElement("span",["new"], productData["label"])
        labelProduct.append(labelNew)
    }

    

    let hover2 = anyElement("div",["hover-2"])

    let aQuick = aElements("#", ["product-quickview"])
    aQuick.style = "text-align:center"

    let aAdd = aElements("#", ["add_to_cart"], "в корзину")
    aAdd.setAttribute("id", productData["num_goods"])
    aAdd.setAttribute("data-goods", productData["data_goods"])

    hoverTrigger.append(a26, labelProduct, hover2, aQuick, aAdd)


    let detailsProduct = anyElement("div",["product-details"])

    let detailsH3 = anyElement("h3",["product-title"])

    let aDetails = aElements(productData["link_detail"], [])
    aDetails.innerHTML = productData["title"]
    detailsH3.append(aDetails)
    

    let divPrice = anyElement("div",["price"])
    divPrice.innerHTML = productData["price"]+"&nbsp;₽"
    
    detailsProduct.append(detailsH3, divPrice)

    clearfix.append(hoverTrigger, detailsProduct)

    mainCont.append(clearfix)
    return mainCont
};

export async function listProductsCnt(category){
   
        let response = await fetch(`https://api-cosmetic.tesseractmaks.tech/api/v1/products/category/${category}/`);
        const productData = await response.json();
        return productData.length
    }

export async function listProducts(category, tag){
    if (category){
        let response = await fetch(`https://api-cosmetic.tesseractmaks.tech/api/v1/products/category/${category}/`);
        const productData = await response.json();

        return productData
    }

    if (tag){
        let response = await fetch(`https://api-cosmetic.tesseractmaks.tech/api/v1/products/tag/${tag}/`);
        const productData = await response.json();
        
        return productData
    }
    

   let response = await fetch(`https://api-cosmetic.tesseractmaks.tech/api/v1/products/`);
   const productData = await response.json();
   return productData
}

export async function catalogProducts(dataProducts = [],  catLable = null, nodeAny = null) {

    
    let elemDom = document.querySelector("#dle-content")
    elemDom.innerHTML = ""


    if (dataProducts){
        dataProducts.slice(0, 9).forEach(async element => {
            const cards = await cardProduct(element,  catLable)
            elemDom.append(cards)
        })
        let elemDom1 = document.querySelector("#cat-s")
        let elemDom2 = document.querySelector("#cat-s-2")
        ulCategory(elemDom1)
        ulCategory(elemDom2)
        ulTag()
        pagina()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (nodeAny){
        elemDom.append(nodeAny)
        let cloudsCat4 = document.querySelector("#pag")
        cloudsCat4.innerHTML = ""
    }

    
    
    let clouds = document.querySelector("#tag-s")
    if (clouds) {
        let xsmall = clouds.getElementsByTagName("a")
        Array.from(xsmall).forEach(function (element, index) {
            element.addEventListener("click", async function(e) {
            e.preventDefault()
            const dataProducts = await listProducts("", element.text)
            catalogProducts(dataProducts)
            })
        })
        }

    let cloudsCat = document.querySelector("#cat-s")
    if (cloudsCat) {
        let xsmallCat = cloudsCat.getElementsByTagName("a")
        Array.from(xsmallCat).forEach(function (element, index) {
            element.addEventListener("click", async function(e) {
            e.preventDefault()
            const dataProducts = await listProducts(element.text, "")
            catalogProducts(dataProducts, element.text)
            })
        })
        }

    let cloudsCat2 = document.querySelector("#cat-s-2")
    if (cloudsCat2) {
        let xsmallCat2 = cloudsCat2.getElementsByTagName("a")
        Array.from(xsmallCat2).forEach(function (element, index) {
            element.addEventListener("click", async function(e) {
            e.preventDefault()
            const dataProducts = await listProducts(element.text, "")
            catalogProducts(dataProducts)
            })
        })
        }
        
    let cloudsCat3 = document.querySelector("#menu-m")
    if (cloudsCat3) {
        let xsmallCat3 = cloudsCat3.getElementsByTagName("a")

        Array.from(xsmallCat3).forEach(function (element, index) {
            element.addEventListener("click", async function(e) {
            e.preventDefault()
            const dataProducts = await listProducts(element.text, "")
            catalogProducts(dataProducts)
            })
        })
        }

    // Order section

    let ordesElem = document.querySelector("#order-l")
    let pModal = document.querySelector(".modal")

        if(localStorage.getItem("OrderFlag")) {
            if (localStorage.getItem("PayFlag")){
                await noteficationPay()
            }
            console.log("---++++-------", collectionFlag)
            ordesElem.classList.remove("order-close")
            ordesElem.classList.add("order-open")
            
            // let modalElem = document.querySelector(".modal")
		    // modalElem.classList.remove("open")
    }

    if (ordesElem) {
        ordesElem.addEventListener("click", async function(event) {
            console.log(event.target)
            event.preventDefault()
        
        if (!event.target.dataset.order) {
            return
        } else {
            console.log(event.target)

        // const dataProducts = await listProducts(element.text, "")
        const orderNode = await ordersNode()
        catalogProducts([], null, orderNode)

         //create_producers_order
         let topics = ["conf-1", "conf-2", "conf-3", "conf-4"]
         await fetch(`https://api-cosmetic.tesseractmaks.tech/api/v1/orders/?topics=${topics}`);
            }
        })

    }
//      // Admin panel
//      let orderConfirmElem = document.querySelector("#order-a")    
    
//      orderConfirmElem.addEventListener("click", async function(event) {
//      event.preventDefault()
 
//      const orderT = await orderConfirm()
//      catalogProducts([], null, orderT)
//  })

        

    let orderDetailElem = document.querySelector(".order-body")

    if (orderDetailElem) {
        orderDetailElem.addEventListener("click", async function(event) {
        event.preventDefault()

        try {
            if (["conf-1", "conf-2", "conf-3", "conf-4"].includes(event.target.children[1].id)) {
                return
            }
            }
        catch (err){}

    if (!event.target.dataset.detail) {
        return
    } 
        
    else {
        let orderT = await orderTrack(0)
        catalogProducts([], null, orderT)
        }
    })
    

        let  ws = new WebSocket("wss://api-cosmetic.tesseractmaks.tech/api/v1/orders/ws/1")
        ws.onmessage = async function(evt) {
            evt.preventDefault()
            
            let recived_msg = await evt.data
           
            let idx = recived_msg.slice(-1)
            console.log(idx,"=+=")
            let orderT = await orderTrack(idx)
            catalogProducts([], null, orderT)
            }
        
    }
 

    

// try {
//     // const evtSource = new EventSource("http://127.0.0.1:8000/api/v1/orders/topic/conf-1");
//     const evtSource = new EventSource("http://127.0.0.1:5050");
//     if (evtSource){
   
//         // evtSource.addEventListener("open", function(e) {
//             evtSource.addEventListener("message", function(e) {
//             e.preventDefault()

//         console.log("eventData-----------", e.data)
//     })
// }
// }
// catch(err){}

}



    // try{
    //     let response = await fetch(`http://127.0.0.1:8000/api/v1/orders/${topic}/`);
    //     const eventData = await response.json();
    //     console.log(eventData)
    // }
    // catch(err){}

    // }



    // let orderTrackElem = orderT.querySelectorAll("#tr ul li")
    // let btn = document.querySelector("#tr #tr-btn")
    // console.log(orderTrackElem)
    // console.log(orderTrackElem.children)
    // console.log(btn)


    // if (!orderTrackElem) {
        
    //     // let ordesElemA = ordesElem.getElementsByTagName("a")
    //     Array.from(orderTrackElem.children).forEach(async function (element, index) {
    //         // setTimeout("---", 3000);
    //         // element.addEventListener("load", async function(event) {
    //         // event.preventDefault()
    //         console.log(element, index)

    //         element.classList.add("order-item-tr-active");
    //         if (index == 3) {
    //             let btn = true

    //             btn.removeAttribute("disabled")
    //             btn.classList.remove("btn-tr-disabled");
    //         }
    //         const orderT = await orderTrack(index, btn)
    //         catalogProducts([], null, orderT)
    //             })
    //     }



    
const dataProducts = await listProducts()
catalogProducts(dataProducts)


function pagina(){
    let cloudsCat4 = document.querySelector("#pag")
    if (cloudsCat4) {
        let xsmallCat4 = cloudsCat4.getElementsByTagName("a")
        Array.from(xsmallCat4).forEach(function (element, index) {
            element.addEventListener("click", async function(e) {
                e.preventDefault()
                let dataProductsList = await listProducts()

                if (element.text == 2){dataProductsList = Array.from(dataProducts).slice(9, 18)}
            
                if (element.text == 1){dataProductsList = Array.from(dataProducts).slice(0, 9)}
                catalogProducts(dataProductsList)
        })
        })
    }
    }


function ulCategory(elemDom) {

    elemDom.innerHTML = ""
    let ul = document.createElement("ul")
    collectionCategory.forEach(function (element, index) {
        let li = document.createElement("li")
        let a = document.createElement("a")
        
        if (!element["count"]){
            a.href = "#"
        } else {
            a.href = element["text"]
        }

        a.textContent = element["text"]
        li.append(a)
        let span = anyElement("span")
        span.style = element["style"]
        span.textContent = element["count"]
        li.append(a, span)
        ul.append(li)
    });
    elemDom.append(ul)
    return elemDom
};

function ulTag() {
    let elemDom = document.querySelector("#tag-s")
    elemDom.innerHTML = ""
    let h3 = anyElement("h3", ["widget-title","heading","uppercase","relative","bottom-line","full-grey"], "Поиск по тегам")
    elemDom.append(h3)
    collectionTag.forEach(function (element, index) {
        let span = anyElement("span", ["clouds_xsmall"])
        let a = aElements(element["text"], ["clouds_xsmall"], element["text"])
        a.classList.add("letter-color")
        span.append(a)
        elemDom.append(span)
    });
    return elemDom
};




let clearCart = document.querySelector(".clear_cart")

clearCart.addEventListener("click", async function(e) {
    let ordesElem = document.querySelector("#order-l")
    e.preventDefault()
    ordesElem.classList.remove("order-open")
    localStorage.removeItem("OrderFlag")
    localStorage.removeItem("PayFlag")

})
// localStorage.removeItem("collectionFlag")

export async function noteficationPay(){
    let payModal = document.querySelector("#modal-e")

    const mainDiv = await anyElement("div", ["modal"])
    const formDiv = await anyElement("div", ["modal__box"])
    const mainh3 = await anyElement("h3")
    mainh3.textContent = "Оплачено"

    formDiv.append(mainh3)
    mainDiv.append(formDiv)
    payModal.append(mainDiv)
    mainDiv.classList.add("open")
    let seconds = 1000
    setTimeout(() =>removePayNot(), seconds);
    
}

function removePayNot(){
    let payModal = document.querySelector(".modal")
    payModal.classList.remove("open")
    localStorage.removeItem("PayFlag")
    localStorage.removeItem("goods")
    let clearCart = document.querySelector(".nav-cart-container")
    let totalCart = document.querySelector(".ks_total")
    let dinamicCart = document.querySelector(".ks_dinamic_count")
    clearCart.innerHTML = ''
    totalCart.innerHTML = '0.00 ₽'
    dinamicCart.innerHTML = ''
}

function removeGlobal(){
    window.location.reload()
    removePayNot()
    localStorage.removeItem("OrderFlag")
    let ordesElem = document.querySelector("#order-l")
    e.preventDefault()
    ordesElem.classList.remove("order-open")
    ordesElem.classList.add("order-close")
}

let seconds = 1000 * 600
    setTimeout(() => removeGlobal(), seconds);












