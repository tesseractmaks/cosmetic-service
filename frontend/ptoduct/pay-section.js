

let payBtn = document.querySelector("#pay-btn")


async function payElem(){
    payBtn.addEventListener("click", async function(e) {
        e.preventDefault()
        
    localStorage.setItem("OrderFlag", true)
    localStorage.setItem("PayFlag", true)
    document.location.href = "./ptoduct/default.htm"

    
    })
}

await payElem()

