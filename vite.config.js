import path from "path"
import svgPlugin from "vite-plugin-svg-sprite-component"

const sharedConfig = {
  alias: {
    '/@/': path.resolve(__dirname, 'src'),
  }
}

const pathAliasMap = {
  '@/': '/src/',
}

/** @type import('vite').UserConfig */
module.exports = {
  plugins: [svgPlugin({ symbolId: (name) => "icon-" + name })],
  ...sharedConfig,
  optimizeDeps: {
    include: ['vue-router']
  },
  resolvers: [
    {
      alias(path) {
        for (const [slug, res] of Object.entries(pathAliasMap)) {
          if (path.startsWith(slug)) {
            return path.replace(slug, res)
          }
        }
      }
    },
  ],
  transforms: [require('vite-transform-globby-import')(sharedConfig)],
  configureServer: [require('./mock/mock-server')],
}