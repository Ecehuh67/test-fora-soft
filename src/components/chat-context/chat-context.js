const AppContext = React.createContext(null);

const ChatProvider = (props) => {
  const [userData, setUserData] = React.useState({
    isAuth: false,
    roomId: null,
    userName: '',
  });
  const [serverData, setServerData] = React.useState({
    users: [],
    messages: [],
  });
  const [isAuth, setAuth] = React.useState(false);

  const setUsers = (users) => {
    setServerData((prev) => {
      return {
        ...prev,
        users,
      };
    });
  };

  const setMessages = (messages) => {
    setServerData((prev) => {
      return {
        ...prev,
        messages: [...prev.messages, messages],
      };
    });
  };

  const sampleAppContext = {
    userData,
    serverData,
    isAuth,
    setAuth,
    setUserData,
    setServerData,
    setUsers,
    setMessages,
  };

  return (
    <AppContext.Provider value={sampleAppContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ChatProvider;
export { AppContext };
