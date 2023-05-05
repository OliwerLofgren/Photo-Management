"use strict";

const discoverMain = document.querySelector("main");
const discoverHeader = document.querySelector("header");

async function createDiscoverPage(user) {
    setupPage();
    function setupPage() {
        setElementAttributes(discoverMain, "discover-main", "");
        clearBackgroundImage();
        clearElementAttributes(discoverHeader);
    }

    document.querySelector("header").innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
    <nav>
        <p>Username: ${user.username}</p>
        <button id="collections-button">My Collections</button>
        <button id="gallery-button">Gallery</button>
        <button id="logout-button">Logout</button>
    </nav>
    `;

    discoverMain.innerHTML = ` 
    <section id="discover-section-one" class="section">
        <div id="discover">
            <h2>DISCOVER NEW INSPIRATION</h2>
        </div>
        <div id="discover-photos" class="api-photos"></div>
    </section>

    <section id="discover-section-two" class="section">
        <div id="discover-photos" class="api-photos"></div>
    </section>
    `;

    function discoverPhotos() {
        let per_page = 12;
        let imgSize = "medium";
        displayCuratedPhotos(per_page, imgSize);
        displaySearchTermPhotos(per_page, imgSize)
    }
    discoverPhotos();


    document.addEventListener("click", function (event) {
        if (event.target.id === "collections-profile-button") {
            createProfileCollectionsPage(user);
        }

        document.getElementById("gallery-button").addEventListener("click", function () {
            createProfileGalleryPage(user);
        });

        document.getElementById("logout-button").addEventListener("click", function () {
            localStorage.removeItem("user");
            user = null;
            createHomePage();
        }
        )
    });
}
