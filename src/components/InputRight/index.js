import React from 'react';
import { SIDEINTERVAL } from '@/common/constants';
import { BORDER_COLOR } from '@/styles/variables';

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
  componentInput: {
    flex: 1,
    marginLeft: SIDEINTERVAL,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 14,
    border: 0,
  },
};

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
  required = true,
}) => (
  <div style={{ ...styles.componentWrap, ...styleWrap }}>
    <div style={{ ...styles.component, ...style }}>
      <input
        type={type}
        value={value}
        style={{ ...styles.componentInput, ...styleInput }}
        {...getFieldProps(name, {
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
    </div>
  </div>
);
