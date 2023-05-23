"use strict";
let user = null;
user = initializeObject("user"); // initialize the user

if (user) {
  console.log(`Current logged in user is ${user.username}`, user);
  createDiscoverPage(user);
} else {
  createHomePage();
  console.log(user);
}



