/* eslint-disable react/no-array-index-key */
import React from 'react';
import moment from 'moment';

import { PRIMARY_COLOR, RED_COLOR } from '@/styles/variables';
import { SIDEINTERVAL, MONETARY, WINDOW_WIDTH } from '@/common/constants';
import priceFormat from '@/utils/priceFormat';
import CustomIcon from '@/components/CustomIcon';

const couponBluePng =
  'https://oss.buyoo.vn/usercollect/1/20181109100835_r2M.png';
const couponRedPng =
  'https://oss.buyoo.vn/usercollect/1/20181109101238_V41.png';

const styles = {
  container: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: 15,
  },
  item: {
    marginBottom: 30,
  },
  itemDisable: {
    opacity: 0.5,
  },
  image: {
    display: 'flex',
    height: 5,
    width: WINDOW_WIDTH - SIDEINTERVAL * 2,
    resizeMode: 'cover',
  },
  bottom: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: PRIMARY_COLOR,
  },
  bottomRed: {
    backgroundColor: RED_COLOR,
  },
  bottomGrey: {
    backgroundColor: '#7b7b7b',
  },
  date: {
    position: 'absolute',
    zIndex: 555,
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    lineHeight: '30px',
    color: '#fff',
    fontSize: 11,
    paddingLeft: SIDEINTERVAL * 2,
    backgroundColor: 'rgba(66, 66, 66, 0.5)',
  },
  left: {
    flex: 1,
    height: 160,
    paddingLeft: SIDEINTERVAL * 2,
    paddingTop: SIDEINTERVAL * 1.5,
  },
  price: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 1,
  },
  text1: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  text2: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  arrow: {
    height: 160,
    lineHeight: '160px',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL * 1.8,
    color: '#fff',
    fontSize: 16,
  },
};

export default ({ isCouponCenter = true, data, onClick, ...restProps }) => (
  <div style={styles.container} {...restProps}>
    {data.map((val, key) =>
      val.voucherType === 1 ? (
        <div
          style={{
            ...styles.item,
            ...(isCouponCenter && val.status !== 1 && styles.itemDisable),
          }}
          key={key}
          onClick={() => onClick && onClick(val)}
        >
          <img
            alt=""
            style={styles.image}
            src={`${couponBluePng}?x-oss-process=image/format,webp`}
          />
          <div style={styles.bottom}>
            <div style={styles.left}>
              <div style={styles.price}>
                {`${priceFormat(val.voucherValue)} ${MONETARY}`}
              </div>
              <div style={styles.text1}>{val.voucherName}</div>
              <div style={styles.text2}>{val.voucherDesc}</div>
            </div>
            {onClick && <CustomIcon type="right" style={styles.arrow} />}
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
          onClick={() => onClick && onClick(val)}
        >
          <img
            alt=""
            style={styles.image}
            src={`${couponRedPng}?x-oss-process=image/format,webp`}
          />
          <div style={{ ...styles.bottom, ...styles.bottomRed }}>
            <div style={styles.left}>
              <div style={styles.price}>{`${100 - val.voucherValue}% OFF`}</div>
              <div style={styles.text1}>{val.voucherName}</div>
              <div style={styles.text2}>{val.voucherDesc}</div>
            </div>
            {onClick && <CustomIcon type="right" style={styles.arrow} />}
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
