import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { defineConfig, loadEnv } from 'vite';

const trimTrailingSlash = (value: string) => value.replace(/\/$/, '');

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const appUrl = trimTrailingSlash(env.APP_URL || 'http://localhost:8000');
    const appOrigin = new URL(appUrl).origin;
    const appHostname = new URL(appUrl).hostname;
    const viteProtocol = env.VITE_DEV_PROTOCOL || 'http';
    const vitePort = Number(env.VITE_DEV_PORT || 5173);
    const viteHost = env.VITE_DEV_HOST || appHostname || 'localhost';
    const viteOrigin = trimTrailingSlash(
        env.VITE_DEV_SERVER_URL || `${viteProtocol}://${viteHost}:${vitePort}`,
    );

    return {
        server: {
            host: viteHost,
            port: vitePort,
            strictPort: true,
            origin: viteOrigin,
            cors: {
                origin: appOrigin,
            },
            hmr: {
                host: new URL(viteOrigin).hostname,
            },
        },
        plugins: [
            laravel({
                input: ['resources/js/app.ts'],
                ssr: 'resources/js/ssr.ts',
                refresh: true,
            }),
            tailwindcss(),
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
            wayfinder({
                formVariants: true,
            }),
        ],
    };
});
