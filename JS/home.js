const api_key = "d7eBBdpVdN08nChtJhFZzudXealrUpI6Xz0FsfuK0d5klpBSt6XzL2Zm";

const headers = {
  authorization: api_key,
};

async function getPhoto() {
  const response = await fetch("https://api.pexels.com/v1/photos/2014422", {
    headers,
  });
  const resource = await response.json();
  console.log(resource);
  const div_dom = document.createElement("div");

  div_dom.innerHTML = `
      <p>${resource.id}</p>
        <img src="${resource.src.medium}">
        `;
  document.querySelector("body").append(div_dom);
}
getPhoto();
