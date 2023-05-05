"use strict";
/***  internal database request handlers ***/

// handles post request, (photo object)
async function postPhotoObjectToDatabase(photoObject) {

    // format data and add some keys
    const photoObjectForDatabase = {
        id: photoObject.id, // add id to the photo 
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
        id: postedPhotoObject.id, // id of the object
        liked: postedPhotoObject.liked,
        likesCount: postedPhotoObject.likesCount,
    }

    const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(photoObjectForDatabase),
    };

    try {
        const response = await fetch(`/PHP/profile.php?id=${photoObjectForDatabase.id}`, options); // url includes id of the photo  
        const patchedPhotoObject = await response.json();

        if (!response.ok) {
            console.log("Error patching photo object");
        } else {
            console.log("Photo object patched successfully:", patchedPhotoObject);
            return patchedPhotoObject; // return the newly patched object 
        }
    } catch (error) {
        console.error("Error patching photo object:", error);
    }
}