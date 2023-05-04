"use strict";
const loginMain = document.querySelector("main");
const loginHeader = document.querySelector("header");

// handles request
async function loginUser(event) {
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
        const response = await fetch("/PHP/login.php", post);
        const data = await response.json();

        if (!response.ok) {
            displayDatabaseMessage(data);
        } else {
            console.log("log in successful:", data);

            window.localStorage.setItem("user", JSON.stringify(data));
            let user = data;
            createDiscoverPage(user);
        }
    } catch (error) {
        console.log("Error login:", error); s
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

    // set bg img from api photo
    loginPagePhotos();
    function loginPagePhotos() {
        // check if current page is login page
        const loginPage = document.getElementById("login-main");
        if (loginPage) {
            let per_page = 1;
            let imgSize = "original";
            displayApiBackgroundImage(per_page, imgSize, "main");
        }
    } loginPagePhotos();

    addEventListeners();
    function addEventListeners() {
        // redirect to register page instead
        document.getElementById("go-home-btn").addEventListener("click", createHomePage);
        document.getElementById("register").addEventListener("click", createRegisterPage);
        loginUserListener();
    }
}