const api_key = "d7eBBdpVdN08nChtJhFZzudXealrUpI6Xz0FsfuK0d5klpBSt6XzL2Zm";

const headers = {
  authorization: api_key,
};
fetch("https://api.pexels.com/v1/photos/2014422", { headers })
  .then((response) => response.json)
  .then((r) => console.log(r));

const div_dom = document.createElement("img");
document.querySelector("body").append(div_dom);
