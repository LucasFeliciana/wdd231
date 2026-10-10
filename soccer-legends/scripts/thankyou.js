
/* =========================
   FORM ACTION PAGE
========================= */

const submissionDetails = document.querySelector("#submission-details");

const params = new URLSearchParams(window.location.search);

const fullname = params.get("fullname");
const email = params.get("email");
const playername = params.get("playername");
const country = params.get("country");
const position = params.get("position");
const reason = params.get("reason");

// Create a safe detail row
function createDetail(label, value) {
  const paragraph = document.createElement("p");
  const heading = document.createElement("strong");

  heading.textContent = `${label}: `;
  paragraph.appendChild(heading);
  paragraph.appendChild(
    document.createTextNode(value || "Not provided")
  );

  return paragraph;
}

if (fullname && email && playername && country && position && reason) {
  submissionDetails.appendChild(createDetail("Full Name", fullname));
  submissionDetails.appendChild(createDetail("Email", email));
  submissionDetails.appendChild(createDetail("Player Name", playername));
  submissionDetails.appendChild(createDetail("Country", country));
  submissionDetails.appendChild(createDetail("Position", position));
  submissionDetails.appendChild(createDetail("Reason", reason));
} else {
  submissionDetails.textContent =
    "No complete suggestion found. Please use the suggestion form.";
}
