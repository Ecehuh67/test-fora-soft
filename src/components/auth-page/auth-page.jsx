import socket from '../../socket';
import axios from 'axios';
import {AppContext} from '../chat-context/chat-context';
import {SERVER_URL} from '../../consts';

const AuthPage = () => {
  const {setAuth, setRoomNumber, setUserName, roomNumber} = React.useContext(AppContext);
  const [isLoading, setLoading] = React.useState(false);

  const roomRef = React.useRef(null);
  const userRef = React.useRef(null);

  const validateRoomNumber = (value) => typeof +value === 'number' && !Number.isNaN(+value) && value.length > 0;
  const showErrElem = (nodeElem) => {
    nodeElem.focus();
    nodeElem.classList.add('main-page_content-roomNumber--error');
    nodeElem.parentNode.classList.add('main-page_content_input-wrapper--roomError')
  };

  const onSend = async () => {
    const roomElem = roomRef.current;
    const userElem = userRef.current;
    const isValid = validateRoomNumber(roomElem.value);

    if (!isValid) {
      return showErrElem(roomElem);
    }

    const obj = {
      roomId: roomElem.value,
      userName: userElem.value
    };

    axios
      .post(`${SERVER_URL}/rooms`, obj)
      .then(() => {
        setLoading(true);
        setAuth(true);
        setUserName(obj.userName);
        setRoomNumber(obj.roomId);
        socket.emit('ROOM_JOIN', obj);
      })
      .catch((err) => {
        throw new Error(err);
        console.log('Smth has happend on the server, so let us try again after few minutes')
      });
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
              disabled={isLoading}
              className="main-page_content-button" 
              type="button"
              onClick={onSend}
            >
              {
                !isLoading ? 'Enter' : 'Entering...'
              }
            </button>
          </div>
        </section>
      </main>
  );
};

export default AuthPage;