"use strict";
/*** Helper functions ***/

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

function getElement(selector) {
  return document.querySelector(selector);
}

function btnFunc1() {
  document.getElementById("collections-button").classList.remove("btnDeactivated");
  document.getElementById("profile-button").classList.add("btnDeactivated");
}

function btnFunc2() {
  document.getElementById("profile-button").classList.remove("btnDeactivated");
  document.getElementById("collections-button").classList.add("btnDeactivated");
}
// function to display database server messages
// example: username already exists
function displayDatabaseMessage(data) {
  const serverMessage = document.querySelector("#message");
  serverMessage.textContent = data.message;
}

// function to display externa api server messages
function displayExternalAPIMessage(params) {
  // do stuff
  // ext photo api messsages
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

function displayServerLoadingMessage() {
  // add the loading class to the .section element
  const loadingPhotos = document.querySelector(".section");
  loadingPhotos.classList.add("loading");
  // create the loader line element
  loadingPhotos.innerHTML = `
    <div class="loader-line"></div>
  `;
}
function hideServerLoadingMessage() {
  // remove the loader line element when photos are loaded
  const loaderLine = document.querySelector(".loader-line");
  if (loaderLine) {
    loaderLine.remove();
  }
  // remove the loading class from the element
  document.querySelector(".section").classList.remove("loading");
}

function scrollIntoView(selector) {
  const element = document.getElementById(selector);
  element.scrollIntoView();
}

function displayPhotoInteractionIcons(photoObject, photoContainer) {
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
  collectBtn.style.color = "#000000";

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
  const logged_in_user = JSON.parse(window.localStorage.getItem("user"));
  await postPhotoObjectToDatabase(photoObject, logged_in_user);

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
  console.log("you have bookmarked the photo!");

  // select all the bookmark icons
  const collectBtns = document.querySelectorAll(".collect-btn");

  if (!collectBtns) {
    console.error(
      `Collect icon with id ${photoContainer.dataset.id} not found.`
    );
    return;
  }
  const logged_in_user = JSON.parse(window.localStorage.getItem("user"));
  await postPhotoObjectToDatabase(photoObject, logged_in_user);

  // loop through each bookmark icon and modify the style only if its data-id matches the id of the clicked photo
  collectBtns.forEach((collectBtn) => {
    if (collectBtn.dataset.id === photoContainer.dataset.id) {
      if (collectBtn.classList.contains("fa-regular")) {
        collectBtn.classList.remove("fa-regular");
        collectBtn.classList.add("fa-solid");
        collectBtn.classList.add("fa-fade");
        collectBtn.style.color = "#e83030";
        console.log(collectBtn);

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
}

async function get_profile_picture(target_element, user) {
  try {
    const response = await fetch("../JSON/users.json");
    const data = await response.json();

    const logged_in_user = data.find((u) => u.id === user.id);
    if (!logged_in_user) {
      console.log("User not found!");
    }

    const profile_pictures = logged_in_user.profile_pictures;
    if (profile_pictures.length > 0) {
      const photo_url = profile_pictures[profile_pictures.length - 1].photo;
      const img = document.createElement("img");
      img.src = photo_url;
      STATE.user_profile_image = photo_url;
      target_element.innerHTML = "";
      target_element.append(img);
    }
  } catch (error) {
    console.log("Error!", error);
  }
}
