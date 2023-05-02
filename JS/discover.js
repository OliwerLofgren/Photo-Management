"use strict";
const discoverMain = document.querySelector("main");
const discoverHeader = document.querySelector("header");

async function createDiscoverPage(data) {
    setupPage();
    function setupPage() {
        setElementAttributes(discoverMain, "discover-main", "");
        clearElementAttributes(discoverHeader);
    }

    document.querySelector("header").innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
    <nav>
        <p>Username: ${data.username}</p>
        <button id="collections-profile-button">My Collections</button>
        <button id="logout-button">Logout</button>
    </nav>
    `;

    discoverMain.innerHTML = ` 
    <section id="discover-section" class="section">
        <div id="discover">
            <h2>DISCOVER NEW INSPIRATION</h2>
        </div>
        <div id="discover-photos" class="api-photos"></div>
    </section>
    `;

    addEventListenerById("logout-button", "click", function () {
        localStorage.removeItem("user");
        data = null;
        createHomePage();
    });

    addEventListenerById("collections-profile-button", "click", function () {
        createProfileCollectionsPage(data);
    });

    /*clearElementAttributes(discoverPhotoWrapper);
    setElementAttributes(discoverPhotoWrapper, "discover-photos", "api-photos");*/
}