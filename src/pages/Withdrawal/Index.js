import React from 'react';
import { i18n } from '@src/API';
import { connect } from 'react-redux';

import BYHeader from '@src/components/BYHeader';
import { WINDOW_HEIGHT } from '@src/common/constants';

import * as loginActionCreators from '@src/common/actions/login';
import Form from './Form';

// class Withdrawal extends React.Component {
//   render() {
//     const styles = {
//       container: {
//         display: 'flex',
//         flexDirection: 'column',
//         height: WINDOW_HEIGHT,
//         backgroundColor: '#f2f2f2',
//       },
//     };

//     return (
//       <div style={styles.container}>
//         <BYHeader title={i18n.enterCardInformation} />
//         <Form />
//         <div style={{ flex: 1 }} />
//       </div>
//     );
//   }
// }

const Withdrawal = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: WINDOW_HEIGHT,
      backgroundColor: '#f2f2f2',
    },
  };

  return (
    <div style={styles.container}>
      <BYHeader title={i18n.enterCardInformation} />
      <Form />
      <div style={{ flex: 1 }} />
    </div>
  );
};

export default connect(
  state => {
    const { login } = state;
    return {
      loginLoading: login.loading,
    };
  },
  {
    ...loginActionCreators,
  },
)(Withdrawal);
