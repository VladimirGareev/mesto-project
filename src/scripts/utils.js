function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
};

export function openPopup(anyPopup) {
  anyPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};
export function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape);
};
