"use strict";

function createHomePage() {
  const homeMain = document.querySelector("main");
  const homeHeader = document.querySelector("header");

  // setup page
  setupHomePage();

  // display each section of the page
  displaySectionOneBg();
  displaySectionTwoPhotos();
  displaySectionThreeBg();
  displaySectionFiveBg();

  // add event listeners
  addEventListeners();

  function setupHomePage() {
    setElementAttributes(homeMain, "home-main", "");
    clearElementAttributes(homeHeader);
    setElementAttributes(homeHeader, "home-header", "");
    document.body.classList.remove("body-layout");

    homeHeader.innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
    <nav id="navHome">
        <button id="aboutBtn">About Us</button> /
        <button id="loginBtn">Log In</button> /
        <button id="registerBtn">Sign Up</button>
    </nav>
    `;

    homeMain.innerHTML = `
    <section id="home-section-one" class="section bg-img">
    <!-- content of the first section -->

      <h1>Unleash your creativity</h1>

      <button>Learn more</button>
    </section>

    <section id="home-section-two" class="section">
      <h1 class="h1-two">Discover endless creative possibilities with our vast collection of images</h1>
      <div id="home-photos" class="api-photos"></div>
    </section>

    <section id="home-section-three" class="section bg-img">
      <h1 class="h1-three">Create your own visual world: upload your images, discover new ones, and organize your
        inspiration</h1>
    </section>

    <section id="home-section-four" class="section">
      <h1 class="h1-four">Collect your favorites so you can get back to them later</h1>
      <div class="bookmarkHome">
      <i class="fa-regular fa-bookmark" id="markHome" style="color: #000000;"></i>
      <i class="fa-solid fa-bookmark" id="markHome" style="color: #f50000;"></i>
      </div>
    </section>

    <section id="home-section-five" class="section bg-img">
      <h1 class="h1-five">Sign up to get your ideas</h1>
    </section>

    </section>
    `;
  }

  function displaySectionOneBg() {
    let domElement = document.querySelector("#home-section-one");
    const homePage = document.getElementById("home-main");
    if (homePage) {
      displayApiBackgroundImage(7, "original", domElement);
    }
  }

  async function displaySectionTwoPhotos() {
    const homePage = document.getElementById("home-main");
    if (homePage) {
      // photo dom element creation
      await displayCuratedPhotos(18, "portrait", user);
    }
  }

  function displaySectionThreeBg() {
    let domElement = document.querySelector("#home-section-three");
    const homePage = document.getElementById("home-main");
    if (homePage) {
      displayApiBackgroundImage(1, "original", domElement, user);
    }
  }

  function displaySectionFiveBg() {
    let domElement = document.querySelector("#home-section-five");
    const homePage = document.getElementById("home-main");
    if (homePage) {
      displayApiBackgroundImage(6, "original", domElement);
    }
  }

  function addEventListeners() {
    document
      .getElementById("loginBtn")
      .addEventListener("click", createLoginPage);
    document
      .getElementById("registerBtn")
      .addEventListener("click", createRegisterPage);
    document
      .getElementById("aboutBtn")
      .addEventListener("click", createAboutUsPage);
  }
}

//  <div class="trendingContainer">
//         <h3 id="" class="trending">Trending:</h3>
//         <div class="alt">Dog</div>
//         <div class="alt">Fire</div>
//         <div class="alt">Mountain</div>
//         </div>

//<div class="circle-home">
// <p class="circle-text">Be inspired</p>
//</div> 