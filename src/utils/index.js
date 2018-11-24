import qs from 'qs';
import { Modal } from 'antd-mobile';
import router from 'umi/router';

import { formatMessage } from 'umi/locale';
import {
  CREDIT_PAYWAY,
  INTERNET_BANK_PAYWAY,
  OFFLINE_PAYWAY,
  SCREENS,
  HTML_REGEX,
  BRANDID_REGEX,
  CLASSIFYID_REGEX,
  SUBCLASSFYID_REGEX,
  THIRDCLASSFYID_REGEX,
  ORDERNO_REGEX,
  TRADENO_REGEX,
  SHAREID_REGEX,
  ONDELIVERY_PAYWAY,
  ONLINE_PAYWAY,
  IS_IOS,
  OSS_IMAGE_QUALITY,
} from '@/common/constants';

const invitationCodeNavigate = (navigation, id) => {
  router.push(`/${SCREENS.RegisterStepOne}?${qs.stringify({ id })}`);
  // navigation.dispatch(
  //   NavigationActions.reset({
  //     index: 2,
  //     actions: [
  //       NavigationActions.navigate({
  //         routeName: SCREENS.Index,
  //         params: { invitationCodeNavigate: true },
  //       }),
  //       NavigationActions.navigate({ routeName: SCREENS.Login }),
  //       NavigationActions.navigate({
  //         routeName: SCREENS.RegisterStepOne,
  //         params: {
  //           id,
  //         },
  //       }),
  //     ],
  //   }),
  // );
};

export const xOssProcess = (isIos, ossImageQuality) =>
  isIos
    ? `x-oss-process=image/quality,Q_${ossImageQuality}`
    : `x-oss-process=image/format,webp/quality,Q_${ossImageQuality}`;

export function addEventListener(type, listener) {
  // TODO
  // 输入值：变量类型，变量必填
  // 返回值：e.detail 统一返回类型，系统默认为null

  if (type) {
    window.addEventListener(type, listener, false);
  } else {
    console.warn('type is undefined');
  }
}

export function removeEventListener(type, listener) {
  // TODO
  // 输入值：变量类型，变量必填
  window.removeEventListener(type, listener, false);
}

export function dispatchEvent(type, params = {}) {
  // TODO
  // 输入值：变量类型判断；type必填，params选填
  window.dispatchEvent(
    new CustomEvent(type, {
      detail: params,
    }),
  );
}

export const addressJoin = item =>
  item.address +
  (item.division4thName ? ', ' : '') +
  item.division4thName +
  (item.division3rdName ? ', ' : '') +
  item.division3rdName +
  (item.division2ndName ? ', ' : '') +
  item.division2ndName;

export const createOrderno = funid => {
  const mydate = new Date();
  return (
    funid +
    mydate.getDay() +
    mydate.getHours() +
    mydate.getMinutes() +
    mydate.getSeconds() +
    mydate.getMilliseconds() +
    Math.round(Math.random() * 10000)
  );
};

export const tradeStatusCodes = (code = 10000) => {
  const codes = {
    10000: formatMessage({ id: 'pendingPayment' }), // '交易创建，等待买家付款'
    10001: formatMessage({ id: 'successfulCopy' }), // '交易支付成功'
    10002: formatMessage({ id: 'paymentFailed' }), // '交易支付失败'
    10003: formatMessage({ id: 'transactionPaymentWaiting' }), // '交易支付等待'
    10004: formatMessage({ id: 'orderPendingAudit' }), // '交易成功,等待审核(新流程)'
    20000: formatMessage({ id: 'paymentOvertimeClosed' }), // '未付款交易超时关闭，或支付完成后全额退款'
    20001: formatMessage({ id: 'endTransactionNonRefundable' }), // '交易结束，不可退款'
    20002: formatMessage({ id: 'transactionRejectedFullRefund' }), // '交易拒绝, 全额退款'
    20003: formatMessage({ id: 'paymentOvertimeClosed' }), // '交易支付超时, 订单退回'
    30000: formatMessage({ id: 'inDelivery' }), // 等待发货
    30001: formatMessage({ id: 'pendingEvaluation' }), // '已收货,未评价'
    30002: formatMessage({ id: 'transactionComplete' }), // '已收货,已评价'
    30003: formatMessage({ id: 'waitingForTheOrder' }), // '等待拼单'
    40000: formatMessage({ id: 'cancelTransaction' }), // '交易取消(其他)'
    40001: 'Incorrect operation', // 取消交易理由(操作有误)
    40002: 'Error order', // 取消交易理由(错误下单)
    40003: 'Other channels are cheaper', // 取消交易理由(其他渠道价格更低)
    40004: 'Staging error', // 取消交易理由(分期错误)
    40005: 'Do not want to buy', // 取消交易理由(不想买了)
  };
  return codes[code];
};

