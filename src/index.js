import {
  createCard,
  deleteCard,
  displayLike,
  displayLikesCounter,
  isMyCardLikeDisplay,
  isCardLikedByMe,
} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import "./index.css";
import {
  getUser,
  getCards,
  updateUser,
  postCard,
  removeCard,
  likeCard,
  unlikeCard,
  updateUserAvatar,
} from "./components/api.js";

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
let myUserId;

function setLoadingTextToButton(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function processLike(cardId, likeButton, cardElement, counterElement) {
  const isLiked = isMyCardLikeDisplay(likeButton);
  if (isLiked) {
    unlikeCard(cardId)
      .then((card) => {
        displayLike(likeButton, false);
        displayLikesCounter(card.likes.length, cardElement, counterElement);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(cardId)
      .then((card) => {
        displayLike(likeButton, true);
        displayLikesCounter(card.likes.length, cardElement, counterElement);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function addCard(
  name,
  url,
  isFirstElement,
  likeCounter,
  userId,
  cardId,
  isLikedByMe
) {
  const cardElement = createCard(
    url,
    name,
    deleteCard,
    cardTemplate,
    openImage,
    likeCounter,
    removeCard,
    cardId,
    processLike,
    isLikedByMe,
    userId,
    myUserId
  );
  if (isFirstElement) {
    cardsContainer.prepend(cardElement);
  } else {
    cardsContainer.append(cardElement);
  }
}

const authorName = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const updatedAvatar = document.querySelector(
  ".popup__input_type_update-avatar"
);
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function setProfile(name, description, avatar) {
  profileTitle.textContent = name;
  profileDescription.textContent = description;
  profileImage.style.backgroundImage = `url(${avatar})`;
}

function setInitialProfileAndCardsInfo() {
  Promise.all([getUser(), getCards()])
    .then(([user, cards]) => {
      setProfile(user.name, user.about, user.avatar);
      myUserId = user._id;
      cards.forEach((card) => {
        addCard(
          card.name,
          card.link,
          false,
          card.likes.length,
          card.owner._id,
          card._id,
          isCardLikedByMe(card, myUserId)
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function setProfileInfo() {
  authorName.value = profileTitle.innerHTML;
  jobInput.value = profileDescription.innerHTML;
}

/*открытие модалки при нажатии кнопки"редактирование" + проставление дефолтных параметров по-умолчанию*/
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
profileEditButton.addEventListener("click", profileEditButtonEventListener);

function profileEditButtonEventListener(event) {
  setProfileInfo();
  const form = popupTypeEdit.querySelector(".popup__form");
  clearValidation(form, validationConfig);
  openModal(popupTypeEdit);
  event.stopImmediatePropagation();
}

/*открытие модалки при нажатии кнопки "добавить карточку"*/
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
profileAddButton.addEventListener("click", profileAddButtonEventListener);

function profileAddButtonEventListener(event) {
  const form = popupTypeNewCard.querySelector(".popup__form");
  clearValidation(form, validationConfig);
  openModal(popupTypeNewCard);
  event.stopImmediatePropagation();
}

const profileImageButton = document.querySelector(".profile__image-button");
const popupTypeUpdateAvatar = document.querySelector(
  ".popup_type_update-avatar"
);
profileImageButton.addEventListener("click", profileImageButtonEventListener);

function profileImageButtonEventListener(event) {
  const form = popupTypeUpdateAvatar.querySelector(".popup__form");
  clearValidation(form, validationConfig);
  openModal(popupTypeUpdateAvatar);
  event.stopImmediatePropagation();
}

const updateAvatarFormElement = document.forms["update-avatar"];

const updateAvatarButtonSubmit =
  updateAvatarFormElement.querySelector(".popup__button");

function handleUpdateAvatarFormSubmit(event) {
  setLoadingTextToButton(updateAvatarButtonSubmit, true);
  event.preventDefault();
  updateUserAvatar(updatedAvatar.value)
    .then(() => {
      profileImage.style.backgroundImage = `url(${updatedAvatar.value})`;
    })
    .then(() => {
      closeModal(popupTypeUpdateAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoadingTextToButton(updateAvatarButtonSubmit, true);
    });
}

updateAvatarFormElement.addEventListener(
  "submit",
  handleUpdateAvatarFormSubmit
);

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
const editFormButtonSubmit = editFormElement.querySelector(".popup__button");

/*сохранение информации в форме "редактирование" и отправка на сервер*/
function handleEditFormSubmit(event) {
  setLoadingTextToButton(editFormButtonSubmit, true);
  event.preventDefault();
  updateUser(authorName.value, jobInput.value)
    .then((updatedUser) => {
      setProfile(updatedUser.name, updatedUser.about, updatedUser.avatar);
    })
    .then(() => {
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoadingTextToButton(editFormButtonSubmit, false);
    });
}

editFormElement.addEventListener("submit", handleEditFormSubmit);

/*обработка формы добавления карточки*/
const addFormElement = document.forms["new-place"];
const cardName = document.querySelector(".popup__input_type_card-name");
const url = document.querySelector(".popup__input_type_url");
const addFormButtonSubmit = addFormElement.querySelector(".popup__button");

/*добавление карточки*/
function handleAddFormSubmit(event) {
  setLoadingTextToButton(addFormButtonSubmit, true);
  event.preventDefault();
  postCard(cardName.value, url.value)
    .then((updatedCard) => {
      addCard(
        updatedCard.name,
        updatedCard.link,
        true,
        updatedCard.likes.length,
        updatedCard.owner._id,
        updatedCard._id,
        isCardLikedByMe(updatedCard, myUserId)
      );
      closeModal(popupTypeNewCard);
      addFormElement.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoadingTextToButton(addFormButtonSubmit, false);
    });
}

addFormElement.addEventListener("submit", handleAddFormSubmit);

/*открыть картинку*/
export function openImage(imagePath, tittle) {
  openModal(popupTypeImage);
  popupImage.src = imagePath;
  popupImage.alt = tittle;
  popupCaption.textContent = tittle;
}

setInitialProfileAndCardsInfo();
enableValidation(validationConfig);
