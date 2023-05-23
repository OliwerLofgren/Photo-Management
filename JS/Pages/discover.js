"use strict";

async function createDiscoverPage(user) {
  const discoverMain = document.querySelector("main");
  const discoverHeader = document.querySelector("header");

  // setup page
  setupDiscoverPage();

  const thumbnailImg = document.querySelector(".mini-profile-photo");
  const img = check_if_image_exists(user);
  thumbnailImg.append(img);

  await displayDiscoverSectionOnePhotos();

  // add event listeners
  addEventListeners();

  function setupDiscoverPage() {
    setElementAttributes(discoverMain, "discover-main", "");

    clearElementAttributes(discoverHeader);
    setElementAttributes(discoverHeader, "discover-header", "");

    document.body.classList.remove("body-layout");

    discoverHeader.innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
    <nav>
            <p>${user.username}</p>
            <div class="mini-profile-photo"></div>
            <button id="collections-button">Your Collections</button>
            <button id="gallery-button">Profile</button>
            <button id="logout-button">Logout</button>
            <button id="search-button">Search</button>
            <button id="explore-button">Explore</button>

            </nav>
            `;

    discoverMain.innerHTML = `
    <section id="discover-section-one" class="section">
  </section>
    
    <section id="discover-section-two" class="section">
      <div id="discover-photos" class="api-photos"></div>
    </section>
        `;
  }

  async function displayDiscoverSectionOnePhotos() {
    // check if current page is discover page
    const discoverPage = document.getElementById("discover-main");
    if (discoverPage) {
      // photo dom element creation
      await displayCuratedPhotos(20, "portrait");
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
      .getElementById("explore-button")
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
