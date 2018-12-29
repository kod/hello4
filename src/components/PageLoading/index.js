import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import { WINDOW_HEIGHT } from '@src/common/constants';

export default () => (
  <div
    style={{
      height: WINDOW_HEIGHT,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ActivityIndicator size="large" />
  </div>
);
