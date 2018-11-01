/* eslint-disable react/no-array-index-key */
import React from 'react';

import { SIDEINTERVAL } from '@/common/constants';
import CustomIcon from '@/components/CustomIcon';

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
  <div {...restProps}>
    <div style={styles.component}>
      <span style={styles.componentText}>{title}</span>
      {isMore && (
        <div style={styles.componentMore}>
          <span style={styles.componentMoreText}>{textMore}</span>
          <CustomIcon type="right" style={styles.componentMoreIcon} />
        </div>
      )}
    </div>
  </div>
);
