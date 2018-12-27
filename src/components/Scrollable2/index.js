/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import qs from 'qs';
// import router from 'umi/router';
import { formatMessage } from 'umi/locale';

import * as bannerSwiperActionCreators from '@/common/actions/bannerSwiper';
import * as adPhoneActionCreators from '@/common/actions/adPhone';
// import {
//   WINDOW_WIDTH,
//   OSS_IMAGE_QUALITY,
//   IS_IOS,
//   SCREENS,
// } from '@/common/constants';
// import { xOssProcess } from '@/utils';
import ProductItem4 from '@/components/ProductItem4';
import PhoneAdBaner from '@/components/PhoneAdBaner';
import BrandList from '@/components/BrandList';
import FloorTitle from '@/components/FloorTitle';
import SwiperFlatList from '@/components/SwiperFlatList';
import { WINDOW_WIDTH } from '@/common/constants';

class Scrollable2 extends Component {
  componentDidMount() {
    const { bannerSwiperFetch, adPhoneFetch } = this.props;
    bannerSwiperFetch('two');
    adPhoneFetch();
  }

  render() {
    const { bannerSwiper, adPhone } = this.props;
    const { classfyinfo, phoneAdList, phoneAdBanerList } = adPhone;
    const bannerSwiperList = bannerSwiper.items;
    return (
      <div>
        {bannerSwiperList && bannerSwiperList.length > 0 && (
          <SwiperFlatList
            data={bannerSwiperList}
            styleImg={{
              display: 'block',
              width: WINDOW_WIDTH,
              minHeight: WINDOW_WIDTH * 0.35583333,
            }}
          />
        )}

        <BrandList data={classfyinfo} style={{ marginBottom: 5 }} />

        <PhoneAdBaner data={phoneAdBanerList} />

        <FloorTitle
          title={`- ${formatMessage({ id: 'goodOnesRecommendation' })} -`}
          isMore={false}
          style={{ paddingTop: 10, backgroundColor: '#fff' }}
        />

        <ProductItem4 data={phoneAdList} style={{ backgroundColor: '#fff' }} />

        {/* <FeaturedGoodsItem data={bannerHomeRecommend} /> */}
      </div>
    );
  }
}

export default connect(
  state => {
    const { bannerSwiper, adPhone } = state;

    return {
      bannerSwiper: bannerSwiper.two,
      adPhone,
    };
  },
  {
    ...bannerSwiperActionCreators,
    ...adPhoneActionCreators,
  },
)(Scrollable2);
