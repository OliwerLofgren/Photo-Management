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
        <nav id="navRegister">
        <button id="go-back-home">Back to home</button>
        </nav>
        
        <section id="login-section" class="section"> 
            <h2>Welcome Back.</h2>
            <h3>Log In</h3>

            <p id="login-register-instead">Don't have an account? Sign up and get started</p>

            <p id="message"></p>
    
            <form id="loginForm">
                <input type=text id="username" placeholder=Username>
                <input type=password id="password" placeholder=Password>
                <button type=submit>Log in</button>
            </form>
        </section>
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

async function get_profile_picture(target_element, logged_in_user) {
  try {
    const response = await fetch("../JSON/users.json");
    const data = await response.json();

    const user = data.find((user) => user.id === logged_in_user.id);
    if (!user) {
      console.log("User not found!");
    }

    const profile_pictures = user.profile_pictures;
    if (profile_pictures.length > 0) {
      const photo_url = profile_pictures[profile_pictures.length - 1].photo;
      const img = document.createElement("img");
      img.src = photo_url;
      target_element.innerHTML = "";
      target_element.appendChild(img);
    } else {
      // Check if default profile picture URL is stored in localStorage
      let defaultImageUrl = localStorage.getItem("defaultProfilePic");

      if (defaultImageUrl == null) {
        // If default profile picture URL is not stored, set it to the local file path
        defaultImageUrl = "./media/default-profile.png";

        // Store the default profile picture URL in localStorage
        localStorage.setItem("defaultProfilePic", defaultImageUrl);
      }

      const icon = document.createElement("i");
      icon.className = "fa-solid fa-user";
      icon.id = "userIcon";
      icon.style.color = "#000000";
      target_element.innerHTML = "";
      target_element.appendChild(icon);
    }
  } catch (error) {
    console.log("Error!", error);
  }
}
