import React from 'react';

import { WINDOW_WIDTH, IS_IOS, OSS_IMAGE_QUALITY } from '@src/common/constants';
import { xOssProcess } from '@src/utils';
import { View } from '@src/API';

import styles from './index.less';

export default ({
  data,
  style,
  onClick,
  navigation,
  authUser,
  ...restProps
}) => (
  <View style={style} className={styles.nav1} {...restProps}>
    {data.map(val => (
      <View
        style={{
          ...val.styleItem,
          width:
            WINDOW_WIDTH / (data.length > 5 ? data.length * 0.5 : data.length),
        }}
        className={styles.nav1Item}
        key={val.id}
        onClick={() => {
          onClick({ linkUrl: val.linkUrl, navigation, authUser });
        }}
      >
        <img
          alt=""
          style={val.styleImg}
          className={styles.nav1ItemImg}
          src={`${val.iconUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
        />
        <View style={val.styleText} className={styles.nav1ItemText}>
          {val.name}
        </View>
      </View>
    ))}
  </View>
);
