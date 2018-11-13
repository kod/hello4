/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Tabs } from 'antd-mobile';
import CouponMyItem from '@/components/CouponMyItem';

export default ({ tabs }) => (
  <Tabs tabs={tabs} initialPage={0} tabBarPosition="top">
    {tabs.map((val, key) => (
      <CouponMyItem key={key} routeName={val.routeName} />
    ))}
  </Tabs>
);
