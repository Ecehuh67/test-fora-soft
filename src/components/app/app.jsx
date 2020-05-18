import '../../less/style.less';
import AuthPage from '../auth-page/auth-page';
import Chat from '../chat/chat';
import {AppContext} from '../chat-context/chat-context';

const App = () => {
  const {isAuth} = React.useContext(AppContext);

  return (
    <>
      {
        !isAuth ? <AuthPage/> : <Chat/>
      }
    </>
  );
};

export default App;