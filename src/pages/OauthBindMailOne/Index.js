import React from 'react';
import { i18n, View } from '@src/API';
import BYHeader from '@src/components/BYHeader';
import { WINDOW_HEIGHT } from '@src/common/constants';
import Form from './Form';

import styles from './index.less';

export default () => (
  <View
    style={{
      height: WINDOW_HEIGHT,
    }}
    className={styles.container}
  >
    <BYHeader title={i18n.linkEmail} />
    <Form />
    <View style={{ flex: 1 }} />
  </View>
);
