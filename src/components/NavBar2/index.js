import React from 'react';

import { BORDER_COLOR_FIRST } from '@src/styles/variables';
import { SIDEINTERVAL } from '@src/common/constants';
import CustomIcon from '@src/components/CustomIcon';
import { View } from '@src/API';

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
  <View style={{ ...styles.component, ...style }} {...restProps}>
    <View
      style={{
        ...styles.componentMain,
        ...(isShowBorderBottom && styles.componentBorderBottom),
      }}
    >
      {isShowLeft && (
        <View style={{ ...styles.componentLeft, ...styleLeft }}>
          {valueLeft}
        </View>
      )}
      {isShowMiddle &&
        (componentMiddle ? (
          { componentMiddle }
        ) : (
          <View style={{ ...styles.componentMiddle, ...styleMiddle }}>
            {valueMiddle}
          </View>
        ))}
      {isShowRight &&
        (componentRight || (
          <CustomIcon
            name="right"
            type="right"
            style={{ ...styles.componentRight, ...styleRight }}
          />
        ))}
    </View>
  </View>
);
