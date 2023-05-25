"use strict";
let user = null;
user = initializeObject("user"); // initialize the user

if (user) {
  createDiscoverPage(user);
} else {
  createHomePage();
}
