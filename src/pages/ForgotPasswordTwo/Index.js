import React from 'react';
import { formatMessage } from 'umi-plugin-locale';
import router from 'umi/lib/router';
import { connect } from 'react-redux';

import BYHeader from '@src/components/BYHeader';
import { Modal } from 'antd-mobile';
import { SCREENS, WINDOW_HEIGHT } from '@src/common/constants';
import Loader from '@src/components/Loader';
import { removeEventListenerBuyoo, addEventListenerBuyoo } from '@src/utils';
import Form from './Form';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
  }

  componentDidMount() {
    addEventListenerBuyoo(
      SCREENS.ForgotPasswordTwo,
      this.addEventListenerHandle,
    );
  }

  componentWillUnmount() {
    removeEventListenerBuyoo(
      SCREENS.ForgotPasswordTwo,
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
      changePasswordLoading,
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
        <BYHeader title={query.title} />
        {changePasswordLoading && <Loader />}
        <Form query={query} />
      </div>
    );
  }
}

export default connect(
  state => {
    const { changePassword } = state;
    return {
      loading: changePassword.loading,
    };
  },
  {},
)(Index);
