/* eslint-disable react/no-array-index-key */
import React from 'react';

import { SIDEINTERVAL } from '@src/common/constants';
import CustomIcon from '@src/components/CustomIcon';
import { View, Text } from '@src/API';

import styles from './index.less';

export default ({ title, isMore, textMore, ...restProps }) => (
  <View {...restProps}>
    <View className={styles.component}>
      <Text className={styles.componentText}>{title}</Text>
      {isMore && (
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={styles.componentMore}
        >
          <Text className={styles.componentMoreText}>{textMore}</Text>
          <CustomIcon
            name="right"
            type="right"
            className={styles.componentMoreIcon}
          />
        </View>
      )}
    </View>
  </View>
);
