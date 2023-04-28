"use strict";
const loginMain = document.querySelector("main");

async function loginUser(event) {
    event.preventDefault();

    try {

        let username = getElement("#username").value;
        let password = getElement("#password").value;

        const requestBody = {
            username: username,
            password: password
        };

        const post = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        };

        let response = await fetch("/PHP/login.php", post);
        let data = await response.json();

        console.log(response);

        if (!response.ok) {
            displayDatabaseMessage(data);
        } else {
            // add localstorage here
            createDiscoverPage(username);
        }
    } catch (error) {
        console.log(error)
        alert("Oops, something went wrong. Please try again later.");
    }
}

// Login user listener
const loginUserListener = () => {
    const loginForm = document.querySelector("#loginForm");
    loginForm.addEventListener("submit", (event) => {
        loginUser(event);
    });
};

async function createLoginPage() {
    clearElementAttributes(loginMain);
    setElementAttributes(loginMain, "login-main", "");

    /*document.querySelector("header").innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
      <nav></nav>
  `*/

    loginMain.innerHTML = `
    <h2>Login</h2>
    <p id=message></p>
    <form id=loginForm>
        <input type=text id=username placeholder=Username>
        <input type=password id=password placeholder=Password>
        <button type=submit>Login</button>
    </form>
    <button id=register>New to this? Sign up for free</button>
 `;

    // create the photo elements 
    const loginPhotoWrapper = await createPhotos();
    loginMain.append(loginPhotoWrapper);

    clearElementAttributes(loginPhotoWrapper);
    setElementAttributes(loginPhotoWrapper, "login-photos", "api-photos");

    // redirect to register page instead
    addEventListenerById("register", "click", createRegisterPage);
    loginUserListener();
}



