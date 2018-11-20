import React from 'react';
import { connect } from 'dva';
// import { Modal } from 'antd-mobile';
import { formatMessage } from 'umi/locale';
// import router from 'umi/router';

import * as collectionActionCreators from '@/common/actions/collection';
import BYHeader from '@/components/BYHeader';
import {
  BUYOOVIP,
  BUYOO_VN,
  // BUSINESS_EMAIL,
  SERVICE_EMAIL,
  // SERVICE_PHONE,
  WINDOW_HEIGHT,
  VERSION,
  SUPPORT_CENTER_URL,
} from '@/common/constants';
import NavBar1 from '@/components/NavBar1';
import SeparateBar from '@/components/SeparateBar';

const icAvatarPng = 'https://oss.buyoo.vn/usercollect/1/20181120125848_x6L.png';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  WrapContainer: {
    height: WINDOW_HEIGHT,
    backgroundColor: '#fff',
  },
  main: {
    display: 'flex',
    height: WINDOW_HEIGHT - 45,
    flexDirection: 'column',
  },
  appMsgWrap2: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  appMsgWrap: {
    height: 80,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appVersion: {
    color: '#666',
    fontSize: 14,
  },
  appIcon: {
    height: 50,
    width: 50,
    marginBottom: 5,
  },
  copyright: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: '9%',
    fontSize: 12,
  },
};

@connect(
  state => {
    const { login } = state;

    return {
      authUser: login.user,
    };
  },
  {
    ...collectionActionCreators,
  },
)
class AboutAs extends React.Component {
  render() {
    const navBar1List = [
      {
        name: formatMessage({ id: 'helpingCenter' }),
        func: () => {
          window.location.href = SUPPORT_CENTER_URL;
        },

        tips: '',
      },
      // {
      //   name: formatMessage({ id: 'howToBuy' }),
      //   func: () =>
      //     navigate(SCREENS.WebView, {
      //       source: HOW_TO_BUY_URL,
      //     }),
      //   tips: '',
      // },
      // {
      //   name: formatMessage({ id: 'businessEmail' }),
      //   func: () => {
      //     window.location.href = `mailto:${BUSINESS_EMAIL}`;
      //   },
      //   tips: BUSINESS_EMAIL,
      // },
      {
        name: formatMessage({ id: 'serviceEmail' }),
        func: () => {
          window.location.href = `mailto:${SERVICE_EMAIL}`;
        },
        tips: SERVICE_EMAIL,
      },
      // {
      //   name: formatMessage({ id: 'hotline' }),
      //   func: () => {
      //     window.location.href = `tel:${SERVICE_PHONE}`;
      //   },
      //   tips: SERVICE_PHONE,
      // },
    ];
    return (
      <div style={styles.WrapContainer}>
        <BYHeader />
        <div style={styles.main}>
          <div style={styles.appMsgWrap2}>
            <div style={styles.appMsgWrap}>
              <img alt="" style={styles.appIcon} src={icAvatarPng} />
              <div style={styles.appVersion}>{`${BUYOOVIP} v${VERSION}`}</div>
            </div>
          </div>
          <SeparateBar />
          <div style={styles.container}>
            <NavBar1
              list={navBar1List}
              style={{ marginBottom: 30 }}
              styleItemLeft={{ flex: 2 }}
            />
          </div>
          <div style={{ flex: 1 }} />
          <div style={styles.copyright}>
            &copy; {`${new Date().getFullYear()} - `}
            {formatMessage({ id: 'copyright' }).replace(
              'CompanyName',
              BUYOOVIP,
            )}{' '}
            - {BUYOO_VN}
          </div>
        </div>
      </div>
    );
  }
}

export default AboutAs;
