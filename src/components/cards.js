const cardTemplate = document.querySelector("#card-template").content;

function deleteCard(event) {
  const deleteListItem = event.target.closest('.places__item');
  deleteListItem.remove();
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function createCard(cardData, deleteCardCallback, likeCardCallback, openCardCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardLike = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  deleteButton.addEventListener('click', deleteCardCallback);
  cardLike.addEventListener('click', likeCardCallback);
  cardImage.addEventListener("click", openCardCallback);

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;


  return cardElement;
}


export {deleteCard, likeCard, createCard}