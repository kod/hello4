import React from 'react';

import { PRIMARY_COLOR } from '@src/styles/variables';
import { SIDEINTERVAL } from '@src/common/constants';
import { View } from '@src/API';

const styles = {
  componentWrap: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  component: {
    backgroundColor: PRIMARY_COLOR,
  },
  componentText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    textAlign: 'center',
    height: 50,
    color: '#fff',
    fontSize: 14,
  },
};

export default ({ data, styleWrap, style, styleText, text, ...restProps }) => (
  <View style={{ ...styles.componentWrap, ...styleWrap }}>
    <View style={{ ...styles.component, ...style }} {...restProps}>
      <View style={{ ...styles.componentText, ...styleText }}>{text}</View>
    </View>
  </View>
);
