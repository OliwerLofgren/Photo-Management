"use strict";
const profileMain = document.querySelector("main");
const profileHeader = document.querySelector("header");

// creates profileSaved dom elements
async function createProfileCollectionsPage(data) {
  setupPage();
  function setupPage() {
    setElementAttributes(profileMain, "profile-main", "profile-page");
    clearElementAttributes(profileHeader);
  }

  // NOTE: current profile page needs to be marked in css 
  profileHeader.innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
      <nav>
        <button id="discover-button">Discover</button>
        <button id="logout-button">Logout</button>
    </nav>
  `;

  profileMain.innerHTML = `
  <section id="collections-section-one" class="section">
  <!-- Insert user profile photo here -->
    <div id="profile-picture" class="profile-photo">-user profile photo here</div>

    <nav>
      <button id="collections-button">My Collections</button>      
      <button id="portfolio-button">Profile</button>      
    </nav>
  </section>

  <section id="collections-section-two" class="section">
      <div id="profile-photos" class="api-photos"></div>
  </section>
`;

  function profileCollectionsPhotos() {
    let per_page = 2;
    let imgSize = "portrait";
    displayCuratedPhotos(per_page, imgSize);
    displaySearchTermPhotos(per_page, imgSize);
  }
  profileCollectionsPhotos();


  addEventListenerById("portfolio-profile-button", "click", function () {
    createProfilePortfolioPage(data)
  });

  addEventListenerById("portfolio-button", "click", function () {
    createProfilePortfolioPage(data)
  });

  addEventListenerById("discover-button", "click", function () { createDiscoverPage(data) });

  addEventListenerById("logout-button", "click", createHomePage);

  /*setElementAttributes(profilePhotosWrapper, "profile-photos", "api-photos");*/
}

const uploadPageMain = document.querySelector("main");
async function createProfilePortfolioPage(data) {
  setupPage();
  function setupPage() {
    clearElementAttributes(uploadPageMain);
    setElementAttributes(uploadPageMain, "profile-upload-main", "profile-page");
  }

  document.querySelector("#profile-upload-main").innerHTML = `
  
  <section id="portfolio-section-one" class="section">
  <!-- Insert user profile photo here -->
    <div id="profile-picture" class="profile-photo">-user profile photo here</div>

    <nav>
      <button id="collections-button">My Collections</button>      
      <button id="portfolio-button">Profile</button>      
    </nav>
  </section>

  <section id="portfolio-section-two" class="section">
      <div id="profile-photos" class="api-photos"></div>
  </section>`

  addEventListenerById("collections-button", "click", function () {
    createProfileCollectionsPage(data);
  });

  addEventListenerById("discover-button", "click", function () {
    createDiscoverPage(data);
  });

  addEventListenerById("logout-button", "click", createHomePage);
}

//Display all images that are saved from discover

//Display all images that you have uploaded

//This php-code should is intended for index.html

// $filename = "photo.json";
// $photos = [];

// if (file_exists($filename)) {
//     $json = file_get_contents($filename);
//     $photos = json_decode($json, true);
// }

// foreach ($photos as $photo) {
//     $src = $photo["src"];
//     echo "<img src='$src'>";
// }

//Display your profile picture
