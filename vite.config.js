import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    optimizeDeps: {//-------------- Solo necesario quitar para depuracion profunda o al trabajar en librerias
        esbuildOptions: {
            sourcemap: false
        }
    },
    build: {
        sourcemap: false
    }//--quita warnings de consola en el mapeo
});
