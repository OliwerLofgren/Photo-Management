"use strict";


let userData = localStorage.getItem("user");
let user = userData ? JSON.parse(userData) : null;
window.onload = function () {
  if (user) {
    createDiscoverPage(user);
  } else {
    createHomePage();
  }
};
