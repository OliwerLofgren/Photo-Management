"use strict";
const registerMain = document.querySelector("main");

async function registerUser(event) {
    event.preventDefault();
    /* oliwer säger kom ihåg att fetcha från mappen register.php */

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

        let response = await fetch("/PHP/register.php", post);
        let data = await response.json();

        console.log(response);

        if (!response.ok) {
            displayDatabaseMessage(data);
        } else {
            // Registration successful
        }

    } catch (error) {
        console.log(error)
        alert("Oops, something went wrong. Please try again later.");
    }
}

// Register user listener
const registerUserListener = () => {
    const regForm = document.querySelector("#regForm");
    regForm.addEventListener("submit", (event) => {
        registerUser(event);
    });
};

function createRegisterPage() {

    clearElementAttributes(loginMain);
    setElementAttributes(loginMain, "register-main", "");

    document.querySelector("header").innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
      <nav></nav>
  `
    registerMain.innerHTML = `
    <h2>Register</h2>
    <p id=message></p>
    <form id=regForm>
        <input type=text id=username placeholder=Username>
        <input type=password id=password placeholder=Password>
        <button type=submit>Register</button>
    </form>
    <button id=login>Already got an account? Login here</button>
 `;
    // redirect to login page if already registered
    addEventListenerById("login", "click", createLoginPage);
    registerUserListener();
}
