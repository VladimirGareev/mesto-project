const newCardTemplate = document.querySelector('#photoAdd').content;
const cardSection = document.querySelector('.photo-grid');
const popupPic = document.querySelector('.popup-pic');
const popupPicImg = popupPic.querySelector('.popup-pic__picture');
const popupHeading = popupPic.querySelector('.popup-pic__heading');
import {openPopup} from "./utils";

export function renderCard(data) {
  cardSection.prepend(data);
};

export function createCard(data) {
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
