import React from 'react';
import BYHeader from '@/components/BYHeader';
import { formatMessage } from 'umi/locale';
import Form from './Form';

export default () => (
  <div>
    <BYHeader title={formatMessage({ id: 'addAddress' })} />
    <Form />
  </div>
);
