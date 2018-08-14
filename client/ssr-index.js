import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers';

const AppEntryPoint = (store) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

module.exports = {
  AppEntryPoint,
  rootReducer
};
