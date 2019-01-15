import React from 'react';
import { Modal } from 'antd-mobile';
import { i18n, View } from '@src/API';
import router from 'umi/lib/router';
import { connect } from 'react-redux';

import BYHeader from '@src/components/BYHeader';
import { SCREENS, WINDOW_HEIGHT } from '@src/common/constants';
import Loader from '@src/components/Loader';
import {
  addEventListenerBuyoo,
  removeEventListenerBuyoo,
  localStorageGetItem,
  localStorageRemoveItem,
} from '@src/utils';
import * as oauthRequestActionCreators from '@src/common/actions/oauthRequest';
import Form from './Form';

import styles from './index.less';

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
          Modal.alert('', i18n.failed, [
            {
              text: i18n.confirm,
              style: 'default',
              onPress: () => {},
            },
          ]);
        }
        break;

      case 'oauthRequest':
        Modal.alert('', i18n.success, [
          {
            text: i18n.confirm,
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

    return (
      <View
        style={{
          height: WINDOW_HEIGHT,
        }}
        className={styles.container}
      >
        <BYHeader title={i18n.linkEmail} />
        {(registerLoading || oauthRequestLoading) && <Loader />}
        <Form query={query} />
      </View>
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
