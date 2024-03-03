import { listProducts, listProductsCnt } from "./catalog.js"
export let collectionFlag = false

export let collectionCategory = [
    {
        "link": "../dlja-gub/default.htm",
        "text": "Для губ",
        "tag": "span",
        "style": "float: right; padding-right:5px; color: #EDE6DC;",
        "count": await listProductsCnt("Для губ")
    },
    {
        "link": "../makijazh/default.htm",
        "text": "Макияж",
        "tag": "span",
        "style": "float: right;padding-right:5px; color: #EDE6DC;",
        "count": await listProductsCnt("Макияж")
    },
    {
        "link": "../tualetnaja-voda/default.htm",
        "text": "Туалетная вода",
        "tag": "span",
        "style": "float: right;padding-right:5px; color: #EDE6DC;",
        "count": await listProductsCnt("Туалетная вода")
    },
    {
        "link": "../uhod-za-kozhej/default.htm",
        "text": "Уход за кожей",
        "tag": "span",
        "style": "float: right;padding-right:5px; color: #EDE6DC;",
        "count": await listProductsCnt("Уход за кожей")
    },
    {
        "link": "../dlja-nogtej/default.htm",
        "text": "Для ногтей",
        "tag": "span",
        "style": "float: right;padding-right:5px; color: #EDE6DC;",
        "count": await listProductsCnt("Для ногтей")
    },
    {
        "link": "../uhod-za-volosami/default.htm",
        "text": "Уход за волосами",
        "tag": "span",
        "style": "float: right;padding-right:5px; color: #EDE6DC;",
        "count": await listProductsCnt("Уход за волосами")
    },
    {
        "link": "../new/default.htm",
        "text": "Новые",
        "tag": "span",
        "style": "float: right;padding-right:5px; color: #EDE6DC;",
        "count": await listProductsCnt("Новые")
    },
]

export let collectionTag = [
    {
        "text": "Для губ",
    },
    {
        "text": "Для лица",
    },
    {
        "text": "Для ресниц",
    },
    {
        "text": "Макияж",
    },
]

