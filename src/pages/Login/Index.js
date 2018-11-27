import React from 'react';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { connect } from 'dva';
import qs from 'qs';

import BYHeader from '@/components/BYHeader';
import NavSidesText from '@/components/NavSidesText';
import Form from './Form';
import Loader from '@/components/Loader';
import { LOGIN } from '@/common/constants/actionTypes';
import { LOGIN_NAMESPACE, SCREENS, WINDOW_HEIGHT } from '@/common/constants';
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
  constructor(props) {
    super(props);
    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
  }

  componentDidMount() {
    addEventListener(SCREENS.Login, this.addEventListenerHandle);
  }

  componentWillUnmount() {
    removeEventListener(SCREENS.Login, this.addEventListenerHandle);
  }

  addEventListenerHandle = () => {
    router.go(-1);
  };

  render() {
    const { loginLoading } = this.props;
    const styles = {
      container: {
        height: WINDOW_HEIGHT,
        backgroundColor: '#fff',
      },
    };

    return (
      <div style={styles.container}>
        <BYHeader title={formatMessage({ id: 'login' })} />

        {loginLoading && <Loader />}

        <Form />
        <NavSidesText
          textLeft={formatMessage({ id: 'register' })}
          textRight={formatMessage({ id: 'forgetPassword' })}
          navigateLeft={() => router.push('/RegisterStepOne')}
          navigateRight={() =>
            router.push(
              `/${SCREENS.ForgotPasswordOne}?${qs.stringify({
                title: formatMessage({ id: 'forgetPassword' }),
              })}`,
            )
          }
        />
        <div style={{ flex: 1 }} />
      </div>
    );
  }
}

export default Index;
