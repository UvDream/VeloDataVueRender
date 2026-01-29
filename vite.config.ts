import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        dts({
            insertTypesEntry: true,
            include: ['src/**/*'],
            exclude: ['src/**/*.test.ts', 'src/**/*.test.vue']
        }),
        viteStaticCopy({
            targets: [
                {
                    src: 'node_modules/velo-data-static/maps/*.json',
                    dest: 'map'
                }
            ]
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'VeloDataVueRender',
            formats: ['es', 'umd'],
            fileName: (format) => `velo-data-vue-render.${format}.js`
        },
        rollupOptions: {
            // 外部化依赖,不打包到库中
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                },
                // 保留CSS
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') return 'style.css'
                    return assetInfo.name || 'assets/[name].[ext]'
                }
            }
        },
        sourcemap: true,
        // 清空输出目录
        emptyOutDir: true
    }
})
