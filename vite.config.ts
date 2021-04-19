import path from "path"
import { defineConfig, UserConfigExport, ConfigEnv } from "vite"
import vuePlugin from "@vitejs/plugin-vue"
import svgPlugin from "vite-plugin-svg-sprite-component"
import { viteMockServe } from 'vite-plugin-mock';
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [vuePlugin(),
    svgPlugin({ symbolId: (name) => "icon-" + name }),
    viteMockServe({
      // default
      mockPath: 'mock',
      localEnabled: command === 'serve',
      supportTs: true
    }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'path': 'path-browserify'
      }
    }
  };
};