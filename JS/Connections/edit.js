async function edit_uploaded_photo(photo_id, photo_url, logged_in_user) {
  try {
    const response = await fetch("../PHP/edit_uploaded.php", {
      method: "PATCH",
      body: JSON.stringify({
        logged_in_id: logged_in_user.id, // Include the logged-in user's ID
        photo_id: photo_id, // Include the ID of the photo to be edited
      }),
    });

    const data = await response.json();
    const result = document.getElementById("result");
    if (response.ok) {
      // Find the corresponding photo container in section two
      const photo_container = document.querySelector(
        `#profile-section-two img[src="${photo_url}"]`
      ).parentNode;
      // Remove the photo container from the UI
      photo_container.parentNode.removeChild(photo_container);
      console.log(data);
      result.textContent = "The image was successfully removed!";
    } else {
      result.textContent = "Something went wrong:" + data.message;
    }
  } catch (error) {
    console.error(error);
  }
}

async function edit_saved_photo(photo_url, photo_id, user) {
  try {
    const response = await fetch("../PHP/edit_saved.php", {
      method: "PATCH",
      body: JSON.stringify({
        logged_in_id: user.id, // Include the logged-in user's ID
        photo_id: photo_id, // Include the ID of the photo to be edited
      }),
    });
    const data = await response.json();
    const result = document.getElementById("result");
    if (response.ok) {
      // Find the parent container element of the photo to be deleted
      const photo_container = document.querySelector(
        `img[src="${photo_url}"]`
      ).parentNode;
      // Remove the deleted photo from the webpage by removing its parent container element
      photo_container.parentNode.removeChild(photo_container);
      console.log(data);
      result.textContent = "The image was successfully removed!";
    } else {
      result.textContent = "Something went wrong:" + data.message;
    }
  } catch (error) {
    console.error(error);
  }
}
