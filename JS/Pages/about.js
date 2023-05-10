"use strict";

const aboutusHeader = document.querySelector("header");
const aboutusMain = document.querySelector("main");


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


function createAboutUsPage() {

    addEventListener();
    setupPage();

    function setupPage() {

        aboutusHeader.innerHTML = `
        <H1>PHOTO MANAGEMENT</H1>
        <nav>
        <button id="go-back-home">Back to home</button>
        </nav>
        `;

        aboutusMain.innerHTML = `
        <div class="circle"></div>

        <p class="paragraf">We love to inspire
        join us on the journey to blablbalbal</p>

        <




        

        
        
        `

    }

    function addEventListener() {

    }

}