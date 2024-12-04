export function createCard(
  imagePath,
  title,
  deleteCard,
  cardTemplate,
  openImage,
  likeCounter,
  isDeleteButtonActive,
  removeCard,
  cardId,
  processLike,
  isLikedByMe
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const counterElement = cardElement.querySelector(
    ".card__like-button-counter"
  );
  /*отображаем актуальное состояние карточки, полученное с сервера*/
  displayLike(likeButton, isLikedByMe);
  displayLikesCounter(likeCounter, cardElement, counterElement);
  const cardImage = cardElement.querySelector(".card__image");
  const textArea = cardElement.querySelector(".card__title");
  cardImage.src = imagePath;
  textArea.textContent = title;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  deleteButton.addEventListener("click", () => removeCard(cardId));
  likeButton.addEventListener("click", () =>
    processLike(cardId, likeButton, cardElement, counterElement)
  );
  cardImage.addEventListener("click", () => openImage(imagePath, title));
  if (isDeleteButtonActive) {
    deleteButton.classList.add("active_card_delete-button");
  }
  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function displayLike(likeButton, isCardLiked) {
  if (isCardLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}

export function displayLikesCounter(counter, cardElement, counterElement) {
  counterElement.textContent = counter;
}

export function isMyCardLikeDisplay(likeButton) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    return true;
  } else {
    return false;
  }
}
