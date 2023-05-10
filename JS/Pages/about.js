"use strict";

const aboutusHeader = document.querySelector("header");
const aboutusMain = document.querySelector("main");
let resource = null;

// count logged in users
// Object.values(users).filter(user => user.isLoggedIn).length

// let count = 0
// let login = 0
// for(user in users)
// {
//     if(users[user].isLoggedIn)
//     {
//         login++
//     }
//     if(users[user].points >= 50)
//     {
//         count++;
//     }
//     const skills = users[user].skills
//     if (skills.includes("MongoDB", "Express", "React", "Node") ) {
//         console.log(`${user} have MERN STACK`)
//     }
// }
// console.log(`${count} users have greater than equal to 50 points`)
// console.log(`${login} users logged in`)
async function getUsers(event) {


    try {
        const response = await fetch("/JSON/users.json");
        const resource = await response.json();

        if (!response.ok) {
            console.log("Response not ok");
        } else {
            console.log("Response succesfull", resource);
        }
    } catch (error) {
        console.log("Error", error);
    }

    if (resource) {
        const users = resource.users;
        console.log("Number of users:", users.length);

        users.forEach((user, index) => {
            console.log(`User ${index + 1}: ${user.username}`)
        });
    }

}

function createAboutUsPage() {

    setupPage();
    addEventListener();


    function setupPage() {

        setElementAttributes(aboutusMain, "about-us-main", "");

        aboutusHeader.innerHTML = `
        <H1>PHOTO MANAGEMENT</H1>
        <nav>
        <button id="registerBtn">REGISTER</button>
        </nav>
        `;

        aboutusMain.innerHTML = `
        <div class="circle"> 
        <h1 class ="circle-title">About us</h1>
        </div>

        <p class="paragraf">We love to inspire
        join us on the journey to blablbalbal</p>

        <div>
        <p>Current amount of logged in users</p>
        <div id="counter"></div>
        </div>

        <h2>Join us and register <a>HERE</a></h2>

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

        `;

    }

    function addEventListener() {
        document
            .getElementById("registerBtn")
            .addEventListener("click", createRegisterPage);

        document
            .getElementById("counter")
            .addEventListener("click", getUsers);
        getUsers();
    }

}