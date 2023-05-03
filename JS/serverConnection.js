"use strict";
// API stuff
const prefix = "https://api.pexels.com/v1/";
const apiKey = "4Gkq0ZuJgevDtGOJesppgO5V4tZZ4TZLTBvtO1aX6fgmzxPXGIxmkFg0";
// "d7eBBdpVdN08nChtJhFZzudXealrUpI6Xz0FsfuK0d5klpBSt6XzL2Zm"

const headers = {
    authorization: apiKey,
};

// fetch function
function fetch_resource(request) {
    return fetch(request);
}
let likes;
// returns array of select keys: photographer name, photourl, etc
async function fetchCuratedPhotos(per_page, imgSize) {
    const url = `${prefix}curated?per_page=${per_page}`;

    try {
        const response = await fetch_resource(new Request(url, { headers }));
        const resource = await response.json();

        if (!response.ok) {
            console.log("oops");
            photoApiResponseCodes(resource);
            return;
        }

        let photoResourceArray = resource.photos;
        console.log(photoResourceArray);
        if (!photoResourceArray || photoResourceArray.length === 0) {
            console.log("No photos found");
            return;
        }

        // Return an array of photo objects containing the photo URL and photographer name, and some other relevant keys
        let customPhotoDataArray = photoResourceArray.map(photo => {
            return {
                photo: photo.src[imgSize],
                photographerName: photo.photographer,
                photographerUrl: photo.photographer_url,
                likes: likes,
                alt: photo.alt
            };
        }); console.log(customPhotoDataArray);
        return customPhotoDataArray;

    } catch (error) {
        console.log(error);
        return []; // return empty array instead of throwing error 
        // add message to user here
    }
}

async function fetchSearchedPhotos(per_page, imgSize) {
    let searchTerm = getElement("#search-field").value;
    const searchEndPointUrl = `${prefix}search?query=${searchTerm}&per_page=${per_page}`;

    try {
        const response = await fetch_resource(new Request(searchEndPointUrl, { headers }));

        const resource = await response.json();

        if (!response.ok) {
            console.log("oops");
            photoApiResponseCodes(resource);
            return;
        }

        let photoResourceArray = resource.photos;
        if (!photoResourceArray || photoResourceArray.length === 0) {
            console.log("No photos found");
            return;
        }

        // Return an array of photo objects containing the photo URL and photographer name, and some other relevant keys
        let customPhotoDataArray = photoResourceArray.map(photo => {
            return {
                photo: photo.src[imgSize],
                photographerName: photo.photographer,
                photographerUrl: photo.photographer_url,
                likes: likes,
                alt: photo.alt
            };
        });
        return customPhotoDataArray;

    } catch (error) {
        console.log(error);
        return []; // return empty array instead of throwing error
        // add message to user here
    }
}

async function displayCuratedPhotos(per_page, imgSize) {
    let customPhotoDataArray = await fetchCuratedPhotos(per_page, imgSize);
    return createPhotoDomContainer(customPhotoDataArray);
}

// displays search term api photos
async function displaySearchTermPhotos(per_page, imgSize) {
    let customPhotoDataArray;
    let searchForm = document.querySelector("#search-form");
    // check if search form exists 
    if (searchForm != null) {
        searchForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            customPhotoDataArray = await fetchSearchedPhotos(per_page, imgSize);
            // clear already loaded and displayed api photos and show the searched photos instead
            document.querySelector(".api-photos").innerHTML = "";
            return createPhotoDomContainer(customPhotoDataArray);
        })
    }
}

// sets bg image from api, set per_page = to 1 photo from api
async function displayApiBackgroundImage(per_page, imgSize) {
    let customPhotoDataArray = await fetchCuratedPhotos(per_page, imgSize);
    return setMainBackgroundImageFromApi(customPhotoDataArray);
}

/** (NOTE: don't forget to add class .api-photos to dom element to display photos)
* Creates a DOM element for each photo in the array and appends them to the ".api-photos" element,
*/
function createPhotoDomContainer(array) {
    const photoWrapper = document.querySelector(".api-photos");
    // if try-catch error handler returned empty array (ex: request with empty search field)
    if (array === undefined) {
        console.log("array is undefined");
        return;
    }
    // create dom element
    array.forEach(object => {
        const divDom = document.createElement("div");

        const apiPhoto = document.createElement("img");
        apiPhoto.src = object.photo;
        // add an alt attribute to the img element to improve accessibility
        apiPhoto.alt = object.alt;

        const photographer = object.photographerName;
        // buttons over the api photos 
        const photoInteractionOverlay = document.createElement("div");
        photoInteractionOverlay.innerHTML = `
        <button class="collect-button">Collect</button>
        <button class="like-button">&hearts;</button>

        <div class="photographer-info">${photographer}</div>
        `;

        divDom.append(photoInteractionOverlay);
        divDom.append(apiPhoto);
        photoWrapper.appendChild(divDom);

        // var finns filen? urlet
        //  skapa knapp som likar/collectar bild och skicka object till databasen, (object som sträng, stringify )
        //put inside submit eventlistener: collectPhoto(object);
    });
}
// handles post request, post the bookmarked photo object to database
/*async function postPhotoObjectToDatabase(object) {
    try {
        const post = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(object),
        };

        let response = await fetch("/PHP/profile.php", post);
        let photo = await response.json();

        console.log(response);
        console.log(photo);
    } catch (error) {
        console.log(console.error);
    }
}*/

function setMainBackgroundImageFromApi(array) {
    array.forEach(object => {
        // Set img as background image 
        let backgroundImg = object.photo;
        let dom = document.querySelector("main");
        dom.style.backgroundImage = `url(${backgroundImg}`;
    })
}

function photoApiResponseCodes(resource) {
    switch (resource.status) {
        case 401:
            console.log(resource.code);
            break;
        case 400:
            console.log(resource.code);
        case 403:
            console.log("403 Forbidden");
        case 429:
            console.log("429 Too Many Requests");
        default:
            break;
    }
}

// increase like count
function likePhoto() {
    likes++;
    console.log(likes);
}





























/* display created page when img loads..
function loadImage(url, callback) {
    const img = new Image();
    img.onload = () => {
        callback(img);
    };
    img.src = url;
}*/

// old version
/*async function fetchPhotosToDisplay(searchTerm, per_page, imgSize, backgroundImage) {
    let customPhotoDataArray;
    if (searchTerm) {
        let searchForm = document.querySelector("#search-form");
        searchForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            customPhotoDataArray = await fetchSearchedPhotos(searchTerm, per_page, imgSize);
            // clear already loaded and displayed api photos and show the searched photos instead
            document.querySelector(".api-photos").innerHTML = "";
            return createPhotoSection(customPhotoDataArray);
        })
    } else {
        customPhotoDataArray = await fetchCuratedPhotos(per_page, imgSize);
        return createPhotoSection(customPhotoDataArray);
    }
    if (backgroundImage) {
        setMainBackgroundImageFromApi(customPhotoDataArray);
    }
}*/



