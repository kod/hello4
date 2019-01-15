import React from 'react';
// import { i18n, View } from '@src/API';
import router from 'umi/lib/router';

import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  SCREENS,
  MONETARY,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import { xOssProcess } from '@src/utils';
import Loader from '@src/components/Loader';
import priceFormat from '@src/utils/priceFormat';
import { View } from '@src/API';
import styles from './index.less';

const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 4) / 3;
const paddingInerval = SIDEINTERVAL / 2;

class ProductItem1A extends React.Component {
  renderItem = ({ item, key }) => (
    <View
      style={{
        width: itemWidth,
        marginRight: SIDEINTERVAL,
        marginBottom: itemIntervalWidth,
      }}
      className={styles.item}
      key={key}
      onClick={() =>
        router.push(`/${SCREENS.ProductDetail}?brandId=${item.brandId}`)
      }
    >
      <img
        alt=""
        style={{
          width: itemWidth - 2,
          height: itemWidth - 2,
        }}
        className={styles.itemImg}
        src={`${item.imageUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
      />
      <View
        style={{
          paddingLeft: paddingInerval,
          paddingRight: paddingInerval,
        }}
        className={styles.itemtext}
      >
        {item.name}
      </View>
      {!!item.orgPrice && (
        <View
          style={{
            paddingLeft: paddingInerval,
            paddingRight: paddingInerval,
          }}
          className={styles.itemOrgPrice}
        >
          {`${priceFormat(item.orgPrice)} ${MONETARY}`}
        </View>
      )}
      <View
        style={{
          paddingLeft: paddingInerval,
          paddingRight: paddingInerval,
        }}
        className={styles.itemPrice}
      >{`${priceFormat(item.price)} ${MONETARY}`}</View>
    </View>
  );

  render() {
    const {
      data: { items, loading, loaded },
      style,
    } = this.props;

    return (
      <View
        style={{ paddingLeft: SIDEINTERVAL, ...style }}
        className={styles.itemWrap}
      >
        {(!items || (!loaded && loading)) && <Loader />}
        {items &&
          items.map((val, key) =>
            this.renderItem({
              item: val,
              key,
            }),
          )}
      </View>
    );
  }
}

export default ProductItem1A;
