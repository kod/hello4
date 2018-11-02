import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';

import * as getMenuActionCreators from '@/common/actions/getMenu';
import BYHeader from '@/components/BYHeader';
import {
  WINDOW_HEIGHT,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  WINDOW_WIDTH,
  SIDEINTERVAL,
} from '@/common/constants';
import { BORDER_COLOR, PRIMARY_COLOR } from '@/styles/variables';

@connect(
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
)
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getMenuFetch } = this.props;
    getMenuFetch();
  }

  renderHeaderTitle = () => {
    const stylesX = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      title: {
        fontSize: 16,
        color: '#333',
        height: 45,
        lineHeight: '45px',
      },
    };

    return (
      <div style={stylesX.container}>
        <div style={stylesX.title}>{formatMessage({ id: 'categories' })}</div>
      </div>
    );
  };

  renderScrollViewRight() {
    const stylesX = {
      scrollViewRight: {
        width: WINDOW_WIDTH * 0.75,
      },
      main: {
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
    };

    const { items, itemsIndex } = this.props;

    return (
      <div style={stylesX.scrollViewRight}>
        <div style={stylesX.main}>
          {items.map(
            (val, key) =>
              itemsIndex === key && this.renderScrollViewRightItem(key),
          )}
        </div>
      </div>
    );
  }

  renderScrollViewRightItem(key) {
    const stylesX = {
      rightItemTitle: {
        fontSize: 11,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 15,
      },
      rightItemMain: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      rightItemSubItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: (WINDOW_WIDTH * 0.74 - SIDEINTERVAL * 2) / 3,
        minHeight: (WINDOW_WIDTH * 0.74 - SIDEINTERVAL * 2) / 3,
        marginBottom: 25,
      },
      rightItemSubItemImage: {
        resizeMode: 'contain',
        width: (WINDOW_WIDTH * 0.75 - SIDEINTERVAL * 8) / 3,
        height: (WINDOW_WIDTH * 0.75 - SIDEINTERVAL * 8) / 3,
        marginBottom: 3,
      },
      rightItemSubItemText: {
        textAlign: 'center',
        fontSize: 11,
        color: '#666',
      },
    };

    const { itemsList, itemsClassfy } = this.props;

    return (
      <div style={stylesX.rightItem} key={key}>
        <div style={stylesX.rightItemTitle} />
        <div style={stylesX.rightItemMain}>
          {itemsList.length !== 0 &&
            itemsList[key].map(
              val1 =>
                val1.status === '1' ? (
                  <div
                    style={stylesX.rightItemSubItem}
                    key={val1.image}
                    onPress={() => {
                      // navigate(SCREENS.CateList, {
                      //   parent_id: val1.parentId,
                      //   sub_classfy_id: val1.id,
                      // });
                    }}
                  >
                    <img
                      alt=""
                      style={stylesX.rightItemSubItemImage}
                      src={val1.image}
                    />
                    <div style={stylesX.rightItemSubItemText}>{val1.name}</div>
                  </div>
                ) : null,
            )}
        </div>
        <div style={stylesX.rightItemTitle}>
          {formatMessage({ id: 'brand' })}
        </div>
        <div style={stylesX.rightItemMain}>
          {itemsClassfy.length !== 0 &&
            itemsClassfy[key].map(
              val1 =>
                val1.status === '1' ? (
                  <div
                    style={stylesX.rightItemSubItem}
                    key={val1.imageUrl}
                    onPress={() => {
                      // navigate(SCREENS.CateList, {
                      //   parent_id: val1.parentId,
                      //   classfy_id: val1.id,
                      // })
                    }}
                  >
                    <img
                      alt=""
                      style={stylesX.rightItemSubItemImage}
                      src={val1.imageUrl}
                    />
                    <div style={stylesX.rightItemSubItemText}>{val1.name}</div>
                  </div>
                ) : null,
            )}
        </div>
      </div>
    );
  }

  renderContent() {
    const stylesX = {
      content: {
        display: 'flex',
        height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT - 1,
        flexDirection: 'row',
      },
      scrollViewLeft: {
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT - 55,
        borderRightColor: BORDER_COLOR,
        borderRightWidth: 1,
      },
      main: {},
      item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 15,
        paddingBottom: 15,
      },
      itemImage: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
      },
      itemText: {
        fontSize: 11,
        lineHeight: `${11 * 1.618}px`,
        color: '#333',
        textAlign: 'center',
      },
      itemActive: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 5,
        backgroundColor: PRIMARY_COLOR,
      },
    };

    const {
      items,
      getMenuIndexFetch,
      itemsIndex,
      // loading,
    } = this.props;

    return (
      <div style={stylesX.content}>
        <div style={stylesX.scrollViewLeft}>
          <div style={stylesX.main}>
            {items.map((val, key) => (
              <div
                style={stylesX.item}
                key={val.image}
                onClick={() => getMenuIndexFetch(key)}
              >
                <img alt="" style={stylesX.itemImage} src={val.image} />

                <div style={stylesX.itemText}>{val.name}</div>

                {itemsIndex === key && <div style={stylesX.itemActive} />}
              </div>
            ))}
          </div>
        </div>
        {this.renderScrollViewRight()}
      </div>
    );
  }

  render() {
    return (
      <div>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          showBackButton={false}
        />
        {this.renderContent()}
      </div>
    );
  }
}

export default Index;
