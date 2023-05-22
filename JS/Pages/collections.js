"use strict";

// creates dom elements
async function createProfileCollectionsPage(user) {
  const collectionsPageMain = document.querySelector("main");
  const collectionsHeader = document.querySelector("header");

  setupPage();

  const profile_div = document.querySelector("#profile-picture");
  const img = check_if_image_exists(user);
  profile_div.append(img);


  displayprofileCollectionsPhotos();
  addEventListeners();

  function setupPage() {
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

    // NOTE: current profile page needs to be marked in css
    collectionsHeader.innerHTML = `
  <H1>Photo Management</H1>
    <nav>
      <button id="discover-button">Discover</button>
      <button id="logout-button">Logout</button>
  </nav>
 
`;

    collectionsPageMain.innerHTML = `
    <section id="collections-section-one" class="user-section-one">
    <div id="profile-picture" class="profile-photo"></div>
    <h3>${user.username}</h3>
    <div id="profile_container">
    <form id="form_profile_upload" action="../PHP/profile_pics.php" method="POST" enctype="multipart/form-data">
   <input type="file" name="upload">
   <button type="submit">Upload</button>
  </form> 
  <div id="profile_result"></div> 
    </div> 
    </section>

  <section id="collections-section-two" class="section user-section-two"> 

  <nav  profile-or-collections-nav>
  <button id="collections-button" class="activeBtn" onclick="btnFunc1()">Your Collections</button>      
  <button id="profile-button"  class="deactiveBtn btnDeactivated" onclick="btnFunc2()">Profile</button>      
    </nav>

    <div id="collections-photos" class="user-page-photos"></div>
  </section>`;
  }

  /** */
  const profile_form = document.getElementById("form_profile_upload");
  const profile_result = document.getElementById("profile_result");
  profile_form.addEventListener("submit", async function (event) {
    event.preventDefault();
    // Remove previously uploaded image

    const formData = new FormData(profile_form);
    formData.append("logged_in_id", user.id);
    const request = new Request("../PHP/profile_pics.php", {
      method: "POST",
      body: formData,
    });

    try {
      const response = await fetch(request);
      const data = await response.json();
      // This simply resets the form.
      profile_form.reset();
      console.log(data);
      if (data.error) {
        profile_result.textContent = "An error occurred: " + data.error;
      } else {
        profile_result.textContent =
          "Your profile picture has successfully been added";
        await get_profile_picture(profile_div, user);
      }
    } catch (error) {
      profile_result.textContent = "An error occurred!" + error;
    }
  });

  async function displayprofileCollectionsPhotos() {
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
        localStorage.removeItem("user");
        createHomePage();
      });
  }
}
