"use strict";
/***  internal database request handlers ***/

// handles post request
async function postPhotoObjectToDatabase(photoObject) {
  // add check if object exists ->

  // format data we want to send to our database and add some keys
  const photoObjectForDatabase = {
    id: photoObject.id, // add id to the photo
    photoObject: photoObject,
    src: photoObject.src[imgSize],
    liked: false, // toggleable liked state
  };

  const post = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(photoObjectForDatabase),
  };

  // post the data to database
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

// patch posted photo object (patch toggle like count)
async function patchPhotoObjectToDatabase(postedPhotoObject) {
  // patch data
  const photoObjectForDatabase = {
    id: postedPhotoObject.id, // id of the object
    liked: postedPhotoObject.liked,
    likesCount: postedPhotoObject.likesCount,
  };

  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(photoObjectForDatabase),
  };

  try {
    const response = await fetch(
      `/PHP/profile.php?id=${photoObjectForDatabase.id}`,
      options
    ); // url includes id of the photo
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
