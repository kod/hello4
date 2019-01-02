/* eslint-disable react/no-array-index-key */
import React from 'react';

import qs from 'qs';
import router from 'umi/router';

import {
  WINDOW_WIDTH,
  SCREENS,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import { xOssProcess } from '@src/utils';

const styles = {
  nav1: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
  },
  nav1Item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: WINDOW_WIDTH / 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  nav1ItemImg: {
    width: WINDOW_WIDTH,
    marginBottom: 10,
  },
  nav1ItemText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
};

export default ({ data, style, ...restProps }) => (
  <div style={{ ...styles.itemWrap, ...style }} {...restProps}>
    {data.map((val, key) => (
      <div
        style={styles.touchable}
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
          style={{ ...styles.nav1ItemImg }}
          src={`${val.imageUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
        />
      </div>
    ))}
  </div>
);
