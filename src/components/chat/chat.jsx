import {AppContext} from '../chat-context/chat-context';

const Chat = () => {
  const {serverData} = React.useContext(AppContext);
  const [messageValue, setMessafeValue] = React.useState('');

  return (
    <main className="main-chat html-wrapper">
      <section className="main-chat_wrapper">

        <h1 className="visually-hidden">Chat room</h1>

        <div className="main-chat_left-column">
          <h2 className="main-chat_caption">Room: ___</h2>
          <h2 className="main-chat_caption">Users: {serverData.users.length}</h2>
          <ul className="main-chat_list">
            {
              serverData.users.map((user, i) => {
                return (
                  <li 
                    className="main-chat_list-item main-chat_list-item--active"
                    key={new Date() + i}
                  >
                  {user}
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className="main-chat_right-column">
          <div className="main-chat_right-wrapper">
            <ul className="main-chat_message-list">
              <li className="main-chat_message-list-item">
                <span className="main-chat_message-list-message">messdsdsdsdssage</span>
              </li>
              <li className="main-chat_message-list-item main-chat_message-list-item--another">
                <span className="main-chat_message-list-message main-chat_message-list-message--another">messagfdfdfdfdfdfe2</span>
              </li>
            </ul>
          </div>
          <textarea 
            className="main-chat_message-input" 
            rows="2" 
            placeholder="type your message..."
            value={messageValue}
            onChange={(evt) => {
              setMessafeValue(evt.target.value);
            }}
          >
          </textarea>
          <button className="main-chat_message-send">
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