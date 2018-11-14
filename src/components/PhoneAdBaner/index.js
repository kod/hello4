/* eslint-disable react/no-array-index-key */
import React from 'react';

import qs from 'qs';
import router from 'umi/router';

import { WINDOW_WIDTH, OSS_IMAGE_QUALITY, SCREENS } from '@/common/constants';

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

export default ({ groupon = false, data, style, ...restProps }) => (
  <div style={{ ...styles.itemWrap, ...style }} {...restProps}>
    {data.map((val, key) => (
      <div
        style={styles.touchable}
        key={key}
        backgroundColor="transparent"
        onClick={() => {
          router.push(
            `/${SCREENS.ProductDetail}?${qs.stringify({
              brandId: val.brandId,
              groupon,
            })}`,
          );

          // navigate(SCREENS.ProductDetail, { brandId: val.brandId, groupon })
        }}
      >
        <img
          alt=""
          style={{ ...styles.nav1ItemImg }}
          src={`${
            val.imageUrl
          }?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`}
        />
      </div>
    ))}
  </div>
);
