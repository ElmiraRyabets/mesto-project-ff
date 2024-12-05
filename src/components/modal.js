export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("mousedown", closeModalByOverlay);
  document.removeEventListener("keydown", closeModalByEsc);
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("mousedown", closeModalByOverlay);
  document.addEventListener("keydown", closeModalByEsc);
}

function closeModalByOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
}

function closeModalByEsc(event) {
  if (event.key == "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
