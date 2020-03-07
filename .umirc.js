export default {
  base: '/rc-visual-json-editor/',
  publicPath: '/rc-visual-json-editor/',
  cssPublicPath: '/rc-visual-json-editor/',
  runtimePublicPath: true,
  outputPath: 'docs',
  chainWebpack(config) {
    config.plugins.delete('progress');
  },
};
