const api_key = "d7eBBdpVdN08nChtJhFZzudXealrUpI6Xz0FsfuK0d5klpBSt6XzL2Zm";

const headers = {
  authorization: api_key,
};

async function getPhoto() {
  const response = await fetch("https://api.pexels.com/v1/curated?per_page=2", {
    headers,
  });
  const resource = await response.json();

  console.log(resource);
  console.log(resource.photos[0].id);

  const div_dom = document.createElement("div");

  div_dom.innerHTML = `
      <p>${resource.photos[0].id}</p>
        <img src="${resource.photos[0].src.medium}">
        <img src="${resource.photos[1].src.medium}">
        `;
  document.querySelector("body").append(div_dom);
}
getPhoto();
