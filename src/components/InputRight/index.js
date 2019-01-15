import React from 'react';
import { SIDEINTERVAL } from '@src/common/constants';
import { View } from '@src/API';

import styles from './index.less';

export default ({
  inputRight,
  style,
  styleWrap,
  styleInput,
  message,
  placeholder,
  // InputItem,
  getFieldProps,
  type = 'text',
  name,
  pattern,
  value,
  initialValue = '',
  onChange = () => {},
  required = true,
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
        type={type}
        value={value}
        style={{ marginLeft: SIDEINTERVAL, ...styleInput }}
        className={styles.componentInput}
        {...getFieldProps(name, {
          onChange,
          initialValue,
          rules: [
            {
              type: 'string',
              required,
              message,
              pattern,
            },
          ],
        })}
        placeholder={placeholder}
      />
      {inputRight}
    </View>
  </View>
);
