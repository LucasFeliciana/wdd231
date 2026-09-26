const params = new URLSearchParams(window.location.search);

document.querySelector("#first-name").textContent =
  params.get("fname");

document.querySelector("#last-name").textContent =
  params.get("lname");

document.querySelector("#email").textContent =
  params.get("email");

document.querySelector("#phone").textContent =
  params.get("phone");

document.querySelector("#organization").textContent =
  params.get("organization");

const timestamp = params.get("timestamp");

if (timestamp) {
  const date = new Date(timestamp);

  document.querySelector("#timestamp-display").textContent =
    date.toLocaleString();
}