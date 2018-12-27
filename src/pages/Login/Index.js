import React from 'react';
import { Modal } from 'antd-mobile';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { connect } from 'react-redux';
import qs from 'qs';

import BYHeader from '@/components/BYHeader';
import NavSidesText from '@/components/NavSidesText';
import Form from './Form';
import Loader from '@/components/Loader';
import {
  SCREENS,
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  WINDOW_WIDTH,
  SOCIALBIND_GOOGLE,
  SOCIALBIND_FACEBOOK,
  GOOGLE_CLIENT_ID,
} from '@/common/constants';
import {
  addEventListenerBuyoo,
  removeEventListenerBuyoo,
  localStorageRemoveItem,
  localStorageSetItem,
  loadFbLoginApi,
  loadGoogleLoginApi,
} from '@/utils';
import {
  FONT_SIZE_FOURTH,
  BACKGROUND_COLOR_FOURTH,
  FONT_COLOR_FIFTH,
} from '@/styles/variables';
import CustomIcon from '@/components/CustomIcon';

import * as loginActionCreators from '@/common/actions/login';

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadFBSDK: false,
    };

    this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
    this.socialLoginCallback = this.socialLoginCallback.bind(this);
    this.FBstatusChangeCallback = this.FBstatusChangeCallback.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {
    addEventListenerBuyoo(SCREENS.Login, this.addEventListenerHandle);
    loadFbLoginApi(() => {
      this.setState({
        isLoadFBSDK: true,
      });
    });
    loadGoogleLoginApi(() => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: GOOGLE_CLIENT_ID,
        });
        // const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
        // const profile = googleUser.getBasicProfile();
        // profile.getId();
      });
    });

    if (window.FB) {
      this.setState({
        isLoadFBSDK: true,
      });
    } else {
      setTimeout(() => {
        this.setState({
          isLoadFBSDK: true,
        });
      }, 3 * 1000);
    }
  }

  componentWillUnmount() {
    removeEventListenerBuyoo(SCREENS.Login, this.addEventListenerHandle);
  }

  addEventListenerHandle = ({ detail: { method, params } }) => {
    switch (method) {
      case 'login':
        if (params.user) {
          // 登录成功
          localStorageRemoveItem('otherLoginToken');
          router.go(-1);
        } else {
          // 登录失败（未注册）
          console.log('登录失败（未注册）');

          Modal.alert('', formatMessage({ id: 'tipsLinkEmail' }), [
            {
              text: formatMessage({ id: 'confirm' }),
              style: 'default',
              onPress: () => {
                // 去绑定邮箱（实际是注册）
                router.push(`/${SCREENS.OauthBindMailOne}`);
              },
            },
          ]);
        }
        break;

      default:
        break;
    }
  };

  onSignIn = googleUser => {
    const profile = googleUser.getBasicProfile();

    this.socialLoginCallback({
      oauth_type: SOCIALBIND_GOOGLE,
      oauth_id: profile.getId(),
    });

    // console.log(`ID: ${profile.getId()}`); // Do not send to your backend! Use an ID token instead.
    // console.log(`Name: ${profile.getName()}`);
    // console.log(`Image URL: ${profile.getImageUrl()}`);
    // console.log(`Email: ${profile.getEmail()}`); // This is null if the 'email' scope is not present.
  };

  socialLoginCallback = ret => {
    const { loginFetch } = this.props;
    // 判断此第三方账号是否已绑定过用户
    loginFetch({
      oauthtype: ret.oauth_type,
      oauthid: ret.oauth_id,
      // access_token: ret.access_token,
      screen: SCREENS.Login,
    });

    // 把第三方信息保存到本地
    localStorageRemoveItem('otherLoginToken');
    localStorageSetItem('otherLoginToken', JSON.stringify(ret));
  };

  FBstatusChangeCallback = response => {
    const { authResponse, status } = response;
    if (status === 'connected') {
      this.socialLoginCallback({
        oauth_type: SOCIALBIND_FACEBOOK,
        oauth_id: authResponse.userID,
        // access_token: authResponse.accessToken,
      });
    } else {
      window.FB.login();
    }
  };

  handleOnPressOtherLogin = type => {
    const getAuthInstance = window.gapi.auth2.getAuthInstance();
    switch (type) {
      case SOCIALBIND_GOOGLE:
        if (getAuthInstance.isSignedIn.get()) {
          // 已登录
          // getAuthInstance.signOut();
          this.onSignIn(getAuthInstance.currentUser.get());
        } else {
          // 未登录
          getAuthInstance.signIn().then(() => {
            this.onSignIn(
              window.gapi.auth2.getAuthInstance().currentUser.get(),
            );
          });
        }

        // googleLogin({
        //   GoogleSignin,
        //   statusCodes,
        //   Alert,
        //   i18n,
        //   SOCIALBIND_GOOGLE,
        //   callback: this.socialLoginCallback,
        // });

        break;

      case SOCIALBIND_FACEBOOK:
        // setTimeout(() => {
        //   const response = {
        //     authResponse: {
        //       accessToken:
        //         'EAAD43HicgY4BAL87VQjmuLoYTWxWzyMXZCXqvY4wiFksdk1McgkdV91yPoBUgCVwuTZCaCImPMUZAv7rZB007rBo88RkGbmgMn2v0uZBzoSrogX00suvYH0z4qJSl22k27tSeGmub8dHKZBbxYVBo52PKMfMOdp5lOyXZBIBSUA6LCANLadJvgA9Bm2ZBizCPokASlZBeSDCcrgZDZD',
        //       userID: '376293986471968',
        //       expiresIn: 7017,
        //       signedRequest:
        //         'WGLR8Ek8s_3FJ7usdD0-uGbaEVDDWcT2E9unqHU4FHY.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUURDS21kenFHNDFEWEFWeE1rempCREFrYmtPc2hKM2dyRmhZTXE2NTgza1RzUUFQbi1xb0pfc2EtWEVlNjVWbWFSQ29pQmUtUFAwOFlMR0Vpdm5fd0UzT2VWUnh5TjQxdlNLRnIwTHZqN1Jzd1ZTU0RweG1RN1dNckxOUWFieE4wcUh1cEpOQTQ2eFdhNm1KTTNLUjhZQndya0k0M2ZoNnc2VXd0dVVrVDkzVDZJaVJKbExQQUxhVmhEaXFNREpReXAxMGpCVjd4ZmJlYmt1UlBDTVJTUDdiRkJYQmRHR0R4TTVxWjJibDVZVERXZ2t0UGxwUzZjOTFhQVdGMnlZZUZQNjA0endGYm12cm0zLV9URnNXX25uNURTSDNlY1JQalNUOFZYZjR0UGx2QzBYWGpidUV0OFBJTW01bGpNVkN1UkJEMV9xYjJ1dFR1SXVxTnh4dTl5Q1BxdDBnNE5KeFFaT0pmcmtoYkNFNmciLCJpc3N1ZWRfYXQiOjE1NDQ1OTgxODMsInVzZXJfaWQiOiIzNzYyOTM5ODY0NzE5NjgifQ',
        //       reauthorize_required_in: 7768224,
        //       data_access_expiration_time: 1552366407,
        //     },
        //     status: 'connected',
        //   };

        //   this.FBstatusChangeCallback(response);
        // }, 1000);

        window.FB.getLoginStatus(response => {
          this.FBstatusChangeCallback(response);
        });
        break;

      default:
        break;
    }
  };

  renderOtherLogin() {
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
          <div
            style={{ ...styles.item, ...styles.itemFacebook }}
            onClick={() => this.handleOnPressOtherLogin(SOCIALBIND_FACEBOOK)}
          >
            <CustomIcon type="facebook-fill" style={styles.itemIcon} />
            {/* <AntDesign name="facebook-square" style={styles.itemIcon} /> */}
            <div style={styles.itemText}>
              {formatMessage({ id: 'facebook' })}
            </div>
          </div>
          <div style={styles.mainSeparated} />
          <div
            style={{ ...styles.item, ...styles.itemGoogle }}
            onClick={() => this.handleOnPressOtherLogin(SOCIALBIND_GOOGLE)}
          >
            <CustomIcon type="google-square-fill" style={styles.itemIcon} />
            {/* <AntDesign name="googleplus" style={styles.itemIcon} /> */}
            <div style={styles.itemText}>{formatMessage({ id: 'google' })}</div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { isLoadFBSDK } = this.state;
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

        {(loginLoading || isLoadFBSDK === false) && <Loader />}

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
        {this.renderOtherLogin()}
      </div>
    );
  }
}

export default connect(
  state => {
    const { login } = state;
    return {
      loginLoading: login.loading,
    };
  },
  {
    ...loginActionCreators,
  },
)(Index);
