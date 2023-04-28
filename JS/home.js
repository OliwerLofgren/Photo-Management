"use strict";
const homeMain = document.querySelector("main");
clearElementAttributes(homeMain);
setElementAttributes(homeMain, "home-main", "");

async function createHomePage() {
  homeMain.innerHTML = "";

  document.querySelector("header").innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
      <nav>
        <button id="loginBtn">LOGIN</button>      
        <button id="registerBtn">Sign Up</button>      
      </nav>
  `
  // create the photo elements 
  const HomePhotoWrapper = await createPhotos();
  homeMain.append(HomePhotoWrapper);

  setElementAttributes(HomePhotoWrapper, "home-photos", "api-photos");

  document.querySelector("footer").innerHTML = `<button id="about-us">ABOUT US</button>`

  addEventListenerById("loginBtn", "click", createLoginPage);
  addEventListenerById("registerBtn", "click", createRegisterPage);
}