// 不同订单状态下，可以的操作
export const operateForTradeStatusCodes = (code = 10000, payWay = 2) => {
  const result = [];
  switch (~~code) {
    case 10000:
      if (payWay === 5) {
        result.push(formatMessage({ id: 'viewPaymentCode' }));
      } else {
        result.push(formatMessage({ id: 'payment' }));
      }
      break;

    case 30001:
      result.push(formatMessage({ id: 'evaluation' }));
      break;

    case 10001:
    case 10002:
    case 10003:
    case 10004:
    case 20000:
    case 20001:
    case 20002:
    case 20003:
    case 30000:
    case 30002:
    case 30003:
    case 40000:
    case 40001:
    case 40002:
    case 40003:
    case 40004:
    case 40005:
      result.push(formatMessage({ id: 'view' }));
      break;

    default:
      result.push(formatMessage({ id: 'view' }));
      break;
  }
  return result;
};

export const billStatusCodes = (code = 10000) => {
  const codes = {
    10000: formatMessage({ id: 'unsettledBills' }), // 未出账
    10001: formatMessage({ id: 'notPaidOff' }), // 未还清
    10002: formatMessage({ id: 'hasPaidOff' }), // 已还清
    10007: formatMessage({ id: 'overdue' }), // '已逾期'
  };
  return codes[code];
};

export const billInitDate = () => {
  const nD = new Date();
  let year = nD.getFullYear();
  let month = nD.getMonth() + 1;
  const date = nD.getDate();
  if (date <= 5) {
    if (month === 1) {
      year -= 1;
      month = 12;
    } else {
      month -= 1;
    }
  }

  return {
    year,
    month,
  };
};

export const payWayToText = payWay => {
  let result = '';
  switch (~~payWay) {
    case CREDIT_PAYWAY:
      result = formatMessage({ id: 'funCard' }); // 信用卡
      break;

    case INTERNET_BANK_PAYWAY:
      result = formatMessage({ id: 'internetBanking' }); // 网银支付
      break;

    case OFFLINE_PAYWAY:
      result = formatMessage({ id: 'paymentCollectingShop' }); // 线下支付
      break;

    case ONDELIVERY_PAYWAY:
      result = formatMessage({ id: 'paymentOnDelivery' }); // 货到付款
      break;

    case ONLINE_PAYWAY:
      result = formatMessage({ id: 'onlinePay' }); // 线上支付
      break;

    default:
      break;
  }

  return result;
};

export const orderWritePayWayArray = () => [
  {
    key: ONLINE_PAYWAY,
    value: formatMessage({ id: 'onlinePay' }),
  },
  {
    key: ONDELIVERY_PAYWAY,
    value: formatMessage({ id: 'paymentOnDelivery' }),
  },
];

export const payWayArray = DEBUG =>
  DEBUG
    ? [
        {
          key: CREDIT_PAYWAY,
          value: formatMessage({ id: 'funCard' }),
        },
        {
          key: INTERNET_BANK_PAYWAY,
          value: formatMessage({ id: 'internetBanking' }),
        },
        {
          key: OFFLINE_PAYWAY,
          value: formatMessage({ id: 'paymentCollectingShop' }),
        },
      ]
    : [
        {
          key: INTERNET_BANK_PAYWAY,
          value: formatMessage({ id: 'internetBanking' }),
        },
        {
          key: OFFLINE_PAYWAY,
          value: formatMessage({ id: 'paymentCollectingShop' }),
        },
      ];

export const judge = (boolean, trueFunc, falseFunc = () => {}) => {
  if (boolean) {
    trueFunc();
  } else {
    falseFunc();
  }
};

