"use strict";
/*** internal database request handlers ***/

// handles post request
async function postPhotoObjectToDatabase(photoObject) {
  // add check if object exists ->

  // format data we want to send to our database and add some keys
  const photoObjectForDatabase = {
    id: photoObject.id, // add id to the photo
    photoObject: photoObject,
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

// patch posted photo object
// NOTE: needs to receive the posted object in some way
async function patchPhotoObjectToDatabase(postedPhotoObject) {
  // patch data
  const new_value = true;
  const photoObjectForDatabase = {
    id: postedPhotoObject.id, // id of the object
    liked: new_value,
  };

  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(photoObjectForDatabase),
  };

  try {
    const response = await fetch(`/PHP/edit.php?id=${options.id}`, options); // url includes id of the photo
    const patchedPhotoObject = await response.json();

    if (!response.ok) {
      console.log("Error patching photo object", response.statusText);
    } else {
      console.log("Photo object patched successfully:", patchedPhotoObject);
      return patchedPhotoObject; // return the newly patched object
    }
  } catch (error) {
    console.error("Error patching photo object:", error);
  }
}

/* fetch the collected photos */
async function fetchCollectedPhotosfromDB() {

  try {
    const response = await fetch("../JSON/users.json");
    const resource = await response.json();

    if (!response.ok) {
      console.log("Response not ok", response.statusText);
      return;
    } else {
      console.log("Response successful");
    }

    return resource;
  } catch (error) {
    console.log("Error", error);
  }
}

/* display the collected photos */
async function displayCollectedPhotos(user) {
  const AllUserObjects = await fetchCollectedPhotosfromDB();
  const photoWrapper = document.getElementById("collections-photos");

  // iterate over each user object
  AllUserObjects.forEach((userObject) => {
    // iterate over saved photos of the user
    userObject.saved_photos.forEach((savedPhoto) => {

      // create a div and append the container to parent wrapper
      const photoContainer = document.createElement("div");
      photoWrapper.append(photoContainer);

      const photoObject = savedPhoto.photoObject;
      const photoUrl = photoObject.photo;
      const photoId = savedPhoto.id;

      // create an image element and set its source to the photo URL
      const image = document.createElement("img");
      photoContainer.append(image)
      image.src = photoUrl;

      /* create a delete button 
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "DELETE";
      photoContainer.append(deleteButton);

      // add event listener to the delete button
      deleteButton.addEventListener("click", () => {
        delete_photo(photoId, photoUrl);
      });*/
    });
  });

  // check if there are no saved photos
  if (photoWrapper.childElementCount === 0) {
    const message1 = document.createElement("h1");
    const message2 = document.createElement("p");
    const message3 = document.createElement("p");

    message1.textContent = "Collect Photos";
    message2.textContent = "When you collect photos, they will appear on your profile.";
    message3.textContent = "Collect your first photo";

    message3.addEventListener("click", () => {
      createDiscoverPage(user)
    });

    photoWrapper.append(message1, message2, message3);
  }
}



