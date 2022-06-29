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
  },
];

const profileName = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");
const photoAddButton = document.querySelector(".profile__add");
const popupAdd = document.querySelector(".popup-add");
const photoAddName = document.querySelector("#addName");
const photoAddLink = document.querySelector("#link");
const closeButtons = document.querySelectorAll(".popup__close");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};
import { enableValidation } from "./validate.js";
import { renderCard } from "./cards.js";
import { createCard } from "./cards.js";
import { openPopup, closePopup } from "./utils";
import {
  profileEditButton,
  popupProfileForm,
  popupProfile,
  popupProfileName,
  popupProfileText,
  popupAddForm,
} from "./modal";

popupProfileName.value = profileName.textContent;
popupProfileText.value = profileText.textContent;

profileEditButton.addEventListener("click", () => {
  openPopup(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileText.value = profileText.textContent;
});

popupProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileText.textContent = popupProfileText.value;
  closePopup(popupProfile);
});

initialCards.forEach(function (item) {
  renderCard(createCard(item));
});

photoAddButton.addEventListener("click", function () {
  openPopup(popupAdd);
});

popupAddForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardFromForm = {
    name: photoAddName.value,
    link: photoAddLink.value,
  };
  const newCard = createCard(cardFromForm);
  renderCard(newCard);
  closePopup(popupAdd);
  evt.target.reset();
});
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

enableValidation(validationConfig);

document.addEventListener("keydown", (evt) => {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(activePopup);
  }
});

document.addEventListener("mousedown", (evt) => {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(activePopup);
  }
});

import "../pages/index.css";