"use strict";

document.querySelector("main").innerHTML = `
        <form id="upload" action="receiver.php" method="POST">
            <input type="file" name="test">
            <button type="submit">Upload</button>
        </form>
        
        <p id="message"></p>
        <div id="result"></div>
`;

//Here is where the POST request for profile to be
//This is where the POST-method should be in, to upload your own files

//Code below is from a exercise from CHUNKS, needs to update
const form = document.getElementById("upload");
const p = document.getElementById("message");
const result = document.getElementById("result");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  // Remove previously uploaded image
  result.innerHTML = "";

  const formData = new FormData(form);
  const request = new Request("receiver.php", {
    method: "POST",
    body: formData,
  });

  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      // This simply resets the form.
      form.reset();

      if (data.error) {
        p.textContent = "An error occurred: " + data.error;
      } else {
        p.textContent = "Successfully uploaded the image";
        const img = document.createElement("img");
        // Assign the source to the image we just uploaded and
        // received from the API
        img.src = data.src;
        result.appendChild(img);
      }
    });
});
