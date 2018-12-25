import React from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';

import BYHeader from '@/components/BYHeader';
import Form from './Form';
import { LOGIN } from '@/common/constants/actionTypes';
import { LOGIN_NAMESPACE, WINDOW_HEIGHT } from '@/common/constants';

import * as loginActionCreators from '@/common/actions/login';

class Withdrawal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadFBSDK: false,
    };

    // this.addEventListenerHandle = this.addEventListenerHandle.bind(this);
  }

  // componentDidMount() {
  //   addEventListener(SCREENS.Login, this.addEventListenerHandle);
  //   loadFbLoginApi(() => {
  //     this.setState({
  //       isLoadFBSDK: true,
  //     });
  //   });
  //   loadGoogleLoginApi(() => {
  //     window.gapi.load('auth2', () => {
  //       window.gapi.auth2.init({
  //         client_id: GOOGLE_CLIENT_ID,
  //       });
  //       // const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
  //       // const profile = googleUser.getBasicProfile();
  //       // profile.getId();
  //     });
  //   });

  //   if (window.FB) {
  //     this.setState({
  //       isLoadFBSDK: true,
  //     });
  //   } else {
  //     setTimeout(() => {
  //       this.setState({
  //         isLoadFBSDK: true,
  //       });
  //     }, 3 * 1000);
  //   }
  // }

  // componentWillUnmount() {
  //   removeEventListener(SCREENS.Login, this.addEventListenerHandle);
  // }

  render() {
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        height: WINDOW_HEIGHT,
        backgroundColor: '#f2f2f2',
      },
    };

    return (
      <div style={styles.container}>
        <BYHeader title={formatMessage({ id: 'enterCardInformation' })} />
        <Form />
        <div style={{ flex: 1 }} />
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
  {
    ...loginActionCreators,
  },
)(Withdrawal);
