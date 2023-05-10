"use strict";
const collectionsPageMain = document.querySelector("main");
const collectionsHeader = document.querySelector("header");

// creates dom elements
async function createProfileCollectionsPage(user) {
  setupPage();
  addEventListeners();

  function setupPage() {
    setElementAttributes(collectionsPageMain, "collections-page-main", "user-page-main");
    clearElementAttributes(collectionsHeader);
    setElementAttributes(collectionsHeader, "collections-header", "user-page-header")

    // NOTE: current profile page needs to be marked in css
    collectionsHeader.innerHTML = `
  <H1>P</H1>
    <nav>
      <button id="discover-button">Discover</button>
      <button id="upload-button">Upload</button>
      <button id="logout-button">Logout</button>
  </nav>
  `;
    collectionsPageMain.innerHTML = `
    <section id="collections-section-one" class="section user-section-one">
      <!-- Insert user profile photo here -->
      <div id="profile-bar">
      <div id="profile-picture" class="profile-photo">user profile photo here</div>
      <button>"Change photo" form goes here</button>
      <h3>username placeholder: ${user.username}</h3>
      </div> 
    </section>

  <section id="collections-section-two" class="section user-section-two"> 
  <nav  profile-or-collections-nav>
  <button id="collections-button">Your Collections</button>      
  <button id="profile-button">Profile</button>      
    </nav>

    <div id="profile-photos" class="user-photos"></div>
  </section>`;
  }

  async function displayprofileCollectionsPhotos() {
    // check if current page is profile page
    const collectionsPage = document.getElementById("collections-page-main");
    if (collectionsPage) {
      await displayCuratedPhotos(2, "portrait");
      await displaySearchTermPhotos(2, "portrait");
    }
  }

  function addEventListeners() {
    document
      .getElementById("profile-button")
      .addEventListener("click", function () {
        createProfileGalleryPage(user);
      });

    document
      .getElementById("discover-button")
      .addEventListener("click", function () {
        createDiscoverPage(user);
      });

    document
      .getElementById("logout-button")
      .addEventListener("click", function () {
        localStorage.removeItem("user");
        user = null;
        createHomePage();
      });
  }
}

fetch("../JSON/users.json")
  .then((response) => response.json())
  .then((data) => {
    const saved_photos = data[0].saved_photos;

    for (let i = 0; i < saved_photos.length; i++) {
      const photo = saved_photos[i];
      if (photo.src) {
        const img = document.createElement("img");
        img.src = photo.src;
        img.alt = `Photo ${i + 1}`;
        const img_container = document.createElement("div");
        img_container.classList.add("grid-item");
        img_container.appendChild(img);
        main.appendChild(img_container);
      }
    }
  });
