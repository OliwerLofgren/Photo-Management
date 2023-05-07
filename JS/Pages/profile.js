"use strict";
const galleryPageMain = document.querySelector("main");
async function createProfileGalleryPage(user) {
  setupPage();
  addEventListeners();

  function setupPage() {
    clearElementAttributes(galleryPageMain);
    setElementAttributes(galleryPageMain, "profile-gallery-main", "profile-page");

    profileHeader.innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
      <nav>
        <button id="discover-button">Discover</button>
        <button id="logout-button">Logout</button>
      </nav>
  `;

    document.querySelector("#profile-gallery-main").innerHTML = `
    <section id="gallery-section-one" class="section">
      <div id="profile-picture" class="profile-photo">user profile photo here</div>
  
      <nav>
        <button id="collections-button">My Collections</button>      
        <button id="gallery-button">Gallery</button>      
      </nav>
    </section >
  
      <section id="gallery-section-two" class="section">
        <div id="gallery-photos" class="gallery-photos"></div>
      </section>
    `;
  }

  function addEventListeners() {
    document.getElementById("collections-button").addEventListener("click", function () {
      createProfileCollectionsPage(user);
    });

    document.getElementById("discover-button").addEventListener("click", function () {
      createDiscoverPage(user);
    });

    document.getElementById("logout-button").addEventListener("click", function () {
      localStorage.removeItem("user");
      user = null;
      createHomePage();
    });
  }
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
