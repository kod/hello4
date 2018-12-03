import React from 'react';

import { PRIMARY_COLOR } from '@/styles/variables';
import { SIDEINTERVAL } from '@/common/constants';

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
  <div style={{ ...styles.componentWrap, ...styleWrap }}>
    <div style={{ ...styles.component, ...style }} {...restProps}>
      <div style={{ ...styles.componentText, ...styleText }}>{text}</div>
    </div>
  </div>
);
