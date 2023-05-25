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
  await handleDiscoverPageSearch();

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
        <div id="button_container">
            <button id="collections-button" class="discover_button">Your Collections</button>
            <button id="logout-button" class="discover_button">Logout</button>
            <button id="explore-button" class="discover_button">Explore</button>
            <div id="discover_profile_container">
          </div>
          <div class="mini_profile_container">
            <div class="mini-profile-photo"></div>
            <p>${user.username}</p>
          </div>
        </div>
    </nav>
            `;

    discoverMain.innerHTML = `
    <section id="discover-section-one">
    <form id="big-search-form" class="search-form">
    <label for="search-field"></label>
    <input id="big-search-field" class="search-field" name="search" placeholder="Explore our library of photos" type="text">
    <button type="submit">Search</button>
</form>
    </section>

    <section id="discover-section-two" class="section">
        <div id="discover-photos" class="api-photos"></div>
    </section>
        `;
  }

  async function displayDiscoverSectionOnePhotos() {
    // check if current page is discover page
    let discoverPage = document.getElementById("discover-main");
    if (discoverPage) {
      // photo dom element creation
      await displayCuratedPhotos(20, "portrait", user);
    }
  }

  async function handleDiscoverPageSearch() {
    let discoverPage = document.getElementById("discover-main");
    if (discoverPage) {
      await fetchAndDisplaySearchedPhotos(100, "portrait", user);
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
      .getElementById("explore-button")
      .addEventListener("click", function () {
        createSearchOrMediaCollectionsPage(null, null, user);
      });

    document
      .getElementById("logout-button")
      .addEventListener("click", function () {
        localStorage.removeItem("user");
        createHomePage();
      });
  }
}
