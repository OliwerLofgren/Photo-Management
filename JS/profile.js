"use strict";
const profileMain = document.querySelector("main");
const profileHeader = document.querySelector("header");

async function createProfilePage(data) {
  setupPage();
  function setupPage() {
    clearElementAttributes(profileMain);
    setElementAttributes(profileMain, "profile-main", "profile-page");
    clearElementAttributes(profileHeader);
  }

  // NOTE: current profile page needs to be marked in css 
  profileHeader.innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
      <nav>
        <button id="inspo-button">Inspo</button>      
        <button id="upload-button">Upload</button>      
      </nav>

      <nav>
        <button id="discover-button">Discover</button>
        <button id="logout-button">Logout</button>
    </nav>
  `;
  profileMain.innerHTML = `
    <section id="profile-section" class="section">
      <div id="profile-photos" class="api-photos"></div>
    </section>
  `;

  addEventListenerById("upload-button", "click", function () {
    createProfileUploadPage(data)
  });

  addEventListenerById("discover-button", "click", function () { createDiscoverPage(data) });

  addEventListenerById("logout-button", "click", createHomePage);

  /*setElementAttributes(profilePhotosWrapper, "profile-photos", "api-photos");*/
}

const uploadPageMain = document.querySelector("main");
async function createProfileUploadPage(data) {
  setupPage();
  function setupPage() {
    clearElementAttributes(uploadPageMain);
    setElementAttributes(uploadPageMain, "profile-upload-main", "profile-page");
  }

  addEventListenerById("inspo-button", "click", function () {
    createProfilePage(data);
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
