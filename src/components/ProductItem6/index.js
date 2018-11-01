/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  MONETARY,
  OSS_IMAGE_QUALITY,
  WINDOW_HEIGHT,
} from '@/common/constants';
import { RED_COLOR } from '@/styles/variables';
import priceFormat from '@/utils/priceFormat';
import ProductItem4 from '../ProductItem4';
import SeparateBar from '../SeparateBar';

const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = parseInt(
  (WINDOW_WIDTH - itemIntervalWidth * 4) / 3 - WINDOW_WIDTH * 0.03,
  10,
);

const styles = {
  itemWrap: {
    // overflowX: 'auto',
    // height: 'auto',
    // paddingLeft: SIDEINTERVAL,
    // marginBottom: 5,
  },
  itemMain: {
    // width: WINDOW_WIDTH,
  },
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
          onPress={() => {
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
