module.exports = {
    chainWebpack: config => {
      config.optimization.splitChunks(false);
      config.output.filename('retainable.js');
      config.plugin('mini-css-extract-plugin')
        .use(require('mini-css-extract-plugin'), [{ filename: 'retainable.css' }]);
      config.optimization.minimize(false);
    },
    filenameHashing: false,
  }