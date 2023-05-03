"use strict";
const homeMain = document.querySelector("main");
const homeHeader = document.querySelector("header");


async function createHomePage() {

  setupPage();
  function setupPage() {
    setElementAttributes(homeMain, "home-main", "");
    clearBackgroundImage();
    clearElementAttributes(homeHeader);
  }

  homeHeader.innerHTML = `
  <H1>PHOTO MANAGEMENT</H1>

  <form id="search-form" >
    <label for="search-field"></label>
    <input id="search-field" name="search" type="text">
    <button type="submit">Search</button>
  </form>

  <nav id="navHome">
    <button id="loginBtn">LOGIN</button> /     
    <button id="registerBtn">REGISTER</button>      
  </nav>
  `;

  homeMain.innerHTML = `
  <section id="home-section-one" class="section">
    <div id="home-photos" class="api-photos"></div>
  </section>

  <section id="home-section-two" class="section">
    <!-- content of the first -->
  </section>

  <section id="home-section-three" class="section">
    <!-- content of the first -->
  </section>
  `;


  // possible bug? query selector is null (dom element not created yet) -> 
  /* document.addEventListener('DOMContentLoaded', (event) => {
  add event listeners here ?
  }); */

  // create the photo element 
  async function homePhotos() {
    let per_page = 16;
    let imgSize = "portrait";

    await fetchPhotosToDisplay(true, per_page, imgSize, false);
  }
  homePhotos();

  document.querySelector("footer").innerHTML = `<button id="about-us">ABOUT US</button>`;

  addEventListeners();
  function addEventListeners() {
    addEventListenerById("loginBtn", "click", createLoginPage);
    addEventListenerById("registerBtn", "click", createRegisterPage);
  }
}

document.addEventListener("DOMContentLoaded", createHomePage);







