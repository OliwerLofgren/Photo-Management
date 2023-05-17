"use strict";
const registerMain = document.querySelector("main");
const registerHeader = document.querySelector("header");

function createRegisterPage() {
    setupPage();
    addEventListeners();

    function setupPage() {
        setElementAttributes(registerMain, "register-main", "");
        setElementAttributes(registerHeader, "register-header", "");
        // setElementAttributes(registerHeader, "", "display-none");
        // Vill ha header

        registerHeader.innerHTML = `
        <h1>PHOTO MANAGMENT</h1>
        <nav id="navRegister">
        <button id="go-back-home">Back to home</button>
        </nav>`
        setElementAttributes(registerHeader, "", "display-none");
        document.body.classList.remove("body-layout");

        registerMain.innerHTML = `
        <section id="register-section" class="section">
        <h2>Register</h2>

        <p id="login-register-instead">Already have an account? Sign In </p>
    
        <p id="message"></p>
    
        <form id="regForm">
          <input type=text id="username" placeholder=Username>
          <input type=password id="password" placeholder=Password>
          <button type=submit>Register</button>
        </form>
      </section>
     `;
    }

    function addEventListeners() {

        document.getElementById("login-register-instead").addEventListener("click", createLoginPage);

        document.getElementById("go-back-home").addEventListener("click", createHomePage);

        document.getElementById("regForm").addEventListener("submit", (event) => {
            registerUser(event);
        });
    }
}

async function registerUser(event) {
    event.preventDefault();

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
        } else {
            console.log("registered successfully:", data);

            const clickedButton = document.querySelector("#regForm button");
            clickedButton.onClick = displayModalWindow("Successfully registered! Proceed to Log in page");

            document.querySelector(".modal-button").addEventListener("click", closeModalWindow);
        }
    }
    catch (error) {
        console.log("Error registering:", error);
    }
}

