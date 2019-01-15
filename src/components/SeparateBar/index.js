import React from 'react';
import { View } from '@src/API';

import styles from './index.less';

export default ({ style = {} }) => (
  <View style={style} className={styles.separateBar} />
);
