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

async function fetchPhoto() {
    // NOTE, set per page parameter, + add result object to innerhtml 
    const per_page = 1;
    const url = `${prefix}curated?per_page=${per_page}`;

    try {
        const response = await fetch_resource(new Request(url, { headers }));
        const resource = await response.json();

        if (!response.ok) {
            console.log("oops");
            return;
        }

        const photos = resource.photos;
        if (!photos || photos.length === 0) {
            console.log("No photos found");
            return;
        }

        // Return an array of photo URLs
        return photos.map(photo => photo.src.medium);
    } catch (error) {
        console.log(error);
        return [];
        // add message to user here
    }
}
