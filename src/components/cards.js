const initialCards = [
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

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;


  return cardElement;
}

export {deleteCard, likeCard, createCard, initialCards}