"use strict";

window.onload = function () {
  let user = localStorage.getItem("user");
  if (user) {
    createDiscoverPage(user);
  } else {
    let user = null;
    createHomePage();
  }
};
