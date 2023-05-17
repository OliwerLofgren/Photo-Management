//Here is where Delete-request for the profile is gonna be
async function delete_user(logged_in_user) {
  try {
    const confirmed = confirm("Are you sure you want to delete the user?");
    if (confirmed) {
      const response = await fetch("../PHP/delete.php", {
        method: "DELETE",
        body: JSON.stringify({
          logged_in_id: logged_in_user.id,
        }),
      });
      console.log("User deleted");
      const data = await response.json();
      console.log(data.message);

      if (response.ok) {
        // User deleted successfully
        localStorage.removeItem("user");
        createHomePage();
      }
    }
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
