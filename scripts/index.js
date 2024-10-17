// @todo: Темплейт карточки

function createCard(imagePath, title, deleteCard, cardTemplate) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = imagePath;
  cardElement.querySelector(".card__description .card__title").textContent = title;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener('click', deleteCard); 
  return cardElement;
}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
function deleteCard() {
   const cardItem = event.target.closest('.card');
   cardItem.remove();
}

// @todo: Вывести карточки на страницу
const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
initialCards.forEach(function (item) {
  const cardElement = createCard(item.link, item.name, deleteCard, cardTemplate);
  cardsContainer.append(cardElement);
});
