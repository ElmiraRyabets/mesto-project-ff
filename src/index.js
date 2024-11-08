import {
  initialCards,
  createCard,
  deleteCard,
  like,
  openImage,
} from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import "./index.css";

/*заполнение карточек на странице по-умолчанию*/
const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

initialCards.forEach((card) => addCard(card.name, card.link, false));

function addCard(name, url, isFirstElement) {
  const cardElement = createCard(
    url,
    name,
    deleteCard,
    cardTemplate,
    like,
    openImage
  );
  if (isFirstElement) {
    cardsContainer.prepend(cardElement);
  } else {
    cardsContainer.append(cardElement);
  }
}

/*открытие модалки при нажатии кнопки"редактирование" + проставление дефолтных параметров по-умолчанию*/
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
profileEditButton.addEventListener("click", function () {
  openModal(popupTypeEdit, profileEditButton);
  determineDefaultInfo();
});

/*открытие модалки при нажатии кнопки "добавить карточку"*/
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
profileAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});

/*Закрытие всех модалок по крестику*/
const popupCloseButtons = document.querySelectorAll(".popup__close");
popupCloseButtons.forEach((item) => {
  item.addEventListener("click", closeModal);
});

/*обработка формы редактирование*/
const editFormElement = document.forms["edit-profile"];
const authorName = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

/*сохранение информации в форме "редактирование"*/
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = authorName.value;
  profileDescription.textContent = jobInput.value;
}

editFormElement.addEventListener("submit", handleEditFormSubmit);
editFormElement.addEventListener("submit", closeModal);

function determineDefaultInfo() {
  authorName.value = profileTitle.innerHTML;
  jobInput.value = profileDescription.innerHTML;
}

/*обработка формы добавления карточки*/
const addFormElement = document.forms["new-place"];
const cardName = document.querySelector(".popup__input_type_card-name");
const url = document.querySelector(".popup__input_type_url");

/*добавление карточки*/
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCard(cardName.value, url.value, true);
}

addFormElement.addEventListener("submit", handleAddFormSubmit);
addFormElement.addEventListener("submit", closeModal);
addFormElement.addEventListener("submit", function () {
  addFormElement.reset();
});
