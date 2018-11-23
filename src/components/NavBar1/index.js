/* eslint-disable react/no-array-index-key */
import React from 'react';

import { SIDEINTERVAL, IS_IOS, OSS_IMAGE_QUALITY } from '@/common/constants';
import CustomIcon from '@/components/CustomIcon';
import { xOssProcess } from '@/utils';

const styles = {
  cellItem1Wrap: {
    backgroundColor: '#fff',
  },
  cellItem1: {
    display: 'flex',
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  cellItem1Icon: {
    marginRight: SIDEINTERVAL,
  },
  cellItem1IconImg: {
    height: 14,
    width: 14,
    marginRight: SIDEINTERVAL,
  },
  cellItem1Left: {
    flex: 1,
    fontSize: 14,
    color: '#666',

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  cellItem1Middle: {
    flex: 2,
    fontSize: 14,
    color: '#ccc',
    textAlign: 'right',
    paddingRight: 5,

    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  cellItem1Right: {
    color: '#ccc',
    fontSize: 14,
  },
};

export default ({
  list,
  style,
  styleItem,
  styleItemLeft,
  styleIconImg,
  // callback,
}) => (
  <div style={{ ...styles.cellItem1Wrap, ...style }}>
    {list.map((val, key) => (
      <div
        delayPressIn={0}
        style={{ ...styles.cellItem1, ...styleItem }}
        key={key}
        onClick={() => val.func()}
      >
        {!!val.iconName && (
          <CustomIcon style={styles.cellItem1Icon} name={val.iconName} />
        )}
        {!!val.iconImg && (
          <img
            alt=""
            style={{ ...styles.cellItem1IconImg, ...styleIconImg }}
            src={`${val.iconImg}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
          />
        )}
        <div style={{ ...styles.cellItem1Left, ...styleItemLeft }}>
          {val.name}
        </div>
        <div style={styles.cellItem1Middle}>{val.tips}</div>
        <CustomIcon type="right" style={styles.cellItem1Right} />
      </div>
    ))}
  </div>
);
