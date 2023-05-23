"use strict";

function createHomePage() {
  const homeMain = document.querySelector("main");
  const homeHeader = document.querySelector("header");

  // setup page
  setupPage();

  // display each section of the page
  displaySectionOneBg();
  displaySectionTwoPhotos();
  displaySectionThreeBg();
  displaySectionFiveBg();

  // add event listeners
  addEventListeners();

  function setupPage() {
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
          <form id="search-form" >
          <label for="search-field"></label>
          <input id="search-field" name="search" type="text" placeholder="Explore our collection of photos">
          <button type="submit">Search</button>
        </form>

        <div id="home-photos" class="api-photos"></div>
      </section>

      <section id="home-section-three" class="section bg-img">
        <h1 class="h1-three">Create your own visual world: upload your images, discover new ones, and organize your inspiration</h1>
      </section>

      <section id="home-section-four" class="section">
      <h1 class="h1-four">Collect your favorites so you can get back to them later</h1>
      <div class="circle-home"> <p class="circle-text">Be inspired</p></div>
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

  function displaySectionTwoPhotos() {
    const homePage = document.getElementById("home-main");
    if (homePage) {
      // photo dom element creation
      displayCuratedPhotos(12, "portrait");
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
    // clickedButton.onClick = displayModalWindow("Want more? Create an account or log in to see additional search results, add your favorites to Collections, and save changes.")
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
