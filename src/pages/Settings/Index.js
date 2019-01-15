/* eslint-disable arrow-body-style */
import React from 'react';
import { connect } from 'react-redux';
import { Modal, View } from '@src/API';
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
import * as i18nActionCreators from '@src/common/actions/i18n';
import * as loginActionCreators from '@src/common/actions/login';
import { getLoginUser } from '@src/common/selectors';
import { connectLocalization } from '@src/components/Localization';

import styles from './index.less';

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
      <View
        style={{
          height: WINDOW_HEIGHT,
        }}
        className={styles.container}
      >
        <BYHeader />
        <View
          style={{
            height: WINDOW_HEIGHT - 45,
          }}
          className={styles.main}
        >
          <NavBar1
            list={navBar1List}
            style={{ marginBottom: 30 }}
            styleItemLeft={{ flex: 3 }}
          />
          {authUser && (
            <View
              style={{
                paddingLeft: SIDEINTERVAL,
                paddingRight: SIDEINTERVAL,
              }}
              onClick={() => this.handleOnPressLogout()}
            >
              <View className={styles.logoutText}>{i18n.signOut}</View>
            </View>
          )}
        </View>
      </View>
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
