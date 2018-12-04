/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'dva';
import BYHeader from '@/components/BYHeader';
import { formatMessage } from 'umi/locale';

import Scrollable2 from '@/components/Scrollable2';

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
        <BYHeader title={formatMessage({ id: 'mobileCommunications' })} />
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
