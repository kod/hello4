import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, getLocale } from 'umi/locale';

// import { GET_ADVERST_TOP_INFO } from '@/common/constants/actionTypes';
// import { GETADVERSTTOPINFO_NAMESPACE } from '@/common/constants';
import SwiperFlatList from '@/components/SwiperFlatList';
import SearchHeader from '@/components/SearchHeader';
import * as getAdverstTopInfoActionCreators from '@/common/actions/getAdverstTopInfo';
import * as getSquaresInfoActionCreators from '@/common/actions/getSquaresInfo';
import * as getNewestInfoActionCreators from '@/common/actions/getNewestInfo';
import * as bannerSwiperActionCreators from '@/common/actions/bannerSwiper';
import * as adverstInfoActionCreators from '@/common/actions/adverstInfo';
import * as initAdverstCommonActionCreators from '@/common/actions/initAdverstCommon';
import { addEventListener } from '@/utils';
import NavImg1 from '@/components/NavImg1';
import SeparateBar from '@/components/SeparateBar';
import { RED_COLOR, BORDER_COLOR } from '@/styles/variables';
import { SIDEINTERVAL } from '@/common/constants';
import ProductItem5 from '@/components/ProductItem5';
import PhoneAdBaner from '@/components/PhoneAdBaner';
import FloorTitle from '@/components/FloorTitle';
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
    } = state;

    return {
      getAdverstTopInfoItems: getAdverstTopInfo.items,
      getSquaresInfoItems: getSquaresInfo.items,
      getNewestInfoItems: getNewestInfo.items,
      initAdverstCommonItems: initAdverstCommon.items,
      bannerSwiper: bannerSwiper.one || {},
      adverstInfo: adverstInfo || {},
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
  constructor(props) {
    super(props);
    this.state = {
      // data: ['1', '2', '3'],
      // imgHeight: 176,
    };
  }

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

  render() {
    // const { imgHeight } = this.state;
    const {
      getAdverstTopInfoItems,
      getSquaresInfoItems,
      getNewestInfoItems,
      bannerSwiper,
      adverstInfo,
      initAdverstCommonItems,
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
        <SearchHeader text={formatMessage({ id: 'search' })} />

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

        {/* <FloorTitle
          title={`- ${formatMessage({ id: 'featuredEvents' })} -`}
          textMore={formatMessage({ id: 'more' })}
          isMore={false}
          style={{ borderBottomColor: BORDER_COLOR, borderBottomWidth: 1 }}
        /> */}

        <ProductItem4 data={adverstInfoList} />
      </div>
    );
  }
}

export default Index;
