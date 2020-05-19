import socket from '../../socket';
import {AppContext} from '../chat-context/chat-context';

const AuthPage = () => {
  const {setAuth} = React.useContext(AppContext);

  const roomRef = React.useRef(null);
  const userRef = React.useRef(null);

  const validateRoomNumber = (value) => typeof +value === 'number' && !Number.isNaN(+value) && value.length > 0;
  const showErrElem = (nodeElem) => {
    nodeElem.focus();
    nodeElem.classList.add('main-page_content-roomNumber--error');
    nodeElem.parentNode.classList.add('main-page_content_input-wrapper--roomError')
  };

  return (
    <main className="main-page html-wrapper">
        <section className="main-page_wrapper">
          <h1 className="main-page_caption visually-hidden">Authentication data</h1>

          <div className="main-page_color-cap">
            <h2 className="main-page_cap-caption">Welcome to the Light Chat, please authorize yourself to be able to talk with others</h2>
          </div>

          <div className="main-page_content">
            <div className="main-page_content_input-wrapper">
              <input className="main-page_content-roomNumber main-page_input" ref={roomRef} type="text" placeholder="Room number"/>
            </div>
            <div className="main-page_content_input-wrapper">
             <input className="main-page_content-userName main-page_input" ref={userRef}  type="text" placeholder="User name"/>  
            </div>
            <button 
              className="main-page_content-button" 
              type="button"
              onClick={
                () => {
                  const roomElem = roomRef.current;
                  const isValid = validateRoomNumber(roomElem.value);

                  if(isValid) {
                    setAuth(true);
                  } else {
                    showErrElem(roomElem);

                  }
                }
              }
            >
              Enter
            </button>
          </div>
        </section>
      </main>
  );
};

export default AuthPage;