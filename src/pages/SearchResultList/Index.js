import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { formatMessage } from 'umi/locale';

import BYHeader from '@/components/BYHeader';
import Loader from '@/components/Loader';

import * as findProductsActionCreators from '@/common/actions/findProducts';
import {
  SIDEINTERVAL,
  WINDOW_WIDTH,
  FINDPRODUCTS_NAMESPACE,
  WINDOW_HEIGHT,
} from '@/common/constants';
import EmptyState from '@/components/EmptyState';

import CustomIcon from '@/components/CustomIcon';
import ProductItem4 from '@/components/ProductItem4';
import { FIND_PRODUCTS } from '@/common/constants/actionTypes';

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
      <div style={stylesX.container}>
        <div style={stylesX.header}>
          <CustomIcon type="search" style={stylesX.addressPin} />
          <div style={stylesX.textInput} onClick={() => router.go(-1)}>
            {findcontent}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { items, loading } = this.props;

    return (
      <div style={styles.container}>
        <BYHeader headerTitle={this.renderHeaderTitle()} />
        {loading && <Loader />}
        {items.length > 0 && <ProductItem4 data={items} />}
        {items.length === 0 && (
          <EmptyState
            source={ouhrigdfnjsoeijehrJpg}
            text={formatMessage({ id: 'noData' })}
            style={{ paddingTop: WINDOW_HEIGHT * 0.1 }}
          />
        )}
        {/* {items.length > 0 ? (
          <ProductItem3 data={items} style={{ backgroundColor: '#fff' }} />
        ) : (
          !loading && (
          )
        )} */}
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const { findProducts, loading } = state;

    const {
      location: {
        query: { findcontent },
      },
    } = props;

    return {
      items: findProducts.items,
      findcontent,
      loading:
        loading.effects[`${FINDPRODUCTS_NAMESPACE}/${FIND_PRODUCTS.REQUEST}`],
    };
  },
  {
    ...findProductsActionCreators,
  },
)(SearchResultList);
