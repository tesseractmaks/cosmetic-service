import { feturesSection } from "./fetures-section.js"
import { mainContainer } from '../pages/main-page.js'
import { pageContainer } from '../../index.js'


export async function gallerySection() {

    const sectionGallery = document.createElement("section")
    sectionGallery.classList.add("gallery-section", "spad")

    let container = document.createElement("div")
    container.classList.add("container")

    let response = await fetch(`http://127.0.0.1:8000/api/v1/properties/count-sities`);

    const propertyData = await response.json();

    let popular = document.createElement("div")
    popular.classList.add("section-title", "text-center")

    let h3 = document.createElement("h3")
    let p = document.createElement("p")

    h3.textContent = "Popular Places"
    p.textContent = "We understand the value and importance of place"

    popular.append(h3, p)
    container.append(popular)


    let divGallery = document.createElement("div")
    divGallery.classList.add("gallery")
    divGallery.setAttribute("style", "position: relative; height: 590px;")

    let divSizer = document.createElement("div")
    divSizer.classList.add("grid-sizer")

    divGallery.append(divSizer)

    propertyData["cities"].forEach(function (element, index) {
        let link = document.createElement("a")
        // link.setAttribute("href", "#")
        link.setAttribute("href", element[0])
        link.setAttribute("data-setbg", `/src/img/gallery/${index + 1}.jpg`)
        link.classList.add("gallery-item")
        link.classList.add("set-bg")
        if (index + 1 == 1) {
            link.classList.add("grid-long")
            link.setAttribute("style", `background-image: url(/src/img/gallery/${index + 1}.jpg); height: 570px; left: 580px; top: 0px;`)
        };
        if (index + 1 == 2) {
            link.classList.add("grid-wide")
            link.setAttribute("style", `background-image: url(/src/img/gallery/${index + 1}.jpg);`)
                ;
        }

        if (index + 1 == 3) {
            link.setAttribute("style", `background-image: url(/src/img/gallery/${index + 1}.jpg); height: 270px; position: absolute; left: 0px; top: 300px;`)
        };
        if (index + 1 == 4) {
            link.setAttribute("style", `background-image: url(/src/img/gallery/${index + 1}.jpg); height: 270px; position: absolute; left: 290px; top: 300px;`)
        };

        let divGiinfo = document.createElement("div")
        let h3 = document.createElement("h3")
        let p = document.createElement("p")
        h3.textContent = element[0]
        p.textContent = `${element[1]} Properties`
        divGiinfo.classList.add("gi-info")
        divGiinfo.append(h3, p)

        link.append(divGiinfo)
        divGallery.append(link)
    });

    container.append(divGallery)
    sectionGallery.append(container)

    let aCollect = Array.from(divGallery.childNodes).splice(1, divGallery.childNodes.length)
    let params;
    for (let link of aCollect){
        link.addEventListener('click', async function (e) {
            e.preventDefault();

            let cityName = link.children[0].children[0].textContent
            let state = "";
            let flatHouse = 0;
            let rentSale = "";
            let room = 0;
            let page;

            params = {
                "city": cityName,
                "state": state,
                "category": flatHouse,
                "status": rentSale,
                "rooms": +room
            }
           
            // if (cityName) {
            //     let cityElem = document.querySelector("#inCity")
            //     cityElem.value = cityName
            // }
            sectionGallery.setAttribute("style", "display: none")
            let feturesBlock = await feturesSection(page = page, params = params)
            // console.log(feturesBlock,"---==")
            // await render(feturesBlock)
            pageContainer.innerHTML = ""
    
            let feturesBlockNew =  await mainContainer(feturesBlock, cityName)
            pageContainer.append(feturesBlockNew)
            const slow = 2000
            // window.scrollTo({ top: 1000, behavior: 'smooth' })
            scrollTo(1000,2000)

       
           
            // getPageContainer(mainPage)

            // console.log(pageContainer,"+++")
            // mainPage.innerHTML = ""

            // mainPage.append(feturesBlock)
            // return mainPage
            // return feturesBlock

        });

    };
    return sectionGallery
}

// import { filterFormSection } from './filter-form.js'
// import { reviewSection } from "./review-slider.js"
// import { servicesSection } from "./services.js"
// import { heroSection } from "./hero.js"
// import { mainSiteData } from "../main.js"
// // import { headerSection, footerBlock, pageContainer } from '../main.js'



// async function render(feturesBlock){
//     const mainSite = await mainSiteData()
//     // const app = document.querySelector("#app")
//     const mainPage = await mainContainer()
//     // const pageContainer =  getPageContainer()


//     const heroBlock1 = await heroSection(mainSite)
//     const filterForm1 = await filterFormSection()
//     const reviewBlock1 = await reviewSection()
//     const servicesBlock1 = await servicesSection(mainSite)

//     pageContainer.innerHTML = ""


//     mainPage.append(
//         // heroBlock1,
//         // filterForm1,
//         feturesBlock, 
//         // reviewBlock1,
//         // servicesBlock1,
//         )

//     // console.log(pageContainer,"++++---==")


//     pageContainer.append(mainPage1)

//     return pageContainer
//     // return mainPage1

//     // app.append(
//     //     headerSection, 
        
//     //     // filterForm,
//     //     pageContainer,
//     //     footerBlock,
//     //     )
//     // return app
    

// }

