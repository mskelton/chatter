import type { Configuration } from 'webpack'
import { rules } from './webpack.rules'

export const mainConfig: Configuration = {
  entry: './src/main.ts',
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/,
        use: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
}
