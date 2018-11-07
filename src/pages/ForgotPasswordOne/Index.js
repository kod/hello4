import React from 'react';
import { formatMessage } from 'umi/locale';
import BYHeader from '@/components/BYHeader';
import Form from './Form';

export default () => (
  <div>
    <BYHeader title={formatMessage({ id: 'forgetPassword' })} />
    <Form />
  </div>
);
