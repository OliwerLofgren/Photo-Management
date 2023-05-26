"use strict";

function createHomePage() {
  const homeMain = document.querySelector("main");
  const homeHeader = document.querySelector("header");

  // setup page
  setupHomePage();

  // display each section of the page
  /* displaySectionOneBg();
   displaySectionTwoPhotos();
   displaySectionThreeBg();
   displaySectionFiveBg();*/

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
        <button id="aboutBtn" class="discover_button">About Us</button> 
        <button id="loginBtn" class="discover_button">Log In</button> 
        <button id="registerBtn" class="discover_button">Sign Up</button>
    </nav>
    `;

    homeMain.innerHTML = `
    <section id="home-section-one" class="section bg-img">
    <!-- content of the first section -->
      <h1 class="h1-one">Unleash your creativity <button class="AboutBtn discover_button">ABOUT US</button></h1>
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
      <h1 class="h1-five">Sign up to get your ideas <button class="RegisterBtn discover_button">REGISTER</button></h1>
    </section>

    </section>
    `;
  }

  /*function displaySectionOneBg() {
    let domElement = document.querySelector("#home-section-one");
    const homePage = document.getElementById("home-main");
    if (homePage) {
      displayApiBackgroundImage(10, "original", domElement);
    }
  }*/

  /*async function displaySectionTwoPhotos() {
    const homePage = document.getElementById("home-main");
    if (homePage) {
      // photo dom element creation
      await displayCuratedPhotos(18, "portrait", user);
    }
  }*/

  //   /*function displaySectionThreeBg() {
  //     let domElement = document.querySelector("#home-section-three");
  //     const homePage = document.getElementById("home-main");

  //   function addEventListeners() {
  //     document
  //       .getElementById("loginBtn")
  //       .addEventListener("click", createLoginPage);
  //     document
  //       .getElementById("registerBtn")
  //       .addEventListener("click", createRegisterPage);
  //     document
  //       .getElementById("aboutBtn")
  //       .addEventListener("click", createAboutUsPage);
  //     document
  //       .querySelector(".AboutBtn")
  //       .addEventListener("click", createAboutUsPage);
  //     document
  //       .querySelector(".RegisterBtn")
  //       .addEventListener("click", createRegisterPage);
  //   }
}
