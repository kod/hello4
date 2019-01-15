import React from 'react';
import { Modal } from 'antd-mobile';
import { i18n, View } from '@src/API';
import router from 'umi/lib/router';
import { connect } from 'react-redux';
import qs from 'qs';

import BYHeader from '@src/components/BYHeader';
import NavSidesText from '@src/components/NavSidesText';
import Loader from '@src/components/Loader';
import {
  SCREENS,
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  WINDOW_WIDTH,
  SOCIALBIND_GOOGLE,
  SOCIALBIND_FACEBOOK,
  GOOGLE_CLIENT_ID,
  API_DEBUG,
  GOOGLE_CLIENT_ID_TEST,
} from '@src/common/constants';
import {
  addEventListenerBuyoo,
  removeEventListenerBuyoo,
  localStorageRemoveItem,
  localStorageSetItem,
  loadFbLoginApi,
  loadGoogleLoginApi,
} from '@src/utils';
import CustomIcon from '@src/components/CustomIcon';

import * as loginActionCreators from '@src/common/actions/login';
import classNames from 'classnames';
import Form from './Form';

import styles from './index.less';

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
          client_id: API_DEBUG ? GOOGLE_CLIENT_ID_TEST : GOOGLE_CLIENT_ID,
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

          Modal.alert('', i18n.tipsLinkEmail, [
            {
              text: i18n.confirm,
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
    return (
      <View className={styles.container}>
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={styles.separated}
        >
          <View className={styles.separatedLine} />
          <View
            style={{
              paddingLeft: SIDEINTERVAL / 4,
              paddingRight: SIDEINTERVAL / 4,
            }}
          >
            {i18n.orSignInWith}
          </View>
          <View className={styles.separatedLine} />
        </View>
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={styles.main}
        >
          <View
            style={{ paddingLeft: SIDEINTERVAL / 2 }}
            className={classNames(styles.item, styles.itemFacebook)}
            onClick={() => this.handleOnPressOtherLogin(SOCIALBIND_FACEBOOK)}
          >
            <CustomIcon
              name="facebook-fill"
              type="facebook-fill"
              style={{
                marginRight: SIDEINTERVAL / 2,
              }}
              className={styles.itemIcon}
            />
            {/* <AntDesign name="facebook-square" style={styles.itemIcon} /> */}
            <View className={styles.itemText}>{i18n.facebook}</View>
          </View>
          <View
            style={{
              width: WINDOW_WIDTH * 0.02,
            }}
          />
          <View
            style={{ paddingLeft: SIDEINTERVAL / 2 }}
            className={classNames(styles.item, styles.itemGoogle)}
            onClick={() => this.handleOnPressOtherLogin(SOCIALBIND_GOOGLE)}
          >
            <CustomIcon
              name="google-square-fill"
              type="google-square-fill"
              className={styles.itemIcon}
            />
            {/* <AntDesign name="googleplus" className={styles.itemIcon} /> */}
            <View className={styles.itemText}>{i18n.google}</View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { isLoadFBSDK } = this.state;
    const { loginLoading } = this.props;

    return (
      <View
        style={{
          height: WINDOW_HEIGHT,
        }}
        className={styles.container}
      >
        <BYHeader title={i18n.login} />

        {(loginLoading || isLoadFBSDK === false) && <Loader />}

        <Form />
        <NavSidesText
          textLeft={i18n.register}
          textRight={i18n.forgetPassword}
          navigateLeft={() => router.push('/RegisterStepOne')}
          navigateRight={() =>
            router.push(
              `/${SCREENS.ForgotPasswordOne}?${qs.stringify({
                title: i18n.forgetPassword,
              })}`,
            )
          }
        />
        <View style={{ flex: 1 }} />
        {this.renderOtherLogin()}
      </View>
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
