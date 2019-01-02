import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { formatMessage } from 'umi-plugin-locale';
import router from 'umi/router';

import SwiperFlatList from '@src/components/SwiperFlatList';
import SearchHeader from '@src/components/SearchHeader';
import * as getAdverstTopInfoActionCreators from '@src/common/actions/getAdverstTopInfo';
import * as getSquaresInfoActionCreators from '@src/common/actions/getSquaresInfo';
import * as getNewestInfoActionCreators from '@src/common/actions/getNewestInfo';
import * as bannerSwiperActionCreators from '@src/common/actions/bannerSwiper';
import * as adverstInfoActionCreators from '@src/common/actions/adverstInfo';
import * as initAdverstCommonActionCreators from '@src/common/actions/initAdverstCommon';
import { dispatchEventBuyoo, analyzeUrlNavigate } from '@src/utils';
import NavImg1 from '@src/components/NavImg1';
import SeparateBar from '@src/components/SeparateBar';
import { RED_COLOR } from '@src/styles/variables';
import { SIDEINTERVAL, WINDOW_WIDTH, SCREENS } from '@src/common/constants';
import ProductItem5 from '@src/components/ProductItem5';
import PhoneAdBaner from '@src/components/PhoneAdBaner';
import ProductItem4 from '@src/components/ProductItem4';
import ProductItem6 from '@src/components/ProductItem6';
import { getLoginUser } from '@src/common/selectors';

class Index extends PureComponent {
  componentDidMount() {
    const {
      getAdverstTopInfoFetch,
      getSquaresInfoFetch,
      getNewestInfoFetch,
      bannerSwiperClear,
      bannerSwiperFetch,
      adverstInfoClear,
      adverstInfoFetch,
      initAdverstCommonClear,
      initAdverstCommonFetch,
    } = this.props;
    getAdverstTopInfoFetch();
    getSquaresInfoFetch();
    getNewestInfoFetch();
    bannerSwiperClear('one');
    bannerSwiperFetch('one');
    adverstInfoClear();
    adverstInfoFetch({
      type_id: '1',
    });
    adverstInfoFetch({
      type_id: '2',
    });
    adverstInfoFetch({
      type_id: '5',
    });
    initAdverstCommonClear();
    initAdverstCommonFetch(1, 3);

    // setLocale('zh-CN');
  }

  handleRightOnPress() {
    const { authUser } = this.props;
    if (authUser) {
      dispatchEventBuyoo('TabBarTabBarIndex', {
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
          middleOnPress={() => router.push(`/${SCREENS.SearchResult}`)}
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

export default connect(
  (state, props) => {
    const {
      getAdverstTopInfo,
      getSquaresInfo,
      getNewestInfo,
      bannerSwiper,
      adverstInfo,
      initAdverstCommon,
    } = state;

    // console.log(getLoginUser(state, props));
    return {
      getAdverstTopInfoItems: getAdverstTopInfo.items,
      getSquaresInfoItems: getSquaresInfo.items,
      getNewestInfoItems: getNewestInfo.items,
      initAdverstCommonItems: initAdverstCommon.items,
      bannerSwiper: bannerSwiper.one || {},
      adverstInfo: adverstInfo || {},
      authUser: getLoginUser(state, props),
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
)(Index);
