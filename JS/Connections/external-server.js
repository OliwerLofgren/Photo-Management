"use strict";
// API stuff
const prefix = "https://api.pexels.com/v1/";
const apiKey = "d7eBBdpVdN08nChtJhFZzudXealrUpI6Xz0FsfuK0d5klpBSt6XzL2Zm";
//"4Gkq0ZuJgevDtGOJesppgO5V4tZZ4TZLTBvtO1aX6fgmzxPXGIxmkFg0";

const headers = {
    authorization: apiKey,
};
// fetch function
function fetch_resource(request) {
    return fetch(request);
}

/*** external api request handlers ****/

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
        if (!photoResourceArray || photoResourceArray.length === 0) {
            console.log("No photos found");
            return;
        }

        // Return an array of photo objects containing the photo URL and photographer name, and some other relevant keys
        const customPhotoDataArray = photoResourceArray.map(photo => {
            return {
                id: photo.id,
                width: photo.width,
                height: photo.height,
                avg_color: photo.avg_color,
                photo: photo.src[imgSize],
                photographerName: photo.photographer,
                photographerUrl: photo.photographer_url,
                photographer_id: photo.photographer_id,
                liked: false,
                alt: photo.alt,
            };
        }); return customPhotoDataArray;

    } catch (error) {
        console.log(error);
        return [];
        // add message to user here
    }
}

async function fetchSearchedPhotos(per_page, imgSize, searchTerm) {
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

        let customSearchPhotoDataArray = photoResourceArray.map(photo => {
            return {
                id: photo.id,
                width: photo.width,
                height: photo.height,
                avg_color: photo.avg_color,
                photo: photo.src[imgSize],
                photographerName: photo.photographer,
                photographerUrl: photo.photographer_url,
                photographer_id: photo.photographer_id,
                alt: photo.alt,
            };
        }); return customSearchPhotoDataArray;

    } catch (error) {
        console.log(error);
        return [];
        // add message to user here
    }
}

async function fetchFeaturedCollectionObjects(per_page) {
    const url = `${prefix}collections/featured?per_page=${per_page}`;

    try {
        const response = await fetch_resource(new Request(url, { headers }));
        const resource = await response.json();

        if (!response.ok) {
            console.log("oops");
            photoApiResponseCodes(resource);
            return;
        }

        if (!resource || resource.length === 0) {
            console.log("No Collections found");
            return;
        }
        return resource;
    } catch (error) {
        console.log(error);
        return [];
        // add message to user here
    }
}
async function fetchCollectionsMedia(type, per_page, id, imgSize) {

    const collectionTitlesandIds = await getCollectionsIds();
    console.log(collectionTitlesandIds);

    const url = `${prefix}collections/${id}?per_page=${per_page}&type=${type}`;

    try {
        const response = await fetch_resource(new Request(url, { headers }));
        const resource = await response.json();

        console.log(resource);

        if (!response.ok) {
            console.log("oops");
            photoApiResponseCodes(resource);
            return;
        }

        if (!resource || resource.length === 0) {
            console.log("No collection media found");
            return;
        }

        const arrayOfMediaObjects = resource.media;
        const mediaCollectionObject = arrayOfMediaObjects.map(media => {
            return {
                avg_color: media.avg_color,
                photo: media.src[imgSize],
                photographerName: media.photographer,
                photographerUrl: media.photographer_url,
            };
        });

        console.log(mediaCollectionObject);

    } catch (error) {
        console.log(error);
        return [];
        // add message to user here
    }

    async function getCollectionsIds() {
        let resource = await fetchFeaturedCollectionObjects(1);
        const arrayOfCollectionObjects = resource.collections;

        // array of ids and titles
        const collections = arrayOfCollectionObjects.map(collection => {
            return {
                id: collection.id,
                title: collection.title
            };
        }); return collections;
    }
}

/*** photo dom element creation and display ***/

// (NOTE: don't forget to add class .api-photos to dom element to display photos) creates photo dom element and handles buttons event listeners
function createPhotoContainer(array) {
    const photoWrapper = document.querySelector(".api-photos");
    if (array === undefined) {
        console.log("array is undefined");
        return;
    }

    // create dom elements
    array.forEach(photoObject => {
        const photoContainer = document.createElement("div");

        const photoImage = document.createElement("img");
        photoImage.src = photoObject.photo;
        // add an alt attribute to the img element to improve accessibility
        photoImage.alt = photoObject.alt;

        // handle image loading errors
        photoImage.addEventListener("error", () => {
            // replace the failed image with a default image
            photoImage.src = "path.jpg";
        });

        // extract photographer name key to display it later
        const photographerName = photoObject.photographerName;

        // create buttons over the api photos 
        const photoInteractionsContainer = document.createElement("div");
        photoInteractionsContainer.innerHTML = `
            <button class="collect-button">Collect</button>
            <button class="like-button">&hearts;</button>

            <div class="photographer-info">${photographerName}</div>
            `;
        // query select and add event listeners to the buttons on current photoObject only
        const collectButton = photoInteractionsContainer.querySelector(".collect-button");
        const likeButton = photoInteractionsContainer.querySelector(".like-button");

        // post the collected photo to db
        async function postPhotoToDB() {
            await postPhotoObjectToDatabase(photoObject);
        }
        collectButton.addEventListener("click", postPhotoToDB);

        // toggle the liked state and update like count on the clicked photo
        // likeButton.addEventListener("click", () => toggleLikesOnPhoto(postedPhotoObject));

        photoContainer.append(photoInteractionsContainer);
        photoContainer.append(photoImage);
        photoWrapper.appendChild(photoContainer);
    });
}

// displays search term api photos
async function displayCuratedPhotos(per_page, imgSize) {
    let customPhotoDataArray = await fetchCuratedPhotos(per_page, imgSize);
    console.log(customPhotoDataArray);
    createPhotoContainer(customPhotoDataArray);
    return customPhotoDataArray;
}

// displays search term api photos
async function displaySearchTermPhotos(per_page, imgSize) {
    let customSearchPhotoDataArray;
    let searchForm = document.querySelector("#search-form");
    if (searchForm != null) {
        searchForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            let searchTerm = getElement("#search-field").value.trim();
            createSearchOrCollectionsPage(searchTerm);

            // clear already loaded photos and display searched photos instead
            document.querySelector(".api-photos").innerHTML = "";
            customSearchPhotoDataArray = await fetchSearchedPhotos(per_page, imgSize, searchTerm);
            return createPhotoContainer(customSearchPhotoDataArray);

        });
    }
}

// set per_page = to 1 photo from api
async function displayApiBackgroundImage(per_page, imgSize, domElement) {
    let customPhotoDataArray = await fetchCuratedPhotos(per_page, imgSize, domElement);
    // set dom bg img 
    customPhotoDataArray.forEach(photo => {
        // Set img as background image 
        let backgroundImg = photo.photo;
        domElement.style.backgroundImage = `url(${backgroundImg})`;
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

/*** photo interactions ***/

// toggle like count
async function toggleLikesOnPhoto(postedPhotoObject) {
    console.log("you have liked the photo!", postedPhotoObject);

    // toggle the liked state
    postedPhotoObject.liked = !photoObject.liked;

    // update the like count
    if (postedPhotoObject.liked) {
        postedPhotoObject.likesCount++;
    } else {
        postedPhotoObject.likesCount--;
    }

    // patch the updated photo object to the database
    await patchPhotoObjectToDatabase(postedPhotoObject);
}
