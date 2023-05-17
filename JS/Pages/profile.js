"use strict";

const profilePageMain = document.querySelector("main");
const profilePageHeader = document.querySelector("header");
const section_two_main = document.querySelector(".profile-or-collections-nav");

async function createProfileGalleryPage(user) {
  setupPage();

  const logged_in_id = JSON.parse(localStorage.getItem("user")).id;
  let logged_in_user;

  if (logged_in_id) {
    logged_in_user = await getLoggedInUser(logged_in_id);
    console.log(logged_in_id);
  } else {
    console.log("No user is currently logged in");
  }
  addEventListeners();
  await get_all_images(logged_in_user);
  const profile_div = document.querySelector("#profile-picture");
  if (profile_div) {
    await get_profile_picture(profile_div, logged_in_user);
  } else {
    console.log("Profile picture element was not found!");
  }

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
      <button id="delete-button">Delete your account</button>
      </nav>
  `;

    profilePageMain.innerHTML = `
    <!-- Insert user profile section here -->
    <section id="profile-section-one" class="section user-section-one">
    
    <div id="profile-picture" class="profile-photo"></div>
    <h3>${user.username}</h3>
    <div id="profile_container">
    <form id="form_profile_upload" action="../PHP/upload.php" method="POST" enctype="multipart/form-data">
      <input type="file"  name="upload">
      <button type="submit" id="custom_upload_button">Upload</button>
    </form> 
    <div id="profile_result"></div>   
    </div>
    
    </section >
  

      <section id="profile-section-two" class="section user-section-two">
      <nav class="profile-or-collections-nav">
      <button id="collections-button">Your Collections</button>      
      <button id="profile-button">Profile</button>   
      <form id="form_upload" action="../PHP/profile_pics.php" method="POST" enctype="multipart/form-data">
        <input type="file"  name="upload">
        <button type="submit" id="section_two_button">Upload</button>
      </form>
      <div id="result"></div>   
    </nav>

        <div id="profile-photos" class="user-photos"></div>
      </section>
    `;
  }
  async function getLoggedInUser(logged_in_id) {
    try {
      const response = await fetch("../JSON/users.json");
      const data = await response.json();
      return data.find((user) => user.id === logged_in_id);
    } catch (error) {
      console.log("Error!", error);
      return null;
    }
  }
  const profile_form = document.getElementById("form_profile_upload");
  const profile_result = document.getElementById("profile_result");
  profile_form.addEventListener("submit", async function (event) {
    event.preventDefault();
    // Remove previously uploaded image

    const formData = new FormData(profile_form);
    formData.append("logged_in_id", logged_in_user.id);
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
        await get_profile_picture(profile_div, logged_in_user);
      }
    } catch (error) {
      profile_result.textContent = "An error occurred!" + error;
    }
  });

  const result = document.getElementById("result");
  const form = document.getElementById("form_upload");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    // Remove previously uploaded image
    try {
      const formData = new FormData(form);
      formData.append("logged_in_id", logged_in_user.id);
      const request = new Request("../PHP/upload.php", {
        method: "POST",
        body: formData,
      });
      const response = await fetch(request);
      const data = await response.json();

      // This simply resets the form.
      form.reset();
      console.log(data);

      if (data.error) {
        result.textContent = "An error occurred: " + data.error;
      } else {
        result.textContent = "Successfully uploaded the image";
        await get_one_images(logged_in_user);
      }
    } catch (error) {
      console.log("Error!", error);
      result.textContent = "An error has occured" + error.message;
    }
  });

  async function get_one_images(logged_in_user) {
    try {
      const response = await fetch("../JSON/users.json");
      const data = await response.json();

      const user = data.find((user) => user.id === logged_in_user.id);
      if (!user) {
        console.log("User not found!");
        return;
      }

      const uploaded_photos = user.uploaded_photos;
      if (uploaded_photos.length === 0) {
        console.log("User havent uploaded any photos yet!");
        return;
      }
      const latest_uploaded_photo = uploaded_photos[uploaded_photos.length - 1];

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
        delete_photo(latest_uploaded_photo.photo_id, photo_url, logged_in_user);
      });

      const photo_containers = document.createElement("div");
      photo_containers.classList.add("photo-containers");
      photo_containers.appendChild(button_delete);
      photo_containers.appendChild(img);
      container.appendChild(photo_containers);

      container.appendChild(grid_container);
      document.querySelector("#profile-section-two").appendChild(container);
    } catch (error) {
      console.log("Error!", error);
    }
  }
  async function get_all_images(logged_in_user) {
    try {
      const response = await fetch("../JSON/users.json");
      const data = await response.json();

      const user = data.find((user) => user.id === logged_in_user.id);
      if (!user) {
        console.log("User not found!");
      }

      const uploaded_photos = user.uploaded_photos;
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
          delete_photo(photo.photo_id, photo_url, logged_in_user);
        });
        const photo_containers = document.createElement("div");
        photo_containers.classList.add("photo-containers");
        photo_containers.appendChild(button_delete);
        photo_containers.appendChild(img);
        container.appendChild(photo_containers);
      });
      container.appendChild(grid_container);
      document.querySelector("#profile-section-two").appendChild(container);
    } catch (error) {
      console.log("Error!", error);
    }
  }

  async function get_profile_picture(target_element, logged_in_user) {
    try {
      const response = await fetch("../JSON/users.json");
      const data = await response.json();

      const user = data.find((user) => user.id === logged_in_user.id);
      if (!user) {
        console.log("User not found!");
      }

      const profile_pictures = user.profile_pictures;
      if (profile_pictures.length > 0) {
        const photo_url = profile_pictures[profile_pictures.length - 1].photo;
        const img = document.createElement("img");
        img.src = photo_url;
        target_element.innerHTML = "";
        target_element.appendChild(img);
      }
    } catch (error) {
      console.log("Error!", error);
    }
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

    document
      .getElementById("delete-button")
      .addEventListener("click", delete_user);
  }
}

//Display all images that are saved from discover

//Display all images that you have uploaded

//This php-code should is intended for index.html

//Display your profile picture
