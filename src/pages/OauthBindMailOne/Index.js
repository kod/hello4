import React from 'react';
import { formatMessage } from 'umi-plugin-locale';
import BYHeader from '@src/components/BYHeader';
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
    <BYHeader title={formatMessage({ id: 'linkEmail' })} />
    <Form />
    <div style={{ flex: 1 }} />
  </div>
);
