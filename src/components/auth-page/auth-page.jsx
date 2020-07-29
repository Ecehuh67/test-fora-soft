import axios from 'axios';
import socket from '../../socket';
import RegPage from '../reg-page/reg-page';
import { AppContext } from '../chat-context/chat-context';
import {
  SERVER_URL,
  generateRandomUserName,
  ERROR_CSS_CLASSES,
  showErrElem,
  RANDOM_ROOM,
} from '../../consts';

const AuthPage = () => {
  const { setUserData, setServerData, isAuth } = React.useContext(AppContext);

  // Generate random room number 
  const [randomRoomId, setRandomRoomId] = React.useState(null);

  // block button to prevent second sending of data 
  const [isLoading, setLoading] = React.useState(false);

  // hide auth element for users who is auth
  const [isСheckIn, setCheckIn] = React.useState(false);

  // autocomplete user name after process of auth
  const [login, setLogin] = React.useState('');

  const roomRef = React.useRef(null);
  const userRef = React.useRef(null);

  // check roomNumber is only numbers
  const validateRoomNumber = (value) =>
    typeof +value === 'number' && !Number.isNaN(+value) && value.length > 0;

  const onSend = async () => {
    const roomElem = roomRef.current;
    const userElem = userRef.current;
    const isValid = validateRoomNumber(roomElem.value);

    // show red frame around incorrect fields
    if (!isValid) {
      return showErrElem(
        roomElem,
        ERROR_CSS_CLASSES.authPage.input,
        ERROR_CSS_CLASSES.authPage.wrapper
      );
    }

    // appropriate name if user isn't auth
    const obj = {
      roomId: roomElem.value,
      userName: !isAuth ? `${generateRandomUserName()}` : userElem.value,
    };

    // create new room if there isn't one or connect to existing one
    axios
      .post(`${SERVER_URL}/rooms`, obj)
      .then(() => {
        setLoading(true);
        setUserData((prev) => {
          return {
            ...prev,
            roomId: obj.roomId,
            userName: obj.userName,
            isAuth: true,
          };
        });

        // notify another users that smb has connected
        socket.emit('ROOM_JOIN', obj);

        // get history for each room
        axios.get(`${SERVER_URL}/rooms/${obj.roomId}`).then(({ data }) => {
          setServerData((prev) => {
            return {
              ...prev,
              users: data.users,
              messages: data.messages,
            };
          });
        });
      })
      .catch((err) => {
        throw new Error(err);
      });

    return null;
  };

  return (
    <>
      {isСheckIn ? (
        <RegPage handler={setCheckIn} setLogin={setLogin} />
      ) : (
        <main className="main-page html-wrapper">
          <section className="main-page_wrapper">
            <h1 className="main-page_caption visually-hidden">
              Authentication data
            </h1>

            <div className="main-page_color-cap">
              <h2 className="main-page_cap-caption">
                {isAuth
                  ? `${login} , Welcome! You have successfully registered, so just fill in room number and start chatting`
                  : `Welcome to the Light Chat, please authorize yourself to be able
                to talk with others`}
              </h2>
            </div>

            <div className="main-page_content">
              <div className="main-page_content_input-wrapper">
                <input
                  className="main-page_content-roomNumber main-page_input"
                  ref={roomRef}
                  type="text"
                  placeholder="Room number"
                />
                <button 
                  className="main-page_content-roomButton" 
                  type="button"
                  onClick={() => {
                    const randomNumber = Math.floor(Math.random() * RANDOM_ROOM);
                    setRandomRoomId(randomNumber);
                    roomRef.current.value = randomNumber;
                  }}
                >
                  random room?!
                </button>
              </div>
              <div className="main-page_content_input-wrapper">
                <input
                  className="main-page_content-userName main-page_input"
                  ref={userRef}
                  defaultValue={login}
                  type="text"
                  placeholder="User name"
                />
              </div>
              <button
                disabled={isLoading}
                className="main-page_content-button"
                type="button"
                onClick={onSend}
              >
                {!isLoading ? 'Enter' : 'Entering...'}
              </button>
            </div>
            {!isAuth && (
              <button
                className="main-page_link"
                type="button"
                href="#"
                onClick={() => {
                  setCheckIn(true);
                }}
              >
                {'Click here for Registration >>'}
              </button>
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default AuthPage;
