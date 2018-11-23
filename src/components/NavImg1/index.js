import React from 'react';

import { WINDOW_WIDTH, IS_IOS, OSS_IMAGE_QUALITY } from '@/common/constants';
import { xOssProcess } from '@/utils';

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
    height: 30,
    width: 30,
    marginBottom: 5,
  },
  nav1ItemText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
};

export default ({
  data,
  style,
  onClick,
  navigation,
  isAuthUser,
  ...restProps
}) => (
  <div
    style={{
      ...styles.nav1,
      ...style,
    }}
    {...restProps}
  >
    {data.map(val => (
      <div
        style={{
          ...styles.nav1Item,
          ...val.styleItem,
          ...{
            width:
              WINDOW_WIDTH /
              (data.length > 5 ? data.length * 0.5 : data.length),
          },
        }}
        key={val.id}
        onClick={() => {
          onClick({ linkUrl: val.linkUrl, navigation, isAuthUser });
        }}
      >
        <img
          alt=""
          style={{ ...styles.nav1ItemImg, ...val.styleImg }}
          src={`${val.iconUrl}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
        />
        <div style={{ ...styles.nav1ItemText, ...val.styleText }}>
          {val.name}
        </div>
      </div>
    ))}
  </div>
);
