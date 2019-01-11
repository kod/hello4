import React from 'react';
import { i18n, View } from '@src/API';

import { SIDEINTERVAL } from '@src/common/constants';
import { addressJoin } from '@src/utils';
import CustomIcon from '@src/components/CustomIcon';

const styles = {
  address: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  addressLeft: {
    flex: 1,
  },
  addressTips: {
    flex: 1,
    height: 40,
    lineHeight: '40px',
  },
  addressTop: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  addressName: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  addressText: {
    fontSize: 11,
    color: '#666',
  },
  addressPhone: {
    fontSize: 14,
    color: '#333',
  },
  addressRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressPin: {
    color: '#999',
    fontSize: 18,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  addressForward: {
    color: '#999',
    fontSize: 16,
  },
};

export default ({ addressSelectedItem, onPress, ...restProps }) => (
  <View style={styles.address} onPress={onPress} {...restProps}>
    {addressSelectedItem.id > 0 ? (
      <View style={styles.addressLeft}>
        <View style={styles.addressTop}>
          <View style={styles.addressName}>{addressSelectedItem.username}</View>
          <View style={styles.addressPhone}>{addressSelectedItem.msisdn}</View>
        </View>
        <View style={styles.addressText}>
          {addressJoin(addressSelectedItem)}
        </View>
      </View>
    ) : (
      <View style={styles.addressTips}>{i18n.pleaseSelectShippingAddress}</View>
    )}
    <View style={styles.addressRight}>
      <CustomIcon name="location" type="location" style={styles.addressPin} />
      {onPress && (
        <CustomIcon name="right" type="right" style={styles.addressForward} />
      )}
    </View>
  </View>
);
