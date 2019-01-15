/* eslint-disable react/no-array-index-key */
import React from 'react';

import { SIDEINTERVAL, IS_IOS, OSS_IMAGE_QUALITY } from '@src/common/constants';
import CustomIcon from '@src/components/CustomIcon';
import { xOssProcess } from '@src/utils';
import { View } from '@src/API';

import styles from './index.less';

export default ({
  list,
  style,
  styleItem,
  styleItemLeft,
  styleIconImg,
  // callback,
}) => (
  <View style={style} className={styles.cellItem1Wrap}>
    {list.map((val, key) => (
      <View
        style={{
          paddingLeft: SIDEINTERVAL,
          paddingRight: SIDEINTERVAL,
          ...styleItem,
        }}
        className={styles.cellItem1}
        key={key}
        onClick={() => val.func()}
      >
        {!!val.iconName && (
          <CustomIcon
            name={val.iconName}
            type={val.iconName}
            style={{
              marginRight: SIDEINTERVAL,
            }}
          />
        )}
        {!!val.iconImg && (
          <img
            alt=""
            style={{ marginRight: SIDEINTERVAL, ...styleIconImg }}
            className={styles.cellItem1IconImg}
            src={`${val.iconImg}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
          />
        )}
        <View style={styleItemLeft} className={styles.cellItem1Left}>
          {val.name}
        </View>
        <View className={styles.cellItem1Middle}>{val.tips}</View>
        <CustomIcon
          name="right"
          type="right"
          className={styles.cellItem1Right}
        />
      </View>
    ))}
  </View>
);
