"use strict";

async function createDiscoverPage(user) {
  const discoverMain = document.querySelector("main");
  const discoverHeader = document.querySelector("header");

  // setup page
  setupPage();

  const thumbnailImg = document.querySelector(".mini-profile-photo");
  const img = check_if_image_exists(user);
  thumbnailImg.append(img);

  displayDiscoverSectionOnePhotos();

  // add event listeners
  addEventListeners();

  function setupPage() {
    setElementAttributes(discoverMain, "discover-main", "");

    clearElementAttributes(discoverHeader);
    setElementAttributes(discoverHeader, "discover-header", "");

    document.body.classList.remove("body-layout");

    discoverHeader.innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
    <nav>
            <p>${user.username}</p>
            <div id="button_container">
            <div class="mini-profile-photo" class="discover_button"></div>
            <button id="collections-button" class="discover_button">Your Collections</button>
            <button id="logout-button" class="discover_button">Logout</button>
            <button id="search-button" class="discover_button">Search</button>
            <button id="media-button" class="discover_button">Media</button>
            </div>

            </nav>
            `;

    discoverMain.innerHTML = `
    <section id="discover-section-one" class="section">
        <h1>Discover New Inspiration</h1>
      
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
    
    <section id="discover-section-two" class="section">
      <div id="discover-photos" class="api-photos"></div>
    </section>
        `;
  }

  function displayDiscoverSectionOnePhotos() {
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
      .querySelector(".mini-profile-photo")
      .addEventListener("click", function () {
        createProfileGalleryPage(user);
      });
    document
      .getElementById("search-button")
      .addEventListener("click", function () {
        createSearchOrMediaCollectionsPage(user);
      });

    document
      .getElementById("media-button")
      .addEventListener("click", function () {
        createSearchOrMediaCollectionsPage(null, user);
      });

    document
      .getElementById("logout-button")
      .addEventListener("click", function () {
        localStorage.removeItem("user");
        createHomePage();
      });
  }
}
