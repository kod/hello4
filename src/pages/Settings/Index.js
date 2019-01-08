/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
// import { Modal } from 'antd-mobile';
import { Modal } from '@src/API';
import router from 'umi/lib/router';
import qs from 'qs';

import BYHeader from '@src/components/BYHeader';
import {
  SCREENS,
  SIDEINTERVAL,
  IS_I18N,
  WINDOW_HEIGHT,
  LOCALE_EN_US,
  LOCALE_VI_VN,
  LOCALE_ZH_CN,
} from '@src/common/constants';
import NavBar1 from '@src/components/NavBar1';
import { RED_COLOR } from '@src/styles/variables';
import * as i18nActionCreators from '@src/common/actions/i18n';
import * as loginActionCreators from '@src/common/actions/login';
import { getLoginUser } from '@src/common/selectors';
import { connectLocalization } from '@src/components/Localization';

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
  // componentDidMount() {
  //   Modal.alert(
  //     '123',
  //     'error',
  //     [
  //       {
  //         text: 'ok1',
  //         onPress: () => {
  //           alert('alert');
  //         },
  //       },
  //     ],
  //     // false,
  //   );
  // }

  handleOnPressLogout() {
    const { logout, i18n } = this.props;
    Modal.alert('', i18n.doYouWantToSignOut, [
      {
        text: i18n.cancel,
      },
      {
        text: i18n.confirm,
        style: 'default',
        onPress: () => {
          logout();
          router.go(-1);
        },
      },
    ]);
  }

  render() {
    const { authUser, i18n, setLanguage } = this.props;

    const navBar1List = IS_I18N
      ? [
          {
            // iconImg: aboutPng,
            name: i18n.aboutAs,
            func: () => router.push(`/${SCREENS.AboutAs}`),
            tips: '',
          },
          {
            // iconImg: aboutPng,
            name: i18n.changePassword,
            func: () =>
              router.push(
                `/${SCREENS.ForgotPasswordOne}?${qs.stringify({
                  title: i18n.changePassword,
                })}`,
              ),
            tips: '',
          },
          {
            // iconImg: personPng,
            name: i18n.language,
            func: () =>
              Modal.operation([
                {
                  text: 'English',
                  onPress: () => setLanguage(LOCALE_EN_US),
                },
                {
                  text: 'Tiếng Việt',
                  onPress: () => setLanguage(LOCALE_VI_VN),
                },
                {
                  text: '中文',
                  onPress: () => setLanguage(LOCALE_ZH_CN),
                },
              ]),
            tips: '',
          },
        ]
      : [
          {
            // iconImg: aboutPng,
            name: i18n.aboutAs,
            func: () => router.push(`/${SCREENS.AboutAs}`),
            tips: '',
          },
          {
            // iconImg: aboutPng,
            name: i18n.changePassword,
            func: () =>
              router.push(
                `/${SCREENS.ForgotPasswordOne}?${qs.stringify({
                  title: i18n.changePassword,
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
              <div style={styles.logoutText}>{i18n.signOut}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connectLocalization(
  connect(
    (state, props) => {
      console.log(state);
      console.log(props);
      return {
        authUser: getLoginUser(state, props),
      };
    },
    {
      ...loginActionCreators,
      ...i18nActionCreators,
    },
  )(Settings),
);
