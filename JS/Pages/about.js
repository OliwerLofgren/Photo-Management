"use strict";

const aboutusHeader = document.querySelector("header");
const aboutusMain = document.querySelector("main");

//retrieve all current users
async function getUsers() {
  let resource = null;

  try {
    const response = await fetch("../JSON/users.json");
    resource = await response.json();

    if (resource == null) {
      return;
    } else {
      //if resource not null return resource
      return resource;
    }
  } catch (error) {
  }
}

async function createAboutUsPage() {
  setupPage();
  addEventListener();

  function setupPage() {
    setElementAttributes(aboutusMain, "about-us-main", "");
    document.body.classList.remove("body-layout");

    aboutusHeader.innerHTML = `
    <H1>PHOTO MANAGEMENT</H1>
    <nav class="registerNav">
        <button class="discover_button">REGISTER</button>
    </nav>
    `;

    aboutusMain.innerHTML = `
    <section class="section-one">
    <div class="flex circle-wrapper">
        <div class="flex circle">
            <span class="content">About us</span>
        </div>
    </div>

    <p class="paragraf">We love to inspire!
        Join us on the journey</p>

    <div class="amountOfUsers">
        <p>Current amount of users</p>
        <div id="counter">${numberOfUsers}</div>
    </div>
    </section>

    <section class="section-two">
    <div class="text-aboutUs">
        <p>Here at PHOTO MANAGEMENT we understnad the importance of preserving and <br>
            organizing your precious memories captured through photographs.

            Our website offers a wide range of sevices to cater to your specific needs. <br>
            Wheter you are an individual looking to organize your personal photo or a photographer, we have you
            covered.</p>

        <h2>Join us and register <button class="discover_button hereBtn">HERE</button></h2>

        <p>Our team of dedicated experts is passionate about helping you unlock the true potential of your photos.
        </p>


        <p>Welcome to
            PHOTO MANAGMENT</p>

        <p>Our team</p>
    </div>
    <div class="team">
        <div>
            <img src="media/pexels-moose-photos-1587009(1).jpg" alt="Amelie" class="img-aboutUs">
            <h3>Amélie</h3>
        </div>
        <div>
            <img src="media/pexels-andrea-piacquadio-774909(1).jpg" alt="Rabia" class="img-aboutUs">
            <h3>Rabia</h3>
        </div>
        <div>
            <img src="media/rsz_pexels-pixabay-220453.jpg" alt="Oliwer" class="img-aboutUs">
            <h3>Oliwer</h3>
        </div>

    </div>
    </section>
`;
  }
}

let numberOfUsers = 0;

function addEventListener() {
  document
    .querySelector("button")
    .addEventListener("click", createRegisterPage);

  document
    .querySelector(".hereBtn")
    .addEventListener("click", createRegisterPage);
}

async function countUsers() {
  const resource = await getUsers();
  let userCount = 0;

  // if users is an array with a lenth greater than zero it sets the UserCount to the length of the array
  if (Array.isArray(resource) && resource.length > 0) {
    userCount = resource.length;
  }
  numberOfUsers = userCount;
}

countUsers();
