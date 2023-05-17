"use strict";

async function createSearchOrMediaCollectionsPage(searchTerm) {

  const searchPageMain = document.querySelector("main");
  const searchPageHeader = document.querySelector("header");

  setupPage();

  if (searchTerm === "") {
    createMediaCollectionsPage();
  } else {
    createSearchPage(searchTerm);
  }

  async function createSearchPage(searchTerm) {
    console.log(searchTerm);
    displaySectionTwoPhotos();

    function displaySectionTwoPhotos() {
      const searchPage = document.getElementById("search-page-main");
      document.querySelector(".api-photos").innerHTML = "";
      if (searchPage) {
        displaySearchTermPhotos(12, "portrait");
      }
    }
  }

  async function createMediaCollectionsPage() {
    console.log("no search term input");
    setupPage();

    await fetchCollectionsMedia("photos", 20, "z1aw4ls", "portrait");
  }
  function setupPage() {
    setElementAttributes(searchPageMain, "search-page-main", "");
    clearBackgroundImage();
    clearElementAttributes(searchPageHeader);
    document.body.classList.remove("body-layout");

    // needs a check if logged in user or not!!
    searchPageHeader.innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
    <nav id="navSearch">
    <form id="search-form" >
    <label for="search-field"></label>
    <input id="search-field" name="search" type="text">
    <button type="submit">Search</button>
  </form>

      <button id="loginBtn">LOGIN</button> /     
      <button id="registerBtn">REGISTER</button>      
    </nav>
  `;

    searchPageMain.innerHTML = `
    <section id="search-section-one" class="section">
      <!-- content of the first section -->
      <button>search term</button> 
      <button>search term</button>
      <button>search term</button>
      <button>search term</button>
    </section>

    <section id="search-section-two" class="section">
    <div id="discover-photos" class="api-photos"></div>
</section>
  `;
  }
}

