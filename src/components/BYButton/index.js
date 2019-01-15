import React from 'react';

import { SIDEINTERVAL } from '@src/common/constants';
import { View } from '@src/API';
import styles from './index.less';

export default ({ data, styleWrap, style, styleText, text, ...restProps }) => (
  <View
    style={{
      paddingLeft: SIDEINTERVAL,
      paddingRight: SIDEINTERVAL,
      ...styleWrap,
    }}
  >
    <View style={style} className={styles.component} {...restProps}>
      <View style={styleText} className={styles.componentText}>
        {text}
      </View>
    </View>
  </View>
);
