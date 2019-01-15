/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { i18n, View } from '@src/API';
import router from 'umi/lib/router';
import { Modal } from 'antd-mobile';

import BYHeader from '@src/components/BYHeader';
import Loader from '@src/components/Loader';

import * as collectionActionCreators from '@src/common/actions/collection';
import { SCREENS, WINDOW_HEIGHT } from '@src/common/constants';
import EmptyState from '@src/components/EmptyState';

import ProductItem2 from '@src/components/ProductItem2';
import MustLogin from '@src/components/MustLogin';
import { getLoginUser } from '@src/common/selectors';

import styles from './index.less';

const ouhrigdfnjsoeijehrJpg =
  'https://oss.buyoo.vn/usercollect/1/20181101180309_67w.jpg';

class MyCollection extends React.Component {
  componentDidMount() {
    const { collectionFetch, authUser } = this.props;
    if (authUser) collectionFetch();
  }

  renderContenr() {
    const { items } = this.props;

    return (
      <View
        style={{
          height: WINDOW_HEIGHT - 45,
        }}
        className={styles.container}
      >
        <ProductItem2 data={items} />
      </View>
    );
  }

  render() {
    const { items, loading, authUser } = this.props;

    return (
      <View className={styles.container}>
        <BYHeader title={i18n.myCollection} />
        <MustLogin
          Modal={Modal}
          visible={!authUser}
          i18n={i18n}
          router={router}
          SCREENS={SCREENS}
        />

        {loading && <Loader absolutePosition />}
        {items.length > 0 ? (
          <View>{this.renderContenr()}</View>
        ) : (
          !loading && (
            <EmptyState
              source={ouhrigdfnjsoeijehrJpg}
              text={i18n.noData}
              styleText={{ marginBottom: 0 }}
            />
          )
        )}
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    const { collection } = state;

    return {
      authUser: getLoginUser(state, props),
      loading: collection.loading,
      items: collection.items.details ? collection.items.details : [],
    };
  },
  {
    ...collectionActionCreators,
  },
)(MyCollection);
