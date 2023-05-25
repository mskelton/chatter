import type { ModuleOptions } from 'webpack'

export const rules: Required<ModuleOptions>['rules'] = [
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader',
  },
  {
    parser: { amd: false },
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    exclude: /(node_modules|\.webpack)/,
    test: /\.tsx?$/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
]
