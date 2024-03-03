
export async function getListProperties(page = 1, params = {}) {
  let response;

  for (var key in params) {
    if (params[key] == null) {
      params[key] = ""
    };
  };


  if (JSON.stringify(params) === '{}') {
    response = await fetch(`http://127.0.0.1:8000/api/v1/properties/?page=${page}`);

  } else {

    response = await fetch(`http://127.0.0.1:8000/api/v1/properties/?page=${page}&city=${params["city"]}&state=${params["state"]}&category=${params["category"]}&status=${params["status"]}&bedrooms=${params["rooms"]}`);
  };

  const propertyData = await response.json();

  return propertyData
};


export async function getSidebarProperties() {
  let response = await fetch(`http://127.0.0.1:8000/api/v1/properties/sidebar`);

  const propertyData = await response.json();
  return propertyData
};

export async function getOneProperty(idNum) {
  
  let response = await fetch(`http://127.0.0.1:8000/api/v1/properties/${idNum}/`,
  {
    method: "GET",
    headers: {"Authorization": 'Bearer myHeaders'},
    credentials: 'include'
  }
  );

  const propertyData = await response.json();
  console.log(propertyData.headers, "-==-")
  // console.log(myHeaders, "+++")
  return propertyData
};


export async function deleteOneProperty(idNum) {
  // console.log(idNum, "------")
  await fetch(`http://127.0.0.1:8000/api/v1/properties/${idNum}`, {
    method: "DELETE",
  });
};


export async function onUpload(files, blocks) {
  // console.log(files)
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("photos", files[i])
    const block = blocks[i].querySelector(".preview-info-progress")
    try {

      const block = blocks[i].querySelector(".preview-info-progress")

      let xhr = new XMLHttpRequest();
      xhr.upload.onprogress = function (event) {
        // console.log(`Отправлено ${event.loaded} из ${event.total}`);
        const percentage = ((event.loaded / event.total) * 100).toFixed() + "%"
        block.textContent = percentage
        block.style.width = percentage
      };

      xhr.onloadend = function () {
        if (xhr.status == 200) {
          console.log("Успех");
        } else {
          console.log("Ошибка " + this.status);
        }
      };

      xhr.open("PATCH", "http://127.0.0.1:8000/api/v1/properties/upload/4/");
      xhr.send(formData);

    } catch (error) {
      console.error("Ошибка:", error);
    }
  }
}



