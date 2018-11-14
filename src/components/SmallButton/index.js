import React from 'react';
import { WINDOW_WIDTH } from '@/common/constants';

const styles = {
  component: {
    display: 'flex',
    height: 25,
    minWidth: WINDOW_WIDTH * 0.1,
    paddingLeft: WINDOW_WIDTH * 0.03,
    paddingRight: WINDOW_WIDTH * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0076F7',
    marginRight: 1,
  },
  componentText: {
    color: '#0076F7',
    fontSize: 11,
  },
};

export default ({ text, onPress = () => {}, ...restProps }) => (
  <div style={styles.component} onPress={() => onPress()} {...restProps}>
    <div style={styles.componentText}>{text}</div>
  </div>
);
