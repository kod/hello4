/* eslint-disable react/no-array-index-key */
import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

import {
  SIDEINTERVAL,
  MONETARY,
  WINDOW_WIDTH,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@src/common/constants';
import priceFormat from '@src/utils/priceFormat';
import CustomIcon from '@src/components/CustomIcon';
import { xOssProcess } from '@src/utils';
import { View } from '@src/API';

import styles from './index.less';

const couponBluePng =
  'https://oss.buyoo.vn/usercollect/1/20181109100835_r2M.png';
const couponRedPng =
  'https://oss.buyoo.vn/usercollect/1/20181109101238_V41.png';

export default ({ isCouponCenter = true, data, onClick, ...restProps }) => (
  <View
    style={{
      paddingLeft: SIDEINTERVAL,
      paddingRight: SIDEINTERVAL,
    }}
    className={styles.container}
    {...restProps}
  >
    {data.map((val, key) =>
      val.voucherType === 1 ? (
        <View
          style={{
            ...(isCouponCenter && val.status !== 1 && { opacity: 0.5 }),
          }}
          className={styles.item}
          key={key}
          onClick={() => onClick && onClick(val)}
        >
          <img
            alt=""
            style={{
              width: WINDOW_WIDTH - SIDEINTERVAL * 2,
            }}
            className={styles.image}
            src={`${couponBluePng}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
          />
          <View className={styles.bottom}>
            <View
              style={{
                paddingLeft: SIDEINTERVAL * 2,
                paddingTop: SIDEINTERVAL * 1.5,
              }}
              className={styles.left}
            >
              <View className={styles.price}>
                {`${priceFormat(val.voucherValue)} ${MONETARY}`}
              </View>
              <View className={styles.text1}>{val.voucherName}</View>
              <View className={styles.text2}>{val.voucherDesc}</View>
            </View>
            {onClick && (
              <CustomIcon
                name="right"
                type="right"
                style={{
                  paddingLeft: SIDEINTERVAL,
                  paddingRight: SIDEINTERVAL * 1.8,
                }}
                className={styles.arrow}
              />
            )}
            <View className={styles.date}>
              {`${dayjs(val.startTime).format('DD/MM/YYYY')}-${dayjs(
                val.expireTime,
              ).format('DD/MM/YYYY')}`}
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            ...styles.item,
            ...(isCouponCenter && val.status !== 1 && styles.itemDisable),
          }}
          key={key}
          onClick={() => onClick && onClick(val)}
        >
          <img
            alt=""
            className={styles.image}
            src={`${couponRedPng}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
          />
          <View className={classNames(styles.bottom, styles.bottomRed)}>
            <View className={styles.left}>
              <View className={styles.price}>{`${100 -
                val.voucherValue}% OFF`}</View>
              <View className={styles.text1}>{val.voucherName}</View>
              <View className={styles.text2}>{val.voucherDesc}</View>
            </View>
            {onClick && (
              <CustomIcon name="right" type="right" className={styles.arrow} />
            )}
            <View
              style={{
                paddingLeft: SIDEINTERVAL * 2,
              }}
              className={styles.date}
            >
              {`${dayjs(val.startTime).format('DD/MM/YYYY')}-${dayjs(
                val.expireTime,
              ).format('DD/MM/YYYY')}`}
            </View>
          </View>
        </View>
      ),
    )}
  </View>
);
