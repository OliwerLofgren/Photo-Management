//Here is where Delete-request for the profile is gonna be
async function delete_uploaded_photo(photo_id, photo_url, logged_in_user) {
  try {
    const response = await fetch("../PHP/delete_uploaded.php", {
      method: "DELETE",
      body: JSON.stringify({
        logged_in_id: logged_in_user.id,
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

//With .then
// function delete_photo(photo_id, photo_url, logged_in_user) {
//   fetch("../PHP/delete.php", {
//     method: "DELETE",
//     body: JSON.stringify({
//       logged_in_id: logged_in_user.id,
//       photo_id: photo_id,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.message);
//       const photo_container = document.querySelector(
//         `img[src="${photo_url}"]`
//       ).parentNode;
//       photo_container.parentNode.removeChild(photo_container);
//       // remove the deleted photo from the UI
//       // by finding its parent element and removing it
//     })
//     .catch((error) => console.error(error));
// }
