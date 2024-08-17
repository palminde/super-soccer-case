import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import 'vitest/config';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*.{tsx,ts}'],
      exclude: ['src/main.tsx', 'src/**/*.test.*'],
    },
  },
  resolve: {
    alias: [{ find: 'src', replacement: path.resolve(__dirname, '/src') }],
  },
});
