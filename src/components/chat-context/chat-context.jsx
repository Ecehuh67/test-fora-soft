const AppContext = React.createContext(null);

const ChatProvider = (props) => {
  // data for manipulating condition inside the application
  const [userData, setUserData] = React.useState({
    isAuth: false,
    roomId: null,
    userName: '',
    invitation: null,
  });

  // only for getting from server
  const [serverData, setServerData] = React.useState({
    users: [],
    messages: [],
    onlineUsers: [],
  });
  const [isAuth, setAuth] = React.useState(false);

  // save users
  const setUsers = (users) => {
    setServerData((prev) => {
      return {
        ...prev,
        users,
      };
    });
  };

  // Get users from the server
  const getOnlineUsers = (users) => {
    setServerData((prev) => {
      return {
        ...prev,
        onlineUsers: users,
      };
    });
  };

  // Refresh userData if user has got invitation
  const invitePerson = (invitation) => {
    setUserData((prev) => {
      return {
        ...prev,
        invitation,
      };
    });
  };

  // save messages and push users's own messages into data to imitate getting from server
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
    getOnlineUsers,
    invitePerson,
  };

  return (
    <AppContext.Provider value={sampleAppContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ChatProvider;
export { AppContext };
