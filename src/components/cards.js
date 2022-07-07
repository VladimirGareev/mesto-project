const newCardTemplate = document.querySelector("#photoAdd").content;
const cardSection = document.querySelector(".photo-grid");
const popupPic = document.querySelector(".popup-pic");
const popupPicImg = popupPic.querySelector(".popup-pic__picture");
const popupHeading = popupPic.querySelector(".popup-pic__heading");
import { openPopup } from "./utils";
import { removeCard, addLike, removeLike } from "./api";

export function renderCard(data) {
  cardSection.prepend(data);
}

export function createCard(data, profileId) {
  const newCardContainer = newCardTemplate
    .querySelector(".photo-grid__figure")
    .cloneNode(true);
  const newCardContainerPhoto =
    newCardContainer.querySelector(".photo-grid__photo");
  const cardLikes = newCardContainer.querySelector(".photo-grid__likes");
  newCardContainerPhoto.src = data.link;
  newCardContainerPhoto.alt = data.name;
  newCardContainerPhoto.id = data._id;
  cardLikes.textContent = data.likes.length;
  newCardContainer.querySelector(".photo-grid__caption").textContent =
    data.name;
  if (data.owner._id !== profileId) {
    newCardContainer
      .querySelector(".photo-grid__bin")
      .classList.add("photo-grid__bin_inactive");
  }
  if (
    data.likes.some((item) => {
      return item._id === profileId;
    })
  ) {
    newCardContainer
      .querySelector(".photo-grid__button")
      .classList.add("photo-grid__button_active");
  }

  newCardContainer
    .querySelector(".photo-grid__button")
    .addEventListener("click", function (evt) {
      if (evt.target.classList.contains("photo-grid__button_active")) {
        removeLike(data._id)
            .then((res) => {
            evt.target.classList.remove("photo-grid__button_active");
            cardLikes.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(`Ошибка: ${err.status}`);
          });
      } else {
        addLike(data._id)
           .then((res) => {
            evt.target.classList.add("photo-grid__button_active");
            cardLikes.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(`Ошибка: ${err.status}`);
          });
      }
    });

  newCardContainer
    .querySelector(".photo-grid__bin")
    .addEventListener("click", function (evt) {
      removeCard(newCardContainerPhoto.id)
          .then((res) => {
          newCardContainer.remove();
        })
        .catch((err) => {
          console.log(`Ошибка удаления карточки на сервере: ${err.status}`);
        });
    });
  newCardContainerPhoto.addEventListener("click", function (evt) {
    popupPicImg.src = data.link;
    popupPicImg.alt = data.name;
    popupHeading.textContent = data.name;
    openPopup(popupPic);
  });
  return newCardContainer;
}
