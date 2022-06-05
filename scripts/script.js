const profileEditButton = document.querySelector('.profile__edit');
const newCardTemplate = document.querySelector('#photoAdd').content;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const popupProfile = document.querySelector('.popup-profile');
const popupProfileName = document.querySelector('#name');
const popupProfileText = document.querySelector('#text');
const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');
const popupProfileClose = popupProfile.querySelector('.popup__close');
const popupProfileForm = document.querySelector('.popup-profile__form');
const photoAddButton = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup-add');
const popupAddClose = popupAdd.querySelector('.popup__close');
const photoAddName = document.querySelector('#addName');
const photoAddLink = document.querySelector('#link');
const popupAddForm = document.querySelector('.popup-add__form');
const popupPicClose = document.querySelector('.popup-pic__close');
const popupPic = document.querySelector('.popup-pic');
const popupPicImg = popupPic.querySelector('.popup-pic__picture');
const popupHeading = popupPic.querySelector('.popup-pic__heading');
const cardSection = document.querySelector('.photo-grid');
const closeButtons = document.querySelectorAll('.popup__close');
function createCard(data) {
  const newCardContainer = newCardTemplate.querySelector('.photo-grid__figure').cloneNode(true);
  const newCardContainerPhoto = newCardContainer.querySelector('.photo-grid__photo');
  newCardContainerPhoto.src = data.link;
  newCardContainerPhoto.alt = data.name;
  newCardContainer.querySelector('.photo-grid__caption').textContent = data.name;
  newCardContainer.querySelector('.photo-grid__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__button_active');
  });
  newCardContainer.querySelector('.photo-grid__bin').addEventListener('click', function (evt) {
    const removeNewElement = evt.target;
    newCardContainer.remove();
  });
  newCardContainerPhoto.addEventListener('click', function (evt) {
    popupPicImg.src = data.link;
    popupPicImg.alt = data.name;
    popupHeading.textContent = data.name;
    openPopup(popupPic);
  });
  return newCardContainer
};
function renderCard(data) {
  cardSection.prepend(data);
};
function openPopup(anyPopup) {
  anyPopup.classList.add('popup_opened');
};
function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened')
};
profileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileText.value = profileText.textContent;
});
popupProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileText.textContent = popupProfileText.value;
  closePopup(popupProfile);
});
initialCards.forEach(function (item) {
  renderCard(createCard(item));
});
photoAddButton.addEventListener('click', function () {
  openPopup(popupAdd);
});
popupAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardFromForm = {
    name: photoAddName.value,
    link: photoAddLink.value
  };
  const newCard = createCard(cardFromForm);
  renderCard(newCard);
  closePopup(popupAdd);
  evt.target.reset();
});
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
