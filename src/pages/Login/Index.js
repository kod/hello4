import React from 'react';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { connect } from 'dva';

import BYHeader from '@/components/BYHeader';
import NavSidesText from '@/components/NavSidesText';
import Form from './Form';
import Loader from '@/components/Loader';
import { LOGIN } from '@/common/constants/actionTypes';
import { LOGIN_NAMESPACE, SCREENS } from '@/common/constants';
import { addEventListener, removeEventListener } from '@/utils';

@connect(
  state => {
    const { loading } = state;
    return {
      loginLoading: loading.effects[`${LOGIN_NAMESPACE}/${LOGIN.REQUEST}`],
    };
  },
  {},
)
class Index extends React.Component {
  componentDidMount() {
    addEventListener(SCREENS.Login, this.addEventListenerHandle);
  }

  componentWillUnmount() {
    removeEventListener(SCREENS.Login, this.addEventListenerHandle);
  }

  addEventListenerHandle = ret => {
    console.log(ret);
    router.go(-1);
  };

  render() {
    const { loginLoading } = this.props;
    return (
      <div>
        <BYHeader title={formatMessage({ id: 'login' })} />

        {loginLoading && <Loader />}

        <Form />
        <NavSidesText
          textLeft={formatMessage({ id: 'register' })}
          textRight={formatMessage({ id: 'forgetPassword' })}
          navigateLeft={() => router.push('/RegisterStepOne')}
          navigateRight={() => router.push('/ForgotPasswordOne')}
        />
        <div style={{ flex: 1 }} />
      </div>
    );
  }
}

export default Index;
