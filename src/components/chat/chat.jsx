import { AppContext } from '../chat-context/chat-context';
import socket from '../../socket';

const Chat = ({ setMessages }) => {
  const { serverData, userData } = React.useContext(AppContext);
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 999999);
  }, [serverData.messages]);

  const onSend = () => {
    if (messageValue.length === 0) {
      return;
    }

    const obj = {
      userName: userData.userName,
      text: messageValue,
      roomId: userData.roomId,
    };

    socket.emit('ROOM:NEW_MESSAGE', obj);

    setMessageValue('');
    setMessages({
      userName: userData.userName,
      text: messageValue,
    });
  };

  return (
    <main className="main-chat html-wrapper">
      <section className="main-chat_wrapper">
        <h1 className="visually-hidden">Chat room</h1>

        <div className="main-chat_left-column">
          <h2 className="main-chat_caption">Room: {userData.roomId}</h2>
          <h2 className="main-chat_caption">
            Users: {serverData.users.length}
          </h2>
          <ul className="main-chat_list">
            {serverData.users.map((user, i) => {
              return (
                <li
                  className={
                    user === userData.userName
                      ? 'main-chat_list-item main-chat_list-item--active'
                      : 'main-chat_list-item'
                  }
                  key={new Date() + i}
                >
                  {user}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="main-chat_right-column">
          <div className="main-chat_right-wrapper">
            <ul ref={messagesRef} className="main-chat_message-list">
              {serverData.messages.map((message, i) => {
                return (
                  <li
                    className={
                      message.userName === userData.userName
                        ? 'main-chat_message-list-item'
                        : 'main-chat_message-list-item main-chat_message-list-item--another'
                    }
                    key={new Date() + i}
                  >
                    <p
                      className={
                        message.userName === userData.userName
                          ? 'main-chat_message-list-message'
                          : 'main-chat_message-list-message main-chat_message-list-message--another'
                      }
                    >
                      {message.text}
                    </p>
                    <span
                      className={
                        message.userName === userData.userName
                          ? 'main-chat_message-list-userName'
                          : 'main-chat_message-list-userName main-chat_message-list-userName--another'
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
            className="main-chat_message-input"
            rows="2"
            placeholder="type your message..."
            value={messageValue}
            onChange={(evt) => {
              setMessageValue(evt.target.value);
            }}
          ></textarea>
          <button className="main-chat_message-send" onClick={onSend}>
            <span className="visually-hidden">send</span>
            <svg className="main-chat_message-send-icon" width="24" height="24">
              <use xlinkHref="#send-icon"></use>
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Chat;
