const AppContext = React.createContext(null);

const ChatProvider = (props) => {
  const [userData , setUserData] = React.useState({
    isAuth: false,
    roomId: null,
    userName: ''
  });
  const [serverData, setServerData] = React.useState({
    users: [],
    messages: [],
    authorMessage: '',
    tr: ''
  })

  console.log(serverData)

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