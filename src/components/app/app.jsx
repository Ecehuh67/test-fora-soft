import '../../less/style.less';
import AuthPage from '../auth-page/auth-page';
import Chat from '../chat/chat';
import socket from '../../socket';
import {AppContext} from '../chat-context/chat-context';

const App = () => {
  const {isAuth} = React.useContext(AppContext);
  
  React.useEffect(() => {
    socket.on('ROOM_JOINED', users => {
      console.log('New user joined')
    });
  }, [])

  return (
    <>
      {
        !isAuth ? <AuthPage/> : <Chat/>
      }
    </>
  );
};

export default App;