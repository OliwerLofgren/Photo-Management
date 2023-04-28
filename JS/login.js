"use strict";
// Login

function createLoginPage() {
    main.innerHTML = `
    <h2>Login</h2>
    <p id=message></p>
    <form id=loginForm>
        <input type=text id=username placeholder=Username>
        <input type=password id=password placeholder=Password>
        <button type=submit>Login</button>
    </form>
    <button id=register>New to this? Sign up for free</button>
 `;

    // redirect to register page if no user account exists (+ add spicy transitions here)
    document.querySelector("#register").addEventListener("click", () => {
        createRegisterPage();
    });

    // sign in  
    const loginForm = document.querySelector("#loginForm");
    loginForm.addEventListener("submit", (event) => {
        loginUser(event);
    });

    async function loginUser(event) {
        event.preventDefault();

        try {

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

            let response = await fetch("/PHP/login.php", post);
            let data = await response.json();

            console.log(response);

            if (!response.ok) {
                displayDatabaseMessage(data);
            }
            // login user
            else {
                window.localStorage.setItem("user", JSON.stringify(data));

                createDiscoverPage(username);
            }

        } catch (error) {
            console.log(error)
            alert("Oops, something went wrong. Please try again later.");

        }
    }
}



