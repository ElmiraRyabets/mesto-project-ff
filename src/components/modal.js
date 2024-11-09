export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("mousedown", closeModalByOverlay);
  document.removeEventListener("keydown", closeModalByEsc);
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("mousedown", closeModalByOverlay);
  document.addEventListener("keydown", (event) => closeModalByEsc(event, popup));
}

function closeModalByOverlay(event) {
  const popup = document.querySelector('.popup_is-opened');
  const popupContent = event.target.closest(".popup__content");
  if (popupContent === null) {
    closeModal(popup);
  }
}
function closeModalByEsc(event, popup) {
  if (event.key == "Escape") {
    closeModal(popup);
  }
}
