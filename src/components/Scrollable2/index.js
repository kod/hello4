/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'dva';
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
import ProductItem4 from '../ProductItem4';
import PhoneAdBaner from '../PhoneAdBaner';
import BrandList from '../BrandList';
import FloorTitle from '../FloorTitle';
import SwiperFlatList from '../SwiperFlatList';

@connect(
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
)
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
    console.log(bannerSwiperList);
    return (
      <div>
        {bannerSwiperList && bannerSwiperList.length > 0 && (
          <SwiperFlatList data={bannerSwiperList} />
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

export default Scrollable2;
