import { defineConfig } from 'vite';
import { vitepressDemo } from 'vite-plugin-vitepress-demo';
import { fileURLToPath } from 'url';
import path from 'path';
// import vue from '@vitejs/plugin-vue';

const baseUrl = fileURLToPath(new URL('.', import.meta.url));
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vitepressDemo({
            glob: ['**/demos/*.vue'],
        }),
    ],
    resolve: {
        alias: [
            {
                find: /^sangyu-ui/,
                replacement: path.resolve(baseUrl, 'packages/sangyu-ui/src'),
            },
            {
                find: /^@sangyu-ui\/utils/,
                replacement: path.resolve(baseUrl, 'packages/utils/src'),
            },
        ],
    },
});
