/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import BYHeader from '@src/components/BYHeader';
import { i18n } from '@src/API';

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
        <BYHeader title={i18n.computerOffice} />
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
