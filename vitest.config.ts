import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    maxConcurrency: 1,
    coverage: {
      enabled: true,
      reporter: ['text', 'lcov', 'clover'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/tests/**'],
      clean: false
    },
    testTimeout: 30000
  }
});
