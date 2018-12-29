import React from 'react';
// import { formatMessage } from 'umi/locale';
import router from 'umi/router';

import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  SCREENS,
  MONETARY,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import { xOssProcess } from '@src/utils';
import { BORDER_COLOR, RED_COLOR } from '@src/styles/variables';
import Loader from '@src/components/Loader';
import priceFormat from '@src/utils/priceFormat';
import stylesLess from './index.less';

const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 4) / 3;
const paddingInerval = SIDEINTERVAL / 2;

const styles = {
  itemWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: SIDEINTERVAL,
    marginBottom: 5,
  },
  item: {
    width: itemWidth,
    marginRight: SIDEINTERVAL,
    paddingTop: 4,
    backgroundColor: '#fff',
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    marginBottom: itemIntervalWidth,
  },
  itemImg: {
    width: itemWidth - 2,
    height: itemWidth - 2,
    marginBottom: 5,
  },
  itemText: {
    paddingLeft: paddingInerval,
    paddingRight: paddingInerval,
    color: '#666',
    fontSize: 11,
    marginBottom: 6,
    height: 28.8,
  },
  itemOrgPrice: {
    color: '#999',
    fontSize: 11,
    paddingLeft: paddingInerval,
    paddingRight: paddingInerval,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  itemPrice: {
    color: RED_COLOR,
    fontSize: 14,
    paddingLeft: paddingInerval,
    paddingRight: paddingInerval,
    fontWeight: '700',
    marginBottom: 10,
  },
};

class ProductItem1A extends React.Component {
  renderItem = ({ item, key }) => (
    <div
      style={styles.item}
      key={key}
      onClick={() =>
        router.push(`/${SCREENS.ProductDetail}?brandId=${item.brandId}`)
      }
    >
      <img
        alt=""
        style={styles.itemImg}
        src={`${item.imageUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
      />
      <div style={styles.itemText} className={stylesLess.itemtext}>
        {item.name}
      </div>
      {!!item.orgPrice && (
        <div style={styles.itemOrgPrice}>
          {`${priceFormat(item.orgPrice)} ${MONETARY}`}
        </div>
      )}
      <div style={styles.itemPrice}>{`${priceFormat(
        item.price,
      )} ${MONETARY}`}</div>
    </div>
  );

  render() {
    const {
      data: { items, loading, loaded },
      style,
    } = this.props;

    return (
      <div style={{ ...styles.itemWrap, ...style }}>
        {(!items || (!loaded && loading)) && <Loader />}
        {items &&
          items.map((val, key) =>
            this.renderItem({
              item: val,
              key,
            }),
          )}
      </div>
    );
  }
}

export default ProductItem1A;
