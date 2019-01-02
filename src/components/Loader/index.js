import React from 'react';
import { ActivityIndicator } from 'antd-mobile';

export default ({ text = '' }) => <ActivityIndicator toast text={text} />;
