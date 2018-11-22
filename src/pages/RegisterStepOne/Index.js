import React from 'react';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
// import { WINDOW_HEIGHT } from '@/common/constants';
import BYHeader from '@/components/BYHeader';
import NavSidesText from '@/components/NavSidesText';
import Form from './Form';
import { WINDOW_HEIGHT } from '@/common/constants';

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
