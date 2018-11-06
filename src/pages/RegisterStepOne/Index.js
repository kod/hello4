import React from 'react';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
// import { WINDOW_HEIGHT } from '@/common/constants';
import BYHeader from '@/components/BYHeader';
import NavSidesText from '@/components/NavSidesText';
import Form from './Form';

class Index extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tabBarIndex: 0,
  //     hidden: false,
  //   };
  // }

  cc() {
    console.log(this);
  }

  render() {
    return (
      <div>
        <BYHeader title={formatMessage({ id: 'register' })} />
        <Form />
        <NavSidesText
          textLeft={formatMessage({ id: 'alreadyHaveAnAccount' })}
          navigateLeft={() => router.go(-1)}
        />
        <div style={{ flex: 1 }} />
      </div>
    );
  }
}

export default Index;
