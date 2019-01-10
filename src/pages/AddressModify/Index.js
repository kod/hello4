import React from 'react';
import BYHeader from '@src/components/BYHeader';
import { View } from '@src/API';
import Form from './Form';

export default ({ location: { query } }) => (
  <View>
    <BYHeader />
    <Form query={query} />
  </View>
);
