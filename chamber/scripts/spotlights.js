const membersURL = "data/members.json";

const spotlightContainer =
    document.querySelector("#spotlight-container");


async function getMembers() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw Error(await response.text());
        }

        const data = await response.json();

        displaySpotlights(data.members);

    } catch (error) {
        console.error("Members error:", error);
    }
}


function displaySpotlights(members) {

    // Keep only Silver (2) and Gold (3) members
    const qualifiedMembers = members.filter(
        member => member.membership === 2 ||
                  member.membership === 3
    );


    // Shuffle the members randomly
    qualifiedMembers.sort(() => Math.random() - 0.5);


    // Select 3 members
    const selectedMembers = qualifiedMembers.slice(0, 3);


    selectedMembers.forEach(member => {

        const card = document.createElement("section");
        card.classList.add("spotlight-card");


        const name = document.createElement("h3");
        name.textContent = member.name;


        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;


        const address = document.createElement("p");
        address.textContent = member.address;


        const phone = document.createElement("p");
        phone.textContent = member.phone;


        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";


        const membership = document.createElement("p");

        if (member.membership === 3) {
            membership.textContent = "Gold Member";
        } else {
            membership.textContent = "Silver Member";
        }


        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);


        spotlightContainer.appendChild(card);
    });
}


getMembers();