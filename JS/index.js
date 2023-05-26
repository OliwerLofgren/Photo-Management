"use strict";

let user = null;
user = initializeObject("user"); // initialize the user
console.log(user);
if (user) {
  console.log(user);
  createDiscoverPage(user);
} else {
  createHomePage();
}
