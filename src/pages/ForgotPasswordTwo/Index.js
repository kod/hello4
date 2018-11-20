import React from 'react';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { connect } from 'dva';

import BYHeader from '@/components/BYHeader';
import { Modal } from 'antd-mobile';
import Form from './Form';
import {
  CHANGEPASSWORD_NAMESPACE,
  SCREENS,
  WINDOW_HEIGHT,
} from '@/common/constants';
import { CHANGE_PASSWORD } from '@/common/constants/actionTypes';
import Loader from '@/components/Loader';
import { removeEventListener, addEventListener } from '@/utils';

@connect(
  state => {
    const { loading } = state;
    return {
      changePasswordLoading:
        loading.effects[
          `${CHANGEPASSWORD_NAMESPACE}/${CHANGE_PASSWORD.REQUEST}`
        ],
    };
  },
  {},
)
class Index extends React.Component {
  componentDidMount() {
    addEventListener(SCREENS.ForgotPasswordTwo, this.addEventListenerHandle);
  }

  componentWillUnmount() {
    removeEventListener(SCREENS.ForgotPasswordTwo, this.addEventListenerHandle);
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
        <BYHeader title={formatMessage({ id: 'forgetPassword' })} />
        {changePasswordLoading && <Loader />}
        <Form query={query} />
      </div>
    );
  }
}

export default Index;
