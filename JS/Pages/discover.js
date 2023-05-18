"use strict";

async function createDiscoverPage(user) {

  const discoverMain = document.querySelector("main");
  const discoverHeader = document.querySelector("header");

  // setup page
  setupPage();

  const profile_div = document.querySelector(".mini-profile-photo");
  const img = check_if_image_exists(user);
  profile_div.append(img);

  // display photos
  displaySectionOnePhotos();

  // add event listeners
  addEventListeners();

  function setupPage() {
    setElementAttributes(discoverMain, "discover-main", "");
    clearBackgroundImage();
    clearElementAttributes(discoverHeader);
    document.body.classList.remove("body-layout");

    discoverHeader.innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
    <nav>
            <p>${user.username}</p>
            <div class="mini-profile-photo"></div>
            <button id="collections-button">Your Collections</button>
            <button id="gallery-button">Profile</button>
            <button id="logout-button">Logout</button>
            </nav>
            `;

    discoverMain.innerHTML = `
    <section id="discover-section-one" class="section">
      <div id="discover">
        <h2>Discover New Inspiration</h2>
      </div>
    
      <form id="search-form">
          <label for="search-field"></label>
          <input id="search-field" name="search" type="text">
          <button type="submit">Search</button>
      </form>
    </section>
    
        <section id="discover-section-two" class="section">
            <div id="discover-photos" class="api-photos"></div>
        </section>
        `;
  }

  function displaySectionOnePhotos() {
    // check if current page is discover page
    const discoverPage = document.getElementById("discover-main");
    if (discoverPage) {
      // photo dom element creation
      displayCuratedPhotos(12, "portrait");
      displaySearchTermPhotos(5, "medium");
    }
  }
  function addEventListeners() {
    document
      .getElementById("collections-button")
      .addEventListener("click", function () {
        createProfileCollectionsPage(user);
      });
    document
      .getElementById("gallery-button")
      .addEventListener("click", function () {
        createProfileGalleryPage(user);
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
