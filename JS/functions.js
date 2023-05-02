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

function getElement(selector) {
    return document.querySelector(selector);
}
