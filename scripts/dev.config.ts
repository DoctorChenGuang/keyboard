import WebpackConfig from './webpack.config';
import * as webpack from 'webpack';

webpack(WebpackConfig, (err, stats) => {
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
});