"use strict";
let user = null;
user = JSON.parse(localStorage.getItem("user"));
// initialize the user
console.log(user);
if (user) {
  console.log(user);
  createDiscoverPage(user);
} else {
  createHomePage();
}
