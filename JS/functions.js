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
            <span class="close">&times;</span>
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

function displayPhotoInteractionButtons(
  photoInteractionsContainer,
  photoObject
) {
  // create some buttons over the api photos
  // extract photographer name key for display on the photo
  const photographerName = photoObject.photographerName;
  photoInteractionsContainer.classList.add("interaction-container");

  photoInteractionsContainer.innerHTML = `
    < i class="collect-btn fa-regular fa-bookmark" style = "color: #000000;" ></i >
    <i class="likebtn fa-regular fa-heart" style="color: #000000;"></i>
    <div class="photographer-info">${photographerName}</div>
  `;
}

function toggleLikedStyleOnPhoto() {
  console.log("you have liked the photo!");
  const hearticon = document.querySelector(".likebtn");

  if (hearticon.classList.contains("fa-regular")) {
    hearticon.classList.remove("fa-regular");
    hearticon.classList.add("fa-solid");
    hearticon.classList.add("fa-fade");
    hearticon.style.color = "#e83030";

    // Stop the fade animation after 2 seconds
    setTimeout(() => {
      hearticon.classList.remove("fa-fade");
    }, 2000);
  } else {
    hearticon.classList.remove("fa-solid");
    hearticon.classList.add("fa-regular");
    hearticon.style.color = "#000000";
  }
}
function toggleBookmarkStyleOnPhoto() {
  const bookmarkicon = document.querySelector(".collect-btn");
  if (bookmarkicon.classList.contains("fa-regular")) {
    bookmarkicon.classList.add("fa-solid");
    bookmarkicon.classList.add("fa-bounce");
    bookmarkicon.classList.remove("fa-regular");

    // Stop the bounce animation after 2 seconds
    setTimeout(() => {
      bookmarkicon.classList.remove("fa-bounce");
    }, 2000);
  } else {
    bookmarkicon.classList.remove("fa-solid");
    bookmarkicon.classList.add("fa-regular");
  }
}

function get_profile_picture(target_element) {
  fetch("../JSON/users.json")
    .then((response) => response.json())
    .then((data) => {
      const profile_pictures = data[0].profile_pictures;
      if (profile_pictures.length > 0) {
        const photo_url = profile_pictures[profile_pictures.length - 1].photo;
        const img = document.createElement("img");
        img.src = photo_url;
        target_element.innerHTML = "";
        target_element.appendChild(img);
      }
    });
}
