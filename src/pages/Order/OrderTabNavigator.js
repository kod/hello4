/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Tabs } from 'antd-mobile';
import Scrollable from './Scrollable';

export default ({ tabs, initialPage = 0 }) => (
  <Tabs
    tabs={tabs}
    initialPage={parseInt(initialPage, 10)}
    prerenderingSiblingsNumber={1}
    tabBarPosition="top"
    renderTabBar={props => (
      <Tabs.DefaultTabBar
        {...props}
        tabBarTextStyle={{ height: 50, lineHeight: 1.218, textAlign: 'center' }}
      />
    )}
  >
    {tabs.map((val, key) => (
      <Scrollable key={key} itemKey={key} status={val.status} />
    ))}
  </Tabs>
);
