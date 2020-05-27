import App from './components/app/app';
import ChatProvider from './components/chat-context/chat-context';

ReactDOM.render(
  <ChatProvider>
    <App />
  </ChatProvider>,
  document.querySelector('#root')
);
