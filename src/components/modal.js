export function closeModal() {
  let  popup = event.target.closest(".popup");
  if (popup === null) {
    popup = document.querySelector(".popup_is-opened");
  }
  popup.classList.remove("popup_is-opened");
  /*при закрытии модалки - удаляем временные слушатели закрытия */
  document.removeEventListener("click", closeModalByOverlay);
  document.removeEventListener("keydown", closeModalByEsc);
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-opened");
  /*при открытии модалки - добавляем временные слушатели закрытия */
  document.addEventListener("click", closeModalByOverlay);
  document.addEventListener("keydown", closeModalByEsc);
  event.stopImmediatePropagation();
}

function closeModalByOverlay() {
  const popupContent = event.target.closest(".popup__content");
  if (popupContent === null) {
    closeModal();
  }
}

function closeModalByEsc() {
  if (event.key == "Escape") {
    closeModal();
  }
}
