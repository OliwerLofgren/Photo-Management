"use strict";
let user = null;
user = getLocalStorageObject("user"); // initialize the user

if (user) {
  createDiscoverPage(user);
} else {
  createHomePage();
}
