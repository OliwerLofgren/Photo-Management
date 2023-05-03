"use strict";
const loginMain = document.querySelector("main");
const loginHeader = document.querySelector("header");

// handles request
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
            window.localStorage.setItem("user", JSON.stringify(data));
            let user = data;
            createDiscoverPage(user);
        }
    } catch (error) {
        console.log(error)
        alert("Oops, something went wrong. Please try again later.");
    }
}

// Login user event listener
const loginUserListener = () => {
    const loginForm = document.querySelector("#loginForm");
    loginForm.addEventListener("submit", (event) => {
        loginUser(event);
    });
};

// creates page dom elements
async function createLoginPage() {
    setupPage();
    function setupPage() {
        setElementAttributes(loginMain, "login-main", "");
        setElementAttributes(loginHeader, "", "display-none");
    }

    // set bg img from api photo
    async function loginPagePhotos() {
        let per_page = 1;
        let imgSize = "original";
        displayApiBackgroundImage(per_page, imgSize);
    }
    loginPagePhotos();

    loginMain.innerHTML = ` 
    <section id="login-section" class="section"> 
        <nav id="navLogin">
            <button id="go-home-btn">&larr; Back to Home Page</button>
        </nav>

        <h2>Log in</h2>
        <p id="message"></p>

        <form id="loginForm">
            <input type=text id="username" placeholder=Username>
            <input type=password id="password" placeholder=Password>
            <button type=submit>Log in</button>
        </form>
        <button id="register">New to this? Sign up for free</button>
    </section>
    `;

    addEventListeners();
    function addEventListeners() {
        // redirect to register page instead
        addEventListenerById("go-home-btn", "click", createHomePage)
        addEventListenerById("register", "click", createRegisterPage);
        loginUserListener();
    }
}