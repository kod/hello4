import React from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';

import BYHeader from '@/components/BYHeader';
import Form from './Form';
import { REGISTER_NAMESPACE } from '@/common/constants';
import { REGISTER } from '@/common/constants/actionTypes';
import Loader from '@/components/Loader';

@connect(
  state => {
    const { loading } = state;
    return {
      registerLoading:
        loading.effects[`${REGISTER_NAMESPACE}/${REGISTER.REQUEST}`],
    };
  },
  {},
)
class Index extends React.Component {
  render() {
    const {
      registerLoading,
      location: { query = {} },
    } = this.props;
    return (
      <div>
        <BYHeader title={formatMessage({ id: 'register' })} />
        {registerLoading && <Loader />}
        <Form query={query} />
      </div>
    );
  }
}

export default Index;
