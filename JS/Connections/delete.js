//Here is where Delete-request for the profile is gonna be
function delete_photo(photo_id) {
  fetch("../PHP/delete.php", {
    method: "DELETE",
    body: JSON.stringify({ photo_id }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      // remove the deleted photo from the UI
      // by finding its parent element and removing it
    })
    .catch((error) => console.error(error));
}
