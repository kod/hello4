import React from 'react';
import BYHeader from '@src/components/BYHeader';
import { formatMessage } from 'umi-plugin-locale';
import Form from './Form';

export default () => (
  <div>
    <BYHeader title={formatMessage({ id: 'addAddress' })} />
    <Form />
  </div>
);
