export const showError = (errorElement, inputElement, config) => {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

export const hideError = (errorElement, inputElement, config) => {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

export const toggleButtonState = (buttonElement, isActive = false, config) => {
  if (isActive) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = 'disabled';
  }
}

export const checkInputValidity = (inputElement, formElement, config) => {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if(!isInputValid) {
    showError(errorElement, inputElement, config)
  } else {
    hideError(errorElement, inputElement, config)
  }
}

export const setEventListener = (formElement, config) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(submitButton, formElement.checkValidity(), config);
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  [...inputList].forEach(input => {
    input.addEventListener('input', (e) => {
      checkInputValidity(input, formElement, config);
      toggleButtonState(submitButton, formElement.checkValidity(), config);
    })
  })

}

export const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  Array.from(forms).forEach(form => {
    setEventListener(form, config)
  })
}


