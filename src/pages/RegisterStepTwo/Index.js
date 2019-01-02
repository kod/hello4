import React from 'react';
import { formatMessage } from 'umi-plugin-locale';
import router from 'umi/lib/router';
import { connect } from 'react-redux';

import BYHeader from '@src/components/BYHeader';
import { Modal } from 'antd-mobile';
import { SCREENS, WINDOW_HEIGHT } from '@src/common/constants';
import Loader from '@src/components/Loader';
import { addEventListenerBuyoo, removeEventListenerBuyoo } from '@src/utils';
import Form from './Form';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
  }

  componentDidMount() {
    addEventListenerBuyoo(SCREENS.RegisterStepTwo, this.addEventListenerHandle);
  }

  componentWillUnmount() {
    removeEventListenerBuyoo(
      SCREENS.RegisterStepTwo,
      this.addEventListenerHandle,
    );
  }

  addEventListenerHandle = () => {
    Modal.alert('', formatMessage({ id: 'success' }), [
      {
        text: formatMessage({ id: 'confirm' }),
        onPress: () => router.go(-2),
        style: 'default',
      },
    ]);
  };

  render() {
    const {
      registerLoading,
      location: { query = {} },
    } = this.props;

    const styles = {
      container: {
        height: WINDOW_HEIGHT,
        backgroundColor: '#fff',
      },
    };
    return (
      <div style={styles.container}>
        <BYHeader title={formatMessage({ id: 'register' })} />
        {registerLoading && <Loader />}
        <Form query={query} />
      </div>
    );
  }
}

export default connect(
  state => {
    const { register } = state;
    return {
      registerLoading: register.loading,
    };
  },
  {},
)(Index);
