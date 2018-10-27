import { DEBUG, IS_SHOW_LOG } from '../common/constants';

const axios = require('axios');
const qs = require('qs');

const TIMEOUT = 30 * 1000;

const BASE_URL = DEBUG ? 'http://buyoo.club' : '';

const PORT_80 = DEBUG ? ':8180' : 'https://uc.buyoo.vn';
// const PORT_81 = DEBUG ? ':8181' : 'https://payment.buyoo.vn';
const PORT_83 = DEBUG ? ':8183' : 'https://trade.buyoo.vn';
const PORT_84 = DEBUG ? ':8184' : 'https://settlement.buyoo.vn';
const PORT_85 = DEBUG ? ':8185' : 'https://commodity.buyoo.vn';
const PORT_86 = DEBUG ? ':8186' : 'https://risk.buyoo.vn';
const PORT_87 = DEBUG ? ':8187' : 'https://market.buyoo.vn';

function callApi(url, options) {
  const finalUrl = /^https?:\/\//i.test(url) ? url : BASE_URL + url;
  if (IS_SHOW_LOG) {
    console.log(finalUrl);
    console.log(options);
  }
  return axios(finalUrl, options)
    .then(res => {
      if (IS_SHOW_LOG) console.log(JSON.stringify(res.data));
      return res.data;
    })
    .catch(err => {
      if (err.response) {
        throw err.response.data;
      } else {
        throw err.message;
      }
    });
}

class ReactStore {
  constructor() {
    this.headers = {
      // "App-OS": "ios",
      // "Accept-Language": "en-us",
      // "App-OS-Version": "9.3.3",
      // "App-Version": "6.8.3",
      // "User-Agent": "PixivIOSApp/6.8.3 (iOS 9.0; iPhone8,2)"
    };
  }

