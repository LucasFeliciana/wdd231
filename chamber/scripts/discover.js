import { places } from "../data/places.mjs";

const gallery = document.querySelector(".discover-gallery");

// MODAL
const modal = document.querySelector("#place-modal");
const modalTitle = document.querySelector("#modal-title");
const modalCategory = document.querySelector("#modal-category");
const modalAddress = document.querySelector("#modal-address");
const modalHours = document.querySelector("#modal-hours");
const modalDetails = document.querySelector("#modal-details");
const modalWebsite = document.querySelector("#modal-website");
const closeModal = document.querySelector("#close-modal");


// CREATE DISCOVER CARDS
places.forEach((place) => {

    const card = document.createElement("article");
    card.classList.add("discover-card");

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = `images/${place.image}`;
    image.alt = place.name;
    image.loading = "lazy";

    figure.appendChild(image);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.textContent = "Learn More";


    // OPEN MODAL
    button.addEventListener("click", () => {

        modalTitle.textContent = place.name;
        modalCategory.textContent = place.category;
        modalAddress.textContent = place.address;
        modalHours.textContent = place.hours;
        modalDetails.textContent = place.details;
        modalWebsite.href = place.website;

        modal.showModal();
    });


    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    gallery.appendChild(card);
});


// CLOSE MODAL
closeModal.addEventListener("click", () => {
    modal.close();
});


// LAST VISIT MESSAGE
const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {

    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const difference = currentVisit - Number(lastVisit);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const daysBetweenVisits = Math.floor(
        difference / millisecondsPerDay
    );

    if (daysBetweenVisits < 1) {

        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else if (daysBetweenVisits === 1) {

        visitMessage.textContent =
            "You last visited 1 day ago.";

    } else {

        visitMessage.textContent =
            `You last visited ${daysBetweenVisits} days ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);