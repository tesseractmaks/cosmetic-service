import { feturesSection } from "./fetures-section.js"
import { mainContainer } from '../pages/main-page.js'
import { pageContainer } from '../../index.js'



// Filter form section

export function filterFormSection(cityName) {
    const divFilter = document.createElement("div")
    divFilter.classList.add("filter-search")

    const divContainer = document.createElement("div")
    divContainer.classList.add("container")

    let filterForm = document.createElement("form")
    filterForm.classList.add("filter-form")

    let inputCity = document.createElement("input")
    inputCity.id = "inCity"
    inputCity.type = "text"
    inputCity.setAttribute("value", "")


    inputCity.placeholder = "City"
    filterForm.append(inputCity)

    let inputState = document.createElement("input")
    inputState.id = "inState"
    inputState.type = "text"
    inputState.placeholder = "State"
    filterForm.append(inputState)

    let selectRentSaleFlat = document.createElement("select")
    selectRentSaleFlat.id = "rentSaleFlat"

    let optionRent = document.createElement("option")
    optionRent.id = "rent"
    optionRent.textContent = "rent"

    let optionSale = document.createElement("option")
    optionSale.id = "sale"
    optionSale.textContent = "sale"

    selectRentSaleFlat.append(optionRent, optionSale)

    let selectHouse = document.createElement("select")
    selectHouse.id = "sellFlatHouse"

    let optionFlat = document.createElement("option")
    optionFlat.id = "flat"
    optionFlat.value = "1"
    optionFlat.textContent = "flat"

    let optionHouse = document.createElement("option")
    optionHouse.id = "house"
    optionHouse.value = "2"
    optionHouse.textContent = "house"

    selectHouse.append(optionFlat, optionHouse)

    let selectSellRooms = document.createElement("select")
    selectSellRooms.id = "sellRooms"

    for (let i = 1; i < 6; i++) {
        let optionRoom = document.createElement("option")
        optionRoom.id = `${i}room`
        optionRoom.textContent = `${i}-room`
        selectSellRooms.append(optionRoom)
    };

    let btn = document.createElement("button")
    btn.classList.add("site-btn", "fs-submit")
    btn.textContent = "НАЙТИ"
    btn.type = "submit"

    filterForm.append(selectRentSaleFlat, selectHouse, selectSellRooms, btn)

    selectHouse.addEventListener('click', function (e) {
        e.preventDefault();
        selectSellRooms.removeAttribute("disabled")
        if (e.target.value == "2") {
            selectSellRooms.setAttribute("disabled", "disabled")
        }
    });

    let params = {};

    filterForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        let city;

        if (cityName) {
            city = cityName
        } else {
            city = filterForm.inCity.value
        };

        let state = filterForm.inState.value
        let flatHouse = filterForm.sellFlatHouse.value
        let rentSale = rentSaleFlat.value
        let roomsFlat = filterForm.sellRooms.value

        let rooms = 0;
        if (!selectSellRooms.disabled) {
            rooms = roomsFlat.at(0)
        };
        params = {
            "city": city,
            "state": state,
            "category": flatHouse,
            "status": rentSale,
            "rooms": +rooms
        }
        for (var key in params) {
            if (params[key] == null) {
                params[key] = ""
            };
        };
        let page;
        // window.scrollTo({ top: 1900, behavior: 'smooth' })

        divContainer.append(filterForm)
        divFilter.append(divContainer)

        let feturesBlock = await feturesSection(page = page, params = params)

        // const mainPage = pageContainer()
        // mainPage.append(feturesBlock)

        pageContainer.innerHTML = ""



        let feturesBlockNew = await mainContainer(feturesBlock, city)
        pageContainer.append(feturesBlockNew)
        window.scrollTo({ top: 1000, behavior: 'smooth' })
        // return feturesBlock
    });


    divContainer.append(filterForm)
    divFilter.append(divContainer)
    return divFilter

};




