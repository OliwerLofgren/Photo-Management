"use strict";

// changed variable name to just "main"
const main = document.querySelector("main");

createHomePage();

async function createHomePage() {
  // Fetch the photo URLs
  const photoUrls = await fetchPhoto();

  document.querySelector("header").innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
      <nav>
        <button id="loginBtn">LOGIN</button>      
        <button id="registerBTN">REGISTER</button>      
      </nav>
  `
  addLoginEventListener();
  addRegisterEventListener();


  // Create the photos section
  const photosWrapper = document.createElement("div");
  photoUrls.forEach(photo => {
    const div_dom = document.createElement("div");
    div_dom.innerHTML = `<img src="${photo}">`;
    photosWrapper.append(div_dom);
  });
  main.append(photosWrapper);
}

const addLoginEventListener = () => {
  document.querySelector("#loginBtn").addEventListener("click", createLoginPage);
}

const addRegisterEventListener = () => {
  document.querySelector("#registerBTN").addEventListener("click", createRegisterPage);
}

