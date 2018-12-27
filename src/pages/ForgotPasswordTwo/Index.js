import React from 'react';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { connect } from 'react-redux';

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
import { removeEventListenerBuyoo, addEventListenerBuyoo } from '@/utils';

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
    const { loading } = state;
    return {
      changePasswordLoading:
        loading.effects[
          `${CHANGEPASSWORD_NAMESPACE}/${CHANGE_PASSWORD.REQUEST}`
        ],
    };
  },
  {},
)(Index);
