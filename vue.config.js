const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: IS_PROD ? './' : '/',
  outputDir: process.env.outputDir || 'dist',
  assetsDir: '',

  configureWebpack: config => {
    const plugins = []
    if (IS_PROD) {
      plugins.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      )
    }

    config.plugins = [...config.plugins, ...plugins]
  },
  transpileDependencies: ['node_modules/webpack-dev-server/client'],
  chainWebpack: config => {
    config.entry.app = ['./src/main.js']
    config.module
      .rule('compile')
      .test(/\.js$/)
      .include.add(resolve('src'))
      .add(resolve('test'))
      .add(resolve('static'))
      .add(resolve('node_modules/webpack-dev-server/client'))
      .add(resolve('node_modules'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .options({
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false
            }
          ]
        ]
      })
    config.resolve.symlinks(true)
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    config
      .plugin('ignore')
      .use(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      )

    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@$', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@utils', resolve('src/utils'))
      .set('@config', resolve('src/config'))
      .set('@layouts', resolve('src/layouts'))
      .set('@store', resolve('src/store'))
      .set('@mixins', resolve('src/mixins'))

    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }

    if (IS_PROD) {
      config.optimization.delete('splitChunks')
    }
    return config
  },

  css: {
    modules: false,
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      css: {}
    }
  },

  lintOnSave: true,
  runtimeCompiler: true,
  productionSourceMap: !IS_PROD,
  parallel: require('os').cpus().length > 1,
  pwa: {},

  devServer: {
    open: true,
    hotOnly: true,
    proxy: {
      '/dic': {
        target: 'http://192.168.0.96:8092',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/dic': ''
        }
      },
      '/api': {
        target: 'http://192.168.0.96:49152/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/styles/variables.less')]
    }
    // vconsole: { enable: true }
  }
}
