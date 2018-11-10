import React from 'react';
import { formatMessage } from 'umi/locale';

import { SIDEINTERVAL } from '@/common/constants';
import { addressJoin } from '@/utils';
import CustomIcon from '../CustomIcon';

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

export default ({ addressSelectedItem, onPress, i18n, ...restProps }) => (
  <div style={styles.address} onPress={onPress} {...restProps}>
    {addressSelectedItem.id > 0 ? (
      <div style={styles.addressLeft}>
        <div style={styles.addressTop}>
          <div style={styles.addressName}>{addressSelectedItem.username}</div>
          <div style={styles.addressPhone}>{addressSelectedItem.msisdn}</div>
        </div>
        <div style={styles.addressText}>{addressJoin(addressSelectedItem)}</div>
      </div>
    ) : (
      <div style={styles.addressTips}>
        {formatMessage({ id: 'pleaseSelectShippingAddress' })}
      </div>
    )}
    <div style={styles.addressRight}>
      <CustomIcon type="location" style={styles.addressPin} />
      {onPress && <CustomIcon type="right" style={styles.addressForward} />}
    </div>
  </div>
);
