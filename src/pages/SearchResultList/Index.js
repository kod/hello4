import React from 'react';
import { connect } from 'react-redux';
import router from 'umi/lib/router';
import { i18n, View } from '@src/API';

import BYHeader from '@src/components/BYHeader';
import Loader from '@src/components/Loader';

import * as findProductsActionCreators from '@src/common/actions/findProducts';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from '@src/common/constants';
import EmptyState from '@src/components/EmptyState';

import CustomIcon from '@src/components/CustomIcon';
import ProductItem4 from '@src/components/ProductItem4';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

class SearchResultList extends React.Component {
  componentDidMount() {
    const { findProductsClear, findProductsFetch, findcontent } = this.props;
    findProductsClear();
    findProductsFetch({
      findcontent,
    });
  }

  renderHeaderTitle = () => {
    const stylesX = {
      container: {
        flex: 1,
        paddingRight: WINDOW_WIDTH * 0.07,
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        backgroundColor: '#f5f5f5',
        paddingLeft: WINDOW_WIDTH * 0.03,
      },
      headerIcon: {
        fontSize: 18,
        color: '#ccc',
      },
      textInput: {
        flex: 1,
        color: '#333',
        backgroundColor: '#f5f5f5',
        height: 30,
        lineHeight: '30px',
        paddingLeft: SIDEINTERVAL * 0.8,
        paddingRight: SIDEINTERVAL * 0.8,
      },
    };

    const { findcontent } = this.props;

    return (
      <View style={stylesX.container}>
        <View style={stylesX.header}>
          <CustomIcon name="search" type="search" style={stylesX.addressPin} />
          <View style={stylesX.textInput} onClick={() => router.go(-1)}>
            {findcontent}
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { items, loading } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader headerTitle={this.renderHeaderTitle()} />
        {loading && <Loader />}
        {items.length > 0 && <ProductItem4 data={items} />}
        {items.length === 0 && (
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={i18n.noData}
            style={{ paddingTop: WINDOW_HEIGHT * 0.1 }}
          />
        )}
        {/* {items.length > 0 ? (
          <ProductItem3 data={items} style={{ backgroundColor: '#fff' }} />
        ) : (
          !loading && (
          )
        )} */}
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const { findProducts } = state;

    const {
      location: {
        query: { findcontent },
      },
    } = props;

    return {
      items: findProducts.items,
      findcontent,
      loading: findProducts.loading,
    };
  },
  {
    ...findProductsActionCreators,
  },
)(SearchResultList);
