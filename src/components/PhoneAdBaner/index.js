/* eslint-disable react/no-array-index-key */
import React from 'react';

import qs from 'qs';
import router from 'umi/lib/router';

import {
  WINDOW_WIDTH,
  SCREENS,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import { xOssProcess } from '@src/utils';
import { View } from '@src/API';

import styles from './index.less';

export default ({ data, style, ...restProps }) => (
  <View style={{ ...styles.itemWrap, ...style }} {...restProps}>
    {data.map((val, key) => (
      <View
        key={key}
        onClick={() => {
          router.push(
            `/${SCREENS.ProductDetail}?${qs.stringify({
              brandId: val.brandId,
            })}`,
          );
        }}
      >
        <img
          alt=""
          style={{ width: WINDOW_WIDTH }}
          className={styles.nav1ItemImg}
          src={`${val.imageUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
        />
      </View>
    ))}
  </View>
);
