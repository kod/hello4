import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@/common/store/configureStore';

const { store } = configureStore();

const Root = ({ children }) => (
  <Provider store={store}>
    <div>{children}</div>
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
