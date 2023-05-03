"use strict";
const homeMain = document.querySelector("main");
const homeHeader = document.querySelector("header");

async function createHomePage() {

  setupPage();
  function setupPage() {
    setElementAttributes(homeMain, "home-main", "");
    clearBackgroundImage();
    clearElementAttributes(homeHeader);
  }

<<<<<<< Updated upstream
  homeHeader.innerHTML = `
  <H1>PHOTO MANAGEMENT</H1>
=======
async function getPhoto() {
  // NOTE, set per page parameter, + add result object to innerhtml
  const per_page = 20;
  const url = `${prefix}curated?per_page=${per_page}`;
>>>>>>> Stashed changes

  <form id="search-form" >
    <label for="search-field"></label>
    <input id="search-field" name="search" type="text">
    <button type="submit">Search</button>
  </form>

  <nav>
    <button id="loginBtn">LOGIN</button>      
    <button id="registerBtn">Sign Up
    </button>      
  </nav>
  `;

<<<<<<< Updated upstream
  homeMain.innerHTML = `
  <section id="home-section-one" class="section">
    <div id="home-photos" class="api-photos"></div>
  </section>

  <section id="home-section-two" class="section">
    <!-- content of the first -->
  </section>

  <section id="home-section-three" class="section">
    <!-- content of the first -->
  </section>
  `;

  async function homePhotos() {
    let per_page = 12;
    let imgSize = "portrait";
    await displayCuratedPhotos(per_page, imgSize);
    await displaySearchTermPhotos(per_page, imgSize)
  }
  homePhotos();

  document.querySelector("footer").innerHTML = `<button id="about-us">ABOUT US</button>`;

  addEventListeners();
  function addEventListeners() {
    addEventListenerById("loginBtn", "click", createLoginPage);
    addEventListenerById("registerBtn", "click", createRegisterPage);
  }
}

document.addEventListener("DOMContentLoaded", createHomePage);







=======
    if (!response.ok) {
      console.log("oops");
    } else {
      // create new array from Photo resource, extracting "photos" key
      const photosObject = resource.photos;
      console.log(photosObject);

      // create new array based on the photo resource extracting the "photo urls" key
      const photoUrls = photosObject.map((object) => {
        return object.src.medium;
      });
      console.log(photoUrls);

      const photosWrapper = document.createElement("div");
      // for each photo, create dom element
      photoUrls.forEach((photo) => {
        const div_dom = document.createElement("div");
        div_dom.innerHTML = `
      <img src="${photo}">
    `;
        photosWrapper.append(div_dom);
      });
      mainHome.append(photosWrapper);
    }
  } catch (error) {
    console.log("add server message to user here");
  }
}

function renderHomePage() {
  getPhoto();
}
>>>>>>> Stashed changes
