import React from 'react';
import { SIDEINTERVAL } from '@/common/constants';
import { BORDER_COLOR } from '@/styles/variables';

// const viemnamPng = 'https://oss.buyoo.vn/usercollect/1/20181105163710_k1W.png';

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
    // resizeMode: Image.resizeMode.contain,
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
  // InputItem,
  getFieldProps,
  pattern,
}) => (
  <div style={{ ...styles.componentWrap, ...styleWrap }}>
    <div style={{ ...styles.component, ...style }}>
      {/* <img alt="" style={styles.componentFlag} src={viemnamPng} />
      <div style={styles.componentCode}>+84</div> */}
      <input
        type="email"
        style={{ ...styles.componentInput, ...styleInput }}
        {...getFieldProps('mail', {
          initialValue: 'shannon.feng@buyoo.asia',
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
    </div>
  </div>
);
