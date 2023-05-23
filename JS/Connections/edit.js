//Here is where the PATCH request is gonna be for the profile
//This is where the PATCH-method should be located
async function edit_uploaded_photo(photo_id, photo_url, logged_in_user) {
  try {
    const response = await fetch("../PHP/edit_uploaded.php", {
      method: "PATCH",
      body: JSON.stringify({
        logged_in_id: logged_in_user.id,
        photo_id: photo_id,
      }),
    });

    const data = await response.json();
    console.log(data.message);
    const result = document.getElementById("result");
    if (response.ok) {
      // Find the corresponding photo container in section two
      const photo_container = document.querySelector(
        `#profile-section-two img[src="${photo_url}"]`
      ).parentNode;
      // Remove the photo container from the UI
      photo_container.parentNode.removeChild(photo_container);
      result.textContent = "The image was successfully removed!";
    } else {
      result.textContent = "Error!" + data.message;
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
        logged_in_id: user,
        photo_id: photo_id,
      }),
    });

    const data = await response.json();
    console.log(data.message);

    const photo_container = document.querySelector(
      `img[src="${photo_url}"]`
    ).parentNode;
    // remove the deleted photo from the UI by finding its parent element and removing it
    photo_container.parentNode.removeChild(photo_container);
  } catch (error) {
    console.error(error);
  }
}
