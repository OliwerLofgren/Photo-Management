function get_register_page() {
  main.innerHTML = `
        <h2>Register</h2>
        <p id=message></p>
        <form>
            <input type=text id=username placeholder=Username>
            <input type=password id=password placeholder=Password>
            <button type=submit>Register</button>
        </form>
        <button id=login>Already got an account? Login here</button>
    `;
}
