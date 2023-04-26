"use strict";

const prefix = "https://api.pexels.com/v1/";

const api_key = "d7eBBdpVdN08nChtJhFZzudXealrUpI6Xz0FsfuK0d5klpBSt6XzL2Zm";

const headers = {
    authorization: api_key,
};

function fetch_resource(request) {
    return fetch(request);
}

// display server message (NOTE: temporary solution)
function displayServerMessage(response) {
    const message = document.createElement("p");
    message.innerHTML = `
        <p>${response.statusText}</p>
    `
    document.querySelector("main").appendChild(message);
}
