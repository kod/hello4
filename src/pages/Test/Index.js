/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

import * as collectionActionCreators from '@src/common/actions/collection';
import BYHeader from '@src/components/BYHeader';

class AboutAs extends React.Component {
  componentDidMount() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '273625800016270',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
      });

      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    setTimeout(() => {
      this.checkLoginState();
    }, 4000);
  }

  checkLoginState = () => {
    alert('getLoginStatusgetLoginStatus');
    FB.getLoginStatus(function (response) {
        alert(response)
    });
}


  render() {
    return (
      <View>
        <BYHeader />
        <View>123</View>
      </View>
    );
  }
}

export default connect(
  () => { },
  {
    ...collectionActionCreators,
  },
)(AboutAs);
