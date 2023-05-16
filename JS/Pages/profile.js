"use strict";

const profilePageMain = document.querySelector("main");
const profilePageHeader = document.querySelector("header");
const section_two_main = document.querySelector(".profile-or-collections-nav");

async function createProfileGalleryPage(user) {
  setupPage();
  addEventListeners();
  get_all_images();
  const profile_div = document.querySelector("#profile-picture");
  get_profile_picture(profile_div);
  function setupPage() {
    clearElementAttributes(profilePageMain);
    setElementAttributes(profilePageMain, "profile-main", "user-page-main");
    setElementAttributes(
      profilePageHeader,
      "profile-header",
      "user-page-header"
    );
    // NOTE: current profile page needs to be marked in css

    profilePageHeader.innerHTML = `
    <H1>P</H1>
      <nav>
      <button id="discover-button">Discover</button>
      <button id="upload-button">Upload</button>
      <button id="logout-button">Logout</button>
      </nav>
  `;

    profilePageMain.innerHTML = `
    <!-- Insert user profile section here -->
    <section id="profile-section-one" class="section user-section-one">
    <div id="profile-bar">
    <form id="form_profile_upload" action="../PHP/upload.php" method="POST" enctype="multipart/form-data">
     <input type="file" name="upload">
     <button type="submit">Upload</button>
    </form> 
    <div id="profile_result"></div>   
    <h3>${user.username}</h3>
    </div> 
    </section >
  

      <section id="profile-section-two" class="section user-section-two">
      <nav class="profile-or-collections-nav">
      <button id="collections-button">Your Collections</button>      
      <button id="profile-button">Profile</button>   
      <form id="form_upload" action="../PHP/profile_pics.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="upload">
        <button type="submit">Upload</button>
      </form>
      <div id="result"></div>   
    </nav>

        <div id="profile-uploaded-photos" class="user-page-photos"></div>
      </section>
    `;
  }
  const profile_form = document.getElementById("form_profile_upload");
  const profile_result = document.getElementById("profile_result");
  profile_form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Remove previously uploaded image

    const formData = new FormData(profile_form);
    const request = new Request("../PHP/profile_pics.php", {
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
          profile_result.textContent = "An error occurred: " + data.error;
        } else {
          profile_result.textContent =
            "Your profile picture has successfully been added";
          get_profile_picture();
        }
      });
  });

  const result = document.getElementById("result");
  const form = document.getElementById("form_upload");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Remove previously uploaded image

    const formData = new FormData(form);
    const request = new Request("../PHP/upload.php", {
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
          get_one_images();
        }
      });
  });

  function get_one_images() {
    fetch("../JSON/users.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const uploaded_photos = data[0].uploaded_photos;
        const latest_uploaded_photo =
          uploaded_photos[uploaded_photos.length - 1];

        const container = document.createElement("div");
        //Lägg till klassen api-photos
        container.classList.add("container");
        const grid_container = document.createElement("div");
        grid_container.classList.add("grid_container");

        const photo_url = latest_uploaded_photo.photo;
        const img = document.createElement("img");
        img.classList.add("photo_image");
        img.src = photo_url;

        const button_delete = document.createElement("button");
        button_delete.innerText = "DELETE";
        button_delete.classList.add("delete");
        button_delete.addEventListener("click", () => {
          delete_photo(latest_uploaded_photo.photo_id, photo_url);
        });

        const photo_containers = document.createElement("div");
        photo_containers.classList.add("photo-containers");
        photo_containers.appendChild(button_delete);
        photo_containers.appendChild(img);
        container.appendChild(photo_containers);

        container.appendChild(grid_container);
        document.querySelector("#profile-section-two").appendChild(container);
      });
  }
  function get_all_images() {
    fetch("../JSON/users.json")
      .then((response) => response.json())
      .then((data) => {
        const uploaded_photos = data[0].uploaded_photos;
        const container = document.createElement("div");
        //Lägg till klassen api-photos
        container.classList.add("container");
        const grid_container = document.createElement("div");
        grid_container.classList.add("grid_container");
        console.log(data);

        uploaded_photos.forEach((photo) => {
          const photo_url = photo.photo;
          const img = document.createElement("img");
          img.classList.add("photo_image");
          img.src = photo_url;
          const button_delete = document.createElement("button");
          button_delete.innerText = "DELETE";
          button_delete.classList.add("delete");
          button_delete.addEventListener("click", () => {
            delete_photo(photo.photo_id, photo_url);
          });
          const photo_containers = document.createElement("div");
          photo_containers.classList.add("photo-containers");
          photo_containers.appendChild(button_delete);
          photo_containers.appendChild(img);
          container.appendChild(photo_containers);
        });
        container.appendChild(grid_container);
        document.querySelector("#profile-section-two").appendChild(container);
      });
  }
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
