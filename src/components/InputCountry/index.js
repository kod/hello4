import React from 'react';
import { SIDEINTERVAL, DEBUG } from '@src/common/constants';
import { BORDER_COLOR } from '@src/styles/variables';
import { View } from '@src/API';

const styles = {
  componentWrap: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  component: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: BORDER_COLOR,
    borderBottomStyle: 'solid',
    borderBottomWidth: 5,
  },
  componentFlag: {
    width: 18,
    marginLeft: SIDEINTERVAL,
  },
  componentCode: {
    marginLeft: 5,
    color: '#ccc',
    paddingRight: 5,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  componentInput: {
    flex: 1,
    marginLeft: 15,
    paddingTop: 15,
    paddingBottom: 10,
    border: 0,
  },
};

export default ({
  style,
  styleWrap,
  styleInput,
  message,
  placeholder,
  getFieldProps,
  pattern,
}) => (
  <View style={{ ...styles.componentWrap, ...styleWrap }}>
    <View style={{ ...styles.component, ...style }}>
      <input
        type="email"
        style={{ ...styles.componentInput, ...styleInput }}
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
