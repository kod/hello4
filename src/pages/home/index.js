import React from 'react';
import { TabBar } from 'antd-mobile';
import { WINDOW_HEIGHT } from '@/common/constants';
import Home from '@/pages/home/home';

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
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selected={tabBarIndex === 0}
            badge={1}
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
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            title="Koubei"
            key="Koubei"
            badge="new"
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
            icon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            selectedIcon={
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  background:
                    'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
                }}
              />
            }
            title="Friend"
            key="Friend"
            dot
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
            icon={{
              uri:
                'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
            }}
            selectedIcon={{
              uri:
                'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
            }}
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
