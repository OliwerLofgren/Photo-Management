"use strict";
const homeMain = document.querySelector("main");
const homeHeader = document.querySelector("header");

async function createHomePage() {
  // check to see if the user is logged in
  const user = JSON.parse(window.localStorage.getItem("user"));
  if (user) {
    createDiscoverPage(user);
    return;
  }
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
    <!-- content of the first section -->
    <div id="home-photos" class="api-photos"></div>
  </section>

  <section id="home-section-two" class="section">
    <div id="home-photos" class="api-photos"></div>
  </section>

  <section id="home-section-three" class="section">
  </section>
  `;
  function homePhotos() {
    let per_page = 12;
    let imgSize = "portrait";

    // photo dom element creation
    displayCuratedPhotos(per_page, imgSize);
    displaySearchTermPhotos(per_page, imgSize);
  }
  homePhotos();

  document.querySelector(
    "footer"
  ).innerHTML = `<button id="about-us">ABOUT US</button>`;


  addEventListeners();
  function addEventListeners() {
    document.getElementById("loginBtn").addEventListener("click", createLoginPage);
    document.getElementById("registerBtn").addEventListener("click", createRegisterPage);
  }
}
document.addEventListener("DOMContentLoaded", createHomePage);
