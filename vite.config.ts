import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        }
    },

    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                additionalData: `@import "${path.resolve(__dirname, 'src/assets/styles/base.less')}";`
            }
        }
    },

    server: {
        host: "0.0.0.0",
        port: 8080,
        open: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080/',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        },
    }
})
