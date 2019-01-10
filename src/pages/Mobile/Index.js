/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import BYHeader from '@src/components/BYHeader';
import { i18n, View } from '@src/API';

import Scrollable2 from '@src/components/Scrollable2';

const styles = {
  container: {
    flex: 1,
  },
};

class Mobile extends React.Component {
  componentDidMount() {
    console.log();
  }

  render() {
    return (
      <View style={styles.container}>
        <BYHeader title={i18n.mobileCommunications} />
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
