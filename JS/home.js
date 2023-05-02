"use strict";

// changed variable name to just "main"
const main = document.querySelector("main");

renderHomePage();

async function getPhoto() {
  // NOTE, set per page parameter, + add result object to innerhtml 
  const per_page = 1;
  const url = `${prefix}curated?per_page=${per_page}`;

  try {
    const response = await fetch_resource(new Request(url, { headers }));
    const resource = await response.json();

    // display server message (temporary solution, see server_connection file)
    displayServerMessage(response);

    if (!response.ok) {
      console.log("oops");
    } else {
      // create new array from Photo resource, extracting "photos" key 
      const photosObject = resource.photos;
      console.log(photosObject);

      // create new array based on the photo resource extracting the "photo urls" key
      const photoUrls = photosObject.map(object => {
        return object.src.medium
      })
      console.log(photoUrls);

      const photosWrapper = document.createElement("div");
      // for each photo, create dom element
      photoUrls.forEach(photo => {
        const div_dom = document.createElement("div");
        div_dom.innerHTML = `
      <img src="${photo}">
    `;
        photosWrapper.append(div_dom);
      });
      main.append(photosWrapper);
    }

  } catch (error) {
    console.log("add server message to user here");
  }
}

function renderHomePage() {

  const header = document.querySelector("header");
  header.innerHTML = `
    <H1>PhOTO MANAGEMENT</H1>
      <nav>
        <button id="loginBtn">LOGIN</button>      
        <button id="registerBTN">REGISTER</button>      
    </nav>

    <div id="divBar"></div>  
  `
  getPhoto();
}

document.querySelector("#loginBtn").addEventListener("click", createLoginPage);

document.querySelector("#registerBTN").addEventListener("click", createRegisterPage);
