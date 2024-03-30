import { deleteCardRequest, sendCardLike, sendCardUnlike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

function deleteCard(event) {
  const deleteListItem = event.target.closest('.places__item');
  deleteListItem.remove();
}

function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function createCard(cardData, deleteCardCallback, likeCardCallback, openCardCallback, profileId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const cardLike = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikesCounter = cardElement.querySelector(".card__like-count");

  if(profileId === cardData.owner._id){
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.classList.add('card__delete-button_visible');
    deleteButton.addEventListener("click", function(event){
      deleteCardRequest(cardData._id)
        .then(deleteCardCallback(event))
        .catch((error) => {
          console.log(`Ошибка ${error}`);
        })
    });
  }

  if (cardData.likes.some(function(cardLike){
    return cardLike._id === profileId; })){
    cardLike.classList.toggle("card__like-button_is-active");

  }

  cardLike.addEventListener('click', function(event){
    if(event.target.classList.contains('card__like-button_is-active')){
      sendCardUnlike(cardData._id)
      .then((cardDataLikes) =>{
        cardLikesCounter.textContent = cardDataLikes.likes.length;
        likeCardCallback(event);
      })
      .catch((error) => {
        console.log(`Ошибка ${error}`);
      })
  }
    else{
      sendCardLike(cardData._id)
      .then((cardDataLikes) =>{
        cardLikesCounter.textContent = cardDataLikes.likes.length;
        likeCardCallback(event);
      })
      .catch((error) => {
        console.log(`Ошибка ${error}`);
      })
    }
    });

  cardImage.addEventListener("click", openCardCallback);

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardLikesCounter.textContent = cardData.likes.length;

  return cardElement;
}


export {deleteCard, likeCard, createCard}