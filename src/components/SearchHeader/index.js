import React from 'react';
import { i18n, Text, View, BYTouchable } from '@src/API';

import CustomIcon from '@src/components/CustomIcon';
import { STATUSBAR_HEIGHT } from '@src/common/constants';
import styles from './index.less';

const headerRightItem = (isLogin, rightPress) => {
  if (isLogin) {
    return (
      <CustomIcon
        name="user1"
        type="user1"
        className={styles.headerIcon}
        onClick={rightPress}
      />
    );
  }
  return (
    <Text className={styles.headerLogin} onClick={rightPress}>
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
  <View
    className={styles.headerContainer}
    style={{
      height: 40 + STATUSBAR_HEIGHT,
      paddingTop: STATUSBAR_HEIGHT,
    }}
  >
    <BYTouchable className={styles.headerMiddle} onPress={middleOnPress}>
      <View className={styles.headerMiddleMain}>
        <CustomIcon
          name="search"
          type="search"
          className={styles.headerMiddleIcon}
        />
        <Text className={styles.headerMiddleText}>{text}</Text>
      </View>
    </BYTouchable>
    {headerRight ? { headerRight } : headerRightItem(isLogin, rightOnPress)}
  </View>
);
