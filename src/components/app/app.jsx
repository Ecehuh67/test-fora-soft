import '../../less/style.less';
import AuthPage from '../auth-page/auth-page';
import Chat from '../chat/chat';
import socket from '../../socket';
import {AppContext} from '../chat-context/chat-context';

const App = () => {
  const {userData, setServerData} = React.useContext(AppContext);

  const setUsers = (users) => {
    setServerData((prev) => {
      return {
        ...prev,
        users
      }
    })
  };

  const setMessages = (messages) => {
    setServerData((prev) => {
      return {
        ...prev,
        messages: [...prev.messages, messages]
      }
    })
  };
  
  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:SET_MESSAGES', setMessages)
  }, []);

  return (
    <>
      {
        !userData.isAuth ? <AuthPage/> : <Chat setMessages={setMessages}/>
      }
    </>
  );
};

export default App;