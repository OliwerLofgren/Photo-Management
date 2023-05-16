//Here is where Delete-request for the profile is gonna be
function delete_photo(photo_id, photo_url) {
  fetch("../PHP/delete.php", {
    method: "DELETE",
    body: JSON.stringify({ photo_id }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      const photo_container = document.querySelector(
        `img[src="${photo_url}"]`
      ).parentNode;
      photo_container.parentNode.removeChild(photo_container);
      // remove the deleted photo from the UI
      // by finding its parent element and removing it
    })
    .catch((error) => console.error(error));
}
