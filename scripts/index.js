const cardTemplate = document.querySelector('#card-template').content;

const cardsList = document.querySelector('.places__list');

initialCards.forEach(function(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__title').textContent = item.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    cardsList.append(cardElement);
})

function deleteCard(event) {
    const deleteListItem = event.target.closest('.places__item');
    deleteListItem.remove();
}