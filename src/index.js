import {
  initialCards
} from "./components/cards.js";
import {
  createCard,
  deleteCard,
  like
} from "./components/card.js";
import { openModal, closeModal} from "./components/modal.js";
import "./index.css";

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

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

const authorName = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function determineDefaultInfo() {
  authorName.value = profileTitle.innerHTML;
  jobInput.value = profileDescription.innerHTML;
}

/*открытие модалки при нажатии кнопки"редактирование" + проставление дефолтных параметров по-умолчанию*/
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
profileEditButton.addEventListener("click", profileEditButtonEventListener);

function profileEditButtonEventListener(event) {
  determineDefaultInfo();
  openModal(popupTypeEdit);
  event.stopImmediatePropagation();
}

/*открытие модалки при нажатии кнопки "добавить карточку"*/
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
profileAddButton.addEventListener("click", profileAddButtonEventListener);

function profileAddButtonEventListener(event) {
  openModal(popupTypeNewCard);
  event.stopImmediatePropagation();
}

/*Закрытие всех модалок по крестику*/
const popupCloseButtons = document.querySelectorAll(".popup__close");
popupCloseButtons.forEach((item) => {
  item.addEventListener("click", popupCloseButtonEventListener);
});

function popupCloseButtonEventListener(event) {
  const popup = event.target.closest(".popup");
  closeModal(popup);
}

/*обработка формы редактирование*/
const editFormElement = document.forms["edit-profile"];

/*сохранение информации в форме "редактирование"*/
function handleEditFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = authorName.value;
  profileDescription.textContent = jobInput.value;
}

editFormElement.addEventListener("submit", handleEditFormSubmit);
editFormElement.addEventListener("submit",  () => closeModal(popupTypeEdit));

/*обработка формы добавления карточки*/
const addFormElement = document.forms["new-place"];
const cardName = document.querySelector(".popup__input_type_card-name");
const url = document.querySelector(".popup__input_type_url");

/*добавление карточки*/
function handleAddFormSubmit(event) {
  event.preventDefault();
  addCard(cardName.value, url.value, true);
}

addFormElement.addEventListener("submit", handleAddFormSubmit);
addFormElement.addEventListener("submit",  () => closeModal(popupTypeNewCard));
addFormElement.addEventListener("submit", () => addFormElement.reset());

/*открыть картинку*/
export function openImage(cardImage, textArea) {
  openModal(popupTypeImage);
  popupImage.src = cardImage.src;
  popupImage.alt = textArea.textContent;
  popupCaption.textContent = textArea.textContent;
}

