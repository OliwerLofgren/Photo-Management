"use strict";

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
    `
    document.querySelector("main").appendChild(modalOverlay);
}

function closeModalWindow() {
    document.querySelector(".modal").remove();
}

function displayServerLoadingMessage() {
    // loading images...
    //loggin in... message, etc
}

function addEventListenerById(id, event, func) {
    const element = document.querySelector(`#${id}`);
    element.addEventListener(event, func);
}

function getElement(selector) {
    return document.querySelector(selector);
}
