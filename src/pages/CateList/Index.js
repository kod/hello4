/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import { i18n } from '@src/API';
// import router from 'umi/lib/router';

import BYHeader from '@src/components/BYHeader';
import * as getAllProductInfoActionCreators from '@src/common/actions/getAllProductInfo';
import { SIDEINTERVAL, WINDOW_HEIGHT } from '@src/common/constants';
import EmptyState from '@src/components/EmptyState';

import ProductItem1A from '@src/components/ProductItem1A';
import { getGetAllProductInfoItems } from '@src/common/selectors';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

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
      loading,
    } = this.props;
    if (
      getAllProductInfo &&
      !loading &&
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
        height: WINDOW_HEIGHT - 45,
        overflowY: 'auto',
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
            text={i18n.noData}
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

export default connect(
  (state, props) => {
    const { getAllProductInfo } = state;

    const {
      location: {
        query: { parent_id, classfy_id, sub_classfy_id, third_classfy_id },
      },
    } = props;

    return {
      getAllProductInfo,
      loading: getAllProductInfo.loading,
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
)(CateList);
