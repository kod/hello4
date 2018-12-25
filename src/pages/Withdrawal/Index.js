import React from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';

import BYHeader from '@/components/BYHeader';
import Form from './Form';
import { LOGIN } from '@/common/constants/actionTypes';
import { LOGIN_NAMESPACE, WINDOW_HEIGHT } from '@/common/constants';

import * as loginActionCreators from '@/common/actions/login';

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
//         <BYHeader title={formatMessage({ id: 'enterCardInformation' })} />
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
      <BYHeader title={formatMessage({ id: 'enterCardInformation' })} />
      <Form />
      <div style={{ flex: 1 }} />
    </div>
  );
};

export default connect(
  state => {
    const { loading } = state;
    return {
      loginLoading: loading.effects[`${LOGIN_NAMESPACE}/${LOGIN.REQUEST}`],
    };
  },
  {
    ...loginActionCreators,
  },
)(Withdrawal);
