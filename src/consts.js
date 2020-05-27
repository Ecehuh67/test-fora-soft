export const SERVER_URL = 'http://localhost:3001';

export const validateEmail = (value) => {
  const symbols = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const email = value;

  if (symbols.test(email) === false) {
    return false;
  }

  return true;
};

const DEFAULT_USER_NAMES = [
  'Unidentified Raccoon',
  'Unidentified Cat',
  'Unidentified Panda',
];

export const generateRandomUserName = () => {
  const randomNumber = Math.floor(Math.random() * 10000);

  const randomName =
    DEFAULT_USER_NAMES[Math.floor(Math.random() * DEFAULT_USER_NAMES.length)];

  return `${randomName}_${randomNumber}`;
};
