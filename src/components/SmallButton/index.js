import React from 'react';
import { WINDOW_WIDTH } from '@src/common/constants';
import { View } from '@src/API';

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
  <View style={styles.component} onPress={() => onPress()} {...restProps}>
    <View style={styles.componentText}>{text}</View>
  </View>
);
