import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@src/common/store/configureStore';
import App from '@src/pages/App/App.browser';
import { LocalizationProvider } from '@src/components/Localization';
import { i18n } from '@src/API';

const { store } = configureStore();

const Root = () => (
  <Provider store={store}>
    <LocalizationProvider i18n={i18n}>
      <App />
    </LocalizationProvider>
  </Provider>
);

export default Root;
