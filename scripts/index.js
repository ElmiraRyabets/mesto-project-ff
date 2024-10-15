// @todo: Темплейт карточки

function prepareTemplate(imagePath, title, deleteFuncParam) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = imagePath;
  cardElement.querySelector(".card__description .card__title").textContent = title;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener('click', deleteFuncParam); 
  return cardElement;
}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
const deleteFunction = function deleteCard() {
   const cardItem = event.target.closest('.card');
   cardItem.remove();
}

// @todo: Вывести карточки на страницу
const cardsContainer = document.querySelector(".places__list");
initialCards.forEach(function (item) {
  let cardElement = prepareTemplate(item.link, item.name, deleteFunction);
  cardsContainer.append(cardElement);
});
