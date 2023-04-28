"use strict";

// function to display database server messages 
function displayDatabaseMessage(data) {
    const serverMessage = document.querySelector("#message");
    serverMessage.textContent = data.message;
}

// function to display externa api server messages 
function displayExternalAPIMessage(params) {
    // do stuff
}