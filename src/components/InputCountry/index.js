import React from 'react';
import { SIDEINTERVAL, DEBUG } from '@src/common/constants';
import { View } from '@src/API';

import styles from './index.less';

export default ({
  style,
  styleWrap,
  styleInput,
  message,
  placeholder,
  getFieldProps,
  pattern,
}) => (
  <View
    style={{
      paddingLeft: SIDEINTERVAL,
      paddingRight: SIDEINTERVAL,
      ...styleWrap,
    }}
  >
    <View style={style} className={styles.component}>
      <input
        type="email"
        style={styleInput}
        className={styles.componentInput}
        {...getFieldProps('mail', {
          initialValue: DEBUG ? 'q@q.q' : '',
          rules: [
            {
              type: 'string',
              required: true,
              message,
              pattern,
            },
          ],
        })}
        placeholder={placeholder}
      />
    </View>
  </View>
);
