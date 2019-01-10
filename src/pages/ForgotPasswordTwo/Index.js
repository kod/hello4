import React from 'react';
import { i18n, View } from '@src/API';
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
    Modal.alert('', i18n.success, [
      {
        text: i18n.confirm,
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
      <View style={styles.container}>
        <BYHeader title={query.title} />
        {changePasswordLoading && <Loader />}
        <Form query={query} />
      </View>
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
