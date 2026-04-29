import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // This is what allows your tests to "see" the DOM
    globals: true,        // Allows you to use 'it', 'describe', 'expect' without importing them every time
    setupFiles: './src/test/setup.js', // Optional: if you have global setup code
  },
});