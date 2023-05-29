"use strict";
/***  internal database request handlers ***/

// handles post request
async function postPhotoObjectToDatabase(photoObject, user) {
  // Fetch the collected photos from the JSON
  const logged_in_user = await fetchCollectedPhotosfromDB(user);
  if (!logged_in_user) {
    console.log("Failed to fetch user data");
    return;
  }

  // Check if the photoObject already exists
  const existingPhoto = logged_in_user.saved_photos.find(
    (savedPhoto) => savedPhoto.photoObject.id === photoObject.id
  );
  if (existingPhoto) {
    console.log("Photo object already exists");
    return existingPhoto;
  }

  // format data we want to send to our database and add some keys
  const photoObjectForDatabase = {
    id: photoObject.id, // add id to the photo
    user_id: user.id, // add id to the user
    photoObject: photoObject,
  };

  const post = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(photoObjectForDatabase),
  };

  // post the data to database
  try {
    const response = await fetch("../PHP/profile.php", post);
    const postedPhotoObject = await response.json();

    if (!response.ok) {
      console.log("Error posting photo object");
      // add failed collected message here>
      return;
    } else {
      // add successfull collected message here>
      console.log(postedPhotoObject);
      return postedPhotoObject; // return the newly created photo object
    }
  } catch (error) {
    console.log("Error posting photo object:", error);
  }
}

/* fetch the collected photos */
async function fetchCollectedPhotosfromDB(user) {
  if (user == null || user == undefined) {
    return;
  }
  try {
    const response = await fetch("../JSON/users.json");
    const resource = await response.json();

    const logged_in_user = resource.find((u) => u.id === user.id);
    if (!logged_in_user) {
      console.log("User not found!");
      return null;
    }

    if (!response.ok) {
      console.log(
        "Something went wrong fetching the user's collected photos from internal database",
        response.statusText
      );
      return;
    } else {
      return logged_in_user;
    }
  } catch (error) {
    console.log("Error", error);
  }
}

/* display the collected photos */
async function displayCollectedPhotos(user) {
  const logged_in_user = await fetchCollectedPhotosfromDB(user);
  if (!logged_in_user || user == null || user == undefined) {
    console.log("Failed to fetch user data");
    return;
  }

  const photoWrapper = document.getElementById("collections-photos");
  const messageContainer = document.getElementById("message_container");
  // iterate over each user object
  logged_in_user.saved_photos.forEach((savedPhoto) => {
    // create a div and append the container to parent wrapper
    const photoContainer = document.createElement("div");
    photoContainer.classList.add("photo_containers");
    photoWrapper.append(photoContainer);

    const photoObject = savedPhoto.photoObject;
    const photoUrl = photoObject.photo;
    const photoId = savedPhoto.id;

    // create an image element and set its source to the photo URL
    const image = document.createElement("img");
    image.classList.add("photo_image");
    image.src = photoUrl;

    // create a delete button

    const button_delete = document.createElement("button");
    button_delete.innerText = "Remove this image";
    button_delete.classList.add("delete");
    // add event listener to the delete button
    button_delete.addEventListener("click", handleDeleteClick);

    async function handleDeleteClick() {
      console.log("Deleted");
      await edit_saved_photo(photoUrl, photoId, user);
    }

    photoContainer.append(button_delete);
    photoContainer.append(image);
  });

  // check if there are no saved photos
  if (photoWrapper.childElementCount === 0) {
    const message1 = document.createElement("h1");
    const message2 = document.createElement("p");
    const message3 = document.createElement("p");
    message3.id = "hover-message";

    message1.textContent = "Collect Photos";
    message2.textContent =
      "When you collect photos, they will appear on your profile.";
    message3.textContent = "Collect your first photo";

    message3.addEventListener("click", () => {
      createDiscoverPage(user);
    });

    messageContainer.append(message1, message2, message3);
  }
}
