import React from 'react';

const styles = {
  separateBar: {
    backgroundColor: '#f5f5f5',
    height: 10,
  },
};

export default ({ style = {} }) => (
  <div
    style={{
      ...styles.separateBar,
      ...style,
    }}
  />
);
