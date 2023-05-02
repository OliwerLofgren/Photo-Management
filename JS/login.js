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

    // sign in  
    const loginForm = document.querySelector("#loginForm");
    loginForm.addEventListener("submit", (event) => {
        loginUser(event);
    });

    // redirect to register page if no user account exists (+ add spicy transitions here)
    document.querySelector("#register").addEventListener("click", () => {
        createRegisterPage();
    });
}

async function loginUser() {

}

