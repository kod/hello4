/* eslint-disable react/no-array-index-key */
import React from 'react';
import router from 'umi/lib/router';

import { SIDEINTERVAL } from '@src/common/constants';
import CustomIcon from '@src/components/CustomIcon';
import { BORDER_COLOR, HEADER_BACKGROUND_COLOR } from '@src/styles/variables';
import { View, Text } from '@src/API';

const styles = {
  container: {
    height: '45px',
    backgroundColor: HEADER_BACKGROUND_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    borderBottomStyle: 'solid',
  },
  containerShadow: {},
  // absolutePosition: {
  //   position: 'absolute',
  //   top: 0, // android only for use with translucent status bar
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   height: 0,
  //   zIndex: 100,
  //   backgroundColor: 'rgba(0, 0, 0, .3)',
  // },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    // justifyContent: 'space-between',
  },
  headerBack: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    fontSize: 16,
    paddingTop: 14,
    paddingBottom: 14,
    color: '#147af3',
  },
  headerLine: {
    position: 'absolute',
    bottom: 0,
    left: SIDEINTERVAL,
    right: 0,
    height: 1,
    backgroundColor: BORDER_COLOR,
  },
};

class BYHeader extends React.PureComponent {
  static defaultProps = {
    onPressBackButton: null,
    showBackButton: true,
    headerTitle: null,
    headerRight: null,
  };

  handleOnPressBackButton = () => {
    const { onPressBackButton } = this.props;
    if (onPressBackButton) {
      onPressBackButton();
    } else {
      router.go(-1);
    }
  };

  renderHeaderLeft = () => <View />;

  renderHeaderTitle = () => {
    const { headerRight, styleTitle } = this.props;
    const stylesX = {
      container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: headerRight ? 0 : 40,
        flexDirection: 'row',
      },
      title: {
        fontSize: 18,
        color: '#3F3F3F',
        // marginRight: 5,
      },
    };

    const { title = '' } = this.props;

    return (
      <View style={stylesX.container}>
        <Text
          style={{
            ...stylesX.title,
            ...styleTitle,
          }}
        >
          {title}
        </Text>
      </View>
    );
  };

  render() {
    const {
      styleContainer,
      styleBack,
      showBackButton,
      headerTitle,
      headerRight,
      headerLeft,
    } = this.props;

    return (
      <View
        style={{
          ...styles.container,
          ...styleContainer,
        }}
      >
        <View style={styles.subContainer}>
          {showBackButton ? (
            <CustomIcon
              type="Back"
              style={{
                ...styles.headerBack,
                ...styleBack,
              }}
              onClick={() => this.handleOnPressBackButton()}
            />
          ) : (
            headerLeft || this.renderHeaderLeft()
          )}
          {headerTitle || this.renderHeaderTitle()}
          {headerRight}
        </View>
      </View>
    );
  }
}
export default BYHeader;
