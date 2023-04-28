"use strict";
const discoverMain = document.querySelector("main");

async function createDiscoverPage(username) {
    clearElementAttributes(discoverMain);
    setElementAttributes(discoverMain, "discover-main", "");

    document.querySelector("header").innerHTML = `<H1>PHOTO MANAGEMENT</H1>`

    discoverMain.innerHTML = `
    <nav>
        <p>Username: ${username}</p>
        <button id="profile-button">Profile</button>
        <button id="logout-button">Logout</button>
    </nav>
    <div id="discover">
        <h2>DISCOVER NEW INSPIRATION</h2>
    </div>
`
    addEventListenerById("logout-button", "click", createHomePage);
    addEventListenerById("profile-button", "click", createProfilePage);

    // create the photo elements 
    const discoverPhotoWrapper = await createPhotos();
    discoverMain.append(discoverPhotoWrapper);

    clearElementAttributes(discoverPhotoWrapper);
    setElementAttributes(discoverPhotoWrapper, "discover-photos", "api-photos");
}