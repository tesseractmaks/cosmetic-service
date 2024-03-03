
import { getListProperties } from "./list-properties.js"


export async function pagination(page = 1, params = {}) {
	
    const divPagina = document.createElement("div")
    divPagina.classList.add("site-pagination")
    divPagina.innerHTML = ""
    let propertyData = params;
	
    if (JSON.stringify(params) === '{}'){

    	propertyData = await getListProperties(page = page, params = params);
    }else{
        propertyData = params
    }
    

	// window.scrollTo({ top: 1900, behavior: 'smooth' })

	if (propertyData["pages"] > 0) {


		let aPreview = document.createElement("a")
		let iLeft = document.createElement("i")

		aPreview.setAttribute("href", `?page=${propertyData["page"]}`)

		iLeft.classList.add("fa")
		iLeft.classList.add("fa-angle-left")

        aPreview.setAttribute("style", "color: transparent;")
        iLeft.setAttribute("style", "color: #717171;")
        aPreview.append(iLeft)
        

		let aNext = document.createElement("a")
		let iRight = document.createElement("i")

		aNext.setAttribute("href", `?page=${propertyData["page"] + 1}`)

        
        aNext.textContent = propertyData["page"] + 1
        aNext.setAttribute("style", "color: transparent;")

		iRight.classList.add("fa")
		iRight.classList.add("fa-angle-right")
        iRight.setAttribute("style", "color: #717171;")
        
        
		aNext.append(iRight)

		let liNext = document.createElement("li")
		liNext.setAttribute("style", "display: inline-block")
		liNext.append(aNext)
        

		let ul = document.createElement("ul")
		ul.setAttribute("style", "list-style-type: none;")

		let liPreview = document.createElement("li")
		liPreview.setAttribute("style", "display: none;")
        aPreview.disabled = true
        aPreview.textContent = 1
        liPreview.append(aPreview)
        

		if (propertyData["page"] > 1) {
            aPreview.textContent = propertyData["page"] - 1
			liPreview.style.display = "inline-block"
            aPreview.setAttribute("style", "color: transparent;")
            iLeft.setAttribute("style", "color: #717171; font-size: 18px; font-weight: 100")
            aPreview.append(iLeft)

            liPreview.append(aPreview)
            
		};
		ul.append(liPreview)

		for (let element = 1; element <= propertyData["pages"]; element++) {
			let a = document.createElement("a")
			let li = document.createElement("li")
			a.setAttribute("style", "display='none'")
			li.setAttribute("style", "display='none'")


			if (element >= (propertyData["page"] - 2) && element <= (propertyData["page"] + 2)) {
				a.setAttribute("href", `?page=${element}`)
				a.textContent = element
				li.setAttribute("style", "display: inline-block")
				li.append(a)
				ul.append(li)
			};
			if (element == propertyData["page"]) {
				a.removeAttribute("href")
				a.style.color = "#d4d2d2"
                
			};
		};
       
		if (page == propertyData["pages"]) {
			liNext.style.display = "none"
		};
       
		ul.append(liNext)
        
		divPagina.append(ul)

	};
    // window.scrollTo({ top: 1900, behavior: 'smooth' })


   
    // if (divPagina.childNodes[0]) {
    //     let pages = divPagina.childNodes[0].children
    //     for (let link of pages){
    //         link.addEventListener('click', async function (e) {
    //             // e.preventDefault();
    //             let page = link.childNodes[0].textContent
    //             window.scrollTo({ top: 1900, behavior: 'smooth' })
                
    //             await feturesSection(page = +page)
                
    //         });
    //     };
    // };

  

    return divPagina

};

// let aCollect = Array.from(divGallery.childNodes).splice(1, divGallery.childNodes.length)
//     let params;
//     for (let link of aCollect){

