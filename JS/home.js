"use strict";
const main = document.querySelector("main");

createHomePage();

async function createHomePage() {
  // create the photo elements 
  const photosWrapper = await createPhotos();
  main.append(photosWrapper);

  document.querySelector("header").innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
      <nav>
        <button id="loginBtn">LOGIN</button>      
        <button id="registerBtn">REGISTER</button>      
      </nav>
  `
  addEventListenerById("loginBtn", "click", createLoginPage);
  addEventListenerById("registerBtn", "click", createRegisterPage);
}




