import "./pages/index.css";

import { deleteCard, likeCard, createCard } from './components/cards';
import { openPopup, closePopup } from './components/modal';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  initialProfileData,
  changeProfile,
  sendNewCard,
  initialCards,
  updateProfileAvatar,
} from './components/api.js';

const cardList = document.querySelector(".places__list");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
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
const popupAvatarLink = document.querySelector(".popup__input_type_avatar-url");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");

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

Promise.all([initialCards(), initialProfileData("me")])
  .then((initialData) => {
    const initialCardsHendler = initialData[0];
    const profileData = initialData[1];

    initialCardsHendler.forEach((card) => {
      const makeCard = createCard(
        card,
        deleteCard,
        likeCard,
        openCard,
        profileData._id
      );
      addCard(makeCard);
    });

    profileName.textContent = profileData.name;
    profileJob.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url('${profileData.avatar}')`;
  })
  .catch((error) => {
    console.log(`Ошибка ${error}`);
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
  clearValidation(popupProfileEdit, {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  });       
});

popupProfileEdit.addEventListener("submit", handleProfileFormSubmit);

profileAvatar.addEventListener("click", () => {
  openPopup(popupEditAvatar);
  popupAvatarLink.value = "";
  clearValidation(popupEditAvatar, {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  });
});

popupEditAvatar.addEventListener("submit", handleEditAvatarSubmit);

profileAddButton.addEventListener("click", () => {
  popupNewCardName.value = "";
  popupNewCardLink.value = "";
  openPopup(popupNewCard);
  clearValidation(popupNewCard, {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  });
})

popupNewCard.addEventListener("submit", handleAddNewCardSubmit)

function renderLoading(isLoading, button){
  if (isLoading){
    button.textContent = "Сохранение...";
  }
  else{
    button.textContent = "Сохранить";
  }
}
  
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const popupButton  = popupProfileEdit.querySelector('.popup__button')
  renderLoading(true, popupButton);
  changeProfile("me", {
  name: popupInputName.value,
  about: popupInputJob.value,
  })
  .then((profileData) =>{
  profileName.textContent = profileData.name;
  profileJob.textContent = profileData.about;
  closePopup(popupProfileEdit);
  })
  .catch((errorMessage) =>{
  console.log(errorMessage)
  })
  .finally(()=>{
  renderLoading(false, popupButton);
  });
  
}

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  const popupButton  = popupEditAvatar.querySelector('.popup__button');
  renderLoading(true, popupButton);
  updateProfileAvatar({ avatar: popupAvatarLink.value })
  .then((profileData) => {
    profileAvatar.style.backgroundImage = `url('${profileData.avatar}')`;
    closePopup(popupEditAvatar);
  })
  .catch((errorMessage) =>{
    console.log(errorMessage)
  })
  .finally(()=>{
    renderLoading(false, popupButton);
  });
}

function handleAddNewCardSubmit(evt) {
  evt.preventDefault();
  const popupButton  = popupNewCard.querySelector('.popup__button');
  renderLoading(true, popupButton);
  sendNewCard({
    name: popupNewCardName.value,
    link: popupNewCardLink.value,
  })
  .then((card) => {
    const makeCard = createCard(
      card,
      deleteCard,
      likeCard,
      openCard,
      card.owner._id
      );
    addNewCard(makeCard);
    evt.target.reset();
    closePopup(popupNewCard);
  })
  .catch((errorMessage) =>{
    console.log(errorMessage)
  })
  .finally(()=>{
    renderLoading(false, popupButton);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});