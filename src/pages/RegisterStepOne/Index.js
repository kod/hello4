import React from 'react';
import { i18n } from '@src/API';
import router from 'umi/lib/router';
// import { WINDOW_HEIGHT } from '@src/common/constants';
import BYHeader from '@src/components/BYHeader';
import NavSidesText from '@src/components/NavSidesText';
import { WINDOW_HEIGHT } from '@src/common/constants';
import Form from './Form';

const styles = {
  container: {
    height: WINDOW_HEIGHT,
    backgroundColor: '#fff',
  },
};

export default () => (
  <div style={styles.container}>
    <BYHeader title={i18n.register} />
    <Form />
    <NavSidesText
      textLeft={i18n.alreadyHaveAnAccount}
      navigateLeft={() => router.go(-1)}
    />
    <div style={{ flex: 1 }} />
  </div>
);
