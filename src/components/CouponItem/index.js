/* eslint-disable react/no-array-index-key */
import React from 'react';
import moment from 'moment';

import { PRIMARY_COLOR } from '@/styles/variables';
import { SIDEINTERVAL, MONETARY } from '@/common/constants';
import priceFormat from '@/utils/priceFormat';
import CustomIcon from '@/components/CustomIcon';

const couponBluePng =
  'https://oss.buyoo.vn/usercollect/1/20181109100835_r2M.png';
const couponRedPng =
  'https://oss.buyoo.vn/usercollect/1/20181109101238_V41.png';

const styles = {
  componentWrap: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  component: {
    backgroundColor: PRIMARY_COLOR,
  },
  componentText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    textAlign: 'center',
    height: 50,
    color: '#fff',
    fontSize: 14,
  },
};

export default ({
  isCouponCenter = true,
  data,
  onPress,
  // onPress,
  ...restProps
}) => (
  <div style={styles.container} {...restProps}>
    {data.map(
      (val, key) =>
        val.voucherType === 1 ? (
          <div
            style={{
              ...styles.item,
              ...(isCouponCenter && val.status !== 1 && styles.itemDisable),
            }}
            key={key}
            onPress={() => onPress && onPress(val)}
            backgroundColor="transparent"
          >
            <img alt="" style={styles.image} src={couponBluePng} />
            <div style={styles.bottom}>
              <div style={styles.left}>
                <div style={styles.price}>
                  {`${priceFormat(val.voucherValue)} ${MONETARY}`}
                </div>
                <div style={styles.text1}>{val.voucherName}</div>
                <div style={styles.text2}>{val.voucherDesc}</div>
              </div>
              {onPress && <CustomIcon type="right" style={styles.arrow} />}
              <div style={styles.date}>
                {`${moment(val.startTime).format('DD/MM/YYYY')}-${moment(
                  val.expireTime,
                ).format('DD/MM/YYYY')}`}
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              ...styles.item,
              ...(isCouponCenter && val.status !== 1 && styles.itemDisable),
            }}
            key={key}
            onPress={() => onPress && onPress(val)}
            backgroundColor="transparent"
          >
            <img alt="" style={styles.image} src={couponRedPng} />
            <div style={{ ...styles.bottom, ...styles.bottomRed }}>
              <div style={styles.left}>
                <div style={styles.price}>
                  {`${100 - val.voucherValue}% OFF`}
                </div>
                <div style={styles.text1}>{val.voucherName}</div>
                <div style={styles.text2}>{val.voucherDesc}</div>
              </div>
              {onPress && <CustomIcon type="right" style={styles.arrow} />}
              <div style={styles.date}>
                {`${moment(val.startTime).format('DD/MM/YYYY')}-${moment(
                  val.expireTime,
                ).format('DD/MM/YYYY')}`}
              </div>
            </div>
          </div>
        ),
    )}
  </div>
);
