import {
  openModal
} from "./modal.js";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard(imagePath, title, deleteCard, cardTemplate, like, openImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = imagePath;
  cardElement.querySelector(".card__description .card__title").textContent = title;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener('click', deleteCard);
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", like);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", openImage);
  return cardElement;
}

export function deleteCard(evt) {
   const cardItem = evt.target.closest('.card');
   cardItem.remove();
}

export function like() {
  const likeButton = event.target;
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active");
  } else {
    likeButton.classList.add("card__like-button_is-active");
  }
}

export function openImage() {
  const popup = document.querySelector(".popup_type_image");
  const cardImage = event.target.closest(".card__image");
  const placeItem =  event.target.closest(".places__item");
  const textArea =  placeItem.querySelector(".card__title")
  openModal(popup);
  popup.querySelector(".popup__image").src = cardImage.src;
  popup.querySelector(".popup__caption").textContent = textArea.textContent;
}