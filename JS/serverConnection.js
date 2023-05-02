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

/* display created page when img loads..
function loadImage(url, callback) {
    const img = new Image();
    img.onload = () => {
        callback(img);
    };
    img.src = url;
}*/

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
                liked: photo.liked,
                alt: photo.alt
            };
        });
        return customPhotoDataArray;

    } catch (error) {
        console.log(error);
        return [];
        // add message to user here
    }
}

async function fetchSearchedPhotos(searchTerm, per_page, imgSize) {
    searchTerm = getElement("#search-field").value;
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
                liked: photo.liked,
                alt: photo.alt
            };
        });
        return customPhotoDataArray;

    } catch (error) {
        console.log(error);
        return [];
        // add message to user here
    }
}

async function fetchPhotosToDisplay(searchTerm, per_page, imgSize, backgroundImage) {
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
    }
    customPhotoDataArray = await fetchCuratedPhotos(per_page, imgSize);
    createPhotoSection(customPhotoDataArray);

    if (backgroundImage) {
        setMainBackgroundImageFromApi(customPhotoDataArray);
    }
}

/** (NOTE: don't forget to add class .api-photos to dom element to display photos)
 * Creates a DOM element for each photo in the array and appends them to the ".api-photos" element,
 * but only if the array has more than one item (because one photo item means it is intended to be set as a background image (calling setMainBackgroundImageFromApi function) and should not be displayed as a regular photo)
 */
function createPhotoSection(array) {
    if (array === undefined) {
        console.log("array is undefined");
        return;
    }
    // create dom element
    if (array.length > 1) {
        array.forEach(object => {
            const divDom = document.createElement("div");
            const apiPhoto = document.createElement("img");
            apiPhoto.src = object.photo;
            // add an alt attribute to the img element to improve accessibility
            apiPhoto.alt = object.alt;
            divDom.appendChild(apiPhoto);
            document.querySelector(".api-photos").appendChild(divDom);
        });
    }
}

function setMainBackgroundImageFromApi(array) {
    array.forEach(object => {
        // Set img as background image 
        let backgroundImg = object.photo;
        let main = document.querySelector("main");
        main.style.backgroundImage = `url(${backgroundImg}`;
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




