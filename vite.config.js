import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { run } from "vite-plugin-run";
import tailwindcss from "@tailwindcss/vite";
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        tailwindcss(),

        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),

        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),

        run([
            {
                name: "wayfinder",
                run: ["php", "artisan", "wayfinder:generate"],
                pattern: ["routes/**/*.php", "app/**/Http/**/*.php"],
            },
        ]),
    ],

    resolve: {
        alias: {
            '@': '/resources',
            '@fonts': '/public/fonts',
            '@img': '/public/img',
            '@js': '/resources/js',
            '@css': '/resources/css',
        },
    },

    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }

                    if (id.includes('resources/js')) {
                        return 'app';
                    }
                },
            },
        },
    },
});
