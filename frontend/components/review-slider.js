// Review section



export async function reviewSection() {
    let response = await fetch('http://127.0.0.1:8000/api/v1/main_site/');
	const main_site = await response.json();
    let element = main_site["review"]

    const sectionReview = document.createElement("section")
    sectionReview.classList.add("review-section", "set-bg")
    // sectionReview.setAttribute("data-setbg", `${element["image"]}`)
    sectionReview.setAttribute("data-setbg", `/src/img/review-bg.jpg`)
    // sectionReview.setAttribute("style", `background-image: url(${element["image"]});`)
    sectionReview.setAttribute("style", `background-image: url(/src/img/review-bg.jpg);`)

    let divContaner = document.createElement("div")
    divContaner.classList.add("container")


    
    // let divslider = document.createElement("div")
    // divslider.setAttribute("id", "sl-slider")

    // // divslider.classList.add("single-list-slider")
    // divslider.classList.add("block-slider")

    // let divAreaSlider = document.createElement("div")
    // divAreaSlider.classList.add("block-area-slider")
  


    let reviewSlider = document.createElement("div")
    reviewSlider.classList.add("review-slider")

    
    element["reviewItems"].forEach(function (elem, idx) {
        let h5 = document.createElement("h5")
        let p = document.createElement("p")
        let span = document.createElement("span")
        let div2 = document.createElement("div")
        let div3 = document.createElement("div")
        let div4 = document.createElement("span")
        div2.classList.add("rating")
        div4.classList.add("review-item")
        div3.classList.add("text-white")

        for (let num = 0; num < 5; num++) {
            let i = document.createElement("i")
            i.classList.add("fa")
            i.classList.add("fa-star")
            div2.append(i)
        }

        p.textContent = elem["p"]
        h5.textContent = elem["h5"]
        span.textContent = elem["span"]
        let div = document.createElement("div")


        div.classList.add("clint-pic")
        div.classList.add("set-bg")
        div.setAttribute("data-setbg", `/src/img/review/1.jpg`)
        div.setAttribute("style", `background-image: url(/src/img/review/1.jpg);`)
        // div.setAttribute("data-setbg", `${elem["image"]}`)
        // div.setAttribute("style", `background-image: url(${elem["image"]});`)
        div3.append(div2, p, h5, span, div)
        div4.append(div3)

        reviewSlider.append(div4)
    });

    divContaner.append(reviewSlider)
    sectionReview.append(divContaner)

    
    return sectionReview
    };






// export async function reviewSection() {
//     let response = await fetch('http://127.0.0.1:8000/api/v1/main_site/');
// 	const main_site = await response.json();
//     let element = main_site["review"]

//     const sectionReview = document.createElement("section")
//     sectionReview.classList.add("review-section", "set-bg")
//     // sectionReview.setAttribute("data-setbg", `${element["image"]}`)
//     sectionReview.setAttribute("data-setbg", `../img/review-bg.jpg`)
//     // sectionReview.setAttribute("style", `background-image: url(${element["image"]});`)
//     sectionReview.setAttribute("style", `background-image: url(../img/review-bg.jpg);`)

//     let divContaner = document.createElement("div")
//     divContaner.classList.add("container")

//     let reviewSlider = document.createElement("div")
//     reviewSlider.classList.add("review-slider")
    
//     reviewSlider.classList.add("owl-carousel")
//     reviewSlider.classList.add("owl-item")
//     reviewSlider.classList.add("owl-drag")
//     reviewSlider.classList.add("owl-loaded")

//     element["reviewItems"].forEach(function (elem, idx) {
//         let h5 = document.createElement("h5")
//         let p = document.createElement("p")
//         let span = document.createElement("span")
//         let div2 = document.createElement("div")
//         let div3 = document.createElement("div")
//         div2.classList.add("rating")
//         div3.classList.add("review-item")
//         div3.classList.add("text-white")

//         for (let num = 0; num < 5; num++) {
//             let i = document.createElement("i")
//             i.classList.add("fa")
//             i.classList.add("fa-star")
//             div2.append(i)
//         }

//         p.textContent = elem["p"]
//         h5.textContent = elem["h5"]
//         span.textContent = elem["span"]
//         let div = document.createElement("div")


//         div.classList.add("clint-pic")
//         div.classList.add("set-bg")
//         // div.setAttribute("data-setbg", `${elem["image"]}`)
//         div.setAttribute("data-setbg", `../img/review-bg.jpg`)
//         // div.setAttribute("style", `background-image: url(${elem["image"]});`)
//         div.setAttribute("style", `background-image: url(../img/review-bg.jpg);`)
//         div3.append(p, h5, span, div, div2)

//         reviewSlider.append(div3)
//     });
//     divContaner.append(reviewSlider)
//     sectionReview.append(divContaner)


//     // $('.review-slider').append(reviewSlider())
    
//     return sectionReview
//     };

 
    

   
