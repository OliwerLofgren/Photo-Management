"use strict";
let user = null;
user = initializeObject("user"); // initialize the user

document.addEventListener("DOMContentLoaded", () => {
  if (user) {
    createDiscoverPage(user);
  } else {
    createHomePage();
  }
});

console.log(user);
