"use strict";

const mainHome = document.querySelector("main");

async function getPhoto() {

  // NOTE, set per page parameter, + add result object to innerhtml 
  const per_page = 6;
  const url = `${prefix}curated?per_page=${per_page}`;

  const response = await fetch_resource(new Request(url, { headers }));
  const resource = await response.json();

  const div_dom = document.createElement("div");

  // använd for loop ist? > 
  div_dom.innerHTML = `
      <img src="${resource.photos[0].src.medium}">
      <img src="${resource.photos[1].src.medium}">
      <img src="${resource.photos[2].src.medium}">
      <img src="${resource.photos[3].src.medium}">
      <img src="${resource.photos[4].src.medium}">
      <img src="${resource.photos[5].src.medium}">
    `;

  mainHome.append(div_dom);


  console.log(resource.photos[0]);
}

getPhoto();