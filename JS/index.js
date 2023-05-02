"use strict";

let user = null;
user = JSON.parse(window.localStorage.getItem("user"));

// bug: make sure that  PHP code checks whether both the username and password inputs are provided and valid before allowing a user to log in

/* if ($user["username"] == $username && $user["password"] == $password) {    
}
 */

if (user) {
    document.addEventListener("DOMContentLoaded", () => {
        createDiscoverPage(user)
    })
} else {
    document.addEventListener("DOMContentLoaded", createHomePage);
}