import React from 'react';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { connect } from 'dva';

import BYHeader from '@/components/BYHeader';
import { Modal } from 'antd-mobile';
import { REGISTER_NAMESPACE, SCREENS } from '@/common/constants';
import { REGISTER } from '@/common/constants/actionTypes';
import Loader from '@/components/Loader';
import { addEventListener, removeEventListener } from '@/utils';
import Form from './Form';

@connect(
  state => {
    const { loading } = state;
    return {
      registerLoading:
        loading.effects[`${REGISTER_NAMESPACE}/${REGISTER.REQUEST}`],
    };
  },
  {},
)
class Index extends React.Component {
  componentDidMount() {
    addEventListener(SCREENS.RegisterStepTwo, this.addEventListenerHandle);
  }

  componentWillUnmount() {
    removeEventListener(SCREENS.RegisterStepTwo, this.addEventListenerHandle);
  }

  addEventListenerHandle = ret => {
    console.log(ret);
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
    return (
      <div>
        <BYHeader title={formatMessage({ id: 'register' })} />
        {registerLoading && <Loader />}
        <Form query={query} />
      </div>
    );
  }
}

export default Index;
