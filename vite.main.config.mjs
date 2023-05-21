import { defineConfig } from 'vite'
import { restart } from './restart.plugin.mjs'

export default defineConfig({
  build: {
    target: 'chrome112',
  },
  plugins: [restart()],
})
