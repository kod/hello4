import React from 'react';
import { i18n } from '@src/API';
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
    <BYHeader title={i18n.linkEmail} />
    <Form />
    <div style={{ flex: 1 }} />
  </div>
);
