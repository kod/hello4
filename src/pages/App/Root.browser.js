import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@src/common/store/configureStore';
import { LocalizationProvider } from '@src/components/Localization';
import { i18n, View } from '@src/API';

const { store } = configureStore();

const Root = ({ children }) => (
  <Provider store={store}>
    <LocalizationProvider i18n={i18n}>
      <View>{children}</View>
    </LocalizationProvider>
  </Provider>
);

export default Root;
