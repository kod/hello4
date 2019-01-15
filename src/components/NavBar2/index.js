import React from 'react';
import classNames from 'classnames';

import { SIDEINTERVAL } from '@src/common/constants';
import CustomIcon from '@src/components/CustomIcon';
import { View } from '@src/API';

import styles from './index.less';

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
  <View style={{ paddingLeft: SIDEINTERVAL, ...style }} {...restProps}>
    <View
      style={{
        paddingRight: SIDEINTERVAL,
        // ...(isShowBorderBottom && styles.componentBorderBottom),
      }}
      className={classNames(styles.componentMain, {
        [styles.componentBorderBottom]: isShowBorderBottom,
      })}
    >
      {isShowLeft && (
        <View style={styleLeft} className={styles.componentLeft}>
          {valueLeft}
        </View>
      )}
      {isShowMiddle &&
        (componentMiddle ? (
          { componentMiddle }
        ) : (
          <View style={styleMiddle} className={styles.componentMiddle}>
            {valueMiddle}
          </View>
        ))}
      {isShowRight &&
        (componentRight || (
          <CustomIcon
            name="right"
            type="right"
            style={styleRight}
            className={styles.componentRight}
          />
        ))}
    </View>
  </View>
);
