import React from 'react';
import { i18n, Text, View } from '@src/API';

import { HEADER_BACKGROUND_COLOR, BORDER_COLOR } from '@src/styles/variables';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from '@src/common/constants';
import CustomIcon from '@src/components/CustomIcon';

const STATUSBAR_HEIGHT = 0;

const styles = {
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40 + STATUSBAR_HEIGHT,
    backgroundColor: HEADER_BACKGROUND_COLOR,
    paddingTop: STATUSBAR_HEIGHT,
    paddingLeft: SIDEINTERVAL,
  },
  headerMiddle: {
    flex: 8,
  },
  headerMiddleMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: WINDOW_WIDTH * 0.03,
    height: 30,
    backgroundColor: BORDER_COLOR,
    borderRadius: 1,
  },
  headerMiddleIcon: {
    fontSize: 12,
    color: '#ccc',
    marginRight: WINDOW_WIDTH * 0.02,
  },
  headerMiddleText: {
    fontSize: 13,
    color: '#ccc',
  },
  headerIcon: {
    height: 40,
    lineHeight: '40px',
    paddingLeft: WINDOW_HEIGHT * 0.02,
    paddingRight: WINDOW_HEIGHT * 0.02,
    color: '#999',
    fontSize: 20,
  },
  headerLogin: {
    height: 40,
    lineHeight: '40px',
    paddingLeft: WINDOW_HEIGHT * 0.02,
    paddingRight: WINDOW_HEIGHT * 0.02,
    color: '#999',
    fontSize: 14,
  },
};

const headerRightItem = (isLogin, rightPress) => {
  if (isLogin) {
    return (
      <CustomIcon type="user1" style={styles.headerIcon} onClick={rightPress} />
    );
  }
  return (
    <Text style={styles.headerLogin} onClick={rightPress}>
      {i18n.login}
    </Text>
  );
};

export default ({
  text,
  headerRight,
  isLogin = false,
  middleOnPress = () => {},
  rightOnPress = () => {},
}) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerMiddle} onClick={middleOnPress}>
      <View style={styles.headerMiddleMain}>
        <CustomIcon type="search" style={styles.headerMiddleIcon} />
        <View style={styles.headerMiddleText}>{text}</View>
      </View>
    </View>
    {headerRight ? { headerRight } : headerRightItem(isLogin, rightOnPress)}
  </View>
);
