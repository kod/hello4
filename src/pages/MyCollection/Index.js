/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { formatMessage } from 'umi/locale';
import router from 'umi/router';
import { Modal } from 'antd-mobile';

import BYHeader from '@/components/BYHeader';
import Loader from '@/components/Loader';

import * as collectionActionCreators from '@/common/actions/collection';
import {
  SCREENS,
  WINDOW_HEIGHT,
  BUYOO,
} from '@/common/constants';
import EmptyState from '@/components/EmptyState';

import ProductItem2 from '@/components/ProductItem2';
import MustLogin from '@/components/MustLogin';
import { o } from '@/utils/AuthEncrypt';
import { localStorageGetItem } from '@/utils';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

const styles = {
  container: {
    height: WINDOW_HEIGHT - 45,
    position: 'relative',
  },
};

class MyCollection extends React.Component {
  componentDidMount() {
    const { collectionFetch, authUser } = this.props;
    if (authUser) collectionFetch();
  }

  renderContenr() {
    const { items } = this.props;

    return (
      <div style={styles.container}>
        <ProductItem2 data={items} />
      </div>
    );
  }

  render() {
    const { items, loading, authUser } = this.props;

    return (
      <div style={styles.container}>
        <BYHeader title={formatMessage({ id: 'myCollection' })} />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          formatMessage={formatMessage}
          router={router}
          SCREENS={SCREENS}
        />

        {loading && <Loader absolutePosition />}
        {items.length > 0 ? (
          <div>{this.renderContenr()}</div>
        ) : (
          !loading && (
            <EmptyState
              source={ouhrigdfnjsoeijehrJpg}
              text={formatMessage({ id: 'noData' })}
              styleText={{ marginBottom: 0 }}
            />
          )
        )}
      </div>
    );
  }
}

export default connect(
  state => {
    const { collection } = state;

    return {
      authUser: o(localStorageGetItem, BUYOO),
      loading: collection.loading,
      items: collection.items.details ? collection.items.details : [],
    };
  },
  {
    ...collectionActionCreators,
  },
)(MyCollection);
