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
  
  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
  }, []);

  return (
    <>
      {
        !userData.isAuth ? <AuthPage/> : <Chat/>
      }
    </>
  );
};

export default App;