"use strict";

// API stuff
const prefix = "https://api.pexels.com/v1/";
const apiKey = "4Gkq0ZuJgevDtGOJesppgO5V4tZZ4TZLTBvtO1aX6fgmzxPXGIxmkFg0";
//"d7eBBdpVdN08nChtJhFZzudXealrUpI6Xz0FsfuK0d5klpBSt6XzL2Zm";

const headers = {
  authorization: apiKey,
};
// fetch function
function fetch_resource(request) {
  return fetch(request);
}

/*** external api request handlers ***/

// returns array of select keys: photographer name, photourl, etc
async function fetchCuratedPhotos(per_page, imgSize, user) {
  //displayServerLoadingMessage();
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
    // console.log(photoResourceArray);
    if (!photoResourceArray || photoResourceArray.length === 0) {
      console.log("No photos found");
      return;
    }

    // Return an array of photo objects containing the photo URL and photographer name, and some other relevant keys
    const customPhotoDataArray = photoResourceArray.map((photo) => {
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
    });
    //hideServerLoadingMessage();
    return customPhotoDataArray;
  } catch (error) {
    console.log(error);
    return [];
    // add message to user here
  }
}

async function fetchSearchedPhotos(per_page, imgSize, searchTerm, user) {
  const searchEndPointUrl = `${prefix}search?query=${searchTerm}&per_page=${per_page}`;

  try {
    const response = await fetch_resource(
      new Request(searchEndPointUrl, { headers })
    );
    const resource = await response.json();

    if (response.status === 400) {
      createSearchOrMediaCollectionsPage(null, user);
      return;
    }
    if (!response.ok) {
      console.log(
        "Something went wrong with the search query request",
        response.status
      );
      return;
    }
    let photoResourceArray = resource.photos;
    if (!photoResourceArray || photoResourceArray.length === 0) {
      console.log("No photos found");
      return;
    }

    let customSearchPhotoDataArray = photoResourceArray.map((photo) => {
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
    });
    console.log(customSearchPhotoDataArray);
    return customSearchPhotoDataArray;
  } catch (error) {
    console.log(error);
    return [];
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
  }
}

async function fetchCollectionsMedia(type, per_page, id, imgSize, user) {
  const url = `${prefix}collections/${id}?per_page=${per_page}&type=${type}`;

  try {
    const response = await fetch_resource(new Request(url, { headers }));
    const resource = await response.json();

    if (!response.ok) {
      console.log("Something went wrong fetching collections media");
      photoApiResponseCodes(resource);
      return;
    }

    if (!resource || resource.length === 0) {
      console.log("No collection media found");
      return;
    }

    const arrayOfMediaObjects = resource.media;
    const mediaCollectionObject = arrayOfMediaObjects.map((media) => {
      return {
        avg_color: media.avg_color,
        photo: media.src[imgSize],
        photographerName: media.photographer,
        photographerUrl: media.photographer_url,
      };
    });
    return mediaCollectionObject;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getCollectionsIds() {
  let resource = await fetchFeaturedCollectionObjects(40);
  const arrayOfCollectionObjects = resource.collections;

  // array of ids and titles
  const collections = arrayOfCollectionObjects.map((collection) => {
    return {
      id: collection.id,
      title: collection.title,
      photosCount: collection.photos_count,
    };
  });
  return collections;
}

/*** photo dom element creation and display ***/

// (NOTE: don't forget to add class .api-photos to dom element to display photos) creates photo dom element and handles buttons event listeners
function createPhotoContainer(array, user) {
  const photoWrapper = document.querySelector(".api-photos");
  if (array === undefined || photoWrapper === null) {
    console.log(
      "The array is undefined, or the page doesn't contain an element with the class .api-photos"
    );
    return;
  }

  // create dom elements
  array.forEach((photoObject) => {
    const photoContainer = document.createElement("div");

    photoContainer.classList.add("card");
    photoContainer.classList.add("overlay");
    photoWrapper.append(photoContainer);

    photoContainer.dataset.id = photoObject.id; // add photo ID to the container's dataset

    const photoImage = document.createElement("img");
    photoContainer.append(photoImage);

    photoImage.src = photoObject.photo;
    // add an alt attribute to the img element to improve accessibility
    photoImage.alt = photoObject.alt;

    displayPhotoInteractionIcons(photoObject, photoContainer, user);
    return;
  });
}

async function displayCuratedPhotos(per_page, imgSize, user) {
  let customPhotoDataArray = await fetchCuratedPhotos(per_page, imgSize);
  createPhotoContainer(customPhotoDataArray, user);
}

// displays search term api photos
async function fetchAndDisplaySearchedPhotos(per_page, imgSize, user) {
  let customSearchPhotoDataArray;
  let searchForm = document.querySelector(".search-form");
  if (searchForm != null) {
    searchForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      let searchTerm = getElement(".search-field").value.trim();


      if (searchTerm === undefined || searchTerm === null) {
        // display message if no search query was input
        displayModalWindow(
          "Please enter a search query"
        );

        document
          .querySelector(".modal-button")
          .addEventListener("click", closeModalWindow);
        return;
      } else {
        createSearchOrMediaCollectionsPage(searchTerm, user);

        // clear already loaded photos and display searched photos instead
        document.querySelector(".api-photos").innerHTML = "";
        customSearchPhotoDataArray = await fetchSearchedPhotos(
          per_page,
          imgSize,
          searchTerm, user
        );
      }

      if (customSearchPhotoDataArray === undefined) {
        // display modal window message 
        displayModalWindow(
          "Something went wrong, please try again"
        );

        document
          .querySelector(".modal-button")
          .addEventListener("click", closeModalWindow);
        return;
      }
      const matchingResults = customSearchPhotoDataArray.length;
      const searchQueryinfo = document.querySelector(".search-query-info");
      searchQueryinfo.innerHTML = `  
      <h2 class="h2-results">${searchTerm}</h2>
      <p class="matching-results">${matchingResults} Photos Found</p>`;

      return createPhotoContainer(customSearchPhotoDataArray, user);
    });
  }
}

async function displayMediaCollectionPhotos(type, per_page, id, imgSize, user) {
  // clear already loaded photos and display collection photos instead
  document.querySelector(".api-photos").innerHTML = "";
  let collectionsMediaArray = await fetchCollectionsMedia(
    type,
    per_page,
    id,
    imgSize
  );

  if (collectionsMediaArray === undefined) {
    console.log(
      "Something went wrong with the media page request, redirecting user to their collections page instead"
    );
    createProfileCollectionsPage(user);
    return;
  }
  return createPhotoContainer(collectionsMediaArray, user);
}

async function displayApiBackgroundImage(per_page, imgSize, domElement) {
  let customPhotoDataArray = await fetchCuratedPhotos(
    per_page,
    imgSize,
    domElement, user
  );
  // set dom bg img
  customPhotoDataArray.forEach((photo) => {
    // Set img as background image
    let backgroundImg = photo.photo;
    domElement.style.backgroundImage = `url(${backgroundImg})`;
  });
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
