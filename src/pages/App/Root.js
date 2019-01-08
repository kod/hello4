import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@src/common/store/configureStore';
import { LocalizationProvider } from '@src/components/Localization';
import { i18n } from '@src/API';

const { store } = configureStore();

const Root = ({ children }) => (
  <Provider store={store}>
    <LocalizationProvider i18n={i18n}>
      <div>{children}</div>
    </LocalizationProvider>
  </Provider>
);

export default Root;

// export default class ReduxWrapper extends React.PureComponent {
//   render() {
//     const { children } = this.props;
//     return (
//       <Provider store={store}>
//         <div>{children}</div>
//       </Provider>
//     );
//   }
// }
