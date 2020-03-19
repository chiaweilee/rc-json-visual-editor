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
  cssModules: {
    generateScopedName: '[name]-[local]',
  },
  injectCSS: true,
  lessInBabelMode: true,
  esm: 'rollup',
  cjs: 'rollup',
};
