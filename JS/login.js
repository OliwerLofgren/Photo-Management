"use strict";

function renderLoginPage() {
    mainHome.innerHTML = `
    <h2>Login</h2>
    <p id=message></p>
    <form>
        <input type=text id=username placeholder=Username>
        <input type=password id=password placeholder=Password>
        <button type=submit>Login</button>
    </form>
    <button id=register>New to this? Sign up for free</button>
 `;
}

