// import { Icon } from 'antd';
// import { ICON_SCRIPTURL } from '@/common/constants';

// export default Icon.createFromIconfontCN({
//   scriptUrl: ICON_SCRIPTURL, // 在 iconfont.cn 上生成
// });

import createFromIconfontCN from '../BuyooIcon/IconFont';
import { ICON_SCRIPTURL } from '@/common/constants';

export default createFromIconfontCN({
  scriptUrl: ICON_SCRIPTURL, // 在 iconfont.cn 上生成
});
