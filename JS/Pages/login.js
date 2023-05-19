"use strict";
const loginMain = document.querySelector("main");
const loginHeader = document.querySelector("header");

async function createLoginPage() {
  setupPage();
  addEventListeners();

  function setupPage() {
    setElementAttributes(loginMain, "login-main", "");
    setElementAttributes(loginHeader, "login-header", "");
    document.body.classList.remove("body-layout");

    registerHeader.innerHTML = `
        <h1>PHOTO MANAGMENT</h1>
        <nav id="navLogin">
        <button id="go-back-home">Back to home</button>
        </nav>`;

    loginMain.innerHTML = ` 
        <div class="box">
        <section id="register-login-section"> 
            <h2 class="text-login-register">Welcome Back!</h2>
            <h3 class="text-login-register">Log In</h3>

            <p id="login-register-instead">Don't have an account? Sign up and get started</p>

            <p id="message"></p>
    
            <form id="loginForm">
            <div class ="input-field">
                <input type=text class="input" id="username" placeholder=Username>
                <i class="fa-solid fa-user" id="user" style="color: #000000;"></i>
                </div>
                <div class="input-field">
                <input type=password class="input" id="password" placeholder=Password>
                <i class="fa-solid fa-lock" id="lock" style="color: #000000;"></i>
                </div>
                <button type=submit class="button-login-register">Log in</button>
            </form>
        </section>
        </div>
        `;
  }
  function addEventListeners() {
    document.getElementById("loginForm").addEventListener("submit", (event) => {
      loginUser(event);
    });

    document
      .getElementById("login-register-instead")
      .addEventListener("click", createRegisterPage);

    document
      .getElementById("go-back-home")
      .addEventListener("click", createHomePage);
  }
}

async function loginUser(event) {
  event.preventDefault();

  let username = getElement("#username").value;
  let password = getElement("#password").value;

  const userData = {
    username: username,
    password: password,
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
      console.log(user);
      createDiscoverPage(user);
    }
  } catch (error) {
    console.log("Error login:", error);
  }
}
