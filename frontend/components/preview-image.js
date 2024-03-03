import { anyElement, imgElement } from "./elements"


export async function previewElem(src, fileName) {

    const previewImg = await anyElement("div", ["preview-image"])
    let previewRemove = await anyElement("div", ["preview-remove"])
    previewRemove.setAttribute("data-name", fileName)
    previewRemove.innerHTML = "&times;"



    const img = await imgElement(`${src}`, fileName)
    previewImg.append(img, previewRemove)

    return previewImg
}


function readTextFile(file = "") {
    const reader = new FileReader("/src/img/logo.png")
    console.log(reader)
    reader.onload = function() {
       
        return reader.result
      };

    // let oReq = new XMLHttpRequest();
    // oReq.open("GET", "./src/img/logo.png", true);
    // oReq.responseType = "blob";
    // console.log(oReq)

    // oReq.onload = function (oEvent) {
    // let blob = oReq.response;
   
};

    // return oReq.send();
  