"use strict";
const profileMain = document.querySelector("main");
const profileHeader = document.querySelector("header");

// creates dom elements
async function createProfileCollectionsPage(user) {
  setupPage();
  // display photos
  // profileCollectionsPhotos();
  addEventListeners();
  addEventListeners();

  function setupPage() {
    setElementAttributes(profileMain, "profile-main", "profile-page");
    clearElementAttributes(profileHeader);

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

      <div id="home-photos" class="api-photos"></div>

      <nav>
        <button id="collections-button">Your Collections</button>      
        <button id="gallery-button">Profile</button>      
      </nav>
    </section>

  <section id="collections-section-two" class="section">
  </section>`;
  }

  async function profileCollectionsPhotos() {
    // check if current page is profile page
    const profilePage = document.getElementById("profile-main");
    if (profilePage) {
      await displayCuratedPhotos(2, "portrait");
      await displaySearchTermPhotos(2, "portrait");
    }
  }

  function addEventListeners() {
    document
      .getElementById("gallery-button")
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
