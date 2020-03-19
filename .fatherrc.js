export default {
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  injectCSS: true,
  extractCSS: true,
  lessInBabelMode: true,
  esm: 'babel',
  cjs: 'babel',
  autoprefixer: {
    browsers: ['ie>9', 'Safari >= 6'],
  },
};
