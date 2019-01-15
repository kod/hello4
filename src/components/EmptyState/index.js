import React from 'react';

import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import { xOssProcess } from '@src/utils';
import { View } from '@src/API';

import styles from './index.less';

export default ({
  style,
  styleImage,
  styleText,
  source,
  text,
  ...restProps
}) => (
  <View style={style} className={styles.empty} {...restProps}>
    <img
      alt=""
      style={{
        ...styleImage,
        width: WINDOW_WIDTH * 0.5,
        height: WINDOW_WIDTH * 0.5,
        marginBottom: WINDOW_HEIGHT * 0.04,
      }}
      src={`${source}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
    />
    <View
      style={{ ...styleText, marginBottom: WINDOW_HEIGHT * 0.1 }}
      className={styles.emptyText}
    >
      {text}
    </View>
  </View>
);
