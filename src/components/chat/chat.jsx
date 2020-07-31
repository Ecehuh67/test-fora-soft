/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { AppContext } from '../chat-context/chat-context';
import socket from '../../socket';

const Chat = ({ setMessages }) => {
  const { serverData, userData, setUserData } = React.useContext(AppContext);
  const [messageValue, setMessageValue] = React.useState('');
  const [filteredUsers, setFilter] = React.useState([]);
  const messagesRef = React.useRef(null);
  const userListRef = React.useRef(null);
  const inviteButtonRef = React.useRef(null);
  const alertMenuRef = React.useRef(null);

  // scroll screen every time a message has been sent
  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 999999);
  }, [serverData.messages]);

  // Refresh online list of users
  React.useEffect(() => {
    setFilter(serverData.onlineUsers);
  }, [serverData.onlineUsers]);

  // Send a message
  const onSend = () => {
    // not allow to sent empty data to the server
    if (messageValue.length === 0) {
      return;
    }

    // create data for server
    const obj = {
      userName: userData.userName,
      text: messageValue,
      roomId: userData.roomId,
    };

    // new message has been written
    socket.emit('ROOM:NEW_MESSAGE', obj);

    // clear message input after message was been sent
    setMessageValue('');

    // add users data into messages' array
    setMessages(obj);
  };

  // Send a request to take online users back
  const getUsers = () => {
    const obj = {
      userName: userData.userName,
      text: messageValue,
      roomId: userData.roomId,
    };

    socket.emit('USERS:ONLINE', obj);
  };

  //
  const sendInvite = (user) => {
    const obj = {
      userName: userData.userName,
      roomId: userData.roomId,
      receiver: user,
    };

    socket.emit('USERS:INVITE', obj);
  };

  return (
    <main className="main-chat html-wrapper">
      <section className="main-chat__wrapper">
        <h1 className="visually-hidden">Chat room</h1>

        <div className="main-chat__left-column">
          <button
            className="main-chat__leave-button"
            type="button"
            onClick={() => {
              setUserData((prev) => {
                return {
                  ...prev,
                  isAuth: false,
                };
              });
            }}
          >
            <svg className="main-chat__leave-icon" width="32" height="32">
              <use xlinkHref="#chat-leave-button" />
            </svg>
          </button>

          <h2 className="main-chat___caption">Room: {userData.roomId}</h2>
          <h2 className="main-chat__caption">
            Users: {serverData.users.length}
          </h2>
          <div
            className={
              userData.invitation === null
                ? 'main-chat__alert-wrapper'
                : 'main-chat__alert-wrapper main-chat__alert-wrapper--active'
            }
          >
            <svg
              className="main-chat__bell-icon"
              width="14"
              height="16"
              onClick={() => {
                if (userData.invitation !== null) {
                  alertMenuRef.current.classList.remove(
                    'main-chat__alert-list--hidden'
                  );
                }
              }}
            >
              <use xlinkHref="#bell-icon" />
            </svg>

            {userData.invitation !== null && (
              <ul
                className="main-chat__alert-list main-chat__alert-list--hidden alert-list"
                ref={alertMenuRef}
              >
                <li className="alert-list__item">
                  <p className="alert-list__text">
                    You&apos;ve been invited by {userData.invitation.userName}
                  </p>
                  <div className="alert-list__buttons-list">
                    <span
                      className="alert-list__buttons-list-item"
                      onClick={() => {
                        setUserData((prev) => {
                          return {
                            ...prev,
                            invitation: null,
                          };
                        });
                      }}
                    >
                      decline
                    </span>
                    <span
                      className="alert-list__buttons-list-item"
                      onClick={() => {
                        setUserData({
                          isAuth: false,
                          invitation: null,
                          roomId: userData.invitation.roomId,
                          userName: userData.invitation.receiver,
                        });
                      }}
                    >
                      accept
                    </span>
                  </div>
                </li>
              </ul>
            )}
          </div>
          <button
            className="main-chat__invite-button"
            type="button"
            ref={inviteButtonRef}
            onClick={() => {
              const element = userListRef.current;
              getUsers();
              if (
                element.classList.contains('main-chat__invite-form--hidden')
              ) {
                element.classList.remove('main-chat__invite-form--hidden');
                inviteButtonRef.current.classList.add(
                  'main-chat__invite-button--hidden'
                );
              }
            }}
          >
            + Invite
          </button>

          <div
            className="main-chat__invite-form main-chat__invite-form--hidden invite-form "
            ref={userListRef}
          >
            <button
              className="main-chat__invite-form-hide"
              type="button"
              onClick={() => {
                const element = userListRef.current;
                if (
                  !element.classList.contains('main-chat__invite-form--hidden')
                ) {
                  element.classList.add('main-chat__invite-form--hidden');
                  inviteButtonRef.current.classList.remove(
                    'main-chat__invite-button--hidden'
                  );
                }
              }}
            >
              &times;
            </button>
            <input
              className="invite-form__search"
              type="text"
              onChange={(evt) => {
                const { value } = evt.target;
                const newList = serverData.onlineUsers
                  .slice()
                  .filter((user) =>
                    user.toLowerCase().includes(value.toLowerCase())
                  );

                setFilter(newList);
              }}
            />
            <ul className="invite-form__list">
              {filteredUsers.map((user) => {
                return (
                  <li
                    className="invite-form__item"
                    key={Math.random() * new Date()}
                  >
                    <span className="invite-form__item-name">{user}</span>
                    <button
                      className="invite-form__item-button"
                      type="button"
                      onClick={() => {
                        sendInvite(user);
                        userListRef.current.classList.add(
                          'main-chat__invite-form--hidden'
                        );
                        inviteButtonRef.current.classList.remove(
                          'main-chat__invite-button--hidden'
                        );
                      }}
                    >
                      +
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="main-chat__list">
            {serverData.users.map((user) => {
              return (
                <li
                  className={
                    user === userData.userName
                      ? 'main-chat__list-item main-chat__list-item--active'
                      : 'main-chat__list-item'
                  }
                  key={user + Math.random()}
                >
                  {user}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="main-chat__right-column">
          <div className="main-chat__right-wrapper">
            <ul ref={messagesRef} className="main-chat__message-list">
              {serverData.messages.map((message) => {
                return (
                  <li
                    className={
                      message.userName === userData.userName
                        ? 'main-chat__message-list-item'
                        : 'main-chat__message-list-item main-chat__message-list-item--another'
                    }
                    key={message + Math.random()}
                  >
                    <p
                      className={
                        message.userName === userData.userName
                          ? 'main-chat__message-list-message'
                          : 'main-chat__message-list-message main-chat__message-list-message--another'
                      }
                    >
                      {message.text}
                    </p>
                    <span
                      className={
                        message.userName === userData.userName
                          ? 'main-chat__message-list-userName'
                          : 'main-chat__message-list-userName main-chat__message-list-userName--another'
                      }
                    >
                      {message.userName}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <textarea
            className="main-chat__message-input"
            rows="2"
            placeholder="type your message..."
            value={messageValue}
            onChange={(evt) => {
              setMessageValue(evt.target.value);
            }}
          />
          <button
            className="main-chat__message-send"
            onClick={onSend}
            type="button"
          >
            <span className="visually-hidden">send</span>
            <svg
              className="main-chat__message-send-icon"
              width="24"
              height="24"
            >
              <use xlinkHref="#send-icon" />
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Chat;
