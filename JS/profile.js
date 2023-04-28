"use strict";
const profileMain = document.querySelector("main");

async function createProfilePage() {
    clearElementAttributes(profileMain);
    setElementAttributes(profileMain, "profile-main", "profile-page");

    // NOTE: current profile page needs to be marked in css 
    document.querySelector("header").innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
      <nav>
        <button id="inspo-button">Inspo</button>      
        <button id="upload-button">Upload</button>      
      </nav>
  `
    addEventListenerById("upload-button", "click", createProfileUploadPage);

    /*
    fix parent element and display uploaded image to upload profile version instead
    const profileSection = document.createElement("div");
    profileSection.innerHTML = `
        <div id="profile-img"> 
            <!-- User's profile image -->
        </div>

        <nav>
            <button id="discover-button">Discover</button>
            <button id="logout-button">Logout</button>
        </nav>
    `;
    document.body.appendChild(profileSection);*/

    addEventListenerById("discover-button", "click", createDiscoverPage);

    // bug: username display home page
    addEventListenerById("logout-button", "click", createHomePage);

    // create the photo elements 
    const profilePhotosWrapper = await createPhotos();
    profileMain.append(profilePhotosWrapper);

    setElementAttributes(profilePhotosWrapper, "profile-photos", "api-photos");
}

const uploadPageMain = document.querySelector("main");

async function createProfileUploadPage() {
    clearElementAttributes(uploadPageMain);
    setElementAttributes(uploadPageMain, "profile-upload-main", "profile-page");

    addEventListenerById("inspo-button", "click", createProfilePage);

    addEventListenerById("discover-button", "click", createDiscoverPage);

    // bug: username display home page
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
