import React from 'react';
// import { connect } from 'react-redux';
import { i18n, View } from '@src/API';

// import * as collectionActionCreators from '@src/common/actions/collection';
import BYHeader from '@src/components/BYHeader';
import {
  BUYOOVIP,
  BUYOO_VN,
  SERVICE_EMAIL,
  WINDOW_HEIGHT,
  VERSION,
  SUPPORT_CENTER_URL,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import NavBar1 from '@src/components/NavBar1';
import SeparateBar from '@src/components/SeparateBar';
import { xOssProcess } from '@src/utils';

import styles from './index.less';

const icAvatarPng = 'https://oss.buyoo.vn/usercollect/1/20181130132407_o46.png';

class AboutAs extends React.Component {
  componentDidMount() {
    console.log();
  }

  render() {
    const navBar1List = [
      {
        name: i18n.helpingCenter,
        func: () => {
          window.location.href = SUPPORT_CENTER_URL;
        },

        tips: '',
      },
      // {
      //   name: i18n.howToBuy,
      //   func: () =>
      //     navigate(SCREENS.WebView, {
      //       source: HOW_TO_BUY_URL,
      //     }),
      //   tips: '',
      // },
      // {
      //   name: i18n.businessEmail,
      //   func: () => {
      //     window.location.href = `mailto:${BUSINESS_EMAIL}`;
      //   },
      //   tips: BUSINESS_EMAIL,
      // },
      {
        name: i18n.serviceEmail,
        func: () => {
          window.location.href = `mailto:${SERVICE_EMAIL}`;
        },
        tips: SERVICE_EMAIL,
      },
      // {
      //   name: i18n.hotline,
      //   func: () => {
      //     window.location.href = `tel:${SERVICE_PHONE}`;
      //   },
      //   tips: SERVICE_PHONE,
      // },
    ];
    return (
      <View
        style={{
          height: WINDOW_HEIGHT,
        }}
        className={styles.WrapContainer}
      >
        <BYHeader />
        <View
          style={{
            height: WINDOW_HEIGHT - 45,
          }}
          className={styles.main}
        >
          <View className={styles.appMsgWrap2}>
            <View className={styles.appMsgWrap}>
              <img
                alt=""
                className={styles.appIcon}
                src={`${icAvatarPng}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
              />
              <View
                className={styles.appVersion}
              >{`${BUYOOVIP} v${VERSION}`}</View>
            </View>
          </View>
          <SeparateBar />
          <View className={styles.container}>
            <NavBar1
              list={navBar1List}
              style={{ marginBottom: 30 }}
              styleItemLeft={{ flex: 2 }}
            />
          </View>
          <View style={{ flex: 1 }} />
          <View className={styles.copyright}>
            &copy; {`${new Date().getFullYear()} - `}
            {i18n.copyright.replace('CompanyName', BUYOOVIP)} - {BUYOO_VN}
          </View>
        </View>
      </View>
    );
  }
}

export default AboutAs;
