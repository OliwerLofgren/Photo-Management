"use strict";

let user = null;
user = JSON.parse(window.localStorage.getItem("user"));

if (user) {
    document.addEventListener("DOMContentLoaded", () => {
        createDiscoverPage(user)
    })
} else {
    document.addEventListener("DOMContentLoaded", createHomePage);
}