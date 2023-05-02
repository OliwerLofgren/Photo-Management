"use strict";

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
    main.innerHTML = `
    <div class="center">
    <h2>Register</h2>
    <p id=message></p>
    <form id=regForm>
        <div class="txt_field">
          <input type=text id=username placeholder=Username>
        </div>
        <div class="txt_field">
          <input type=password id=password placeholder=Password>
        </div>
        <button type=submit>Register</button>
    </form>
    <button id=login>Already go an account? Login here</button>
 `;
    // redirect to login page if already registered
    addEventListenerById("login", "click", createLoginPage);
    registerUserListener();


    // redirect to login page if already registered (+ add spicy transitions here)
    document.querySelector("#login").addEventListener("click", () => {
        createLoginPage();
    });

    // register user 
    const regForm = document.querySelector("#regForm");
    regForm.addEventListener("submit", (event) => {
        registerUser(event);
    });


    async function registerUser(event) {
        event.preventDefault();
        /* oliwer säger kom ihåg att fetcha från mappen register.php */

        try {

            let response = await fetch_resource("../PHP/register.php");

            let username = document.querySelector("#username").value;
            let password = document.querySelector("#password").value;

            const requestBody = {
                username: username,
                password: password
            };

            const post = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            };

            let resource = await fetch("/PHP/register.php", post);
            let data = await resource.json();

            // display success message to the user
            const message = document.querySelector("#message");
            message.textContent = "Registration successful!";

        } catch (error) {
            console.log("oops");
        }
    }
}
