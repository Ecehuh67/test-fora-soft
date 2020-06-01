import socket from '../../socket';
import { AppContext } from '../chat-context/chat-context';
import {
  validateEmail,
  ERROR_CSS_CLASSES,
  VALID_LENGTH_FIELDS,
  showErrElem,
} from '../../consts';

const RegPage = ({ handler, setLogin }) => {
  
  // switcher for changing screens
  const { setAuth } = React.useContext(AppContext);
  const firstNameRef = React.useRef(null);
  const secondNameRef = React.useRef(null);
  const userNameRef = React.useRef(null);
  const emailRef = React.useRef(null);

  // Set valid length of user name
  const validateName = (value) => {
    if (
      value.length > VALID_LENGTH_FIELDS.min &&
      value.length < VALID_LENGTH_FIELDS.max
    ) {
      return true;
    }

    return false;
  };


  const onSubmit = () => {
    const firstNameElem = firstNameRef.current;
    const secondNameElem = secondNameRef.current;
    const userNameElem = userNameRef.current;
    const emailElem = emailRef.current;

    // simplify following operations with fields
    const formFields = [firstNameElem, secondNameElem, userNameElem, emailElem];
    const isEmailValid = validateEmail(emailElem.value);
    const isValuesValid = formFields.every((el) => validateName(el.value));

    // will set red frame aroung wrong fields 
    const clearErrorClass = () => {
      formFields.forEach((field) => {
        field.classList.remove(ERROR_CSS_CLASSES.registerPAge.input);
      });
    };

    // data for sending to the server to save name into Array
    let user = {};

    if (isEmailValid && isValuesValid) {
      clearErrorClass();

      user = {
        firstName: firstNameElem.value,
        secondName: secondNameElem.value,
        userName: userNameElem.value,
        email: emailElem.value,
      };

      // check existence of name in the server array
      socket.emit('CHECK_NAME', user);

      // if the name has already exsisted then server return false flag
      socket.on('CHECK_NAME', (bool) => {
        if (bool) {
          handler(false);
          setLogin(userNameElem.value);
          setAuth(true);
        } else {
          showErrElem(
            userNameElem,
            ERROR_CSS_CLASSES.registerPAge.input,
            ERROR_CSS_CLASSES.registerPAge.wrapper
          );
        }
      });
    } else {

      // update condition of valid fields
      clearErrorClass();

      // define which fields are wrong
      const wrongFields = formFields
        .map((field, i) => (validateName(field.value) ? '' : i))
        .filter((it) => it !== '');

      // set red frame for wrong fields
      wrongFields.map((it) => {
        formFields[it].classList.add(ERROR_CSS_CLASSES.registerPAge.input);
        return null;
      });
    }
  };

  return (
    <main className="main-registration html-wrapper">
      <section className="main-registration__wrapper">
        <div className="main-registration__form-wrapper">
          <div className="main-registration__heading">
            <svg
              className="main-registration__form-icon"
              width="64"
              height="64"
            >
              <use xlinkHref="#chat-icon" />
            </svg>
            <p className="main-registration__heading-caption">Light Chat</p>

            <button
              className="main-registration__button-close"
              type="button"
              onClick={() => {
                handler(false);
              }}
            >
              Close
            </button>
          </div>
          <form className="main-registration__form">
            <div className="main-registration__form-input-wrapper">
              <label
                className="main-registration__form-label"
                htmlFor="first-name"
              >
                First Name
              </label>
              <input
                className="main-registration__form-input"
                type="text"
                id="first-name"
                placeholder="Required"
                ref={firstNameRef}
              />
            </div>

            <div className="main-registration__form-input-wrapper">
              <label
                className="main-registration__form-label"
                htmlFor="second-name"
              >
                Second name
              </label>
              <input
                className="main-registration__form-input"
                type="text"
                name="second-name"
                id="second-name"
                placeholder="Required"
                ref={secondNameRef}
              />
            </div>

            <div className="main-registration__form-input-wrapper">
              <label
                className="main-registration__form-label"
                htmlFor="nick-name"
              >
                User name
              </label>
              <input
                className="main-registration__form-input"
                type="text"
                id="nick-name"
                placeholder="Required"
                ref={userNameRef}
              />
            </div>

            <div className="main-registration__form-input-wrapper">
              <label className="main-registration__form-label" htmlFor="email">
                Email
              </label>
              <input
                className="main-registration__form-input"
                type="text"
                id="email"
                placeholder="Required"
                ref={emailRef}
              />
            </div>

            <button
              className="main-registration__form-submit"
              type="button"
              onClick={onSubmit}
            >
              Check in
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegPage;
