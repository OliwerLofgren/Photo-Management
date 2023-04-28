"use strict";

// clear attributes
function clearElementAttributes(element) {
    element.removeAttribute("id");
    element.removeAttribute("class");
}

// function to display database server messages 
function displayDatabaseMessage(data) {
    const serverMessage = document.querySelector("#message");
    serverMessage.textContent = data.message;
}

// function to display externa api server messages 
function displayExternalAPIMessage(params) {
    // do stuff
}

function addEventListenerById(id, event, func) {
    const element = document.querySelector(`#${id}`);
    element.addEventListener(event, func);
}

// fetch HTML elements 
function getElement(selector) {
    return document.querySelector(selector);
}

// create the photos section by using the photo URLs returned by fetchPhoto
async function createPhotos() {
    const photoUrls = await fetchPhoto();

    // create dom element
    const photosWrapper = document.createElement("div");
    photoUrls.forEach(photo => {
        const div_dom = document.createElement("div");
        div_dom.innerHTML = `<img src="${photo}">`;
        photosWrapper.append(div_dom);
    });
    return photosWrapper;
}