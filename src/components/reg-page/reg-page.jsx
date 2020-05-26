import socket from "../../socket";
import {AppContext} from '../chat-context/chat-context';
import {validateEmail} from '../../consts';

const RegPage = ({handler, setLogin}) => {
  const {setAuth} = React.useContext(AppContext);
  const firstNameRef = React.useRef(null);
  const secondNameRef = React.useRef(null);
  const userNameRef = React.useRef(null);
  const emailRef = React.useRef(null);

  const validateName = (value) => {
    if (value.length > 5 && value.length < 30 ) {
      return true;
    }

    return false;
  };

  const onSubmit = () => {
    const firstName = firstNameRef.current.value;
    const secondName= secondNameRef.current.value;
    const userName= userNameRef.current.value;
    const email = emailRef.current.value;
    const names = [firstName, secondName, userName];

    const isEmailValid = validateEmail(email);
    const isNamesValid = names.every(validateName);

    let user ={};

    if(isEmailValid && isNamesValid) {
      user = {
        firstName: firstName,
        secondName: secondName,
        userName: userName,
        email: email,
      };

      socket.emit('CHECK_NAME', user);
      socket.on('CHECK_NAME', (bool) => {
        if(bool) {
          handler(false);
          setLogin(userName);
          setAuth(true);
        } else {
          userNameRef.current.focus();
          userNameRef.current.classList.add('main-registration__form-input--error');
          userNameRef.current.parentNode.classList.add('main-registration__form-input-wrapper--error');
        }
      })
    } else {
      // const wrongNames = names.
    }
  };

  return (
    <main className="main-registration html-wrapper">
      <section className="main-registration__wapper">
        <div className="main-registration__form-wrapper">
          <div className="main-registration__heading">
          <svg className="main-registration__form-icon" width="64" height="64">
              <use xlinkHref="#chat-icon"></use>
            </svg>
            <p className="main-registration__heading-caption">Light Chat</p>

            <button 
              className="main-registration__button-close"
              onClick={() => {
                handler(false)
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
              <label 
                className="main-registration__form-label"
                htmlFor="email"
              >
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