import routes from './src/routes';
import theme from './src/theme/theme';

export default {
  treeShaking: true,
  routes,
  theme,
  lessLoaderOptions: {},
  hash: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: '',
      dll: true,
      locale: {
        enable: true,
        default: 'zh-CN',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {},
  uglifyJSOptions(opts) {
    opts.uglifyOptions.compress.warnings = false;
    opts.uglifyOptions.compress.drop_debugger = true;
    opts.uglifyOptions.compress.drop_console = true;
    return opts;
  }
}
