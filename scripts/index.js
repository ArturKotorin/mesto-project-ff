const cardTemplate = document.querySelector('#card-template').content;

const cardsList = document.querySelector('.places__list');

function createCard(name, link, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
    
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
}

function deleteCard(event) {
    const deleteListItem = event.target.closest('.places__item');
    deleteListItem.remove();
}

initialCards.forEach(function(item) {
    cardsList.append(createCard(item.name, item.link, deleteCard));
})