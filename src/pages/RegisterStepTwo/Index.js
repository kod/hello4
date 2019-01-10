import React from 'react';
import { i18n, View } from '@src/API';
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
      <View style={styles.container}>
        <BYHeader title={i18n.register} />
        {registerLoading && <Loader />}
        <Form query={query} />
      </View>
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
