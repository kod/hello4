import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  formatMessage,
  getLocale,
  // setLocale,
} from 'umi/locale';

// import { GET_ADVERST_TOP_INFO } from '@/common/constants/actionTypes';
// import { GETADVERSTTOPINFO_NAMESPACE } from '@/common/constants';
import SwiperFlatList from '@/components/SwiperFlatList';
import SearchHeader from '@/components/SearchHeader';
import * as getAdverstTopInfoActionCreators from '@/common/actions/getAdverstTopInfo';
import { addEventListener } from '@/utils';

// global.Intl = require('intl');
// window.Intl = require('intl');

@connect(
  state => {
    const { getAdverstTopInfo } = state;
    console.log(state);
    console.log(getAdverstTopInfo);
    console.log(getAdverstTopInfo.items);
    // const {

    // } = props;

    return {
      getAdverstTopInfoItems: getAdverstTopInfo.items,
    };
  },
  {
    ...getAdverstTopInfoActionCreators,
  },
)
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // data: ['1', '2', '3'],
      // imgHeight: 176,
    };
  }

  componentDidMount() {
    const { getAdverstTopInfoFetch } = this.props;
    getAdverstTopInfoFetch();
    // setLocale('zh-CN');
    console.log(getLocale());
    addEventListener('tcy', ret => {
      console.log('=============');
      console.log(ret);
    });
  }

  render() {
    // const { imgHeight } = this.state;
    const { getAdverstTopInfoItems } = this.props;
    return (
      <div>
        <SearchHeader text={formatMessage({ id: 'search' })} />
        <SwiperFlatList data={getAdverstTopInfoItems} />
      </div>
    );
  }
}

export default Index;
