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
  // setup page
  setupPage();

  // display each section of the page
  displaySectionOneBg();
  displaySectionTwoPhotos();
  displaySectionThreeBg();

  // add event listeners
  addEventListeners();

  function setupPage() {
    setElementAttributes(homeMain, "home-main", "");
    clearBackgroundImage();
    clearElementAttributes(homeHeader);

    homeHeader.innerHTML = `
      <H1>PHOTO MANAGEMENT</H1>
      <nav id="navHome">
      <button id="about-us">ABOUT US</button> /
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
      <h1>Discover endless creative possibilities with our vast collection of images</h1>
    
      <form id="search-form" >
      <label for="search-field"></label>
      <input id="search-field" name="search" type="text">
      <button type="submit">Search</button>
    </form>

    <div>
    <p id="">Title: 
    <button>text</button> 
    <button>text</button>
    <button>text</button>
    <button>text</button>
    </div>
        <div id="home-photos" class="api-photos"></div>
    </section>

      <section id="home-section-three" class="section">
        <h1>Create your own visual world: upload your images, discover new ones, and organize your inspiration</h1>
      </section>

      <section id="home-section-four" class="section">
      <h1>Collect your favorites so you can get back to them later</h1>
    </section>

      <section id="home-section-five" class="section">
      <h1>Sign up to get your ideas</h1>
      <h2>Welcome to Photo Management</h2>
    </section>

    </section>
    `;
  }

  function displaySectionOneBg() {
    let domElement = document.querySelector("#home-section-one");
    const homePage = document.getElementById("home-main");
    if (homePage) {
      displayApiBackgroundImage(1, "original", domElement);
    }
  }

  function displaySectionTwoPhotos() {
    const homePage = document.getElementById("home-main");
    if (homePage) {
      // photo dom element creation
      displayCuratedPhotos(1, "portrait");
      displaySearchTermPhotos(1, "portrait");
    }
  }

  function displaySectionThreeBg() {
    let domElement = document.querySelector("#home-section-three");
    const homePage = document.getElementById("home-main");
    if (homePage) {
      displayApiBackgroundImage(1, "original", domElement);
    }
  }

  function addEventListeners() {
    document.getElementById("loginBtn").addEventListener("click", createLoginPage);
    document.getElementById("registerBtn").addEventListener("click", createRegisterPage);
    document.getElementById("footer").addEventListener("click", createAboutUsPage);
  }
}