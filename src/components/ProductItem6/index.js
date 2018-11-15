/* eslint-disable react/no-array-index-key */
import React from 'react';
import { WINDOW_WIDTH, OSS_IMAGE_QUALITY } from '@/common/constants';
import ProductItem4 from '../ProductItem4';
import SeparateBar from '../SeparateBar';

const styles = {
  itemWrap: {},
  itemMain: {},
  item: {},
  itemImg: {
    width: WINDOW_WIDTH,
  },
};

export default ({ data, style, ...restProps }) => (
  <div style={{ ...styles.itemWrap, ...style }} {...restProps}>
    <div
      style={{
        ...styles.itemMain,
      }}
    >
      {data.map((val, key) => (
        <div
          style={styles.item}
          key={key}
          onClick={() => {
            // navigate(SCREENS.ProductDetail, { brandId: val.brandId, groupon });
          }}
        >
          <img
            alt=""
            style={styles.itemImg}
            src={`${
              val.top.imageUrl
            }?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`}
          />
          <ProductItem4 data={val.bottom} />
          <SeparateBar />
        </div>
      ))}
    </div>
  </div>
);
