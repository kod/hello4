import React from 'react';
import { View } from '@src/API';

const styles = {
  separateBar: {
    backgroundColor: '#f5f5f5',
    height: 10,
  },
};

export default ({ style = {} }) => (
  <View
    style={{
      ...styles.separateBar,
      ...style,
    }}
  />
);
