"use strict";

function createDiscoverPage(username) {
    clearElementAttributes(main);
    main.setAttribute("id", "login-main");

    document.querySelector("header").innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
      <nav></nav>
  `

    main.innerHTML = `
    <div id="discover">
        <p>Username: ${username}</p>
    </div>
`
}