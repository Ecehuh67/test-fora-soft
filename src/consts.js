export const SERVER_URL = 'http://localhost:3001';

export const ERROR_CSS_CLASSES = {
  registerPAge: {
    input: 'main-registration__form-input--error',
    wrapper: 'main-registration__form-input-wrapper--error',
  },
  authPage: {
    input: 'main-page_content-roomNumber--error',
    wrapper: 'main-page_content_input-wrapper--roomError',
  },
};

const DEFAULT_USER_NAMES = [
  'Unidentified Raccoon',
  'Unidentified Cat',
  'Unidentified Panda',
];

export const VALID_LENGTH_FIELDS = {
  min: 5,
  max: 30,
};

export const validateEmail = (value) => {
  const symbols = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  const email = value;

  if (symbols.test(email) === false) {
    return false;
  }

  return true;
};

export const generateRandomUserName = () => {
  const randomNumber = Math.floor(Math.random() * 10000);

  const randomName =
    DEFAULT_USER_NAMES[Math.floor(Math.random() * DEFAULT_USER_NAMES.length)];

  return `${randomName}_${randomNumber}`;
};

export const showErrElem = (nodeElem, inputClass, wrapperClass) => {
  nodeElem.focus();
  nodeElem.classList.add(inputClass);
  nodeElem.parentNode.classList.add(wrapperClass);
};
