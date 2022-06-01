const profileEditButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});
const popupClose = document.querySelector('.popup__close');
popupClose.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});
const popupName = document.querySelector('#name');
const popupText = document.querySelector('#text');
const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');
popupName.value = profileName.textContent;
popupText.value = profileText.textContent;
const popupForm = document.querySelector('.popup__form');
popupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileText.textContent = popupText.value;
  popup.classList.remove('popup_opened');
});
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
const newCardTemplate = document.querySelector('#photoAdd').content;
const createCard = function (data) {
  const newCardContainer = newCardTemplate.querySelector('.photo-grid__figure').cloneNode(true);
  newCardContainer.querySelector('.photo-grid__photo').src = data.link;
  newCardContainer.querySelector('.photo-grid__caption').textContent = data.name;
  return newCardContainer
};
const renderCard = function (data) {
  const firstCard = document.querySelector('.photo-grid');
  firstCard.prepend(data);
};
initialCards.forEach(function (item) {
  renderCard(createCard(item));
});
const photoAddButton = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup-add');
photoAddButton.addEventListener('click', function () {
  popupAdd.classList.add('popup-add_opened');
});
const popupAddClose = document.querySelector('.popup-add__close');
popupAddClose.addEventListener('click', function () {
  popupAdd.classList.remove('popup-add_opened');
});
const photoAddName = document.querySelector('#addName');
const photoAddLink = document.querySelector('#link');
const popupAddForm = document.querySelector('.popup-add__form');
const like = document.querySelectorAll('.photo-grid__button');
for (let i = 0; i < like.length; i++) {
  like[i].addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__button_active');
  });
}
popupAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const getCardFromForm = {
    name: photoAddName.value,
    link: photoAddLink.value
  };
  const newCard = createCard(getCardFromForm);
  renderCard(newCard);
  popupAdd.classList.remove('popup-add_opened');
  photoAddLink.value = '';
  photoAddName.value = '';
  const likeNew = newCard.querySelector('.photo-grid__button');
  likeNew.addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__button_active');
  });
  const removeNew = newCard.querySelector('.photo-grid__bin');
  removeNew.addEventListener('click', function (evt) {
    const removeNewElement = evt.target;
    removeNewElement.parentElement.remove();
  });
  newCard.addEventListener('click', function (evt) {
    const popupPicImg = popupPic.querySelector('.popup-pic__picture');
    const popupImgSrc = evt.target;
    const popupHeadingSrc = popupImgSrc.nextElementSibling.querySelector('.photo-grid__caption');
    const popupHeading = popupPic.querySelector('.popup-pic__heading');
    popupPicImg.src = popupImgSrc.src;
    popupHeading.textContent = popupHeadingSrc.textContent;
    popupPic.classList.add('popup-pic_opened');
    console.log(popupHeadingSrc);
  });
});
const remove = document.querySelectorAll('.photo-grid__bin');
for (let i = 0; i < remove.length; i++) {
  remove[i].addEventListener('click', function (evt) {
    const removeElement = evt.target;
    removeElement.parentElement.remove();
  });
}
const popupPic = document.querySelector('.popup-pic');
const photoGridElements = document.querySelectorAll('.photo-grid__photo');
for (let i = 0; i < photoGridElements.length; i++) {
  photoGridElements[i].addEventListener('click', function (evt) {
    const popupPicImg = popupPic.querySelector('.popup-pic__picture');
    const popupImgSrc = evt.target;
    const popupHeadingSrc = popupImgSrc.nextElementSibling.querySelector('.photo-grid__caption');
    const popupHeading = popupPic.querySelector('.popup-pic__heading');
    popupPicImg.src = popupImgSrc.src;
    popupHeading.textContent = popupHeadingSrc.textContent;
    popupPic.classList.add('popup-pic_opened');
    console.log(popupHeadingSrc);
  })
}
const popupPicClose = document.querySelector('.popup-pic__close');
popupPicClose.addEventListener('click', function () {
  popupPic.classList.remove('popup-pic_opened');
});
