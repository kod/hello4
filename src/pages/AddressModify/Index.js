import React from 'react';
import BYHeader from '@/components/BYHeader';
import Form from './Form';

export default ({ location: { query } }) => (
  <div>
    <BYHeader />
    <Form query={query} />
  </div>
);
