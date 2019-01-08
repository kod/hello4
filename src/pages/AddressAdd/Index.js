import React from 'react';
import BYHeader from '@src/components/BYHeader';
import { i18n } from '@src/API';
import Form from './Form';

export default () => (
  <div>
    <BYHeader title={i18n.addAddress} />
    <Form />
  </div>
);
