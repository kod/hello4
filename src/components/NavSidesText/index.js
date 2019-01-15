import React from 'react';

import { SIDEINTERVAL } from '@src/common/constants';
import { View } from '@src/API';

import styles from './index.less';

export default ({
  style,
  textLeft,
  textRight,
  navigateLeft,
  navigateRight,
  ...restProps
}) => (
  <View
    style={{
      paddingLeft: SIDEINTERVAL,
      paddingRight: SIDEINTERVAL,
    }}
    className={styles.component}
    {...restProps}
  >
    <View
      style={{
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      }}
      onClick={navigateLeft}
    >
      <View className={styles.componentText}>{textLeft}</View>
    </View>
    <View
      style={{
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      }}
      onClick={navigateRight}
    >
      <View className={styles.componentText}>{textRight}</View>
    </View>
  </View>
);
