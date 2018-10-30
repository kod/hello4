import React from 'react';
import { TabBar } from 'antd-mobile';
import { WINDOW_HEIGHT } from '@/common/constants';
import Home from '@/pages/home/home';
import CustomIcon from '@/components/CustomIcon';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabBarIndex: 0,
      hidden: false,
    };
  }

  renderContent(pageText) {
    return (
      <div>
        111
      </div>
    );
  }

  render() {
    const { hidden, tabBarIndex } = this.state;

    const styles = {
      wrap: {
        height: WINDOW_HEIGHT - 50,
      },
      icon: {
        fontSize: 16,
        width: 22,
        height: 22,
      },
    };

    return (
      <div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={hidden}
        >
          <TabBar.Item
            title="Life"
            key="Life"
            icon={<CustomIcon type="home" style={styles.icon} />}
            selectedIcon={<CustomIcon type="home" style={styles.icon} />}
            selected={tabBarIndex === 0}
            // badge={1}
            onPress={() => {
              this.setState({
                tabBarIndex: 0,
              });
            }}
            data-seed="logId"
          >
            <div style={styles.wrap}>
              <Home />
            </div>
          </TabBar.Item>
          <TabBar.Item
            icon={<CustomIcon type="classify" style={styles.icon} />}
            selectedIcon={<CustomIcon type="classify" style={styles.icon} />}
            title="Koubei"
            key="Koubei"
            // badge="new"
            selected={tabBarIndex === 1}
            onPress={() => {
              this.setState({
                tabBarIndex: 1,
              });
            }}
            data-seed="logId1"
          >
            <div style={styles.wrap}>
              {this.renderContent('Koubei')}
            </div>
          </TabBar.Item>
          <TabBar.Item
            icon={<CustomIcon type="cart" style={styles.icon} />}
            selectedIcon={<CustomIcon type="cart" style={styles.icon} />}
            title="Friend"
            key="Friend"
            // dot
            selected={tabBarIndex === 2}
            onPress={() => {
              this.setState({
                tabBarIndex: 2,
              });
            }}
          >
            <div style={styles.wrap}>
              {this.renderContent('Koubei')}
            </div>
          </TabBar.Item>
          <TabBar.Item
            icon={<CustomIcon type="user" style={styles.icon} />}
            selectedIcon={<CustomIcon type="user" style={styles.icon} />}
            title="My"
            key="my"
            selected={tabBarIndex === 3}
            onPress={() => {
              this.setState({
                tabBarIndex: 3,
              });
            }}
          >
            <div style={styles.wrap}>
              {this.renderContent('Koubei')}
            </div>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default Index;
