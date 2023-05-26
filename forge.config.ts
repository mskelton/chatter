import MakerDMG from '@electron-forge/maker-dmg'
import { MakerZIP } from '@electron-forge/maker-zip'
import WebpackPlugin from '@electron-forge/plugin-webpack'
import PublisherGithub from '@electron-forge/publisher-github'
import type { ForgeConfig } from '@electron-forge/shared-types'
import removeLanguages from './config/hooks/remove-languages'
import { mainConfig } from './webpack.main.config'
import { rendererConfig } from './webpack.renderer.config'

/**
 * Get's the x or y location for the contents. This adjusts based on the size
 * of the placeholders.
 */
const loc = (pos: number) => pos + 130 / 2

/**
 * Offset the y-location by a touch to make it visually appear centered due
 * to the text underneath.
 */
const y = (pos: number) => loc(pos) - 10

const config: ForgeConfig = {
  hooks: {
    async packageAfterCopy(_, buildPath) {
      await removeLanguages(buildPath, /(en)\.lproj/g)
    },
  },
  makers: [
    new MakerZIP({}, ['darwin']),
    new MakerDMG({
      background: './assets/dmg-background.png',
      contents: (opts) => [
        {
          name: 'Applications',
          path: '/Applications',
          type: 'link',
          x: loc(428),
          y: y(85),
        },
        {
          name: 'Chatter.app',
          path: (opts as { appPath: string }).appPath,
          type: 'file',
          x: loc(42),
          y: y(85),
        },
      ],
      format: 'ULFO',
      icon: './assets/icons/icon.icns',
    }),
  ],
  packagerConfig: {
    appBundleId: 'dev.mskelton.chatter',
    appCategoryType: 'public.app-category.productivity',
    icon: './assets/icons/icon',
    osxNotarize: {
      appleId: process.env.APPLE_ID ?? '',
      appleIdPassword: process.env.APPLE_PASSWORD ?? '',
      teamId: process.env.APPLE_TEAM_ID ?? '',
      tool: 'notarytool',
    },
    osxSign: {},
  },
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
  ],
  publishers: [
    new PublisherGithub({
      repository: {
        name: 'chatter',
        owner: 'mskelton',
      },
    }),
  ],
  rebuildConfig: {},
}

export default config
