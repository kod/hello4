import React from 'react';

import { SIDEINTERVAL } from '@src/common/constants';
import { View } from '@src/API';

const styles = {
  component: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  componentText: {
    fontSize: 11,
    color: '#0076F7',
    borderBottomColor: '#0076F7',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },
  touchable: {
    paddingTop: SIDEINTERVAL,
    paddingBottom: SIDEINTERVAL,
  },
};

export default ({
  style,
  textLeft,
  textRight,
  navigateLeft,
  navigateRight,
  ...restProps
}) => (
  <View style={styles.component} {...restProps}>
    <View style={styles.touchable} onClick={navigateLeft}>
      <View style={styles.componentText}>{textLeft}</View>
    </View>
    <View style={styles.touchable} onClick={navigateRight}>
      <View style={styles.componentText}>{textRight}</View>
    </View>
  </View>
);
