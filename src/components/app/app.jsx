import '../../less/style.less';
import AuthPage from '../auth-page/auth-page';
import Chat from '../chat/chat';
import socket from '../../socket';
import { AppContext } from '../chat-context/chat-context';

const App = () => {
  const { userData, setUsers, setMessages, getOnlineUsers } = React.useContext(AppContext);

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:SET_MESSAGES', setMessages);
    socket.on('USERS:ONLINE', getOnlineUsers);
  }, []);

  return (
    <>{!userData.isAuth ? <AuthPage /> : <Chat setMessages={setMessages} />}</>
  );
};

export default App;
