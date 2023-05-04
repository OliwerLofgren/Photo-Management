"use strict";

/***  internal database request handlers ***/

// handles post request, post the photo object to database on interaction (collected)
async function postPhotoObjectToDatabase(photoObject) {

    // format post data (api photo object) and add liked/likesCount count keys
    const photoObjectForDatabase = {
        photoObject: photoObject,
        liked: false,
        likesCount: photoObject.likesCount
    }

    const post = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(photoObjectForDatabase),
    };

    // post request
    try {
        const response = await fetch("/PHP/profile.php", post);
        const postedPhotoObject = await response.json();

        if (!response.ok) {
            console.log("Error posting photo object");
        } else {
            console.log("Photo object posted successfully:", postedPhotoObject);

            return postedPhotoObject; // return the newly created photo object
        }

    } catch (error) {
        console.log("error posting photo object:", error);
    }
}

async function patchPhotoObjectToDatabase(postedPhotoObject) {
    // patch data
    const photoObjectForDatabase = {
        liked: postedPhotoObject.liked,
        likesCount: postedPhotoObject.likesCount,
    }

    const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(photoObjectForDatabase),
    };

    try {
        const response = await fetch("/PHP/profile.php", options);
        const patchedPhotoObject = await response.json();

        if (!response.ok) {
            console.log("Error patching photo object");
        } else {
            console.log("Photo object patched successfully:", patchedPhotoObject);
        }
    } catch (error) {
        console.error("Error patching photo object:", error);
    }
}
