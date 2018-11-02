import React from 'react';

import { WINDOW_WIDTH, WINDOW_HEIGHT } from '@/common/constants';

const styles = {
  // wrap: {
  //   display: 'flex',
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImg: {
    width: WINDOW_WIDTH * 0.5,
    height: WINDOW_WIDTH * 0.5,
    marginBottom: WINDOW_HEIGHT * 0.04,
  },
  emptyText: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: WINDOW_HEIGHT * 0.1,
  },
};

export default ({
  style,
  styleImage,
  styleText,
  source,
  text,
  ...restProps
}) => (
  // <div style={styles.wrap}>
  <div style={{ ...styles.empty, ...style }} {...restProps}>
    <img alt="" style={{ ...styles.emptyImg, ...styleImage }} src={source} />
    <div style={{ ...styles.emptyText, ...styleText }}>{text}</div>
  </div>
  // </div>
);
