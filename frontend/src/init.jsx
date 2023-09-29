/* eslint-disable react/jsx-no-constructed-context-values */
import { configureStore } from '@reduxjs/toolkit';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import i18next from 'i18next';
import filter from 'leo-profanity';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import App from './components/App';
import { SocketContext } from './components/Auth/Socket';
import resources from './locales/index.js';
import reducer, { actions } from './slices/store.js';

const init = async () => {
  const libriary = filter.getDictionary('ru');
  filter.add(libriary);

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
    });

  const store = configureStore({ reducer });

  const socket = io();

  const withConfirm = (...arg) => new Promise((resolve, reject) => {
    socket.timeout(3000).emit(...arg, (err, response) => {
      if (response?.status === 'ok') {
        resolve(response.data);
      }
      reject(err);
    });
  });

  const api = {
    sendMessage: (message) => withConfirm('newMessage', message),
    sendChannel: (channel) => withConfirm('newChannel', channel),
    renameChannel: (channel) => withConfirm('renameChannel', channel),
    deleteChannel: (channel) => withConfirm('removeChannel', channel),
  };
  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(actions.addChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(actions.updateChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(actions.removeChannel(payload));
  });

  const rollbarConfig = {
    accessToken: 'b164f53efeb94d159e34209b40ff9003',
    payload: {
      environment: 'production',
    },
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <SocketContext.Provider value={{ api }}>
              <App />
            </SocketContext.Provider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
