import React from 'react';
import { WINDOW_WIDTH } from '@src/common/constants';
import { View } from '@src/API';

import styles from './index.less';

export default ({ text, onPress = () => {}, ...restProps }) => (
  <View
    style={{
      minWidth: WINDOW_WIDTH * 0.1,
      paddingLeft: WINDOW_WIDTH * 0.03,
      paddingRight: WINDOW_WIDTH * 0.03,
    }}
    className={styles.component}
    onPress={() => onPress()}
    {...restProps}
  >
    <View className={styles.componentText}>{text}</View>
  </View>
);
