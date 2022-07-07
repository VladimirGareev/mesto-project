const profileName = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");
const profileAvatar = document.querySelector(".profile__image");
const photoAddButton = document.querySelector(".profile__add");
const popupAdd = document.querySelector(".popup-add");
const popupAvatar = document.querySelector(".popup-avatar");
const popupAvatarForm = document.querySelector(".popup-avatar__form");
const popupAvatarLink = document.querySelector(".popup-avatar__text");
const photoAddName = document.querySelector("#addName");
const photoAddLink = document.querySelector("#link");
const popups = document.querySelectorAll(".popup");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};
const popupAddSubmitButton = popupAddForm.querySelector(validationConfig.submitButtonSelector);
const popupProfileSubmitButton = popupProfileForm.querySelector(validationConfig.submitButtonSelector);

const avatarEditLogo = document.querySelector(".profile__image-edit");
import { enableValidation, toggleButtonState} from "./validate.js";
import { renderCard } from "./cards.js";
import { createCard } from "./cards.js";
import { openPopup, closePopup, renderLoading } from "./utils";
import {
  profileEditButton,
  popupProfileForm,
  popupProfile,
  popupProfileName,
  popupProfileText,
  popupAddForm,
} from "./modal";
import {
  getAllCards,
  getProfile,
  editProfile,
  addCard,
  editAvatar,
} from "./api.js";

getProfile()
  .then((datas) => {
    profileName.textContent = datas.name;
    profileText.textContent = datas.about;
    profileAvatar.src = datas.avatar;
    profileAvatar.id = datas._id;
    getAllCards()
        .then((cards) => {
        cards.forEach((card) => {
           const newCard = createCard(card, profileAvatar.id);
           renderCard(newCard);
        });
      })
      .catch((err) => {
        console.log(`Ошибка загрузки карточек с сервера: ${err.status}`);
      });
  })
  .catch((err) => {
    console.log(`Ошибка загрузки данных профиля с сервера: ${err.status}`);
  });

  enableValidation(validationConfig);


profileEditButton.addEventListener("click", () => {
  openPopup(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileText.value = profileText.textContent;
  toggleButtonState(popupProfileSubmitButton, popupProfileForm, validationConfig)
});

popupProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, validationConfig, popupProfile);
  editProfile(popupProfileName.value, popupProfileText.value)
      .then(() => {
      profileName.textContent = popupProfileName.value;
      profileText.textContent = popupProfileText.value;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(`Ошибка отправки данных профиля на сервер: ${err.status}`);
    })
    .finally((res) => {
      renderLoading(false, validationConfig, popupProfile);
    });
});

photoAddButton.addEventListener("click", function () {
  openPopup(popupAdd);
});

popupAddForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, validationConfig, popupAdd);
  addCard(photoAddName.value, photoAddLink.value)
     .then((res) => {
      renderCard(createCard(res, profileAvatar.id));
      closePopup(popupAdd);
      evt.target.reset();
     popupAddSubmitButton.classList.add(validationConfig.inactiveButtonClass);
     popupAddSubmitButton.disabled = 'disabled';
    })
    .catch((err) => {
      console.log(`Ошибка отправки места на сервер: ${err.status}`);
    })
    .finally((res) => {
      renderLoading(false, validationConfig, popupAdd);
    });
});

enableValidation(validationConfig);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

profileAvatar.addEventListener("mouseover", (evt) => {
  avatarEditLogo
    .classList.add("profile__image-edit_active");
});
profileAvatar.addEventListener("mouseout", (evt) => {
  avatarEditLogo
    .classList.remove("profile__image-edit_active");
});
avatarEditLogo
  .addEventListener("mousedown", (evt) => {
    openPopup(popupAvatar);
});

popupAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, validationConfig, popupAvatar);
  editAvatar(popupAvatarLink.value)
     .then((res) => {
      profileAvatar.src = res.avatar;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(`Ошибка отправки данных профиля на сервер: ${err.status}`);
    })
    .finally((res) => {
      renderLoading(false, validationConfig, popupAvatar);
      });
});

import "../pages/index.css";
