import { resolve } from 'path';
import { Configuration, NamedModulesPlugin, NamedChunksPlugin } from 'webpack';

// import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: Configuration = {
  mode: 'production',
  context: resolve(__dirname, '../'),
  entry: './src/main.ts',
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  stats: {
    // warningsFilter: /export .* was not found in/,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.vuex', '.json', '.less'],
    // alias: aliasName.alias,
    mainFields: ['jsnext:main', 'module', 'main'],
    modules: [
      resolve(__dirname, '../node_modules'),
    ],
    // plugins: [new TsconfigPathsPlugin({
    //     configFile: resolve(__dirname, '../tsconfig.json')
    // })]
  },
  externals: {
    jquery: 'jquery',
  },
  resolveLoader: {},
  module: {
    noParse: /jquery/,
    rules: [
      // {
      //   test: /\.ts$/,
      //   enforce: 'pre',
      //   loader: 'tslint-loader',
      //   options: {

      //   },
      // },
      // {
      //     test: /\.vue$/,
      //     loader: 'vue-loader',
      //     options: {
      //         loaders: {
      //             ts: 'ts-loader',
      //             tsx: 'babel-loader!ts-loader',
      //         }
      //     }
      // },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // transpileOnly: true,
          // appendTsSuffixTo: [/\.vue$/],
          // allowTsInNodeModules: false
        },
      },
      // {
      //     test: /\.tsx$/,
      //     loader: 'babel-loader!ts-loader',
      //     options: {
      //         appendTsxSuffixTo: [/TSX\.vue$/]
      //     }
      // }
    ],
  },
  plugins: [
    new NamedModulesPlugin(),
    new NamedChunksPlugin(),
    // new webpack.WatchIgnorePlugin([
    //     /\.js$/,
    //     /\.d\.ts$/
    // ])
  ],
};

export default config;