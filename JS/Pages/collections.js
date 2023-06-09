"use strict";

// creates dom elements

async function createProfileCollectionsPage(user) {
  const collectionsPageMain = document.querySelector("main");
  const collectionsHeader = document.querySelector("header");

  setupCollectionsPage();

  const profileImg = document.querySelector("#profile-picture");
  const img = check_if_image_exists(user);
  profileImg.append(img);

  await displayprofileCollectionsPhotos(user);
  addEventListeners();

  function setupCollectionsPage() {
    setElementAttributes(
      collectionsPageMain,
      "collections-page-main",
      "user-page-main"
    );
    clearElementAttributes(collectionsHeader);
    setElementAttributes(
      collectionsHeader,
      "collections-header",
      "user-page-header"
    );

    // apply layout
    document.body.classList.add("body-layout");

    collectionsHeader.innerHTML = `
   <H1>PHOTO MANAGEMENT</H1>
      <nav class="nav-profile-collection">
        <button class="allBtn discover_button "id="logout-button">Logout</button>
        <button class="allBtn discover_button" id="discover-button">Discover</button>
    </nav>
    `;
    // added class collection
    collectionsPageMain.innerHTML = `
    <section id="collections-section-one" class="user-section-one">
      <div id="profile-picture" class="profile-photo userPage"></div>
      <h3>${user.username}</h3>
    </section>

    <section id="collections-section-two" class="section user-section-two">

    <nav profile-or-collections-nav>
        <button id="collections-button" class="activeBtn collections-button" onclick="btnFunc1()">Your
            Collections</button>
        <button id="profile-button" class="deactiveBtn btnDeactivated" onclick="btnFunc2()">Profile</button>
    </nav>
      <div id="result"></div>
      <div id="message_container"></div>
      <div id="collections-photos" class="user-page-photos"></div>
    </section>`;
  }

  async function displayprofileCollectionsPhotos(user) {
    // check if current page is profile page
    const collectionsPage = document.getElementById("collections-page-main");
    if (collectionsPage) {
      await displayCollectedPhotos(user);
    }
  }

  function addEventListeners() {
    // remove flex layout when navigating to other pages

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
        location.reload();
        localStorage.removeItem("user");
        createHomePage();
      });
  }
}
