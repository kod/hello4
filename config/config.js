import os from 'os';
import pageRoutes from './router.config';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        locale: {
          enable: true, // default false
          default: 'vi-VN',
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/PageLoading/index',
        },
        chunks: ['vendors', 'umi'],
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
  targets: {
    ie: 9,
  },
  hash: true,
  // chainWebpack(config) {
  //   config.optimization.splitChunks({
  //     cacheGroups: {
  //       vendors: {
  //         name: 'vendors',
  //         chunks: 'all',
  //         test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
  //       },
  //       commons: {
  //         name: 'commons',
  //         chunks: 'async',
  //         minChunks: 2,
  //         minSize: 0,
  //       },
  //     },
  //   });
  // },
  // 路由配置
  routes: pageRoutes,
};
