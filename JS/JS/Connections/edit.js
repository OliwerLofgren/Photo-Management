async function edit_uploaded_photo(photo_id, photo_url, logged_in_user) {
  try {
    const response = await fetch("../Photo-Management/PHP/edit_uploaded.php", {
      method: "PATCH",
      body: JSON.stringify({
        logged_in_id: logged_in_user.id,
        photo_id: photo_id,
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
    const response = await fetch("../Photo-Management/PHP/edit_saved.php", {
      method: "PATCH",
      body: JSON.stringify({
        logged_in_id: user.id,
        photo_id: photo_id,
      }),
    });
    const data = await response.json();
    const result = document.getElementById("result");
    if (response.ok) {
      const photo_container = document.querySelector(
        `img[src="${photo_url}"]`
      ).parentNode;
      // remove the deleted photo from the UI by finding its parent element and removing it
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
