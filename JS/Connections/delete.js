//Here is where Delete-request for the profile is gonna be
async function delete_user(logged_in_user) {
  try {
    const confirmed = confirm("Are you sure you want to delete the user?");
    if (confirmed) {
      const response = await fetch("../Photo-Management/PHP/delete.php", {
        method: "DELETE",
        body: JSON.stringify({
          logged_in_id: logged_in_user.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // User deleted successfully
        console.log(data);
        localStorage.removeItem("user");
        createHomePage();
      }
    }
  } catch (error) {
    console.error(error);
  }
}
