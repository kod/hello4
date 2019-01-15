import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import { WINDOW_HEIGHT } from '@src/common/constants';
import { View } from '@src/API';

import styles from './index.less';

export default () => (
  <View
    style={{
      height: WINDOW_HEIGHT,
    }}
    className={styles.component}
  >
    <ActivityIndicator size="large" />
  </View>
);
