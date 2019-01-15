import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { i18n, View } from '@src/API';

import * as getMenuActionCreators from '@src/common/actions/getMenu';
import BYHeader from '@src/components/BYHeader';
import {
  WINDOW_HEIGHT,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  WINDOW_WIDTH,
  SIDEINTERVAL,
  OSS_IMAGE_QUALITY,
  IS_IOS,
} from '@src/common/constants';
import { xOssProcess } from '@src/utils';
import styles from './Categories.less';

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getMenuFetch } = this.props;
    getMenuFetch();
  }

  renderHeaderTitle = () => (
    // const stylesX = {
    //   container: {
    //     width: WINDOW_WIDTH,
    //     display: 'flex',
    //     flex-direction: 'column',
    //     align-items: 'center',
    //   },
    //   title: {
    //     font-size: 16,
    //     color: '#333',
    //     height: 45,
    //     line-height: '45px',
    //   },
    // };

    <View
      style={{
        width: WINDOW_WIDTH,
      }}
      className={styles.containerHeaderTitle}
    >
      <View className={styles.titleHeaderTitle}>{i18n.categories}</View>
    </View>
  );

  renderScrollViewRight() {
    // const stylesX = {
    //   scrollViewRight: {
    //     width: WINDOW_WIDTH * 0.75,
    //   },
    //   main: {
    //     padding-top: SIDEINTERVAL,
    //     padding-bottom: SIDEINTERVAL,
    //   },
    // };

    const { items, itemsIndex } = this.props;

    return (
      <View
        style={{
          width: WINDOW_WIDTH * 0.75,
        }}
      >
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
        >
          {items.map(
            (val, key) =>
              itemsIndex === key && this.renderScrollViewRightItem(key),
          )}
        </View>
      </View>
    );
  }

  renderScrollViewRightItem(key) {
    const { itemsList, itemsClassfy } = this.props;

    return (
      <View className={styles.rightItem} key={key}>
        <View className={styles.rightItemTitle} />
        <View
          style={{
            paddingLeft: SIDEINTERVAL,
            paddingRight: SIDEINTERVAL,
          }}
          className={styles.rightItemMain}
        >
          {itemsList.length !== 0 &&
            itemsList[key].map(val1 =>
              val1.status === '1' ? (
                <View
                  style={{
                    width: (WINDOW_WIDTH * 0.74 - SIDEINTERVAL * 2) / 3,
                    minHeight: (WINDOW_WIDTH * 0.74 - SIDEINTERVAL * 2) / 3,
                  }}
                  className={styles.rightItemSubItem}
                  key={val1.image}
                  onClick={() => {
                    // navigate(SCREENS.CateList, {
                    //   parent_id: val1.parentId,
                    //   sub_classfy_id: val1.id,
                    // });
                  }}
                >
                  <img
                    alt=""
                    style={{
                      width: (WINDOW_WIDTH * 0.75 - SIDEINTERVAL * 8) / 3,
                    }}
                    className={styles.rightItemSubItemImage}
                    src={`${val1.image}?${xOssProcess(
                      IS_IOS,
                      OSS_IMAGE_QUALITY,
                    )}`}
                  />
                  <View className={styles.rightItemSubItemText}>
                    {val1.name}
                  </View>
                </View>
              ) : null,
            )}
        </View>
        <View className={styles.rightItemTitle}>{i18n.brand}</View>
        <View className={styles.rightItemMain}>
          {itemsClassfy.length !== 0 &&
            itemsClassfy[key].map(val1 =>
              val1.status === '1' ? (
                <View
                  className={styles.rightItemSubItem}
                  key={val1.imageUrl}
                  onClick={() => {
                    // navigate(SCREENS.CateList, {
                    //   parent_id: val1.parentId,
                    //   classfy_id: val1.id,
                    // })
                  }}
                >
                  <img
                    alt=""
                    style={{
                      height: (WINDOW_WIDTH * 0.75 - SIDEINTERVAL * 8) / 3,
                    }}
                    className={styles.rightItemSubItemImage}
                    src={`${val1.imageUrl}?${xOssProcess(
                      IS_IOS,
                      OSS_IMAGE_QUALITY,
                    )}`}
                  />
                  <View className={styles.rightItemSubItemText}>
                    {val1.name}
                  </View>
                </View>
              ) : null,
            )}
        </View>
      </View>
    );
  }

  renderContent() {
    // const stylesX = {
    //   content: {
    //     display: 'flex',
    //     overflow-x: 'auto',
    //     height: WINDOW_HEIGHT - 45 - 50,
    //     flex-direction: row,
    //     background-color: #fff,
    //   },
    //   scrollViewLeft: {
    //     width: WINDOW_WIDTH * 0.25,
    //     height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT - 55,
    //     borderRightColor: BORDER_COLOR,
    //     borderRightWidth: 1,
    //   },
    //   main: {},
    //   item: {
    //     display: 'flex',
    //     flex-direction: 'column',
    //     align-items: 'center',
    //     position: 'relative',
    //     padding-top: 15,
    //     padding-bottom: 15,
    //   },
    //   itemImage: {
    //     height: 30,
    //     width: 30,
    //     // resizeMode: 'contain',
    //   },
    //   itemText: {
    //     font-size: 11,
    //     line-height: `${11 * 1.618}px`,
    //     color: '#333',
    //     text-align: center,
    //   },
    //   itemActive: {
    //     position: 'absolute',
    //     top: 0,
    //     bottom: 0,
    //     left: 0,
    //     width: 5,
    //     background-color: PRIMARY_COLOR,
    //   },
    // };

    const { items, getMenuIndexFetch, itemsIndex } = this.props;

    return (
      <View
        style={{
          height: WINDOW_HEIGHT - 45 - 50,
        }}
        className={styles.content}
      >
        <View
          style={{
            width: WINDOW_WIDTH * 0.25,
            height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT - 55,
          }}
          className={styles.scrollViewLeft}
        >
          <View className={styles.main}>
            {items.map((val, key) => (
              <View
                className={styles.item}
                key={val.image}
                onClick={() => getMenuIndexFetch(key)}
              >
                <img
                  alt=""
                  className={styles.itemImage}
                  src={`${val.image}?${xOssProcess(IS_IOS, OSS_IMAGE_QUALITY)}`}
                />

                <View className={styles.itemText}>{val.name}</View>

                {itemsIndex === key && <View className={styles.itemActive} />}
              </View>
            ))}
          </View>
        </View>
        {this.renderScrollViewRight()}
      </View>
    );
  }

  render() {
    return (
      <View>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          showBackButton={false}
        />
        {this.renderContent()}
      </View>
    );
  }
}

export default connect(
  state => {
    const { getMenu } = state;

    return {
      loading: getMenu.loading,
      loaded: getMenu.loaded,
      items: getMenu.items,
      itemsList: getMenu.itemsList,
      itemsClassfy: getMenu.itemsClassfy,
      itemsIndex: getMenu.itemsIndex,
    };
  },
  {
    ...getMenuActionCreators,
  },
)(Index);
