"use strict";
let user = null;
user = getLocalStorageObject("user"); // initialize the user

if (user) {
  console.log(user);
  createDiscoverPage(user);
} else {
  createHomePage();
}
