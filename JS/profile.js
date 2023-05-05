"use strict";
const profileMain = document.querySelector("main");
const profileHeader = document.querySelector("header");

// creates profileSaved dom elements
async function createProfileCollectionsPage(data) {
  setupPage();
  function setupPage() {
    setElementAttributes(profileMain, "profile-main", "profile-page");
    clearElementAttributes(profileHeader);
  }

  // NOTE: current profile page needs to be marked in css
  profileHeader.innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
      <nav>
        <button id="collections-profile-button">My Collections</button>      
        <button id="portfolio-profile-button">Profile</button>     
         
      </nav>

      <nav>
        <button id="discover-button">Discover</button>
        <button id="logout-button">Logout</button>
    </nav>
  `;
  profileMain.innerHTML = `
    <section id="profile-section" class="section">
      <div id="profile-photos" class="api-photos"></div>
    </section>
  `;

  addEventListenerById("portfolio-profile-button", "click", function () {
    createProfilePortfolioPage(data);
  });

  addEventListenerById("discover-button", "click", function () {
    createDiscoverPage(data);
  });

  addEventListenerById("logout-button", "click", createHomePage);

  /*setElementAttributes(profilePhotosWrapper, "profile-photos", "api-photos");*/
}

const uploadPageMain = document.querySelector("main");
async function createProfilePortfolioPage(data) {
  setupPage();
  function setupPage() {
    profileHeader.innerHTML = `
    <form id="form_upload" action="/PHP/profile.php" method="POST" enctype="multipart/form-data">
                <input type="file" name="upload">
                <button type="submit">Upload</button>
            </form>
            <div id="result"></div>
    `;
    const result = document.getElementById("result");
    const form = document.getElementById("form_upload");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      // Remove previously uploaded image

      const formData = new FormData(form);
      const request = new Request("../PHP/profile.php", {
        method: "POST",
        body: formData,
      });

      fetch(request)
        .then((response) => response.json())
        .then((data) => {
          // This simply resets the form.
          form.reset();
          console.log(data);
          console.log(data[0].src);

          if (data.error) {
            result.textContent = "An error occurred: " + data.error;
          } else {
            result.textContent = "Successfully uploaded the image";
            const img_container = document.createElement("div");
            const img = document.createElement("img");

            img.src = data[0].src;
            img_container.appendChild(img);
            profileMain.appendChild(img_container);
          }
        });
    });
    clearElementAttributes(uploadPageMain);
    setElementAttributes(uploadPageMain, "profile-upload-main", "profile-page");
  }

  addEventListenerById("collections-profile-button", "click", function () {
    createProfileCollectionsPage(data);
  });

  addEventListenerById("discover-button", "click", function () {
    createDiscoverPage(data);
  });

  addEventListenerById("logout-button", "click", createHomePage);
}

//Display all images that are saved from discover

//Display all images that you have uploaded

//This php-code should is intended for index.html

// $filename = "photo.json";
// $photos = [];

// if (file_exists($filename)) {
//     $json = file_get_contents($filename);
//     $photos = json_decode($json, true);
// }

// foreach ($photos as $photo) {
//     $src = $photo["src"];
//     echo "<img src='$src'>";
// }

//Display your profile picture
