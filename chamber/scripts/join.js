// TIMESTAMP
const timestamp = document.querySelector("#timestamp");

timestamp.value = new Date().toISOString();


// MODALS
const modalData = [
  {
    openButton: "#open-np",
    closeButton: "#close-np",
    modal: "#np-modal"
  },
  {
    openButton: "#open-bronze",
    closeButton: "#close-bronze",
    modal: "#bronze-modal"
  },
  {
    openButton: "#open-silver",
    closeButton: "#close-silver",
    modal: "#silver-modal"
  },
  {
    openButton: "#open-gold",
    closeButton: "#close-gold",
    modal: "#gold-modal"
  }
];

modalData.forEach((item) => {
  const openButton = document.querySelector(item.openButton);
  const closeButton = document.querySelector(item.closeButton);
  const modal = document.querySelector(item.modal);

  openButton.addEventListener("click", () => {
    modal.showModal();
  });

  closeButton.addEventListener("click", () => {
    modal.close();
  });
});