import os from 'os';
import pageRoutes from './router.config';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        targets: {
          ie: 11,
        },
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        ...(!process.env.TEST && os.platform() === 'darwin'
          ? {
              dll: {
                include: ['dva', 'dva/router', 'dva/saga'],
                exclude: ['@babel/runtime'],
              },
              hardSource: true,
            }
          : {}),
      },
    ],
  ],
  // 路由配置
  routes: pageRoutes,
};
