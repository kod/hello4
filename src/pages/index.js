import React, { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';
import { connect } from 'dva';
import { GET_ADVERST_TOP_INFO } from '@/common/constants/actionTypes';
import { GETADVERSTTOPINFO } from '@/common/constants';

@connect(
  state => {
    const { bannerSwiper } = state;

    // const {

    // } = props;

    return {
      bannerSwiper,
    };
  },
  {
    getAdverstTopInfoFetch() {
      return {
        type: `${GETADVERSTTOPINFO}/${GET_ADVERST_TOP_INFO.REQUEST}`,
        payload: {},
      };
    },
  },
)
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: ['1', '2', '3'],
      imgHeight: 176,
    };
  }

  componentDidMount() {
    const { getAdverstTopInfoFetch } = this.props;
    getAdverstTopInfoFetch();
  }

  render() {
    const { data, imgHeight } = this.state;
    return (
      <div>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) =>
            console.log(`slide from ${from} to ${to}`)
          }
          afterChange={index => console.log('slide to', index)}
        >
          {data.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{
                display: 'inline-block',
                width: '100%',
                height: imgHeight,
              }}
            >
              <img
                src="https://oss.buyoo.vn/commodity/img/index_ad/1523875220732_1440x498.jpg"
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default Index;
