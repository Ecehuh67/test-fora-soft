import socket from '../../socket';
import axios from 'axios';
import RegPage from '../reg-page/reg-page';
import { AppContext } from '../chat-context/chat-context';
import { SERVER_URL, generateRandomUserName } from '../../consts';

const AuthPage = () => {
  const { setUserData, setServerData, isAuth } = React.useContext(AppContext);
  const [isLoading, setLoading] = React.useState(false);
  const [isСheckIn, setCheckIn] = React.useState(false);
  const [login, setLogin] = React.useState('');

  const roomRef = React.useRef(null);
  const userRef = React.useRef(null);

  const validateRoomNumber = (value) =>
    typeof +value === 'number' && !Number.isNaN(+value) && value.length > 0;
  const showErrElem = (nodeElem) => {
    nodeElem.focus();
    nodeElem.classList.add('main-page_content-roomNumber--error');
    nodeElem.parentNode.classList.add(
      'main-page_content_input-wrapper--roomError'
    );
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
      userName: !isAuth ? `${generateRandomUserName()}` : userElem.value,
    };

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

        socket.emit('ROOM_JOIN', obj);

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
        console.log(
          'Smth has happened on the server, so let us try again after few minutes'
        );
      });
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
              <a
                className="main-page_link"
                href="#"
                onClick={() => {
                  setCheckIn(true);
                }}
              >
                Click here for Registration >>
              </a>
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default AuthPage;
