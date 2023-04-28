"use strict";

const prefix = "https://api.pexels.com/v1/";

const api_key = "d7eBBdpVdN08nChtJhFZzudXealrUpI6Xz0FsfuK0d5klpBSt6XzL2Zm";

const headers = {
    authorization: api_key,
};

function fetch_resource(request) {
    return fetch(request);
}


// functionn to display server messages 
function displayServerMessage(data) {
    const serverMessage = document.querySelector("#message");
    serverMessage.textContent = data.message;
}
