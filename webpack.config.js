const webpack = require('webpack'),
      path    = require('path'),
      join    = path.join,
      resolve = path.resolve,
      getConfig = require('hjs-webpack'),
      root    = resolve(__dirname),
      src     = join(root, 'demo/src'),
      modules = join(root, 'node_modules'),
      dest    = join(root, 'demo/dist');

//demo
var config = getConfig({
  in: join(src, 'js/main.js'),
  out: dest,
  output: {
    filename: 'main.js',
    cssFilename: 'main.css'
  },
  clearBeforeBuild: '!favicon.png',
  html: function (context) {
    return {
        'index.html': context.defaultTemplate({
            head: '<link rel="icon" href="favicon.png" />',
            title: 'React Donut Chart',
            publicPath: '',
            meta: {
                'name': 'React donut chart',
                'description': 'React donut chart component'
            }
        })
    };
  },
  devServer: {
      port: 3000
  }
});

module.exports = config;
