"use strict";
const registerMain = document.querySelector("main");
const registerHeader = document.querySelector("header");

function createRegisterPage() {
  setupRegisterPage();
  addEventListeners();

  function setupRegisterPage() {
    setElementAttributes(registerMain, "register-main", "");
    setElementAttributes(registerHeader, "register-header", "");

    registerHeader.innerHTML = `
    <h1>PHOTO MANAGEMENT</h1>
    <nav class="nav-Register-Login">
        <button class="discover_button">Back to home</button>
    </nav>
        `;

    registerMain.innerHTML = `
    <div class="box">
        <section class="register-login-section" id="login-section">
            <h2 class="text-login-register">Join us!</h2>
            <h3 class="text-login-register">Register</h3>

            <p class="login-register-instead">Already have an account? Sign In </p>

            <p id="message"></p>

            <form id="regForm">
                <div class="input-field">
                    <input type=text class="input" id="username" placeholder=Username>
                    <i class="fa-solid fa-user" id="user" style="color: #000000;"></i>
                </div>
                <div class="input-field">
                    <input type=password class="input" id="password" placeholder=Password>
                    <i class="fa-solid fa-lock" id="lock" style="color: #000000;"></i>
                </div>
                <button type=submit class="button-login-register">Register</button>
            </form>
        </section>
    </div>
     `;
  }

  function addEventListeners() {
    document
      .querySelector(".login-register-instead")
      .addEventListener("click", createLoginPage);

    document
      .querySelector(".discover_button")
      .addEventListener("click", createHomePage);

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
    password: password,
  };

  const post = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch("/PHP/register.php", post);
    let user = await response.json();

    if (response.ok) {
      console.log(user);

      const clickedButton = document.querySelector("#regForm button");
      clickedButton.onClick = displayModalWindow(
        "Successfully registered! Proceed to Log in page"
      );

      document
        .querySelector(".modal-button")
        .addEventListener("click", closeModalWindow);

      countUsers();
    } else {
      displayDatabaseMessage(user);
    }
  } catch (error) {
    console.log("Error registering:", error);
  }
}
