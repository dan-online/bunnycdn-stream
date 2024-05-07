import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    maxConcurrency: 1,
    coverage: {
      enabled: true,
      reporter: ['text', 'lcov', 'clover'],
      include: ['src/**'],
      exclude: ['src/error.ts'],
      clean: false
    },
    testTimeout: 30000
  }
});
