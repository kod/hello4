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
import {
  LOGIN_NAMESPACE,
  SCREENS,
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  WINDOW_WIDTH,
} from '@/common/constants';
import { addEventListener, removeEventListener } from '@/utils';
import {
  FONT_SIZE_FOURTH,
  BACKGROUND_COLOR_FOURTH,
  FONT_COLOR_FIFTH,
} from '@/styles/variables';
import CustomIcon from '@/components/CustomIcon';

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

  renderOtherLogin() {
    console.log(this);
    const styles = {
      container: {
        marginBottom: 30,
      },
      separated: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        marginBottom: 10,
      },
      separatedLine: {
        display: 'flex',
        flex: 1,
        height: 1,
        backgroundColor: BACKGROUND_COLOR_FOURTH,
      },
      separatedText: {
        paddingLeft: SIDEINTERVAL / 4,
        paddingRight: SIDEINTERVAL / 4,
        // paddingTop: 10,
        // paddingBottom: 10,
      },
      main: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      item: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: SIDEINTERVAL / 2,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 1,
      },
      itemIcon: {
        fontSize: FONT_SIZE_FOURTH,
        color: FONT_COLOR_FIFTH,
        marginRight: SIDEINTERVAL / 2,
      },
      itemText: {
        display: 'flex',
        flex: 1,
        textAlign: 'center',
        fontWeight: '700',
        color: FONT_COLOR_FIFTH,
      },
      mainSeparated: {
        width: WINDOW_WIDTH * 0.02,
      },
      itemFacebook: {
        backgroundColor: '#4369b0',
      },
      itemGoogle: {
        backgroundColor: '#d14a3c',
      },
      itemLinkedin: {
        backgroundColor: '#1275b1',
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.separated}>
          <div style={styles.separatedLine} />
          <div style={styles.separatedText}>
            {formatMessage({ id: 'orSignInWith' })}
          </div>
          <div style={styles.separatedLine} />
        </div>
        <div style={styles.main}>
          <div style={{ ...styles.item, ...styles.itemFacebook }}>
            <CustomIcon type="facebook-fill" style={styles.itemIcon} />
            {/* <AntDesign name="facebook-square" style={styles.itemIcon} /> */}
            <div style={styles.itemText}>
              {formatMessage({ id: 'facebook' })}
            </div>
          </div>
          <div style={styles.mainSeparated} />
          {/* <div style={[styles.item, styles.itemLinkedin]}>
            <AntDesign name="linkedin-square" style={styles.itemIcon} />
            <div style={styles.itemText}>{formatMessage({ id: 'linkedIn' })}</div>
          </div>
          <div style={styles.mainSeparated} /> */}
          <div style={{ ...styles.item, ...styles.itemGoogle }}>
            <CustomIcon type="google-square-fill" style={styles.itemIcon} />
            {/* <AntDesign name="googleplus" style={styles.itemIcon} /> */}
            <div style={styles.itemText}>{formatMessage({ id: 'google' })}</div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { loginLoading } = this.props;
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
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
        {/* {this.renderOtherLogin()} */}
      </div>
    );
  }
}

export default connect(
  state => {
    const { loading } = state;
    return {
      loginLoading: loading.effects[`${LOGIN_NAMESPACE}/${LOGIN.REQUEST}`],
    };
  },
  {},
)(Index);
