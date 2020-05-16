const Chat = () => {

  return (
    <main className="main-chat html-wrapper">
      <section className="main-chat_wrapper">

        <h1 className="visually-hidden">Chat room</h1>

        <div className="main-chat_left-column">
          <h2 className="main-chat_caption">Room: ___</h2>
          <h2 className="main-chat_caption">Users: (_)</h2>
          <ul className="main-chat_list">
            <li className="main-chat_list-item">User 111</li>
            <li className="main-chat_list-item main-chat_list-item--active">User 222</li>
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
          <textarea className="main-chat_message-input" cols="30" rows="10" placeholder="type your message..."></textarea>
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