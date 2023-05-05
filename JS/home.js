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
  <nav id="navHome">
    <button id="loginBtn">LOGIN</button> /     
    <button id="registerBtn">REGISTER</button>      
  </nav>
  `;

  homeMain.innerHTML = `
  <section id="home-section-one" class="section">
    <!-- content of the first section -->
    <div id="intro">
      <h1>Unleash your creativity</h1>
      <button>Learn more</button>
    </div>
  </section>

  <section id="home-section-two" class="section"> 
    <h1>Discover endless creative possibilities with our vast collection of images
    </h1>

    <form id="search-form" >
      <label for="search-field"></label>
      <input id="search-field" name="search" type="text">
     <button type="submit">Search</button>
    </form>

    <div id="home-photos" class="api-photos"></div>
  </section>

  <section id="home-section-three" class="section">
  <h2>Create your own visual world with our platform: upload your images, discover new ones, and organize your inspiration</h2>
  </section>
  `;

  // set bg img from api photo
  function SectionOnePhotos() {
    let per_page = 1;
    let imgSize = "original";
    let domElement = document.querySelector("#home-section-one");

    const homePage = document.getElementById("home-main");
    if (homePage) {
      displayApiBackgroundImage(per_page, imgSize, domElement);
    }
  } SectionOnePhotos();

  function SectionTwoPhotos() {
    const homePage = document.getElementById("home-main");
    if (homePage) {
      let per_page = 12;
      let imgSize = "portrait";
      // photo dom element creation
      displayCuratedPhotos(per_page, imgSize);
      displaySearchTermPhotos(per_page, imgSize);
    }
  } SectionTwoPhotos();

  // set bg img from api photo
  function SectionThreePhotos() {
    let per_page = 1;
    let imgSize = "original";
    let domElement = document.querySelector("#home-section-three");
    const homePage = document.getElementById("home-main");
    if (homePage) {
      displayApiBackgroundImage(per_page, imgSize, domElement);
    }
  } SectionThreePhotos();


  //document.querySelector("footer").innerHTML = `<button id="about-us">ABOUT US</button>`;

  addEventListeners();
  function addEventListeners() {
    document.getElementById("loginBtn").addEventListener("click", createLoginPage);
    document.getElementById("registerBtn").addEventListener("click", createRegisterPage);
  }
}
document.addEventListener("DOMContentLoaded", createHomePage);
