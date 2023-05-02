"use strict";
const registerMain = document.querySelector("main");
const registerHeader = document.querySelector("header");

// handles request
async function registerUser(event) {
    event.preventDefault();
    /* oliwer säger kom ihåg att fetcha från mappen register.php
    note: register allows registration w/o password */


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
        } else { // Registration successful

            // display modal
            let clickedButton = document.querySelector("#regForm button");
            clickedButton.onClick = displayModalWindow("Successfully registered!");

            // close modal
            document.querySelector(".modal-button").addEventListener("click", closeModalWindow);
        }
    }
    catch (error) {
        console.log(error)
        alert("Oops, something went wrong. Please try again later.");
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
    }

    registerMain.innerHTML = `
    <section id="register-section" class="section">
        <nav>
            <button id="go-home-btn">&larr; Back to Home Page</button>
        </nav>
        <h2>Register</h2>
        <p id="message"></p>
        <form id="regForm">
            <input type=text id="username" placeholder=Username>
            <input type=password id="password" placeholder=Password>
            <button type=submit>Register</button>
        </form>
        <button id="login">Already got an account? Login here</button>

    </section>
 `;

    // set bg img from api photo
    async function registerPagePhotos() {
        let per_page = 1;
        let imgSize = "original";

        await fetchPhotosToDisplay(null, per_page, imgSize, true);
    }
    registerPagePhotos();

    addEventListeners();
    function addEventListeners() {
        // redirect to login page if already registered
        addEventListenerById("login", "click", createLoginPage);
        addEventListenerById("go-home-btn", "click", createHomePage)
        registerUserListener();
    }
}
