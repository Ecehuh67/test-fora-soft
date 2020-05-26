export const SERVER_URL = 'http://localhost:3001';

export const validateEmail = (value) => {
    const symbols = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const email = value;

    if (symbols.test(email) === false) {
      return false;
    }

    return true;
  };