const showInputError = (
  element,
  errorMessage,
  inputErrorClass,
  formError,
  errorClass
) => {
  formError.textContent = errorMessage;
  element.classList.add(inputErrorClass);
  formError.classList.add(errorClass);
};

const hideInputError = (element, inputErrorClass, formError, errorClass) => {
  element.classList.remove(inputErrorClass);
  formError.textContent = "";
  formError.classList.remove(errorClass);
};

const isValid = (formInput, inputErrorClass, formElement, errorClass) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  if (!formInput.validity.valid) {
    showInputError(
      formInput,
      formInput.validationMessage,
      inputErrorClass,
      formError,
      errorClass
    );
  } else {
    hideInputError(formInput, inputErrorClass, formError, errorClass);
  }
};

export function enableValidation(configValidation) {
  const formSelector = configValidation.formSelector;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, configValidation);
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, configValidation) => {
  const inputSelector = configValidation.inputSelector;
  const submitButtonSelector = configValidation.submitButtonSelector;
  const inactiveButtonClass = configValidation.inactiveButtonClass;
  const inputErrorClass = configValidation.inputErrorClass;
  const errorClass = configValidation.errorClass;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, inputErrorClass, formElement, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

export function clearValidation(formElement, configValidation) {
  const inputSelector = configValidation.inputSelector;
  const submitButtonSelector = configValidation.submitButtonSelector;
  const inactiveButtonClass = configValidation.inactiveButtonClass;
  const inputErrorClass = configValidation.inputErrorClass;
  const errorClass = configValidation.errorClass;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputEelment) => {
    const formError = formElement.querySelector(`.${inputEelment.id}-error`);
    hideInputError(inputEelment, inputErrorClass, formError, errorClass);
  });
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
}
