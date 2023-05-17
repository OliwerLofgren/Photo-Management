"use strict";

const aboutusHeader = document.querySelector("header");
const aboutusMain = document.querySelector("main");


async function getUsers() {
    let resource = null;

    try {
        const response = await fetch("/JSON/users.json");
        resource = await response.json();

        if (!response.ok) {
            console.log("Response not ok");
        } else {
            console.log("Response successful", resource);
        }
    } catch (error) {
        console.log("Error", error);
    }

    return resource;
}

async function createAboutUsPage() {

    setupPage();
    addEventListener();

    function setupPage() {


        setElementAttributes(aboutusMain, "about-us-main", "");
        document.body.classList.remove("body-layout");

        aboutusHeader.innerHTML = `
        <H1>PHOTO MANAGEMENT</H1>
        <nav>
        <button id="registerBtn">REGISTER</button>
        </nav>
        `;

        aboutusMain.innerHTML = `
        <div id="transition">
        <div class="circle"> 
        <h1 class ="circle-title">About us</h1>
        </div>
        </div>

        <p class="paragraf">We love to inspire
        join us on the journey to blablbalbal</p>

        <div class="amountOfUsers">
        <p>Current amount of users</p>
        <div id="counter">${numberOfUsers}</div>
        </div>

        <h2>Join us and register <button id="hereBtn">HERE</button></h2>

        <p>Here at PHOTO MANAGEMENT you can share inspiration and be inspired
        We are based in Malmö and balakdjskjdfddf
        djhksjfsdfskdfhsjdfhsdjfh
        djfjskhdfjhsjdhfsjdhfjhsdjhfsdhfjshdf
        djfjkshdjfshdjkfhsjkhfjskhfjshdfjkshdjk</p>

        <p>djfjskdhjfhsdjfjshdfhdfjd
        djfhskhdfsjkdhfjshdjfhjkdhfkjs
        djfhsjdhfjshdjkfhskhdfjshfdkjd
        dfjshfdhfsdjf
        </p>

        <p>From the PHOTO MANAGMENT TEAM</p>

        <p>Welcome to
        PHOTO MANAGMENT</p>

        <p>Our team</p>

        <div class="team">
        <div>
        <img src="" alt="Amelie">
        <h3>Amélie</h3>
        </div><div>
        <img src="" alt="Rabia">
        <h3>Rabia</h3>
        </div><div>
        <img src="" alt="Oliwer">
        <h3>Oliwer</h3>
        </div>
    </div>
        `;

    }
}

let numberOfUsers = 0;

function addEventListener() {
    document
        .getElementById("registerBtn")
        .addEventListener("click", createRegisterPage);

    document
        .getElementById("hereBtn")
        .addEventListener("click", createRegisterPage)
}

async function countUsers() {
    const resource = await getUsers();
    let userCount = 0;

    resource.forEach((user) => userCount++);
    numberOfUsers = userCount;
    console.log("Number of usernames:", userCount);
}

countUsers();




