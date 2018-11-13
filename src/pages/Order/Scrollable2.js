import React from 'react';
import { connect } from 'dva';
import { PullToRefresh, ListView } from 'antd-mobile';
import { WINDOW_HEIGHT } from '@/common/constants';

import * as queryOrderListActionCreators from '@/common/actions/queryOrderList';

const dataOri = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒1',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: "McDonald's invites you",
    des: '不是所有的兼职汪都需要风吹日晒2',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒3',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒4',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: "McDonald's invites you",
    des: '不是所有的兼职汪都需要风吹日晒5',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒6',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒7',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: "McDonald's invites you",
    des: '不是所有的兼职汪都需要风吹日晒8',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒9',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒10',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: "McDonald's invites you",
    des: '不是所有的兼职汪都需要风吹日晒11',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒12',
  },
];

@connect(
  state => {
    const { login, queryOrderList } = state;

    return {
      authUser: login.user,
      queryOrderListItem: queryOrderList.item,
    };
  },
  {
    ...queryOrderListActionCreators,
  },
)
class Scrollable extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      data: [],
      dataSource,
      refreshing: true,
      isLoading: true,
      useBodyScroll: false,
      hasMore: true,
    };
  }

  componentDidMount() {
    this.fetchData();
    setTimeout(() => {
      const { data } = this.state;
      this.genData([...data, ...dataOri]);
      this.setState({
        refreshing: false,
        isLoading: false,
      });
    }, 1500);
  }

  genData = newData => {
    console.log(this.props);

    const { dataSource } = this.state;

    this.setState({
      data: newData,
      dataSource: dataSource.cloneWithRows(
        newData.map((_, key) => `row - ${key}`),
      ),
    });
  };

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    setTimeout(() => {
      this.rData = this.genData(dataOri);
      this.setState({
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };

  onEndReached = () => {
    const { isLoading, hasMore } = this.state;
    if (isLoading && !hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    setTimeout(() => {
      const { data } = this.state;
      this.genData([...data, ...dataOri]);
      this.setState({
        isLoading: false,
      });
    }, 1000);
  };

  fetchData() {
    const { itemKey, status, queryOrderListFetch } = this.props;
    queryOrderListFetch({
      index: itemKey,
      status,
    });
  }

  render() {
    const {
      dataSource,
      isLoading,
      useBodyScroll,
      refreshing,
      data,
    } = this.state;
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      const obj = data[rowID];
      return (
        <div
          key={rowID}
          style={{
            padding: '0 15px',
            backgroundColor: 'white',
          }}
        >
          <div
            style={{
              height: '50px',
              lineHeight: '50px',
              color: '#888',
              fontSize: '18px',
              borderBottom: '1px solid #ddd',
            }}
          >
            {obj.title}
          </div>
          <div
            style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}
          >
            <img
              style={{ height: '63px', width: '63px', marginRight: '15px' }}
              src={obj.img}
              alt=""
            />
            <div style={{ display: 'inline-block' }}>
              <div
                style={{
                  marginBottom: '8px',
                  color: '#000',
                  fontSize: '16px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '250px',
                }}
              >
                {obj.des}-{rowData}
              </div>
              <div style={{ fontSize: '16px' }}>
                <span style={{ fontSize: '30px', color: '#FF6E27' }}>
                  {rowID}
                </span>{' '}
                元/任务
              </div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <div>
        <ListView
          dataSource={dataSource}
          renderFooter={() => (
            <div style={{ padding: 5, textAlign: 'center' }}>
              {isLoading ? 'Loading...' : 'Loaded'}
            </div>
          )}
          renderRow={row}
          renderSeparator={separator}
          useBodyScroll={useBodyScroll}
          style={{
            height: WINDOW_HEIGHT - 45 - 50,
          }}
          pullToRefresh={
            <PullToRefresh refreshing={refreshing} onRefresh={this.onRefresh} />
          }
          onEndReached={this.onEndReached}
          pageSize={5}
        />
      </div>
    );
  }
}

export default Scrollable;
