"use strict";
const registerMain = document.querySelector("main");
const registerHeader = document.querySelector("header");
const footer = document.querySelector("footer");

// handles request
async function registerUser(event) {
    event.preventDefault();
    /* oliwer säger kom ihåg att fetcha från mappen register.php
    note: register allows registration w/o password */
    let username = getElement("#username").value;
    let password = getElement("#password").value;

    const userData = {
        username: username,
        password: password
    };

    const post = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    };

    try {
        const response = await fetch("/PHP/register.php", post);
        const data = await response.json();

        if (!response.ok) {
            displayDatabaseMessage(data);
        } else { // Registration successful
            console.log("registered successfully:", data);

            // display modal
            const clickedButton = document.querySelector("#regForm button");
            clickedButton.onClick = displayModalWindow("Successfully registered! Proceed to Log in page");

            // close modal
            document.querySelector(".modal-button").addEventListener("click", closeModalWindow);
        }
    }
    catch (error) {
        console.log("Error registering:", error);
    }
}

// Register user event listener
const registerUserListener = () => {
    const regForm = document.querySelector("#regForm");
    regForm.addEventListener("submit", (event) => {
        registerUser(event);
    });
};

// creates page dom elements
function createRegisterPage() {
    setupPage();
    function setupPage() {
        setElementAttributes(registerMain, "register-main", "");
        setElementAttributes(registerHeader, "", "display-none")
        setElementAttributes(footer, "", "display-none");
    }

    registerMain.innerHTML = `
    <H1 class="headerTitle">PHOTO MANAGEMENT</H1>

    <nav id="navRegister">
        <button id="login-btn">LOGIN</button>
    </nav>

    <section id="register-section" class="section">
    <h2>Register</h2>

    <p id="message"></p>

    <form id="regForm">
      <input type=text id="username" placeholder=Username>
      <input type=password id="password" placeholder=Password>
      <button type=submit>Register</button>
    </form>
  </section>
 `;
    // set bg img from api photo
    function registerPagePhotos() {
        let per_page = 1;
        let imgSize = "original";
        let domElement = document.querySelector("main");
        // check if current page is register page
        const registerPage = document.getElementById("register-main");
        if (registerPage) {
            displayApiBackgroundImage(per_page, imgSize, domElement);
        }
    } registerPagePhotos();

    addEventListeners();
    function addEventListeners() {
        // redirect to login page if already registered
        document.getElementById("login-btn").addEventListener("click", createLoginPage);
        registerUserListener();
    }
}
