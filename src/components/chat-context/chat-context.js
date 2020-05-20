const AppContext = React.createContext(null);

const ChatProvider = (props) => {
  const [userData , setUserData] = React.useState({
    isAuth: false,
    roomId: '',
    userName: ''
  });
  const [serverData, setServerData] = React.useState({
    roomId: null,
    users: [],
    messages: []
  })

  const sampleAppContext = {
    userData,
    serverData,
    setUserData,
    setServerData
  }

  return (
    <AppContext.Provider
      value={sampleAppContext}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default ChatProvider;
export {AppContext};