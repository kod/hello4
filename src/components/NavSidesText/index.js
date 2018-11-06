import React from 'react';

import { SIDEINTERVAL } from '@/common/constants';

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
  <div style={styles.component} {...restProps}>
    <div style={styles.touchable} onClick={navigateLeft}>
      <div style={styles.componentText}>{textLeft}</div>
    </div>
    <div style={styles.touchable} onClick={navigateRight}>
      <div style={styles.componentText}>{textRight}</div>
    </div>
  </div>
);
