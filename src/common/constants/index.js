export const DEBUG = false;
export const API_DEBUG = DEBUG;
export const IS_SHOW_LOG = DEBUG;
export const IS_I18N = DEBUG; // 是否支持多语言; 默认为越南语
export const CARMAXNUMBER = 50;
export const MINIMUM_PAYMENT_AMOUNT = 10000; // 最小支付金额
export const OSS_IMAGE_QUALITY = 70; // 图片压缩比例；1-100；100：不压缩；
export const LINE_HEIGHT_RATIO = 1.618; // 行高
export const IS_PROMPT_FIRSTPAY = true; // 没有选择首付时是否提示选择首付
export const MIN_FIRSTPAY_RATE = 0.1; // 最低首付比: 0, 0.1, 0.2, 0.3, 0.4, 0.5
export const IS_IOS = /iP(ad|hone|od)/.test(navigator.userAgent);
export const VERSION = '1.5.4';

// namespace -start-
export const GETADVERSTTOPINFO_NAMESPACE = 'getAdverstTopInfo';
export const ERROR_NAMESPACE = 'error';
export const LOGIN_NAMESPACE = 'login';
export const USERCERTIFICATEINFO_NAMESPACE = 'userCertificateInfo';
export const CART_NAMESPACE = 'cart';
export const CARDQUERY_NAMESPACE = 'cardQuery';
export const QUERYORDERLIST_NAMESPACE = 'queryOrderList';
export const GETSQUARESINFO_NAMESPACE = 'getSquaresInfo';

export const GETNEWESTINFO_NAMESPACE = 'getNewestInfo';
export const BANNERSWIPER_NAMESPACE = 'bannerSwiper';
export const ADVERSTINFO_NAMESPACE = 'adverstInfo';
export const INITADVERSTCOMMON_NAMESPACE = 'initAdverstCommon';
export const GETMENU_NAMESPACE = 'getMenu';
export const GETUSERINFOBYID_NAMESPACE = 'getUserInfoById';
export const CERTIFIEDINFORMATION_NAMESPACE = 'certifiedInformation';
export const OTP_NAMESPACE = 'otp';
export const REGISTER_NAMESPACE = 'register';
export const CHANGEPASSWORD_NAMESPACE = 'changePassword';
export const COLLECTION_NAMESPACE = 'collection';
export const PRODUCTDETAILINFO_NAMESPACE = 'productDetailInfo';
export const COMMENT_NAMESPACE = 'comment';
export const MODAL_NAMESPACE = 'modal';
export const ADDRESS_NAMESPACE = 'address';
export const ORDERCREATE_NAMESPACE = 'orderCreate';
export const COUPONSELECT_NAMESPACE = 'couponSelect';
export const ORDERPAY_NAMESPACE = 'orderPay';
export const CITYINFOS_NAMESPACE = 'cityInfos';
export const USERADDADDR_NAMESPACE = 'userAddAddr';
export const ADDRESSMODIFY_NAMESPACE = 'addressModify';
export const GETVOUCHERLIST_NAMESPACE = 'getVoucherList';
export const GETVOUCHER_NAMESPACE = 'getVoucher';
export const RECEIVEVOUCHER_NAMESPACE = 'receiveVoucher';
export const QUERYORDER_NAMESPACE = 'queryOrder';
export const RETURNMONEY_NAMESPACE = 'returnMoney';
export const ORDERCANCEL_NAMESPACE = 'orderCancel';
export const ADDEVALUATION_NAMESPACE = 'addEvaluation';
export const COLLECTFILES_NAMESPACE = 'collectFiles';
export const JUDGEVOUCHER_NAMESPACE = 'judgeVoucher';
export const SEARCHHISTORY_NAMESPACE = 'searchHistory';
export const FINDPRODUCTS_NAMESPACE = 'findProducts';
export const ADPHONE_NAMESPACE = 'adPhone';
export const GETALLPRODUCTINFO_NAMESPACE = 'getAllProductInfo';
// namespace -end-

