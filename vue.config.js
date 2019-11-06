module.exports = {
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
    entry: {
      app: './example/main.js'
    }
  }
};
