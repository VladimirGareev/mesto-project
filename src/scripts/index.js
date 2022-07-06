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
import { enableValidation } from "./validate.js";
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
  onResponse,
  getProfile,
  editProfile,
  addCard,
  editAvatar,
} from "./api.js";

getProfile()
  .then(onResponse)
  .then((data) => {
    profileName.textContent = data.name;
    profileText.textContent = data.about;
    profileAvatar.src = data.avatar;
    profileAvatar.id = data._id;
    getAllCards()
      .then(onResponse)
      .then((cards) => {
        cards.forEach((card) => {
          let newCard = createCard(card);
          if (card.owner._id !== profileAvatar.id) {
            newCard.querySelector(".photo-grid__bin").remove();
          }
          if (
            card.likes.some((item) => {
              return item._id === profileAvatar.id;
            })
          ) {
            newCard
              .querySelector(".photo-grid__button")
              .classList.add("photo-grid__button_active");
          }
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

popupProfileName.value = profileName.textContent;
popupProfileText.value = profileText.textContent;

profileEditButton.addEventListener("click", () => {
  openPopup(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileText.value = profileText.textContent;
});

popupProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, validationConfig, popupProfile);
  profileName.textContent = popupProfileName.value;
  profileText.textContent = popupProfileText.value;
  editProfile(popupProfileName.value, popupProfileText.value)
    .then(onResponse)
    .then(() => {
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
    .then(onResponse)
    .then((res) => {
      renderCard(createCard(res));
      closePopup(popupAdd);
      evt.target.reset();
      popupAddForm
        .querySelector(".popup__button")
        .classList.add(validationConfig.inactiveButtonClass);
      popupAddForm.querySelector(".popup__button").disabled = "disabled";
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
  document
    .querySelector(".profile__image-edit")
    .classList.add("profile__image-edit_active");
});
profileAvatar.addEventListener("mouseout", (evt) => {
  document
    .querySelector(".profile__image-edit")
    .classList.remove("profile__image-edit_active");
});
document
  .querySelector(".profile__image-edit")
  .addEventListener("mousedown", (evt) => {
    openPopup(popupAvatar);
    popupAvatarLink.value = profileAvatar.src;
    enableValidation(validationConfig);
  });

popupAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, validationConfig, popupAvatar);
  editAvatar(popupAvatarLink.value)
    .then(onResponse)
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
