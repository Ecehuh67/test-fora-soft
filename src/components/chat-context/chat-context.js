const AppContext = React.createContext(null);

const ChatProvider = (props) => {
  const [isAuth, setAuth] = React.useState(false);
  const [roomNumber, setRoomNumber] = React.useState('');
  const [userName, setUserName] = React.useState('');

  const sampleAppContext = {
    isAuth,
    setAuth,
    setRoomNumber,
    setUserName,
    userName,
    roomNumber
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