import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';

import SwiperFlatList from '@/components/SwiperFlatList';
import SearchHeader from '@/components/SearchHeader';
import * as getAdverstTopInfoActionCreators from '@/common/actions/getAdverstTopInfo';
import * as getSquaresInfoActionCreators from '@/common/actions/getSquaresInfo';
import * as getNewestInfoActionCreators from '@/common/actions/getNewestInfo';
import * as bannerSwiperActionCreators from '@/common/actions/bannerSwiper';
import * as adverstInfoActionCreators from '@/common/actions/adverstInfo';
import * as initAdverstCommonActionCreators from '@/common/actions/initAdverstCommon';
import { dispatchEvent, analyzeUrlNavigate, b } from '@/utils';
import NavImg1 from '@/components/NavImg1';
import SeparateBar from '@/components/SeparateBar';
import { RED_COLOR } from '@/styles/variables';
import { SIDEINTERVAL, WINDOW_WIDTH, BUYOO } from '@/common/constants';
import ProductItem5 from '@/components/ProductItem5';
import PhoneAdBaner from '@/components/PhoneAdBaner';
import ProductItem4 from '@/components/ProductItem4';
import ProductItem6 from '@/components/ProductItem6';
import { o } from '@/utils/AuthEncrypt';

@connect(
  state => {
    const {
      getAdverstTopInfo,
      getSquaresInfo,
      getNewestInfo,
      bannerSwiper,
      adverstInfo,
      initAdverstCommon,
    } = state;

    return {
      getAdverstTopInfoItems: getAdverstTopInfo.items,
      getSquaresInfoItems: getSquaresInfo.items,
      getNewestInfoItems: getNewestInfo.items,
      initAdverstCommonItems: initAdverstCommon.items,
      bannerSwiper: bannerSwiper.one || {},
      adverstInfo: adverstInfo || {},
      authUser: o(b, BUYOO),
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
  }

  handleRightOnPress() {
    const { authUser } = this.props;
    if (authUser) {
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
      authUser,
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
          isLogin={authUser}
        />

        {getAdverstTopInfoItems.length > 0 && (
          <SwiperFlatList
            data={getAdverstTopInfoItems}
            styleImg={{
              display: 'block',
              width: WINDOW_WIDTH,
              minHeight: WINDOW_WIDTH * 0.35583333,
            }}
          />
        )}

        {getSquaresInfoItems.length > 0 && (
          <NavImg1
            data={getSquaresInfoItems}
            style={{ paddingTop: 5, paddingBottom: 5 }}
            onClick={analyzeUrlNavigate}
          />
        )}

        {getNewestInfoItems.length > 0 && (
          <div>
            <SeparateBar />
            <div style={styles.hotTittle}>
              {formatMessage({ id: 'hotNewProduct' })}
            </div>

            <ProductItem5
              data={getNewestInfoItems}
              style={{ backgroundColor: '#fff' }}
            />
          </div>
        )}

        {bannerSwiperList.length > 0 && (
          <div>
            <SeparateBar />

            <PhoneAdBaner data={bannerSwiperList} />
          </div>
        )}

        {initAdverstCommonItems.length > 0 && (
          <div>
            <SeparateBar />

            <ProductItem6 data={initAdverstCommonItems} />
          </div>
        )}

        {adverstInfoList.length > 0 && <ProductItem4 data={adverstInfoList} />}
      </div>
    );
  }
}

export default Index;