  returnMoney(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/installment/returnMoney`, options);
  }

  orderCreate(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_83}/fun/trade/order/create`, options);
  }

  createNormalOrder(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_83}/fun/trade/createNormalOrder`, options);
  }

  payNormalOrder(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_83}/fun/trade/payNormalOrder`, options);
  }

  queryBillList(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/trade/queryBillList`, options);
  }

  inquiryBill(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/trade/inquiryBill`, options);
  }

  getPhoneRecharge(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/virtual/getPhoneRecharge`, options);
  }

  getProvidersCard(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/virtual/getProvidersCard`, options);
  }

  get3GProvidersCard(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_85}/fun/virtual/get3GProvidersCard`,
      options,
    );
  }

  getProvidersValue(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/virtual/getProvidersValue`, options);
  }

  queryOrderList(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_83}/fun/trade/queryOrderList`, options);
  }

  // orderPay(o) {
  //   let options = o;
  //   if (!options) {
  //     return Promise.reject(new Error('fields required'));
  //   }
  //   const data = qs.stringify(options);
  //   options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     data,
  //   };

  //   return axios(`http://192.168.7.99${PORT_83}/fun/trade/order/pay`, options)
  //     .then(res => {
  //       if (res.data.status !== 10000) {
  //         throw new Error(res.data.result);
  //       }
  //       return res.data;
  //     })
  //     .catch(err => {
  //       throw err;
  //     });
  // }

  orderPay(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_83}/fun/trade/order/pay`, options);
  }

  orderCancel(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_83}/fun/trade/orderCancel`, options);
  }

  static orderPayInternetBank(o) {
    const options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return `${BASE_URL}${PORT_83}/fun/trade/order/pay?${queryString}`;
  }

  static payNormalOrderInternetBank(o) {
    const options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return `${BASE_URL}${PORT_83}/fun/trade/payNormalOrder?${queryString}`;
  }

  queryOrder(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_83}/fun/trade/queryOrder`, options);
  }

  billDetails(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/bill/billDetails`, options);
  }

  repaymentRecord(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/bill/repaymentRecord`, options);
  }

  searchMonth(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/bill/searchMonth`, options);
  }

  searchMonthDetail(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/bill/searchMonthDetail`, options);
  }

  getBillDetail(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/bill/getBillDetail`, options);
  }

  billByYear(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/bill/billByYear`, options);
  }

  queryGoods(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/user/consume/queryGoods`, options);
  }

  cardSubmit(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/userCenter/card/submit`, options);
  }

  cardQuery(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/userCenter/card/query`, options);
  }

  userCertificateInfo(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/usercenter/userViewDetailInfo`,
      options,
    );
  }

  receiveVoucher(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/receiveVoucher`, options);
  }

  getVoucherList(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/getVoucherList`, options);
  }

  judgeVoucher(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/judgeVoucher`, options);
  }

  userAddDetailInfo(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/usercenter/userAddDetailInfo`,
      options,
    );
  }

  userGetCollection(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/usercenter/userGetCollection`,
      options,
    );
  }

  userViewAddr(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/userViewAddr`, options);
  }

  useraddaddr(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/userAddAddr`, options);
  }

  userDelAddrs(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/userDelAddrs`, options);
  }

  userModifyAddr(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/userModifyAddr`, options);
  }

  getCityInfos(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/getCityInfos`, options);
  }

  getSchoolInfo(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/getSchoolInfo`, options);
  }

  userBatchCollection(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/usercenter/userBatchCollection`,
      options,
    );
  }

  userCancelCollection(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/usercenter/userCancelCollection`,
      options,
    );
  }

  checkPayPasword(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/userCenter/userAction/checkPayPasword`,
      options,
    );
  }

  otp(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/userCenter/userAction/otp`, options);
  }

  updatePeriod(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/userCenter/userAction/updatePeriod`,
      options,
    );
  }

  register(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/userCenter/userAction/register`,
      options,
    );
  }

  modifyPayPassword(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/userCenter/userAction/modifyPayPassword`,
      options,
    );
  }

  getUserInfoById(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/userCenter/userAction/getUserInfoById`,
      options,
    );
  }

  login(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/userCenter/userAction/login`,
      options,
    );
  }

  changePassword(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/userCenter/userAction/changePassword`,
      options,
    );
  }

  initTopDigital(o) {
    const options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/digital/initTopDigital?${queryString}`,
    );
  }

  initAdDigital(o) {
    const options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/digital/initAdDigital?${queryString}`,
    );
  }

  initNewComputer(o) {
    const options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/computer/initNewComputer?${queryString}`,
    );
  }

  initTopComputer(o) {
    const options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/computer/initTopComputer?${queryString}`,
    );
  }

  initTopCellphone(o) {
    const options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/cellphone/initTopCellphone?${queryString}`,
    );
  }

  initAdCellphone(o) {
    const options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/cellphone/initAdCellphone?${queryString}`,
    );
  }

  getEvaluationInfo(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_85}/fun/commodity/getEvaluationInfo`,
      options,
    );
  }

  addEvaluation(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/addEvaluation`, options);
  }

  getMenu(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/getMenu`, options);
  }

  getProductDetailInfo(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_85}/fun/commodity/getProductDetailInfo`,
      options,
    );
  }

  mergeGetInfo(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/merge/getInfo`, options);
  }

  mergeGetDetail(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/merge/getDetail`, options);
  }

  mergeGetSlave(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/merge/getSlave`, options);
  }

  mergeCheck(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/merge/check`, options);
  }

  mergeGetMaster(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/merge/getMaster`, options);
  }

  mergeGate(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/merge/gate`, options);
  }

  getAdverstInfo(o) {
    const options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );

    return this.requestUrl(
      `${PORT_85}/fun/commodity/getAdverstInfo?${queryString}`,
    );
  }

  getAdverstTopInfo(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_85}/fun/commodity/getAdverstTopInfo`,
      options,
    );
  }

  getAllProductInfo(o) {
    const options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );

    return this.requestUrl(
      `${PORT_85}/fun/commodity/getAllProductInfo?${queryString}`,
    );
  }

  findProducts(o) {
    const options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );

    return this.requestUrl(
      `${PORT_85}/fun/commodity/findProducts?${queryString}`,
    );
  }

  getPromotionInfo(o) {
    const options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/commodity/getPromotionInfo?${queryString}`,
    );
  }

  getSquaresInfo(o) {
    const options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/commodity/getSquaresInfo?${queryString}`,
    );
  }

  getNewestInfo(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    // const queryString = qs.stringify(
    //   Object.assign(
    //     {
    //       // filter,
    //     },
    //     options
    //   )
    // );

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_85}/fun/commodity/getNewestInfo`, options);
  }

  cartGetInfo(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_85}/fun/commodity/cart/getInfo`, options);
  }

  cartRemove(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_85}/fun/commodity/cart/remove`, options);
  }

  cartChangeNum(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_85}/fun/commodity/cart/changeNum`, options);
  }

  cartGate(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_85}/fun/commodity/cart/gate`, options);
  }

  collectFiles(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    // const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'multipart/form-data',
      },
      data: options,
    };
    return this.requestUrl(`${PORT_80}/fun/userfile/collectFiles`, options);
  }

  uploadImg(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: options,
    };
    return this.requestUrl(`${PORT_80}/fun/userfile/uploadImg`, options);
  }

  getImgUrl(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_80}/fun/userfile/getImgUrl`, options);
  }

  submitInfo(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_86}/fun/risk/audit/submitInfo`, options);
  }

  auditGetInfo(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_86}/fun/risk/audit/getInfo`, options);
  }

  getVoucher(o) {
    let options = o;
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_87}/fun/market/getVoucher`, options);
  }

  requestUrl(url, o) {
    let options = o;
    // if (!url) {
    //   return Promise.reject('Url cannot be empty');
    // }
    options = options || {};
    options.timeout = TIMEOUT;
    options.headers = Object.assign({}, this.headers, options.headers || {});

    return callApi(url, options)
      .then(json => json)
      .catch(err => {
        // if (this.rememberPassword) {
        //   if (this.username && this.password) {
        //     return this.login(this.username, this.password).then(() => {
        //       options.headers.Authorization = `Bearer ${this.auth.access_token}`;
        //       return callApi(url, options);
        //     });
        //   }
        // }
        throw err;
      });
  }
}

module.exports = ReactStore;
