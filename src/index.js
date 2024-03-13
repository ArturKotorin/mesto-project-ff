import "./pages/index.css";

import { deleteCard, likeCard, createCard } from './components/cards';
import { openPopup, closePopup } from './components/modal';
import { initialCards } from "./components/initialCards";

const cardList = document.querySelector(".places__list");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputJob = document.querySelector(".popup__input_type_description");
const popupImage = document.querySelector(".popup_type_image");
const popupImageImg = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupNewCardName = document.querySelector(".popup__input_type_card-name");
const popupNewCardLink = document.querySelector(".popup__input_type_url");
const popups = document.querySelectorAll(".popup");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

function openCard(event) {
    const cardElement = event.target.closest(".card");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title").textContent;
    openPopup(popupImage);
    popupImageImg.src = cardImage.src;
    popupImageImg.alt = cardImage.alt;
    popupImageCaption.textContent = cardTitle;
}

function addCard(makeCard) {
    cardList.append(makeCard);
}
  
function addNewCard(makeCard) {
    cardList.prepend(makeCard);
}

initialCards.forEach((initialCard) => {
    const createdCard = createCard(initialCard, deleteCard, likeCard, openCard);
    addCard(createdCard);
});

popups.forEach((popup) => {
    popup.classList.add("popup_is-animated");
    popup.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("popup__close")) {
        closePopup(popup);
      }
      if (evt.target === evt.currentTarget) {
        closePopup(popup);
      }
    });
});

profileEditButton.addEventListener("click", () => {
  openPopup(popupProfileEdit);
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;       
});

popupProfileEdit.addEventListener("submit", handleProfileFormSubmit);


profileAddButton.addEventListener("click", () => {
  openPopup(popupNewCard);
})

popupNewCard.addEventListener("submit", handleAddNewCardSubmit)
  
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileJob.textContent = popupInputJob.value;
    closePopup(popupProfileEdit);
}

function handleAddNewCardSubmit(evt) {
    evt.preventDefault();
    const newCard = { 
        name: popupNewCardName.value, 
        link: popupNewCardLink.value 
    }
    const createdCard = createCard(
      newCard,
      deleteCard,
      likeCard,
      openCard
    );
    addNewCard(createdCard);
    evt.target.reset();
    closePopup(popupNewCard);
}