import React from 'react';
import { TabBar } from 'antd-mobile';
import { formatMessage } from 'umi/locale';
import { connect } from 'react-redux';
import router from 'umi/router';
import qs from 'qs';

import { WINDOW_HEIGHT } from '@src/common/constants';
import Home from '@src/pages/Home/Home';
// import Categories from '@src/pages/Home/Categories';
import Cart from '@src/pages/Home/Cart';
import Me from '@src/pages/Home/Me';
import CustomIcon from '@src/components/CustomIcon';
import {
  addEventListenerBuyoo,
  removeEventListenerBuyoo,
  dispatchEventBuyoo,
} from '@src/utils';
import stylesLess from './index.less';

class Index extends React.Component {
  constructor(props) {
    super(props);
    const { index } = props;

    this.state = {
      tabBarIndex: parseInt(index, 10),
      hidden: false,
    };
    this.tabBarTabBarIndexHandle = this.tabBarTabBarIndexHandle.bind(this);
  }

  componentDidMount() {
    addEventListenerBuyoo('TabBarTabBarIndex', this.tabBarTabBarIndexHandle);
  }

  componentWillUnmount() {
    removeEventListenerBuyoo('TabBarTabBarIndex', this.tabBarTabBarIndexHandle);
  }

  tabBarTabBarIndexHandle({ detail: ret }) {
    this.setState({
      tabBarIndex: ret.index,
    });
  }

  render() {
    const { hidden, tabBarIndex } = this.state;

    const styles = {
      container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: WINDOW_HEIGHT - 50,
      },
      // wrap: {
      //   height: WINDOW_HEIGHT - 50,
      // },
      icon: {
        fontSize: 16,
        width: 22,
        height: 22,
      },
    };

    return (
      <div>
        {/* <ModalRoot /> */}
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={hidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title={formatMessage({ id: 'home' })}
            key="Home"
            icon={<CustomIcon type="home" style={styles.icon} />}
            selectedIcon={<CustomIcon type="home" style={styles.icon} />}
            selected={tabBarIndex === 0}
            // badge={1}
            onPress={() => {
              this.setState({
                tabBarIndex: 0,
              });
              router.push(
                `/?${qs.stringify({
                  index: 0,
                })}`,
              );
            }}
            data-seed="logId"
          >
            <div style={styles.container} className={stylesLess.container}>
              <Home />
            </div>
          </TabBar.Item>
          {/* <TabBar.Item
            icon={<CustomIcon type="classify" style={styles.icon} />}
            selectedIcon={<CustomIcon type="classify" style={styles.icon} />}
            title={formatMessage({ id: 'categories' })}
            key="Categories"
            // badge="new"
            selected={tabBarIndex === 1}
            onPress={() => {
              this.setState({
                tabBarIndex: 1,
              });
            }}
            data-seed="logId1"
          >
            <div style={styles.container} className={stylesLess.container}>
              <Categories />
            </div>
          </TabBar.Item> */}
          <TabBar.Item
            icon={<CustomIcon type="cart" style={styles.icon} />}
            selectedIcon={<CustomIcon type="cart" style={styles.icon} />}
            title={formatMessage({ id: 'cart' })}
            key="Cart"
            // dot
            selected={tabBarIndex === 2}
            onPress={() => {
              this.setState({
                tabBarIndex: 2,
              });
              router.push(
                `/?${qs.stringify({
                  index: 2,
                })}`,
              );
              dispatchEventBuyoo('CartShow');
            }}
          >
            <div style={styles.container} className={stylesLess.container}>
              <Cart />
            </div>
          </TabBar.Item>
          <TabBar.Item
            icon={<CustomIcon type="user" style={styles.icon} />}
            selectedIcon={<CustomIcon type="user" style={styles.icon} />}
            title={formatMessage({ id: 'me' })}
            key="Me"
            selected={tabBarIndex === 3}
            onPress={() => {
              this.setState({
                tabBarIndex: 3,
              });
              router.push(
                `/?${qs.stringify({
                  index: 3,
                })}`,
              );
            }}
          >
            <div style={styles.container} className={stylesLess.container}>
              {<Me />}
            </div>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default connect(
  (store, props) => {
    console.log(store);
    const {
      location: { query = {} },
    } = props;

    return {
      index: query.index || 0,
    };
  },
  {},
)(Index);