/* 防止重复提交
- 需在当前组件state里添加submitfreeze字段(boolean)
- 需在当前组件componentWillUnmount方法里添加clearTimeout(this.setTimeoutId);
*/
export const submitDuplicateFreeze = (submitfreeze, self, callback) => {
  if (submitfreeze === false) {
    callback();
    self.setState({ submitfreeze: true });
    self.setTimeoutId = setTimeout(() => {
      self.setState({ submitfreeze: false });
    }, 2000);
  }
};

// navigateCheckLogin
export const navigateCheckLogin = (authUser, screensName, params = {}) => {
  if (authUser) {
    router.push(`/${SCREENS[screensName]}?${qs.stringify(params)}`);
  } else {
    router.push(SCREENS.Login);
  }
};

export const analyzeUrlNavigate = ({
  linkUrl,
  navigation,
  authUser = false,
  isQrCode = false,
}) => {
  const htmlRegexResult = linkUrl.match(HTML_REGEX);

  let shareIdResult = null;
  let orderNoRegexResult = null;
  let tradeNoRegexResult = null;
  let brandIdRegexResult = null;
  let classifyIdRegexResult = null;
  let subClassfyIdRegexResult = null;
  let thirdClassfyIdRegexResult = null;

  const customNavigate = (routeName, params = {}) => {
    if (isQrCode) {
      // navigation.dispatch(
      //   NavigationActions.reset({
      //     index: 1,
      //     actions: [
      //       NavigationActions.navigate({ routeName: SCREENS.Index }),
      //       NavigationActions.navigate({ routeName, params }),
      //     ],
      //   }),
      // );
    } else {
      router.push(`/${routeName}?${qs.stringify(params)}`);
    }
  };

  const navImg1More = () => {
    brandIdRegexResult = linkUrl.match(BRANDID_REGEX);
    classifyIdRegexResult = linkUrl.match(CLASSIFYID_REGEX);
    subClassfyIdRegexResult = linkUrl.match(SUBCLASSFYID_REGEX);
    thirdClassfyIdRegexResult = linkUrl.match(THIRDCLASSFYID_REGEX);
    router.push(
      `/${SCREENS.OrderDetail}?${qs.stringify({
        parent_id: brandIdRegexResult ? brandIdRegexResult[1] : '0',
        classfy_id: classifyIdRegexResult ? classifyIdRegexResult[1] : '0',
        sub_classfy_id: subClassfyIdRegexResult
          ? subClassfyIdRegexResult[1]
          : '0',
        third_classfy_id: thirdClassfyIdRegexResult
          ? thirdClassfyIdRegexResult[1]
          : '0',
      })}`,
    );
  };

  if (!htmlRegexResult) {
    if (isQrCode) {
      Modal.alert('', formatMessage({ id: 'error' }), [
        {
          text: formatMessage({ id: 'confirm' }),
          style: 'default',
          onPress: () => {
            router.go(-1);
          },
        },
      ]);
    }
  } else {
    switch (htmlRegexResult[1]) {
      case 'more':
        navImg1More(linkUrl);
        break;

      case 'order':
        // 我的订单
        if (authUser) {
          customNavigate(SCREENS.Order, { index: 0 });
        } else {
          customNavigate(SCREENS.Login);
        }

        break;

      case 'couponcenter':
        // 领券中心
        customNavigate(SCREENS.Coupon);
        break;

      case 'prepaid':
        // 充值
        customNavigate(SCREENS.Prepaid);
        break;

      case 'computerPage':
        // 电脑
        customNavigate(SCREENS.Computer);
        break;

      case 'cellphoneBanner':
        // 手机
        customNavigate(SCREENS.Mobile);
        break;

      case 'shumapeijian':
        // 智能数码
        customNavigate(SCREENS.SmartDigital);
        break;

      case 'details':
        // 商品详情
        brandIdRegexResult = linkUrl.match(BRANDID_REGEX);
        if (brandIdRegexResult) {
          customNavigate(SCREENS.ProductDetail, {
            brandId: brandIdRegexResult[1],
          });
        }
        break;

      case 'orderDetail':
        // 订单详情
        orderNoRegexResult = linkUrl.match(ORDERNO_REGEX);
        tradeNoRegexResult = linkUrl.match(TRADENO_REGEX);
        if (brandIdRegexResult) {
          customNavigate(SCREENS.OrderDetail, {
            tradeNo: tradeNoRegexResult[1],
            orderNo: orderNoRegexResult[1],
          });
        }
        break;

      case 'watch':
        // 手表
        customNavigate(SCREENS.CateList, {
          parent_id: '7',
          classfy_id: '0',
          sub_classfy_id: '0',
          third_classfy_id: '0',
        });
        break;

      case 'downloadApp':
        // 邀请注册
        shareIdResult = linkUrl.match(SHAREID_REGEX);
        invitationCodeNavigate(
          navigation,
          shareIdResult ? shareIdResult[1] : '',
        );
        break;

      default:
        if (isQrCode) {
          Modal.alert('', formatMessage({ id: 'error' }), [
            {
              text: formatMessage({ id: 'confirm' }),
              style: 'default',
              onPress: () => {
                router.go(-1);
              },
            },
          ]);
          Modal.alert('', formatMessage({ id: 'error' }), [
            {
              text: formatMessage({ id: 'confirm' }),
              style: 'default',
              onPress: () => {
                router.go(-1);
              },
            },
          ]);
        }
        break;
    }
  }
};

