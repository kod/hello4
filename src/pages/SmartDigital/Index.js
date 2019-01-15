/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import BYHeader from '@src/components/BYHeader';
import { i18n, View } from '@src/API';

import Scrollable2 from '@src/components/Scrollable2';

import styles from './index.less';

class Mobile extends React.Component {
  componentDidMount() {
    console.log();
  }

  render() {
    return (
      <View className={styles.container}>
        <BYHeader title={i18n.digitalDevices} />
        <View>
          <Scrollable2 />
        </View>
      </View>
    );
  }
}

export default connect(
  state => {
    const { login } = state;

    return {
      isAuthUser: !!login.user,
    };
  },
  {},
)(Mobile);
