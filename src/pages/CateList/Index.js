/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
// import router from 'umi/router';

import BYHeader from '@/components/BYHeader';
import * as getAllProductInfoActionCreators from '@/common/actions/getAllProductInfo';
import { SIDEINTERVAL, GETALLPRODUCTINFO_NAMESPACE } from '@/common/constants';
import EmptyState from '@/components/EmptyState';

import ProductItem1A from '@/components/ProductItem1A';
import { getGetAllProductInfoItems } from '@/common/selectors';
import { GET_ALL_PRODUCT_INFO } from '@/common/constants/actionTypes';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

@connect(
  (state, props) => {
    const { getAllProductInfo, loading } = state;

    const {
      location: {
        query: { parent_id, classfy_id, sub_classfy_id, third_classfy_id },
      },
    } = props;

    return {
      getAllProductInfo,
      loading:
        loading.effects[
          `${GETALLPRODUCTINFO_NAMESPACE}/${GET_ALL_PRODUCT_INFO.REQUEST}`
        ],
      loaded: getAllProductInfo.loaded,
      items: getGetAllProductInfoItems(state, props),
      // items: getAllProductInfo.items,
      parent_id,
      classfy_id,
      sub_classfy_id,
      third_classfy_id,
    };
  },
  {
    ...getAllProductInfoActionCreators,
  },
)
class CateList extends React.Component {
  componentDidMount() {
    const {
      getAllProductInfoFetch,
      getAllProductInfoClear,
      parent_id,
      classfy_id,
      sub_classfy_id,
      third_classfy_id,
    } = this.props;
    getAllProductInfoClear();
    getAllProductInfoFetch({
      parent_id,
      classfy_id,
      sub_classfy_id,
      third_classfy_id,
    });
  }

  handleOnRefresh = () => {
    const {
      getAllProductInfoFetch,
      parent_id,
      classfy_id,
      sub_classfy_id,
      third_classfy_id,
      getAllProductInfoClear,
    } = this.props;
    getAllProductInfoClear();
    getAllProductInfoFetch({
      parent_id,
      classfy_id,
      sub_classfy_id,
      third_classfy_id,
    });
  };

  loadMoreItems = () => {
    const {
      getAllProductInfo,
      parent_id,
      classfy_id,
      sub_classfy_id,
      third_classfy_id,
      getAllProductInfoFetch,
    } = this.props;
    if (
      getAllProductInfo &&
      !getAllProductInfo.loading &&
      getAllProductInfo.currentPage < getAllProductInfo.totalPage
    ) {
      getAllProductInfoFetch({
        parent_id,
        classfy_id,
        sub_classfy_id,
        third_classfy_id,
        currentPage: getAllProductInfo.currentPage + 1,
      });
    }
  };

  renderContent() {
    const stylesX = {
      container: {
        flex: 1,
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
    };

    const { items, getAllProductInfo, loaded } = this.props;

    return (
      <div style={stylesX.container}>
        <ProductItem1A
          data={{ ...getAllProductInfo, items }}
          onRefresh={this.handleOnRefresh}
          loadMoreItems={this.loadMoreItems}
          groupon={false}
        />
        {loaded && items.length === 0 && (
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={formatMessage({ id: 'noData' })}
            styleText={{ marginBottom: 0 }}
          />
        )}
      </div>
    );
  }

  render() {
    return (
      <div style={styles.container}>
        <BYHeader />
        {this.renderContent()}
      </div>
    );
  }
}

export default CateList;
