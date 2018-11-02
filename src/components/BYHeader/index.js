/* eslint-disable react/no-array-index-key */
import React from 'react';

import { SIDEINTERVAL, WINDOW_WIDTH } from '@/common/constants';
import CustomIcon from '@/components/CustomIcon';
import { HEADER_BACKGROUND_COLOR, BORDER_COLOR } from '@/styles/variables';

const styles = {
  container: {
    height: '45px',
    backgroundColor: HEADER_BACKGROUND_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    borderBottomStyle: 'solid',
  },
  containerShadow: {},
  absolutePosition: {
    position: 'absolute',
    top: 0, // android only for use with translucent status bar
    left: 0,
    right: 0,
    bottom: 0,
    height: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    // justifyContent: 'space-between',
  },
  headerBack: {
    paddingLeft: WINDOW_WIDTH * 0.03,
    paddingRight: SIDEINTERVAL,
    fontSize: 15,
    color: '#333',
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
    const {
      onPressBackButton,
      navigation: { goBack },
    } = this.props;
    if (onPressBackButton) {
      onPressBackButton();
    } else {
      goBack();
    }
  };

  renderHeaderLeft = () => <div />;

  renderHeaderTitle = () => {
    const stylesX = {
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 40,
        flexDirection: 'row',
      },
      title: {
        fontSize: 16,
        color: '#333',
        marginRight: 5,
      },
    };

    const { title = '' } = this.props;

    return (
      <div style={stylesX.container}>
        <span style={stylesX.title}>{title}</span>
      </div>
    );
  };

  render() {
    const {
      showBackButton,
      headerTitle,
      headerRight,
      headerLeft,
      absolutePosition,
    } = this.props;

    return (
      <div
        style={{
          ...styles.container,
          ...(absolutePosition
            ? styles.absolutePosition
            : styles.containerShadow),
        }}
      >
        <div
          style={styles.subContainer}
          onPress={() => this.handleOnPressBackButton()}
        >
          {showBackButton ? (
            <CustomIcon type="left" style={styles.headerBack} />
          ) : (
            headerLeft || this.renderHeaderLeft()
          )}
          {headerTitle || this.renderHeaderTitle()}
          {headerRight}
        </div>
      </div>
    );
  }
}
export default BYHeader;
