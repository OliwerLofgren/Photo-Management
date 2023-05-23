"use strict";

async function createSearchOrMediaCollectionsPage(searchTerm, user) {

  user = getLocalStorageObject("user");

  if (searchTerm == undefined || null || "") {
    const mediaTitlesArray = await createTitleButtons();
    createMediaCollectionsPage(mediaTerm, user);
  } else {
    createSearchPage(searchTerm, user);
  }

  async function createSearchPage(searchTerm, user) {
    setupSearchPage();

    addEventListeners();
    console.log(searchTerm);
    displaySearchSectionTwoPhotos();
    await fetchCollectionsMedia("photos", 20, "z1aw4ls", "portrait");


    async function displaySearchSectionTwoPhotos(searchTerm) {
      const searchPage = document.getElementById("search-page-main");
      if (searchPage) {
        document.querySelector(".api-photos").innerHTML = "";
        await displaySearchTermPhotos(100, "portrait");
      }
    }
  }

  async function createMediaCollectionsPage(user) {
    console.log("no search term input");
    setupMediaPage();
    addEventListeners();

    await fetchCollectionsMedia("photos", 20, "z1aw4ls", "portrait");
  }



  function setupSearchPage() {
    const searchPageMain = document.querySelector("main");
    const searchPageHeader = document.querySelector("header");
    clearElementAttributes(searchPageMain);
    setElementAttributes(searchPageMain, "search-page-main", "");
    clearElementAttributes(searchPageHeader);
    setElementAttributes(searchPageHeader, "search-page-header", "");

    document.body.classList.remove("body-layout");

    // needs a check if logged in user or not!!
    searchPageHeader.innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
    <form id="mini-search-form" class="search-form">
      <label for="search-field"></label>
      <input id="mini-search-field" class="search-field" name="search" type="text">
      <button type="submit">Search</button>
    </form>

    <nav id="navSearch">
    <p>${user.username}</p>
    <div class="mini-profile-photo"></div>
      <button id="discoverBtn">Discover</button> /     
      <button id="collectionsBtn">Your Collections</button> /     
      <button id="profileBtn">Profile</button>  
      <button id="logout-button">Logout</button>
    </nav>
    `;

    searchPageMain.innerHTML = `
    <section id="search-section-one" class="section">
      <div id="search-term-btns" class="title-buttons-container"></div>
    </section>
    
    <!--content of the first section -->
      <section id="search-section-two" class="section">
        <div id="search-page-query-info" class="search-query-info"></div>
        <div id="search-photos" class="api-photos"></div>
      </section>
    `;
  }

  function setupMediaPage() {

    const mediaPageMain = document.querySelector("main");
    const mediaPageHeader = document.querySelector("header");
    clearElementAttributes(mediaPageHeader);
    clearElementAttributes(mediaPageMain);

    setElementAttributes(mediaPageMain, "media-page-main", "");
    setElementAttributes(mediaPageHeader, "media-page-header", "");

    document.body.classList.remove("body-layout");

    // needs a check if logged in user or not!!
    mediaPageHeader.innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
    <form id="mini-search-form" class="search-form">
      <label for="search-field"></label>
      <input id="mini-search-field" class="search-field" name="search" type="text">
      <button type="submit">Search</button>
    </form>

    <nav id="navSearch">
    <p>${user.username}</p>
    <div class="mini-profile-photo"></div>
      <button id="discoverBtn">Discover</button> /     
      <button id="collectionsBtn">Your Collections</button> /     
      <button id="profileBtn">Profile</button>  
      <button id="logout-button">Logout</button>
    </nav>
    `;

    mediaPageMain.innerHTML = `
    <!--content of the first section -->
      <section id="media-section-one" class="section">
        <div id="media-term-btns" class="title-buttons-container">
      </div>
    </section >

      <section id="media-section-two" class="section">
        <div id="media-photos" class="api-photos"></div>
      </section>
    `;
  }

  function addEventListeners() {
    document
      .getElementById("discoverBtn")
      .addEventListener("click", function () {
        createDiscoverPage(user);
      });

    document
      .getElementById("collectionsBtn")
      .addEventListener("click", function () {
        createProfileCollectionsPage(user)
      });

    document
      .getElementById("profileBtn")
      .addEventListener("click", function () {
        createProfileGalleryPage(user)
      });

    document
      .getElementById("logout-button")
      .addEventListener("click", function () {
        localStorage.removeItem("user");
        createHomePage();
      });
    // clickedButton.onClick = displayModalWindow("Want more? Create an account or log in to see additional search results, add your favorites to Collections, and save changes.")
  }

}

