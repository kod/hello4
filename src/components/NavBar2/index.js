import React from 'react';

import { BORDER_COLOR_FIRST } from '@/styles/variables';
import { SIDEINTERVAL } from '@/common/constants';
import CustomIcon from '../CustomIcon';

const styles = {
  component: {
    paddingLeft: SIDEINTERVAL,
  },
  componentMain: {
    display: 'flex',
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    paddingRight: SIDEINTERVAL,
  },
  componentBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR_FIRST,
  },
  componentLeft: {
    fontSize: 14,
    color: '#666',
  },
  componentMiddle: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
    paddingRight: 5,

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  componentRight: {
    color: '#666',
    fontSize: 16,
  },
};

export default ({
  style,
  styleLeft,
  styleMiddle,
  styleRight,
  valueLeft,
  valueMiddle,
  componentMiddle,
  componentRight,
  isShowLeft = true,
  isShowMiddle = true,
  isShowRight = true,
  isShowBorderBottom = false,
  ...restProps
}) => (
  <div style={{ ...styles.component, ...style }} {...restProps}>
    <div
      style={{
        ...styles.componentMain,
        ...(isShowBorderBottom && styles.componentBorderBottom),
      }}
    >
      {isShowLeft && (
        <div style={{ ...styles.componentLeft, ...styleLeft }}>{valueLeft}</div>
      )}
      {isShowMiddle &&
        (componentMiddle ? (
          { componentMiddle }
        ) : (
          <div style={{ ...styles.componentMiddle, ...styleMiddle }}>
            {valueMiddle}
          </div>
        ))}
      {isShowRight &&
        (componentRight || (
          <CustomIcon
            type="right"
            style={{ ...styles.componentRight, ...styleRight }}
          />
        ))}
    </div>
  </div>
);
