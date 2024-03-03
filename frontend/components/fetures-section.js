// import { setStorageData } from "../utils.js"
// import { filterFormSection } from './filter-form.js'
import { pagination } from "./pagination.js"
import { getListProperties } from "./list-properties.js"

// import { gallerySection } from '../components/gallery.js'
// import { reviewSection } from "../components/review-slider.js"
// import { servicesSection } from "../components/services.js"
// import { heroSection } from "../components/hero.js"
// import { mainSiteData } from "../main.js"
import { mainContainer } from '../pages/main-page.js'
import { router, pageContainer } from '../../index.js'


export async function feturesSection(page = 1, params = {}) {

    // mainPage.innerHTML = ""


    const featureSection = document.createElement("section")
    featureSection.classList.add("feature-section", "spad")
    featureSection.innerHTML = ""

    let container = document.createElement("div")
    container.classList.add("container")

    let listings = document.createElement("div")
    listings.classList.add("section-title", "text-center")

    let h3 = document.createElement("h3")
    let p = document.createElement("p")

    h3.textContent = "Featured Listings"
    p.textContent = "Browse houses and flats for sale and to rent in your area"

    listings.append(h3, p)
    container.append(listings)

    let row = document.createElement("div")
    row.classList.add("row")
    let propertyData = params;




    if (JSON.stringify(propertyData) !== '{}' && propertyData["items"]) {
        // page = propertyData["page"]
        params = propertyData["items"]
        // propertyData = propertyData = await getListProperties(page, params);
    }
    // else{
    // propertyData = propertyData = await getListProperties(page, params);
    // }
    propertyData = propertyData = await getListProperties(page, params);

    // setStorageData("currentPage", propertyData["items"])



    propertyData["items"].forEach(function (element) {

        let divCol = document.createElement("div")
        divCol.classList.add("col-lg-4")
        divCol.classList.add("col-md-6")
        divCol.setAttribute("data-id", `${element["id"]}`)

        let button = document.createElement("a")
        // button.setAttribute("href", `./single-list.html` + `?${element["id"]}`)
        button.setAttribute("id", element["id"])

        button.href = "/detail/" + `${element["id"]}`
        // button.setAttribute("data-navigo", true)
        button.addEventListener("click", function (e) {
            e.preventDefault()
            router.navigate("/detail/" + `${element["id"]}`)
        })



        let divFeature = document.createElement("div")
        divFeature.classList.add("feature-item")

        let divFeaturePic = document.createElement("div")
        divFeaturePic.classList.add("feature-pic")
        divFeaturePic.classList.add("set-bg")
        divFeaturePic.setAttribute("data-setbg", `${element["photo"][0]}`)
        divFeaturePic.setAttribute("style", `background-image: url(${element["photo"][0]});`)

        let divSale = document.createElement("div")
        if (element["status"] == "sale") {
            divSale.classList.add("sale-notic")
            divSale.textContent = "FOR SALE"
        };
        if (element["status"] == "rent") {
            divSale.classList.add("rent-notic")
            divSale.textContent = "FOR RENT"
        };

        divFeaturePic.append(divSale)

        let divFeatureText = document.createElement("div")
        divFeatureText.classList.add("feature-text")

        let divTextCenter = document.createElement("div")
        divTextCenter.classList.add("text-center")
        divTextCenter.classList.add("feature-title")
        let h5 = document.createElement("h5")
        h5.textContent = element["street"]

        let p = document.createElement("p")
        let i = document.createElement("i")
        i.classList.add("fa")
        i.classList.add("fa-map-marker")
        p.textContent = ` ${element["city"]}, ${element["state"]} ${element["postal_code"]}`
        p.prepend(i)
        divTextCenter.append(h5, p)

        let divRoomW = document.createElement("div")
        divRoomW.classList.add("room-info-warp")

        let divRoom1 = document.createElement("div")
        divRoom1.classList.add("room-info")

        let divRfL = document.createElement("div")
        divRfL.classList.add("rf-left")

        let p1 = document.createElement("p")
        let i1 = document.createElement("i")
        i1.classList.add("fa")
        i1.classList.add("fa-th-large")
        p1.textContent = `${element["house_area"]} Square foot`
        p1.prepend(i1)

        let p2 = document.createElement("p")
        let i2 = document.createElement("i")
        i2.classList.add("fa")
        i2.classList.add("fa-bed")
        p2.textContent = `${element["bedrooms"]} Bedrooms`
        p2.prepend(i2)
        divRfL.append(p1, p2)

        let divRfR = document.createElement("div")
        divRfR.classList.add("rf-right")

        let pR1 = document.createElement("p")
        let iR1 = document.createElement("i")
        iR1.classList.add("fa")
        iR1.classList.add("fa-car")
        pR1.textContent = `${element["garages"]} Garages`
        pR1.prepend(iR1)

        let pR2 = document.createElement("p")
        let iR2 = document.createElement("i")
        iR2.classList.add("fa")
        iR2.classList.add("fa-bath")
        pR2.textContent = `${element["bathrooms"]} Bathrooms`
        pR2.prepend(iR2)
        divRfR.append(pR1, pR2)


        let divRoom2 = document.createElement("div")
        divRoom2.classList.add("room-info")

        let divU = document.createElement("div")
        divU.classList.add("rf-left")

        let pU = document.createElement("p")
        let iU = document.createElement("i")
        iU.classList.add("fa")
        iU.classList.add("fa-user")
        let a = document.createElement("a")

        a.href = "#"
        // a.setAttribute("data-navigo", true)

        a.textContent = element["agent_id"]
        pU.append(a)
        pU.prepend(iU)

        divU.append(pU)

        let divC = document.createElement("div")
        divC.classList.add("rf-right")

        let pC = document.createElement("p")
        let iC = document.createElement("i")
        iC.classList.add("fa")
        iC.classList.add("fa-clock-o")
        pC.textContent = `${element["time_published"]} days ago`
        pC.prepend(iC)
        divC.append(pC)

        let divPrice = document.createElement("div")

        divPrice.classList.add("room-price")
        divPrice.textContent = element["price"]

        divRoom2.append(divU, divC)
        divRoom1.append(divRfL, divRfR)
        divRoomW.append(divRoom1, divRoom2)

        divFeatureText.append(divTextCenter, divRoomW, divPrice)
        divFeature.append(divFeaturePic, divFeatureText)
        button.append(divFeature)
        divCol.append(button)

        row.append(divCol)

    });



    // const mainSite = await mainSiteData()

    // const heroBlock1 = await heroSection(mainSite)

    // // Filter form section
    // const filterForm1 = await filterFormSection()

    // // Gallery section
    // const galleryBlock1 = await gallerySection()

    // // // Review section
    // const reviewBlock1 = await reviewSection()

    // // Services section
    // const servicesBlock1 = await servicesSection(mainSite)


    // Pagination
    let divPagina = await pagination(page, propertyData)

    container.append(row, divPagina)
    featureSection.append(container)

    // const mainPage = getPageContainer()

    let pages = divPagina.childNodes[0].children
    for (let link of pages) {
        link.addEventListener('click', async function (e) {
            console.log("===")

            e.preventDefault();


            let cityElem = document.querySelector("#inCity")

            cityElem.value = params.city

            let page = link.childNodes[0].textContent
            const feturesBlock = await feturesSection(page = +page, params)

            // mainPage.innerHTML= ""
            pageContainer.innerHTML = ""



            let feturesBlockNew = await mainContainer(feturesBlock, params.city)
            pageContainer.append(feturesBlockNew)



            // const mainPage = pageContainer()

            // mainPage.append(
            //     heroBlock,
            //     filterForm,
            //     galleryBlock,
            //     feturesBlock, 
            //      reviewBlock,
            //      servicesBlock,
            //      )


            window.scrollTo({ top: 1000, behavior: 'smooth' })
            // console.log(mainPage,"=")

            return feturesBlock
        });
        // window.scrollTo({ top: 1900, behavior: 'smooth' })
    };

    // main.append(featureSection)
    // console.log(main, '----')
    // return main
    // console.log(featureSection, '----')
    // let featureSection1 = featureSection
    // mainPage.append(
    //     heroBlock1,
    //     filterForm1,
    //     galleryBlock1,
    //     featureSection1, 
    //      reviewBlock1,
    //      servicesBlock1,
    //      )
    // console.log(mainPage)


    return featureSection
};




// function getIdFeature(itemRow) {

// 	let rowFeature = itemRow.querySelectorAll(".col-lg-4 a")
// 	for (let i = 0; i < rowFeature.length; i++) {
// 		rowFeature[i].addEventListener("click", async function (elem) {
// 			location.href = `${rowFeature[i].href}?` + rowFeature[i].id
// 		});
// 	};
// };
