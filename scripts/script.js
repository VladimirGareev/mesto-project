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
const popupFirst = document.querySelector('.popup-first');
const popupFirstName = document.querySelector('#name');
const popupFirstText = document.querySelector('#text');
const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');
const popupFirstClose = popupFirst.querySelector('.popup__close');
const popupFirstForm = document.querySelector('.popup-first__form');
const photoAddButton = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup-add');
const popupAddClose = popupAdd.querySelector('.popup__close');
const photoAddName = document.querySelector('#addName');
const photoAddLink = document.querySelector('#link');
const popupAddForm = document.querySelector('.popup-add__form');
const popupPicClose = document.querySelector('.popup-pic__close');
const popupPic = document.querySelector('.popup-pic');
function createCard(data) {
  const newCardContainer = newCardTemplate.querySelector('.photo-grid__figure').cloneNode(true);
  newCardContainer.querySelector('.photo-grid__photo').src = data.link;
  newCardContainer.querySelector('.photo-grid__caption').textContent = data.name;
  newCardContainer.querySelector('.photo-grid__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__button_active');
  });
  newCardContainer.querySelector('.photo-grid__bin').addEventListener('click', function (evt) {
    const removeNewElement = evt.target;
    removeNewElement.parentElement.remove();;
  });
  newCardContainer.querySelector('.photo-grid__photo').addEventListener('click', function (evt) {
    const popupPicImg = popupPic.querySelector('.popup-pic__picture');
    const popupImgSrc = evt.target;
    const popupHeadingSrc = popupImgSrc.nextElementSibling.querySelector('.photo-grid__caption');
    const popupHeading = popupPic.querySelector('.popup-pic__heading');
    popupPicImg.src = popupImgSrc.src;
    popupHeading.textContent = popupHeadingSrc.textContent;
    openPopup(popupPic);
  });
  return newCardContainer
};
function renderCard(data) {
  const firstCard = document.querySelector('.photo-grid');
  firstCard.prepend(data);
};
function openPopup(anyPopup) {
  anyPopup.classList.add('popup_opened');
};
function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened')
};
profileEditButton.addEventListener('click', () => openPopup(popupFirst));
popupFirstClose.addEventListener('click', () => closePopup(popupFirst));
popupFirstName.value = profileName.textContent;
popupFirstText.value = profileText.textContent;
popupFirstForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popupFirstName.value;
  profileText.textContent = popupFirstText.value;
  closePopup(popupFirst);
});
initialCards.forEach(function (item) {
  renderCard(createCard(item));
});
photoAddButton.addEventListener('click', function () {
  openPopup(popupAdd);
});
popupAddClose.addEventListener('click', () => closePopup(popupAdd));
popupAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const getCardFromForm = {
    name: photoAddName.value,
    link: photoAddLink.value
  };
  const newCard = createCard(getCardFromForm);
  renderCard(newCard);
  closePopup(popupAdd);
  photoAddLink.value = '';
  photoAddName.value = '';
});
popupPicClose.addEventListener('click', () => closePopup(popupPic));