export const DOMAIN = 'https://buyoo.vn';
export const MESSAGE_URL = 'http://m.me/buyooshop.vip';
export const SHARE_URL = `${DOMAIN}/html/downloadApp.html?userID=XXX`;
export const SUPPORT_CENTER_URL = `${DOMAIN}/html/buyIntroM.html`;
export const HOW_TO_BUY_URL = `${DOMAIN}/html/paystepM.html`;
export const BUSINESS_EMAIL = 'business.vn@buyoo.aisa';
export const SERVICE_EMAIL = 'service@buyoo.vip';
export const SERVICE_PHONE = '1900555506';
export const BUYOO = 'Buyoo';
export const BUYOOVIP = 'BuyooVip';
export const BUYOO_VN = `${BUYOO}.vip`;
export const ZALO = 'zalo';
export const GOOGLE_PLUS = 'google+';
export const FACEBOOK = 'facebook';
export const MONETARY = '₫'; // 货币单位
export const PAYOO_STORE_MAP = 'https://payoo.vn/map/public/?verify=true#'; // payoo门店地图
export const FUNCARD_HELP_WHAT = `${DOMAIN}/html/aboutFunCard.html#Buyoo-Funcard-la-gi`; // buyoo card 是什么
export const FUNCARD_HELP_APPLY = `${DOMAIN}/html/aboutFunCard.html#Cach-thuc-dang-ki-the-Buyoo-Fun-Card`; // 如何申请
export const FUNCARD_HELP_STAGE = `${DOMAIN}/html/aboutFunCard.html#Huong-dan-mua-hang-bang-Buyoo-Fun-Card`; // 如何分期
export const FUNCARD_HELP_REPAY = `${DOMAIN}/html/aboutFunCard.html#Thanh-toan-no-hang-thang-the-Buyoo-Fun-Card-nhu-the-nao`; // 如何还款

export const ICON_SCRIPTURL = '//at.alicdn.com/t/font_892500_eo65rtyplqm.js';

export const CREDIT_PAYWAY = 1;
export const INTERNET_BANK_PAYWAY = 2;
export const OFFLINE_PAYWAY = 5;
export const ONDELIVERY_PAYWAY = 6;
export const ONLINE_PAYWAY = 9;

