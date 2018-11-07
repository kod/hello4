import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, getLocale } from 'umi/locale';
import router from 'umi/router';

import SwiperFlatList from '@/components/SwiperFlatList';
import SearchHeader from '@/components/SearchHeader';
import * as getAdverstTopInfoActionCreators from '@/common/actions/getAdverstTopInfo';
import * as getSquaresInfoActionCreators from '@/common/actions/getSquaresInfo';
import * as getNewestInfoActionCreators from '@/common/actions/getNewestInfo';
import * as bannerSwiperActionCreators from '@/common/actions/bannerSwiper';
import * as adverstInfoActionCreators from '@/common/actions/adverstInfo';
import * as initAdverstCommonActionCreators from '@/common/actions/initAdverstCommon';
import { addEventListener, dispatchEvent } from '@/utils';
import NavImg1 from '@/components/NavImg1';
import SeparateBar from '@/components/SeparateBar';
import { RED_COLOR } from '@/styles/variables';
import { SIDEINTERVAL } from '@/common/constants';
import ProductItem5 from '@/components/ProductItem5';
import PhoneAdBaner from '@/components/PhoneAdBaner';
import ProductItem4 from '@/components/ProductItem4';
import ProductItem6 from '@/components/ProductItem6';

@connect(
  state => {
    const {
      getAdverstTopInfo,
      getSquaresInfo,
      getNewestInfo,
      bannerSwiper,
      adverstInfo,
      initAdverstCommon,
      login,
    } = state;

    return {
      getAdverstTopInfoItems: getAdverstTopInfo.items,
      getSquaresInfoItems: getSquaresInfo.items,
      getNewestInfoItems: getNewestInfo.items,
      initAdverstCommonItems: initAdverstCommon.items,
      bannerSwiper: bannerSwiper.one || {},
      adverstInfo: adverstInfo || {},
      isAuthUser: !!login.user,
    };
  },
  {
    ...getAdverstTopInfoActionCreators,
    ...getSquaresInfoActionCreators,
    ...getNewestInfoActionCreators,
    ...bannerSwiperActionCreators,
    ...adverstInfoActionCreators,
    ...initAdverstCommonActionCreators,
  },
)
class Index extends PureComponent {
  componentDidMount() {
    const {
      getAdverstTopInfoFetch,
      getSquaresInfoFetch,
      getNewestInfoFetch,
      bannerSwiperFetch,
      adverstInfoFetch,
      initAdverstCommonFetch,
    } = this.props;
    getAdverstTopInfoFetch();
    getSquaresInfoFetch();
    getNewestInfoFetch();
    bannerSwiperFetch('one');
    adverstInfoFetch({
      type_id: '1',
    });
    adverstInfoFetch({
      type_id: '2',
    });
    adverstInfoFetch({
      type_id: '5',
    });
    initAdverstCommonFetch(1, 3);

    // setLocale('zh-CN');
    console.log(getLocale());
    addEventListener('tcy', ret => {
      console.log('=============');
      console.log(ret);
    });
  }

  handleRightOnPress() {
    const { isAuthUser } = this.props;
    if (isAuthUser) {
      dispatchEvent('TabBarTabBarIndex', {
        index: 3,
      });
    } else {
      router.push('/Login');
    }
  }

  render() {
    const {
      getAdverstTopInfoItems,
      getSquaresInfoItems,
      getNewestInfoItems,
      bannerSwiper,
      adverstInfo,
      initAdverstCommonItems,
      isAuthUser,
    } = this.props;
    const styles = {
      hotTittle: {
        color: RED_COLOR,
        paddingLeft: SIDEINTERVAL,
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
        backgroundColor: '#fff',
      },
    };
    const bannerSwiperList = bannerSwiper.items;
    const adverstInfoList = adverstInfo.items;

    return (
      <div>
        <SearchHeader
          text={formatMessage({ id: 'search' })}
          rightOnPress={() => this.handleRightOnPress()}
          isLogin={isAuthUser}
        />

        <SwiperFlatList data={getAdverstTopInfoItems} />

        <NavImg1
          data={getSquaresInfoItems}
          style={{ paddingTop: 5, paddingBottom: 5 }}
        />

        <SeparateBar />

        <div style={styles.hotTittle}>
          {formatMessage({ id: 'hotNewProduct' })}
        </div>

        <ProductItem5
          data={getNewestInfoItems}
          style={{ backgroundColor: '#fff' }}
        />
        <SeparateBar />

        <PhoneAdBaner data={bannerSwiperList} />

        <SeparateBar />

        <ProductItem6 data={initAdverstCommonItems} />

        <ProductItem4 data={adverstInfoList} />
      </div>
    );
  }
}

export default Index;
