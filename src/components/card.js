export function createCard(
  imagePath,
  title,
  deleteCard,
  cardTemplate,
  like,
  openImage
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = imagePath;
  cardElement.querySelector(".card__description .card__title").textContent =
    title;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => like(likeButton));

  const textArea =  cardElement.querySelector(".card__title")
  cardImage.addEventListener("click", () => openImage(cardImage, textArea));
  return cardElement;
}

export function deleteCard(cardElement) {
   cardElement.remove();
}

export function like(likeButton) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active");
  } else {
    likeButton.classList.add("card__like-button_is-active");
  }
}
