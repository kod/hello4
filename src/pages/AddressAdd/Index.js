import React from 'react';
import BYHeader from '@src/components/BYHeader';
import { i18n, View } from '@src/API';
import Form from './Form';

export default () => (
  <View>
    <BYHeader title={i18n.addAddress} />
    <Form />
  </View>
);
