"use strict";
/*** Helper functions ***/

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // while there remain elements to shuffle.
  while (currentIndex != 0) {
    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // and swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

// clear attributes
function clearElementAttributes(element) {
  element.removeAttribute("id");
  element.removeAttribute("class");
}

function setElementAttributes(element, id, className) {
  element.setAttribute("id", id);
  element.setAttribute("class", className);
}

function clearBackgroundImage() {
  document.querySelector("main").style.backgroundImage = "";
}

function getLocalStorageObject(key) {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

function setLocalStorageObject(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
  return value;
}

function updateLocalStorageObjectKey(objectKey, key, value) {
  const object = getLocalStorageObject(objectKey);
  if (object) {
    object[key] = value;
    setLocalStorageObject(objectKey, object);
    return object;
  }
  return null;
}

function getElement(selector) {
  return document.querySelector(selector);
}

function btnFunc1() {
  document
    .getElementById("collections-button")
    .classList.remove("btnDeactivated");
  document.getElementById("profile-button").classList.add("btnDeactivated");
}

function btnFunc2() {
  document.getElementById("profile-button").classList.remove("btnDeactivated");
  document.getElementById("collections-button").classList.add("btnDeactivated");
}

// function to display database server messages
function displayDatabaseMessage(data) {
  const serverMessage = document.querySelector("#message");
  serverMessage.textContent = data.message;
}

function displayModalWindow(message) {
  // the modal bg
  let modalOverlay = document.createElement("div");
  modalOverlay.classList.add("display-block");
  modalOverlay.classList.add("modal");

  // modal content
  modalOverlay.innerHTML = `
        <!-- Modal content -->
        <div class="modal-content">
            <p>${message}</p>
            <button class="modal-button">Close</button>
        </div>
    `;
  document.querySelector("main").appendChild(modalOverlay);
}

function closeModalWindow() {
  document.querySelector(".modal").remove();
}

async function displayPhotoInteractionIcons(photoObject, photoContainer, user) {
  // Fetch the user data
  const currentUser = await fetchCollectedPhotosfromDB(user);

  if (user == null || user == undefined) {
    return;
  } else {
    const userSavedPhotoIds = currentUser.saved_photos.map((p) => p.id);
    const photoId = photoObject.id;
    let isBookmarked = false;

    userSavedPhotoIds.forEach((userPhotoId) => {
      if (userPhotoId === photoId) {
        isBookmarked = true;
      }
    });
  }

  // create a container for some interactive buttons for api photos
  const photoInteractionsContainer = document.createElement("div");
  photoInteractionsContainer.classList.add("interaction-container");
  photoContainer.append(photoInteractionsContainer);

  // extract photographer name key for display on the photo
  const photographerName = photoObject.photographerName;
  const photographerNameDiv = document.createElement("div");
  photoInteractionsContainer.append(photographerNameDiv);
  photographerNameDiv.textContent = photographerName;
  photographerNameDiv.classList.add("photographer-info");

  const collectBtn = document.createElement("i");
  collectBtn.dataset.id = photoObject.id; // add photo ID to the icon's dataset
  photoInteractionsContainer.append(collectBtn);

  collectBtn.classList.add("collect-btn");
  collectBtn.classList.add("fa-regular");
  collectBtn.classList.add("fa-bookmark");
  collectBtn.style.color = isBookmarked ? "#e83030" : "#000000";

  const likeBtn = document.createElement("i");
  likeBtn.dataset.id = photoObject.id; // add photo ID to the icon's dataset
  photoInteractionsContainer.append(likeBtn);

  likeBtn.classList.add("likebtn");
  likeBtn.classList.add("fa-regular");
  likeBtn.classList.add("fa-heart");
  likeBtn.style.color = "#000000";

  // add a click event listener to the likeBtn
  likeBtn.addEventListener("click", (event) => {
    if (event.currentTarget === event.target) {
      toggleLikedStyleOnPhoto(photoContainer, photoObject);
    }
  });

  // add a click event listener to the bookmarkbtn
  collectBtn.addEventListener("click", (event) => {
    if (event.currentTarget === event.target) {
      toggleBookmarkStyleOnPhoto(photoContainer, photoObject);
    }
  });

  return photoInteractionsContainer;
}

async function toggleLikedStyleOnPhoto(photoContainer, photoObject) {
  console.log("you have liked the photo!");

  const heartIcons = document.querySelectorAll(".likebtn");

  if (!heartIcons) {
    console.error(`Like icon with id ${photoContainer.dataset.id} not found.`);
    return;
  }
  // loop through each heart icon and modify the style only if its data-id matches the id of the clicked photo
  heartIcons.forEach((heartIcon) => {
    if (heartIcon.dataset.id === photoContainer.dataset.id) {
      if (heartIcon.classList.contains("fa-regular")) {
        heartIcon.classList.remove("fa-regular");
        heartIcon.classList.add("fa-solid");
        heartIcon.classList.add("fa-fade");
        heartIcon.style.color = "#e83030";

        // Stop the fade animation after 2 seconds
        setTimeout(() => {
          heartIcon.classList.remove("fa-fade");
        }, 2000);
      } else {
        heartIcon.classList.remove("fa-solid");
        heartIcon.classList.add("fa-regular");
        heartIcon.style.color = "#000000";
      }
    }
  });
}

async function toggleBookmarkStyleOnPhoto(photoContainer, photoObject) {
  // select all the bookmark icons
  const collectBtns = document.querySelectorAll(".collect-btn");

  if (!collectBtns) {
    console.error(
      `Collect icon with id ${photoContainer.dataset.id} not found.`
    );
    return;
  }

  // loop through each bookmark icon and modify the style only if its data-id matches the id of the clicked photo
  collectBtns.forEach((collectBtn) => {
    if (collectBtn.dataset.id === photoContainer.dataset.id) {
      if (collectBtn.classList.contains("fa-regular")) {
        collectBtn.classList.remove("fa-regular");
        collectBtn.classList.add("fa-solid");
        collectBtn.classList.add("fa-fade");
        collectBtn.style.color = "#e83030";

        // Stop the fade animation after 2 seconds
        setTimeout(() => {
          collectBtn.classList.remove("fa-fade");
        }, 2000);
      } else {
        collectBtn.classList.remove("fa-solid");
        collectBtn.classList.add("fa-regular");
        collectBtn.style.color = "#000000";
      }
    }
  });

  await postPhotoObjectToDatabase(photoObject, user);
}

function check_if_image_exists(user) {
  if (!user.profile_picture == "") {
    const img = document.createElement("img");
    img.src = `../Photo-Management/PHP/${user.profile_picture}`;
    return img;
  } else {
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-user";
    icon.id = "userIcon";
    icon.style.color = "#000000";
    return icon;
  }
}
