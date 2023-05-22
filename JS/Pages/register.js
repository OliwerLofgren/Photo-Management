"use strict";
const registerMain = document.querySelector("main");
const registerHeader = document.querySelector("header");

function createRegisterPage() {
  setupPage();
  addEventListeners();

  function setupPage() {
    setElementAttributes(registerMain, "register-main", "");
    setElementAttributes(registerHeader, "register-header", "");
    document.body.classList.remove("body-layout");
    // setElementAttributes(registerHeader, "", "display-none");
    // Vill ha header

    registerHeader.innerHTML = `
        <h1>PHOTO MANAGEMENT</h1>
        <nav id="nav-Register-Login">
        <button id="go-back-home">Back to home</button>
        </nav>`;

    registerMain.innerHTML = `
        <div class="box">
        <section id="register-login-section">
            <h2 class="text-login-register">Join us!</h2>
            <h3 class="text-login-register">Register</h3>

            <p id="login-register-instead">Already have an account? Sign In </p>
    
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
      .getElementById("login-register-instead")
      .addEventListener("click", createLoginPage);

    document
      .getElementById("go-back-home")
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

    if (response.ok) {
      let user = await response.json();
      console.log("Registered successfully:", user);
      user = setLocalStorageObject("user", user);
      console.log(user);
      const clickedButton = document.querySelector("#regForm button");
      clickedButton.onClick = displayModalWindow(
        "Successfully registered! Proceed to Log in page"
      );

      document
        .querySelector(".modal-button")
        .addEventListener("click", closeModalWindow);
    } else {
      displayDatabaseMessage(user);
    }
  } catch (error) {
    console.log("Error registering:", error);
  }
}
