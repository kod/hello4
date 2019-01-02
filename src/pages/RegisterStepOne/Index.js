import React from 'react';
import { formatMessage } from 'umi-plugin-locale';
import router from 'umi/router';
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
    <BYHeader title={formatMessage({ id: 'register' })} />
    <Form />
    <NavSidesText
      textLeft={formatMessage({ id: 'alreadyHaveAnAccount' })}
      navigateLeft={() => router.go(-1)}
    />
    <div style={{ flex: 1 }} />
  </div>
);
