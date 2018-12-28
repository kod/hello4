import React from 'react';
import { Modal } from 'antd-mobile';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { connect } from 'react-redux';

import BYHeader from '@/components/BYHeader';
import { SCREENS, WINDOW_HEIGHT } from '@/common/constants';
import Loader from '@/components/Loader';
import {
  addEventListenerBuyoo,
  removeEventListenerBuyoo,
  localStorageGetItem,
  localStorageRemoveItem,
} from '@/utils';
import Form from './Form';

import * as oauthRequestActionCreators from '@/common/actions/oauthRequest';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
  }

  componentDidMount() {
    addEventListenerBuyoo(
      SCREENS.OauthBindMailTwo,
      this.addEventListenerHandle,
    );
  }

  componentWillUnmount() {
    removeEventListenerBuyoo(
      SCREENS.OauthBindMailTwo,
      this.addEventListenerHandle,
    );
  }

  addEventListenerHandle = ({ detail: { method, params } }) => {
    const { oauthRequestFetch } = this.props;
    const { user } = params;
    switch (method) {
      case 'login':
        // 注册成功后会自动登录，登录后会调用
        if (user.status === 10000) {
          // 注册成功
          if (localStorageGetItem('otherLoginToken')) {
            const otherLoginToken = JSON.parse(
              localStorageGetItem('otherLoginToken'),
            );
            // 绑定第三方
            oauthRequestFetch({
              oauthtype: otherLoginToken.oauth_type,
              oauthid: otherLoginToken.oauth_id,
              screen: SCREENS.OauthBindMailTwo,
            });
          }
        } else {
          // 注册失败
          Modal.alert('', formatMessage({ id: 'failed' }), [
            {
              text: formatMessage({ id: 'confirm' }),
              style: 'default',
              onPress: () => {},
            },
          ]);
        }
        break;

      case 'oauthRequest':
        Modal.alert('', formatMessage({ id: 'success' }), [
          {
            text: formatMessage({ id: 'confirm' }),
            style: 'default',
            onPress: () => {
              localStorageRemoveItem('otherLoginToken');
              router.go(-3);
            },
          },
        ]);
        break;

      default:
        break;
    }
  };

  render() {
    const {
      registerLoading,
      oauthRequestLoading,
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
        <BYHeader title={formatMessage({ id: 'linkEmail' })} />
        {(registerLoading || oauthRequestLoading) && <Loader />}
        <Form query={query} />
      </div>
    );
  }
}

export default connect(
  state => {
    const { register, oauthRequest } = state;
    return {
      registerLoading: register.loading,
      oauthRequestLoading: oauthRequest.loading,
    };
  },
  {
    ...oauthRequestActionCreators,
  },
)(Index);
