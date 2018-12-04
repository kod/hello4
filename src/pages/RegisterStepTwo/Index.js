import React from 'react';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { connect } from 'dva';

import BYHeader from '@/components/BYHeader';
import { Modal } from 'antd-mobile';
import { REGISTER_NAMESPACE, SCREENS, WINDOW_HEIGHT } from '@/common/constants';
import { REGISTER } from '@/common/constants/actionTypes';
import Loader from '@/components/Loader';
import { addEventListener, removeEventListener } from '@/utils';
import Form from './Form';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
  }

  componentDidMount() {
    addEventListener(SCREENS.RegisterStepTwo, this.addEventListenerHandle);
  }

  componentWillUnmount() {
    removeEventListener(SCREENS.RegisterStepTwo, this.addEventListenerHandle);
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
    const { loading } = state;
    return {
      registerLoading:
        loading.effects[`${REGISTER_NAMESPACE}/${REGISTER.REQUEST}`],
    };
  },
  {},
)(Index);
