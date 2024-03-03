import { anyElement, buttonElement, imgElement } from "./elements.js"
import { onUpload } from "./list-properties.js"
import { previewElem } from "./preview-image.js"

function formatBytes(bytes) {
    if (!+bytes) return '0 Bytes'

    const k = 1024

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed())} ${sizes[i]}`
}
// function noop() {}

export async function upload(classesDiv = [], classesBtn = [], options = {}, idElem="file", filesBd=[]) {
    let classDiv;
    let classBtn;
    let files = []
    // const onUpload = options.onUpload ?? noop
    const preview = await anyElement("div", ["preview", idElem])


    if (classesDiv) {
        classDiv = classesDiv
    }

    if (classesBtn) {
        classBtn = classesBtn
    }

    const open = await buttonElement("добавить", classBtn)
    const upload = await buttonElement("загрузить", [classBtn, "primary"])
    upload.style.display = 'none'

    const divBlock = await anyElement("div", classDiv)

    const input = await anyElement("input")
    input.type = "file"
    input.id = idElem
    input.multiple = true

    if (options.accept && Array.isArray(options.accept)) {
        input.accept = options.accept.join(",")
    }

  
    if (filesBd) {

        filesBd.forEach(async file => {
        preview.innerHTML = ""
        
       
        let previewImgs = await previewElem(file, file.split("/")[4])
        preview.append(previewImgs)})
    }


    open.addEventListener("click", function (event) {
        event.preventDefault()
        input.click()
    })

    input.addEventListener("change", function (event) {

        if (!event.target.files.length) {
            return
        }
        files = Array.from(event.target.files)

        preview.innerHTML = ""
        upload.style.display = 'inline'

        files.forEach(file => {
            if (!file.type.match("image")) {
                return
            }

            const reader = new FileReader()

            reader.onload = async ev => {
                // console.log(ev)
                let src = ev.target.result
                const previewImg = await anyElement("div", ["preview-image"])
                let previewRemove = await anyElement("div", ["preview-remove"])
                previewRemove.setAttribute("data-name", file.name)
                previewRemove.innerHTML = "&times;"

                let previewInfo = await anyElement("div", ["preview-info"])
                let previewSpanName = await anyElement("span", [], file.name)
                let previewSpanSize = await anyElement("span", [], formatBytes(file.size))

                previewInfo.append(previewSpanName, previewSpanSize)

                const img = await imgElement(src, file.name)
                previewImg.append(img, previewRemove, previewInfo)
                preview.append(previewImg)
            }

            // const block = preview.querySelector(`[data-name="${name}"]`).closest(".preview-image")

            // console.log(preview.dataset.name)

            reader.readAsDataURL(file)


        })
    })

    preview.addEventListener("click", function (event) {
        if (!event.target.dataset.name) {
            return
        }

        const { name } = event.target.dataset
        files = files.filter(file => file.name !== name)

        if (!files.length) {
            upload.style.display = 'none'
        }

        const block = preview.querySelector(`[data-name="${name}"]`).closest(".preview-image")
       
        // block.classList.add("removing")
        setTimeout(() => block.remove(), 300)
    })

    upload.addEventListener("click", function (event) {
        if (!event.target.dataset.name) {
            return
        }
        const { name } = event.target.dataset
        files = files.filter(file => file.name !== name)
        const block = preview.querySelector(`[data-name="${name}"]`).closest(".preview-image")
        block.classList.add("removing")
        setTimeout(() => block.remove(), 300)
    })


    const clearPreview = el => {
        el.style.bottom = "0"
        el.innerHTML = '<div class="preview-info-progress"></div>'
    }



    upload.addEventListener("click", async function (event) {
        // covsole.log("============")
        event.preventDefault()
        Array.from(preview.querySelectorAll(".preview-remove")).forEach(e => e.remove())

        let previewInfo = preview.querySelectorAll(".preview-info")
        Array.from(previewInfo).forEach(clearPreview)

        await onUpload(files, previewInfo)

    })


    divBlock.append(input, open, upload, preview)
    return divBlock
}


