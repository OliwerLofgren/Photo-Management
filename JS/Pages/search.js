"use strict";

async function createSearchOrMediaCollectionsPage(searchTerm, user) {
  user = getLocalStorageObject("user");
  if (!user) {
    console.error("User data not found.");
    return;
  }

  if (searchTerm == undefined || searchTerm == null || searchTerm === "") {
    createMediaCollectionsPage(user);
  } else {
    createSearchPage(searchTerm, user);
  }

  async function createSearchPage(user) {
    setupSearchPage();

    addEventListeners();

    await displaySearchSectionTwoPhotos();

    async function displaySearchSectionTwoPhotos() {
      const searchPage = document.getElementById("search-page-main");
      if (searchPage) {
        const apiPhotos = document.querySelector(".api-photos");
        if (apiPhotos) {
          apiPhotos.innerHTML = "";
          await fetchAndDisplaySearchedPhotos(100, "portrait", user);
        } else {
          console.error("API photos container not found.");
        }
      } else {
        console.error("Search page container not found.");
      }
    }

    function setupSearchPage() {
      const searchPageMain = document.querySelector("main");
      const searchPageHeader = document.querySelector("header");
      clearElementAttributes(searchPageMain);
      setElementAttributes(searchPageMain, "search-page-main", "");
      clearElementAttributes(searchPageHeader);
      setElementAttributes(searchPageHeader, "search-page-header", "");

      document.body.classList.remove("body-layout");

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
          <button id="discoverBtn" class="discover_button">Discover</button> 
          <button id="collectionsBtn" class="discover_button">Your Collections</button> 
          <button id="profileBtn" class="discover_button">Profile</button>
          <button id="explore-button" class="discover_button">Explore</button>
          <button id="logout-button" class="discover_button">Logout</button>
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

    document
      .getElementById("explore-button")
      .addEventListener("click", function () {
        createSearchOrMediaCollectionsPage(null, user);
      });
  }

  async function createMediaCollectionsPage(user) {
    console.log(
      "No query was input, user is redirected to media collections page."
    );

    setupMediaPage();
    addEventListeners();

    await displayMediaSectionTwoPhotos();

    async function displayMediaSectionTwoPhotos() {
      createTitleButtons();
      const mediaKeys = await extractMediaTerms();
      const randomMediaId = mediaKeys.slice(1, 2);
      let title = randomMediaId[0].title;
      let id = randomMediaId[0].id;
      let photosCount = randomMediaId[0].photosCount;

      const mediaPage = document.getElementById("media-section-one");
      if (mediaPage) {
        document.querySelector(".api-photos").innerHTML = "";
        await displayMediaCollectionPhotos(
          "photos",
          photosCount,
          id,
          "portrait",
          user
        );
      }

      const mediaQueryinfo = document.querySelector(".search-query-info");
      mediaQueryinfo.innerHTML = `  
      <h3>${title}</h2>
      <p class="matching-results">${photosCount} Photos Found</p>`;
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

      <nav id="navSearch">
          <p>${user.username}</p>
          <div class="mini-profile-photo"></div>
          <button id="discoverBtn" class="discover_button">Discover</button> /
          <button id="collectionsBtn" class="discover_button">Your Collections</button> /
          <button id="profileBtn" class="discover_button">Profile</button>
          <button id="logout-button" class="discover_button">Logout</button>
      </nav>
  `;

      mediaPageMain.innerHTML = `
      <!--content of the first section -->
      <section id="media-section-one" class="section">
          <div id="media-term-btns" class="title-buttons-container">
          </div>
      </section>
  
      <section id="media-section-two" class="section">
          <div id="media-page-info" class="search-query-info"></div>
          <div id="media-photos" class="api-photos"></div>
      </section>
  `;
    }
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
        createProfileCollectionsPage(user);
      });

    document
      .getElementById("profileBtn")
      .addEventListener("click", function () {
        createProfileGalleryPage(user);
      });

    document
      .getElementById("logout-button")
      .addEventListener("click", function () {
        localStorage.removeItem("user");
        createHomePage();
      });
  }
}

async function extractMediaTerms() {
  // creates the ids with possible media collections
  const mediaCollectionsArray = await getCollectionsIds();
  shuffle(mediaCollectionsArray);

  const clonedShuffledArray = mediaCollectionsArray.slice(1, 15);
  return clonedShuffledArray;
}

async function createTitleButtons() {
  // query select container for collection title buttons
  const titleBtnsContainer = document.querySelector(".title-buttons-container");

  let clonedShuffledArray = await extractMediaTerms();

  clonedShuffledArray.forEach((collection) => {
    const collectionTitleBtn = document.createElement("button");
    let collectionTitle = collection.title;
    collectionTitleBtn.textContent = collectionTitle;
    titleBtnsContainer.append(collectionTitleBtn);
  });
  /*console.log(`Current collection has the title: ${collection.title} with the id: ${collection.id} and contains ${collection.photosCount} photos`);*/
  return clonedShuffledArray;
}
