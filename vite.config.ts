import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ProxyOptions } from 'vite';

// Define the proxy options
const proxy: ProxyOptions = {
  target: 'http://localhost:3000',
  changeOrigin: true,
  secure: false,
  rewrite: (path) => path.replace(/^\/api/, '')
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': proxy
    }
  }
});
