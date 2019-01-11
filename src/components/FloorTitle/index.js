/* eslint-disable react/no-array-index-key */
import React from 'react';

import { SIDEINTERVAL } from '@src/common/constants';
import CustomIcon from '@src/components/CustomIcon';
import { View, Text } from '@src/API';

const styles = {
  component: {
    display: 'flex',
    position: 'relative',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  componentText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  componentMore: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  componentMoreText: {
    fontSize: 11,
    color: '#ccc',
    marginRight: 2,
  },
  componentMoreIcon: {
    fontSize: 8,
    color: '#ccc',
    paddingTop: 2,
  },
};

export default ({ title, isMore, textMore, ...restProps }) => (
  <View {...restProps}>
    <View style={styles.component}>
      <Text style={styles.componentText}>{title}</Text>
      {isMore && (
        <View style={styles.componentMore}>
          <Text style={styles.componentMoreText}>{textMore}</Text>
          <CustomIcon
            name="right"
            type="right"
            style={styles.componentMoreIcon}
          />
        </View>
      )}
    </View>
  </View>
);
