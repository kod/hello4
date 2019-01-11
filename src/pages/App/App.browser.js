import React from 'react';
import { TabBar } from 'antd-mobile';
import { i18n, View } from '@src/API';
import { connect } from 'react-redux';
import router from 'umi/lib/router';
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
      <View>
        {/* <ModalRoot /> */}
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={hidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title={i18n.home}
            key="Home"
            icon={<CustomIcon name="home" type="home" style={styles.icon} />}
            selectedIcon={
              <CustomIcon name="home" type="home" style={styles.icon} />
            }
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
            <View style={styles.container} className={stylesLess.container}>
              <Home />
            </View>
          </TabBar.Item>
          {/* <TabBar.Item
            icon={<CustomIcon name="classify" type="classify" style={styles.icon} />}
            selectedIcon={<CustomIcon name="classify" type="classify" style={styles.icon} />}
            title={i18n.categories}
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
            <View style={styles.container} className={stylesLess.container}>
              <Categories />
            </View>
          </TabBar.Item> */}
          <TabBar.Item
            icon={<CustomIcon name="cart" type="cart" style={styles.icon} />}
            selectedIcon={
              <CustomIcon name="cart" type="cart" style={styles.icon} />
            }
            title={i18n.cart}
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
            <View style={styles.container} className={stylesLess.container}>
              <Cart />
            </View>
          </TabBar.Item>
          <TabBar.Item
            icon={<CustomIcon name="user" type="user" style={styles.icon} />}
            selectedIcon={
              <CustomIcon name="user" type="user" style={styles.icon} />
            }
            title={i18n.me}
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
            <View style={styles.container} className={stylesLess.container}>
              {<Me />}
            </View>
          </TabBar.Item>
        </TabBar>
      </View>
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
