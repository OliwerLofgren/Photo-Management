"use strict";
const galleryPageMain = document.querySelector("main");
async function createProfileGalleryPage(user) {
  setupPage();
  addEventListeners();

  function setupPage() {
    clearElementAttributes(galleryPageMain);
    setElementAttributes(
      galleryPageMain,
      "profile-gallery-main",
      "profile-page"
    );

    profileHeader.innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
      <nav>
        <button id="discover-button">Discover</button>
        <button id="logout-button">Logout</button>
      </nav>
  `;

    document.querySelector("#profile-gallery-main").innerHTML = `
    <section id="gallery-section-one" class="section">
      <div id="profile-picture" class="profile-photo">user profile photo here</div>
  
      <nav>
        <button id="collections-button">My Collections</button>      
        <button id="gallery-button">Gallery</button>      
      </nav>
    </section >
  
      <section id="gallery-section-two" class="section">
        <div id="gallery-photos" class="gallery-photos"></div>
      </section>
    `;
  }
  const result = document.getElementById("result");
  const form = document.getElementById("form_upload");

  profileHeader.innerHTML = `
  <form id="form_upload" action="../PHP/profile.php" method="POST" enctype="multipart/form-data">
    <input type="file" name="upload">
    <button type="submit">Upload</button>
  </form>
  <div id="result"></div>
`;
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

        if (data.error) {
          result.textContent = "An error occurred: " + data.error;
        } else {
          result.textContent = "Successfully uploaded the image";
        }
      });
  });

  fetch("../JSON/users.json")
    .then((response) => response.json())
    .then((data) => {
      const uploadedPhotos = data[0].uploaded_photos;

      for (let i = 0; i < uploadedPhotos.length; i++) {
        const photo = uploadedPhotos[i];
        if (photo.src) {
          const img = document.createElement("img");
          img.src = photo.src;
          img.alt = `Photo ${i + 1}`;
          const img_container = document.createElement("div");
          img_container.classList.add("grid-item");
          img_container.appendChild(img);
          main.appendChild(img_container);
        }
      }
    });

  function addEventListeners() {
    document
      .getElementById("collections-button")
      .addEventListener("click", function () {
        createProfileCollectionsPage(user);
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
        user = null;
        createHomePage();
      });
  }
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
