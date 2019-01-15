import React from 'react';
// import { i18n, View } from '@src/API';
import BYHeader from '@src/components/BYHeader';
import { WINDOW_HEIGHT } from '@src/common/constants';
import { View } from '@src/API';
import Form from './Form';

import styles from './index.less';

export default ({ location: { query = {} } }) => (
  <View
    style={{
      height: WINDOW_HEIGHT,
    }}
    className={styles.container}
  >
    <BYHeader title={query.title} />
    <Form title={query.title} />
  </View>
);
