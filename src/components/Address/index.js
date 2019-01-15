import React from 'react';
import { i18n, View } from '@src/API';

import { SIDEINTERVAL } from '@src/common/constants';
import { addressJoin } from '@src/utils';
import CustomIcon from '@src/components/CustomIcon';

import styles from './index.less';

export default ({ addressSelectedItem, onPress, ...restProps }) => (
  <View
    className={styles.address}
    style={{
      paddingLeft: SIDEINTERVAL,
      paddingRight: SIDEINTERVAL,
    }}
    onPress={onPress}
    {...restProps}
  >
    {addressSelectedItem.id > 0 ? (
      <View className={styles.addressLeft}>
        <View className={styles.addressTop}>
          <View className={styles.addressName}>
            {addressSelectedItem.username}
          </View>
          <View className={styles.addressPhone}>
            {addressSelectedItem.msisdn}
          </View>
        </View>
        <View className={styles.addressText}>
          {addressJoin(addressSelectedItem)}
        </View>
      </View>
    ) : (
      <View className={styles.addressTips}>
        {i18n.pleaseSelectShippingAddress}
      </View>
    )}
    <View className={styles.addressRight}>
      <CustomIcon
        name="location"
        type="location"
        className={styles.addressPin}
        style={{
          paddingLeft: SIDEINTERVAL,
          paddingRight: SIDEINTERVAL,
        }}
      />
      {onPress && (
        <CustomIcon
          name="right"
          type="right"
          className={styles.addressForward}
        />
      )}
    </View>
  </View>
);
