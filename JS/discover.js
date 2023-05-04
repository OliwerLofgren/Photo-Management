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
        <button id="collections-profile-button">My Collections</button>
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

    // set bg img from api photo
    function discoverPhotos() {
        // check if current page is discover page
        const discoverPage = document.getElementById("discover-main");
        if (discoverPage) {
            let per_page = 20;
            let imgSize = "portrait";
            // photo dom element creation
            displayCuratedPhotos(per_page, imgSize);
            displaySearchTermPhotos(per_page, imgSize);
        }
    } discoverPhotos();



    document.addEventListener("click", function (event) {
        if (event.target.id === "collections-profile-button") {
            createProfileCollectionsPage(user);
        }
        if (event.target.id === "logout-button") {
            localStorage.removeItem("user");
            user = null;
            createHomePage();
        }
    });
}
