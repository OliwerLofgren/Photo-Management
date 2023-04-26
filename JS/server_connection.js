"use strict";

const prefix = "https://api.pexels.com/v1/";

const api_key = "d7eBBdpVdN08nChtJhFZzudXealrUpI6Xz0FsfuK0d5klpBSt6XzL2Zm";

const headers = {
    authorization: api_key,
};

function fetch_resource(request) {
    return fetch(request);
}


// display server message (NOTE: temporary solution), using our own database resource object as the passed argument (needs to be extracted using variable later on, or will be displayed as undefined)
function displayServerMessage(data) {
    const serverMessage = document.createElement("p");
    serverMessage.innerHTML = `
        <p>${data.message}</p>
    `
    document.querySelector("main").appendChild(serverMessage);
}
