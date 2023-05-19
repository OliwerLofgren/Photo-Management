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

      const data = await response.json();
      console.log(data.message);

      if (response.ok) {
        // User deleted successfully
        localStorage.removeItem("user");
        console.log("User deleted");
        createHomePage();
        console.log(response);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

