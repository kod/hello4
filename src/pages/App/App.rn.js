import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { connectLocalization } from '@src/components/Localization';
import AppNavigator from '@src/navigations/AppNavigator';
// import { Modal } from '@src/API';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class App extends React.Component {
  componentDidMount() {
    console.log(this);
    const { i18n } = this.props;
    console.log(i18n.computerOffice);
    // Modal.alert(
    //   '123',
    //   'error',
    //   [
    //     {
    //       text: 'ok1',
    //       onPress: () => {
    //         alert('alert');
    //       },
    //     },
    //   ],
    //   // false,
    // );
  }

  render() {
    const { i18n } = this.props;
    const renderComponent = <AppNavigator screenProps={{ i18n }} />;

    return <View className={styles.container}>{renderComponent}</View>;
  }
}

// export default connect(state => {
//   const {
//     login,
//     // login,
//   } = state;
//   console.log(state);

//   return {
//     isAuthUser: !!login.user,
//   };
// })(App);
export default connectLocalization(
  connect(state => {
    const {
      login,
      // login,
    } = state;
    console.log(state);

    return {
      isAuthUser: !!login.user,
    };
  })(App),
);
