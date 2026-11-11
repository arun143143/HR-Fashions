import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        target: 'es2020',
        sourcemap: false,
        rollupOptions: {
            output: {
                // Stable vendor files stay cached in the browser between releases.
                manualChunks: {
                    react: ['react', 'react-dom', 'react-router-dom'],
                    icons: ['lucide-react'],
                    gsap: ['gsap'],
                },
            },
        },
    },
});
