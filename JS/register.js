"use strict";

function renderRegisterPage() {
    mainHome.innerHTML = `
    <h2>Register</h2>
    <p id=message></p>
    <form id=regForm>
        <input type=text id=username placeholder=Username>
        <input type=password id=password placeholder=Password>
        <button type=submit>Register</button>
    </form>
    <button id=login>Already go an account? Login here</button>
 `;

    const regForm = document.querySelector("#regForm");

    regForm.addEventListener("submit", registerUser)
}

async function registerUser(event) {
    event.preventDefault();

    /* oliwer säger kom ihåg att fetcha från mappen register.php */

    try {

    } catch (error) {

    }

}