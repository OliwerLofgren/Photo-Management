//Here is where Delete-request for the profile is gonna be
const url = "../PHP/delete.php";
async function delete_photo() {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error(error);
  }
}
