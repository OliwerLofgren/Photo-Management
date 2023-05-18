"use strict";
let user = null;
user = JSON.parse(window.localStorage.getItem("user"));

document.addEventListener("DOMContentLoaded", () => {
  if (user) {
    createDiscoverPage(user);
  } else {
    createHomePage();
  }
});