/**
 * webView图片拼接
 * @param {array} images
 */
export const jointWebViewImages = images => {
  let WebViewImages;
  switch (images.length) {
    case 0:
      WebViewImages = '';
      break;

    case 1:
      WebViewImages = `<img src="${images}?${xOssProcess(
        IS_IOS,
        OSS_IMAGE_QUALITY,
      )}" alt="image">`;
      break;

    default:
      WebViewImages = images.reduce((a, b, index) => {
        let resultStr = '';
        if (index === 1) {
          if (a)
            resultStr = `<img src="${a}?${xOssProcess(
              IS_IOS,
              OSS_IMAGE_QUALITY,
            )}" alt="image">`;
          if (b)
            resultStr += `<img src="${b}?${xOssProcess(
              IS_IOS,
              OSS_IMAGE_QUALITY,
            )}" alt="image">`;
        } else {
          if (b)
            resultStr = `<img src="${b}?${xOssProcess(
              IS_IOS,
              OSS_IMAGE_QUALITY,
            )}" alt="image">`;
          resultStr = a + resultStr;
        }
        return resultStr;
      });
      break;
  }
  return WebViewImages;
};

export const certificateUploadImage = ({
  ImagePicker,
  ImageResizer,
  openModal,
  MODAL_TYPES,
  wayButtons,
  callback,
}) => {
  const createResizedImageImageResizer = ({ uri, width, height }) => {
    ImageResizer.createResizedImage(uri, width * 0.5, height * 0.5, 'JPEG', 30)
      .then(response => {
        callback(response);
      })
      .catch(err => {
        console.dir(err);
      });
  };

  const actionSheetCallback = ret => {
    if (ret.buttonIndex === -1) return false;
    if (ret.buttonIndex === 0) {
      // 相册
      ImagePicker.openPicker({
        // width: 300,
        // height: 400,
        // cropping: true
      }).then(image => {
        createResizedImageImageResizer({
          uri: image.path,
          width: image.width,
          height: image.height,
        });
      });
    } else {
      // 拍照
      ImagePicker.openCamera({
        // width: 300,
        // height: 400,
        // cropping: true
      }).then(image => {
        createResizedImageImageResizer({
          uri: image.path,
          width: image.width,
          height: image.height,
        });
      });
    }
    return true;
  };

  openModal(MODAL_TYPES.ACTIONSHEET, {
    callback: ret => actionSheetCallback(ret),
    data: wayButtons,
  });
};

/**
 * 字母大写工具包
 * capitalize: 字符串中第一个单词首字母大写
 * perCapitalize: 字符串中每一个单词首字母大写
 * 示例：
 * capitalizeTool().capitalize('react') // React
 * capitalizeTool().perCapitalize('react native') // React Native
 */
export const capitalizeTool = () => {
  const capitalize = word => word[0].toUpperCase() + word.slice(1);
  const perCapitalize = str =>
    str
      .split(' ')
      .map(val => capitalize(val))
      .join(' ');
  return {
    capitalize,
    perCapitalize,
  };
};

export const a = (k, v) => sessionStorage.setItem(k, v);
export const b = c => sessionStorage.getItem(c);
