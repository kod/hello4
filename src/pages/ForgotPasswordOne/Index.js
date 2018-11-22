import React from 'react';
import { formatMessage } from 'umi/locale';
import BYHeader from '@/components/BYHeader';
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
    <BYHeader title={formatMessage({ id: 'forgetPassword' })} />
    <Form />
  </div>
);
