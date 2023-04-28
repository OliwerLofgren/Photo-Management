"use strict";

// API stuff
const prefix = "https://api.pexels.com/v1/";

const api_key = "d7eBBdpVdN08nChtJhFZzudXealrUpI6Xz0FsfuK0d5klpBSt6XzL2Zm";

const headers = {
    authorization: api_key,
};

// fetch function
function fetch_resource(request) {
    return fetch(request);
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
