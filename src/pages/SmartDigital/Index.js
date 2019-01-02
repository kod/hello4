/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import BYHeader from '@src/components/BYHeader';
import { formatMessage } from 'umi-plugin-locale';

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
      <div style={styles.container}>
        <BYHeader title={formatMessage({ id: 'digitalDevices' })} />
        <div>
          <Scrollable2 />
        </div>
      </div>
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