export const PHONE_EXPR = /^(0?[0-9]{9}|0?[0-9]{10})$/; // 手机号
export const EMAIL_EXPR = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/; // 邮箱
export const NAME_EXPR = /^.*\s.*$/; // 越南姓名
export const IDENTIFICATION_EXPR = /^(\d{9}|\d{12})$/; // 越南身份证
export const CARD_PASSWORD_EXPR = /^\d{6}$/; // 交易密码
export const LOGIN_PASSWORD_EXPR = /^[\w~!@#$%^&*()_+`\-=[\]{}\\|;:,./<>?]{8,20}$/; // 登录密码
export const HTML_REGEX = /\/(\w+)\?/;
export const BRANDID_REGEX = /\.vip\/(.*)/;
export const ORDERNO_REGEX = /orderNo=(\d+)/;
export const TRADENO_REGEX = /tradeNo=(\d+)/;
export const CLASSIFYID_REGEX = /classifyId=(\d+)/;
export const SUBCLASSFYID_REGEX = /subClassfyId=(\d+)/;
export const THIRDCLASSFYID_REGEX = /thirdClassfyId=(\d+)/;
export const SHAREID_REGEX = /userID=([A-Z0-9]+)/;
export const PRIVATE_URL_REGEX = /(.*)\?/;
export const INVITATION_CODE_REGEX = /₫ ([A-Z0-9]+) ₫/; // 邀请码

export const WINDOW_WIDTH = document.documentElement.clientWidth;
export const WINDOW_HEIGHT = document.documentElement.clientHeight;
export const SIDEINTERVAL = WINDOW_WIDTH * 0.04;

export const APPBAR_HEIGHT = 0;
export const STATUSBAR_HEIGHT = 0;

export const FIRST_PAYMENT_RATE = [0, 0.1, 0.2, 0.3, 0.4, 0.5]; // 首付比例
export const REPAYMENT_MONTH = [3, 6, 9, 12]; // 分期数

export const PROVIDER_TYPE_MAP = {
  recharge: 32,
  phoneCard: 33,
  scratchCards: 34,
  32: 'recharge',
  33: 'phoneCard',
  34: 'scratchCards',
};

export const MODAL_TYPES = {
  ADDRESSADD: 'ADDRESSADD',
  PARAMSSELECT: 'PARAMSSELECT',
  LOADER: 'LOADER',
  ACTIONSHEET: 'ACTIONSHEET',
  BILLSELECT: 'BILLSELECT',
  ENTERPASSWORD: 'ENTERPASSWORD',
  SHARE: 'SHARE',
  PERMONTHPRICE: 'PERMONTHPRICE',
  STAGINGDETAILS: 'STAGINGDETAILS',
};

export const SCREENS = {
  Computer: 'Computer',
  Mobile: 'Mobile',
  SmartDigital: 'SmartDigital',
  Address: 'Address',
  AddressAdd: 'AddressAdd',
  AddressModify: 'AddressModify',
  AboutAs: 'AboutAs',
  Bill: 'Bill',
  BillDetail: 'BillDetail',
  Card: 'Card',
  Cart: 'Cart',
  Categories: 'Categories',
  CateList: 'CateList',
  CertifiedInformation: 'CertifiedInformation',
  CertifiedInformationContact: 'CertifiedInformationContact',
  CertifiedInformationSchool: 'CertifiedInformationSchool',
  Coupon: 'Coupon',
  CouponMy: 'CouponMy',
  CouponMyUsed: 'CouponMyUsed',
  CouponMyUnused: 'CouponMyUnused',
  CouponMyPast: 'CouponMyPast',
  CouponSelect: 'CouponSelect',
  BillMy: 'BillMy',
  BillCurrent: 'BillCurrent',
  BillOut: 'BillOut',
  BillOverdue: 'BillOverdue',
  Evalution: 'Evalution',
  ForgotPasswordOne: 'ForgotPasswordOne',
  ForgotPasswordTwo: 'ForgotPasswordTwo',
  Index: 'Index',
  Invite: 'Invite',
  Language: 'Language',
  Login: 'Login',
  Main: 'Main',
  Me: 'Me',
  MyCollection: 'MyCollection',
  Order: 'Order',
  OrderWrite: 'OrderWrite',
  Pay: 'Pay',
  PeriodSelect: 'PeriodSelect',
  Prepaid: 'Prepaid',
  PrepaidPhoneCard: 'PrepaidPhoneCard',
  PrepaidRecharge: 'PrepaidRecharge',
  PrepaidScratchCards: 'PrepaidScratchCards',
  ProductDetail: 'ProductDetail',
  OrderDetail: 'OrderDetail',
  ProductDetailImages: 'ProductDetailImages',
  ProductDetailMain: 'ProductDetailMain',
  ProductDetailMainGroupon: 'ProductDetailMainGroupon',
  ProductDetailParam: 'ProductDetailParam',
  GroupBuyList: 'GroupBuyList',
  QrCodeScanner: 'QrCodeScanner',
  Recharge: 'Recharge',
  RegisterFastStepOne: 'RegisterFastStepOne',
  RegisterFastStepTwo: 'RegisterFastStepTwo',
  RegisterStepOne: 'RegisterStepOne',
  RegisterStepTwo: 'RegisterStepTwo',
  RepaymentRecord: 'RepaymentRecord',
  SchoolSelect: 'SchoolSelect',
  SearchResult: 'SearchResult',
  SearchResultList: 'SearchResultList',
  SecurityCenter: 'SecurityCenter',
  Settings: 'Settings',
  Test: 'Test',
  TransactionPasswordStepOne: 'TransactionPasswordStepOne',
  TransactionPasswordStepTwo: 'TransactionPasswordStepTwo',
  WebView: 'WebView',
  StagingDetails: 'StagingDetails',
  PaymentCode: 'PaymentCode',
  CombinationPayment: 'CombinationPayment',
  StudentCardUpload: 'StudentCardUpload',
  IdCardUpload: 'IdCardUpload',
  HandHeldPhotoUpload: 'HandHeldPhotoUpload',
  BillDetailOld: 'BillDetailOld',
};

export const COUPONMY_TABNAVIGATOR_MAP = {
  CouponMyUnused: 1,
  CouponMyUsed: 2,
  CouponMyPast: 0,
  1: 'CouponMyUnused',
  2: 'CouponMyUsed',
  0: 'CouponMyPast',
};

export const BILLMY_TABNAVIGATOR_MAP = {
  [SCREENS.BillCurrent]: 1,
  [SCREENS.BillOut]: 3,
  [SCREENS.BillOverdue]: 5,
  1: SCREENS.BillCurrent,
  3: SCREENS.BillOut,
  5: SCREENS.BillOverdue,
};
