import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'

import path from 'path' // 👈 ADD THIS LINE
export default defineConfig(async () => ({
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue'],
            dts: false,
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './app'), // For root-level aliases like '~/'
            '~': path.resolve(__dirname, './app'),

        },
    },
    test: {
        name: 'unit',
        include: ['test/{unit,e2e}/**/*.{test,spec}.ts'],
        environment: 'happy-dom',
        globals: true,
        alias: {
            '@': path.resolve(__dirname, './app'), // For root-level aliases like '~/'
            '~': path.resolve(__dirname, './app'),
        },
        // setupFiles: ['./tests/setup.ts']
    },
}))
