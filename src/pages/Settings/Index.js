/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd-mobile';
import { formatMessage, setLocale } from 'umi/locale';
import router from 'umi/router';
import qs from 'qs';

import BYHeader from '@src/components/BYHeader';
import {
  SCREENS,
  SIDEINTERVAL,
  IS_I18N,
  WINDOW_HEIGHT,
} from '@src/common/constants';
import NavBar1 from '@src/components/NavBar1';
import { RED_COLOR } from '@src/styles/variables';
import * as loginActionCreators from '@src/common/actions/login';
import { getLoginUser } from '@src/common/selectors';

// const personPng = 'https://oss.buyoo.vn/usercollect/1/20181120125641_E6E.png';

// const aboutPng = 'https://oss.buyoo.vn/usercollect/1/20181120125848_x6L.png';

const styles = {
  container: {
    height: WINDOW_HEIGHT,
    backgroundColor: '#fff',
  },
  main: {
    height: WINDOW_HEIGHT - 45,
    backgroundColor: '#fff',
  },
  logout: {
    paddingRight: SIDEINTERVAL,
    paddingLeft: SIDEINTERVAL,
  },
  logoutText: {
    height: 50,
    lineHeight: '50px',
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    color: RED_COLOR,
    fontSize: 14,
  },
};

class Settings extends React.Component {
  handleOnPressLogout() {
    const { logout } = this.props;
    Modal.alert('', formatMessage({ id: 'doYouWantToSignOut' }), [
      {
        text: formatMessage({ id: 'cancel' }),
      },
      {
        text: formatMessage({ id: 'confirm' }),
        style: 'default',
        onPress: () => {
          logout();
          router.go(-1);
        },
      },
    ]);
  }

  render() {
    const { authUser } = this.props;

    const navBar1List = IS_I18N
      ? [
          {
            // iconImg: aboutPng,
            name: formatMessage({ id: 'aboutAs' }),
            func: () => router.push(`/${SCREENS.AboutAs}`),
            tips: '',
          },
          {
            // iconImg: aboutPng,
            name: formatMessage({ id: 'changePassword' }),
            func: () =>
              router.push(
                `/${SCREENS.ForgotPasswordOne}?${qs.stringify({
                  title: formatMessage({ id: 'changePassword' }),
                })}`,
              ),
            tips: '',
          },
          {
            // iconImg: personPng,
            name: formatMessage({ id: 'language' }),
            func: () =>
              Modal.operation([
                {
                  text: 'English',
                  onPress: () => setLocale('en-US'),
                },
                {
                  text: 'Tiếng Việt',
                  onPress: () => setLocale('vi-VN'),
                },
                {
                  text: '中文',
                  onPress: () => setLocale('zh-CN'),
                },
              ]),
            tips: '',
          },
        ]
      : [
          {
            // iconImg: aboutPng,
            name: formatMessage({ id: 'aboutAs' }),
            func: () => router.push(`/${SCREENS.AboutAs}`),
            tips: '',
          },
          {
            // iconImg: aboutPng,
            name: formatMessage({ id: 'changePassword' }),
            func: () =>
              router.push(
                `/${SCREENS.ForgotPasswordOne}?${qs.stringify({
                  title: formatMessage({ id: 'changePassword' }),
                })}`,
              ),
            tips: '',
          },
        ];

    return (
      <div style={styles.container}>
        <BYHeader />
        <div style={styles.main}>
          <NavBar1
            list={navBar1List}
            style={{ marginBottom: 30 }}
            styleItemLeft={{ flex: 3 }}
          />
          {authUser && (
            <div
              style={styles.logout}
              onClick={() => this.handleOnPressLogout()}
            >
              <div style={styles.logoutText}>
                {formatMessage({ id: 'signOut' })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    return {
      authUser: getLoginUser(state, props),
    };
  },
  {
    ...loginActionCreators,
  },
)(Settings);
