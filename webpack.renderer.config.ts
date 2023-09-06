import type { Configuration } from 'webpack'
import { rules } from './webpack.rules'

export const rendererConfig: Configuration = {
  module: { rules },
  output: {
    filename: 'preload.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
}
