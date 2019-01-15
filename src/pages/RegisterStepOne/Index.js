import React from 'react';
import { i18n, View } from '@src/API';
import router from 'umi/lib/router';
// import { WINDOW_HEIGHT } from '@src/common/constants';
import BYHeader from '@src/components/BYHeader';
import NavSidesText from '@src/components/NavSidesText';
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
    <BYHeader title={i18n.register} />
    <Form />
    <NavSidesText
      textLeft={i18n.alreadyHaveAnAccount}
      navigateLeft={() => router.go(-1)}
    />
    <View style={{ flex: 1 }} />
  </View>
);
