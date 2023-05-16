"use strict";

const homeMain = document.querySelector("main");
const homeHeader = document.querySelector("header");

function createHomePage() {
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
    clearElementAttributes(homeHeader);

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
      <h1>Discover endless creative possibilities with our vast collection of images</h1>
          <form id="search-form" >
          <label for="search-field"></label>
          <input id="search-field" name="search" type="text" placeholder="Explore our collection of photos">
          <button type="submit">Search</button>
        </form>

        <div>
        <h3 id="">Title:</h3> 
        </div>
        <div id="home-photos" class="api-photos"></div>
      </section>

      <section id="home-section-three" class="section bg-img">
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
      displayApiBackgroundImage(7, "original", domElement);
    }
  }

  function displaySectionTwoPhotos() {
    const homePage = document.getElementById("home-main");
    if (homePage) {
      // photo dom element creation
      displayCuratedPhotos(3, "portrait");
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

