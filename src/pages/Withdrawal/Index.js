import React from 'react';
import { i18n, View } from '@src/API';
import { connect } from 'react-redux';

import BYHeader from '@src/components/BYHeader';
import { WINDOW_HEIGHT } from '@src/common/constants';

import * as loginActionCreators from '@src/common/actions/login';
import Form from './Form';

import styles from './index.less';

const Withdrawal = () => (
  <View
    style={{
      height: WINDOW_HEIGHT,
    }}
    className={styles.container}
  >
    <BYHeader title={i18n.enterCardInformation} />
    <Form />
    <View style={{ flex: 1 }} />
  </View>
);

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
